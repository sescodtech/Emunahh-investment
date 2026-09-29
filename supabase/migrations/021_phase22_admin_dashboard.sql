-- Phase 22: Admin dashboard and operational metrics. Non-destructive.
create or replace view public.admin_dashboard_summary as
select
  (select count(*) from public.profiles where status='active')::bigint as active_users,
  (select count(*) from public.profiles)::bigint as total_users,
  (select count(*) from public.departments where is_active=true)::bigint as active_departments,
  (select count(*) from public.admin_invitations where status in ('pending','sent') and expires_at>now())::bigint as pending_invitations,
  (select count(*) from public.security_events where created_at>=now()-interval '24 hours')::bigint as security_events_24h,
  (select count(*) from public.admin_auth_events where created_at>=now()-interval '24 hours' and event_type='LOGIN')::bigint as logins_24h,
  (select count(*) from public.audit_logs where created_at>=now()-interval '24 hours')::bigint as audit_events_24h,
  (select count(*) from public.module_settings where is_enabled=true)::bigint as enabled_modules;

create or replace function public.admin_get_dashboard_metrics()
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb; uid uuid:=auth.uid();
begin
  if uid is null or not public.has_permission('dashboard.view') then
    raise exception 'Dashboard access permission required.';
  end if;
  select jsonb_build_object(
    'generated_at',now(),
    'summary',(select to_jsonb(s) from public.admin_dashboard_summary s),
    'security_last_7_days',coalesce((select jsonb_agg(x order by x.day desc) from (
      select date_trunc('day',created_at)::date as day,severity,count(*)::bigint as event_count
      from public.security_events where created_at>=now()-interval '7 days'
      group by 1,2
    ) x),'[]'::jsonb),
    'recent_security_events',coalesce((select jsonb_agg(x order by x.created_at desc) from (
      select id,event_type,severity,entity_type,entity_id,created_at from public.security_events order by created_at desc limit 10
    ) x),'[]'::jsonb),
    'recent_audit_events',coalesce((select jsonb_agg(x order by x.created_at desc) from (
      select id,actor_id,action,entity_type,entity_id,created_at from public.audit_logs order by created_at desc limit 10
    ) x),'[]'::jsonb)
  ) into r;
  return r;
end $$;

insert into public.permissions(key,name,description) values
('dashboard.view','View Dashboard','View administrator dashboard metrics and operational summaries')
on conflict(key) do nothing;

grant select on public.admin_dashboard_summary to authenticated;
grant execute on function public.admin_get_dashboard_metrics() to authenticated;
