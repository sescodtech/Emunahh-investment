-- Phase 24: Central audit center. Non-destructive.
create index if not exists audit_logs_actor_created_idx on public.audit_logs(actor_id,created_at desc);
create index if not exists audit_logs_entity_created_idx on public.audit_logs(entity_type,entity_id,created_at desc);
create index if not exists audit_logs_action_created_idx on public.audit_logs(action,created_at desc);

create or replace function public.admin_get_audit_center(
  p_limit integer default 100,
  p_action text default null,
  p_entity_type text default null,
  p_actor_id uuid default null,
  p_from timestamptz default null,
  p_to timestamptz default null
)
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb;
begin
  if not public.has_permission('audit.view') then raise exception 'Audit view permission required.'; end if;
  p_limit:=least(greatest(coalesce(p_limit,100),1),500);
  select jsonb_build_object(
    'generated_at',now(),
    'total_matches',count(*) over(),
    'events',coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc),'[]'::jsonb)
  ) into r
  from (
    select id,actor_id,action,entity_type,entity_id,metadata,created_at
    from public.audit_logs
    where (p_action is null or action=p_action)
      and (p_entity_type is null or entity_type=p_entity_type)
      and (p_actor_id is null or actor_id=p_actor_id)
      and (p_from is null or created_at>=p_from)
      and (p_to is null or created_at<p_to)
    order by created_at desc limit p_limit
  ) x;
  return coalesce(r,jsonb_build_object('generated_at',now(),'total_matches',0,'events','[]'::jsonb));
end $$;

grant execute on function public.admin_get_audit_center(integer,text,text,uuid,timestamptz,timestamptz) to authenticated;
