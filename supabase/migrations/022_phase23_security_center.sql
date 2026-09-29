-- Phase 23: Security center. Non-destructive.
create table if not exists public.security_settings (
  id boolean primary key default true check(id=true),
  session_timeout_minutes integer not null default 60 check(session_timeout_minutes between 5 and 1440),
  max_login_attempts integer not null default 5 check(max_login_attempts between 1 and 20),
  require_mfa_for_admins boolean not null default false,
  notify_on_new_admin boolean not null default true,
  notify_on_failed_login boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
insert into public.security_settings(id) values(true) on conflict(id) do nothing;
alter table public.security_settings enable row level security;
drop policy if exists security_settings_read on public.security_settings;
drop policy if exists security_settings_manage on public.security_settings;
create policy security_settings_read on public.security_settings for select to authenticated using(public.has_permission('security.view'));
create policy security_settings_manage on public.security_settings for update to authenticated using(public.has_permission('security.manage')) with check(public.has_permission('security.manage'));

create or replace function public.admin_get_security_center()
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb;
begin
  if not public.has_permission('security.view') then raise exception 'Security view permission required.'; end if;
  select jsonb_build_object(
    'settings',(select to_jsonb(s) from public.security_settings s where id=true),
    'auth_events_24h',(select count(*) from public.admin_auth_events where created_at>=now()-interval '24 hours'),
    'failed_login_events_24h',(select count(*) from public.security_events where created_at>=now()-interval '24 hours' and event_type in ('LOGIN_FAILED','AUTH_LOGIN_FAILED')),
    'critical_events_7d',(select count(*) from public.security_events where created_at>=now()-interval '7 days' and severity='critical'),
    'warnings_7d',(select count(*) from public.security_events where created_at>=now()-interval '7 days' and severity='warning'),
    'active_admins',(select count(*) from public.profiles where status='active'),
    'recent_auth',coalesce((select jsonb_agg(x order by x.created_at desc) from (select user_id,event_type,created_at from public.admin_auth_events order by created_at desc limit 25) x),'[]'::jsonb),
    'recent_security',coalesce((select jsonb_agg(x order by x.created_at desc) from (select id,actor_id,event_type,severity,entity_type,entity_id,created_at from public.security_events order by created_at desc limit 25) x),'[]'::jsonb)
  ) into r;
  return r;
end $$;

grant execute on function public.admin_get_security_center() to authenticated;

create or replace function public.admin_update_security_settings(
  p_session_timeout_minutes integer,
  p_max_login_attempts integer,
  p_require_mfa_for_admins boolean,
  p_notify_on_new_admin boolean,
  p_notify_on_failed_login boolean
)
returns public.security_settings language plpgsql security definer set search_path=public as $$
declare r public.security_settings;
begin
  if not public.has_permission('security.manage') then raise exception 'Security management permission required.'; end if;
  update public.security_settings set
    session_timeout_minutes=p_session_timeout_minutes,
    max_login_attempts=p_max_login_attempts,
    require_mfa_for_admins=p_require_mfa_for_admins,
    notify_on_new_admin=p_notify_on_new_admin,
    notify_on_failed_login=p_notify_on_failed_login,
    updated_at=now(),updated_by=auth.uid()
  where id=true returning * into r;
  insert into public.security_events(actor_id,event_type,severity,entity_type,entity_id,metadata)
  values(auth.uid(),'SECURITY_SETTINGS_UPDATED','warning','security_settings','singleton',to_jsonb(r));
  return r;
end $$;

grant execute on function public.admin_update_security_settings(integer,integer,boolean,boolean,boolean) to authenticated;
