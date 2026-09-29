-- Phase 20: Security/audit controls. Non-destructive.
create table if not exists public.security_events (
 id uuid primary key default gen_random_uuid(),
 actor_id uuid references auth.users(id) on delete set null,
 event_type text not null,
 severity text not null default 'info' check(severity in ('info','warning','critical')),
 entity_type text,
 entity_id text,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists security_events_created_idx on public.security_events(created_at desc);
create index if not exists security_events_actor_idx on public.security_events(actor_id,created_at desc);
create index if not exists security_events_type_idx on public.security_events(event_type,created_at desc);
alter table public.security_events enable row level security;
create policy security_events_read on public.security_events for select to authenticated using(public.has_permission('security.view') or public.has_permission('audit.view'));
create policy security_events_insert on public.security_events for insert to authenticated with check(actor_id=auth.uid() and public.has_permission('security.manage'));

create or replace function public.record_security_event(event_name text, event_severity text default 'info', entity_kind text default null, entity_key text default null, event_metadata jsonb default '{}'::jsonb)
returns uuid language plpgsql security definer set search_path=public as $$
declare eid uuid;
begin
 if auth.uid() is null then raise exception 'Authentication required.'; end if;
 if event_severity not in ('info','warning','critical') then raise exception 'Invalid severity.'; end if;
 insert into security_events(actor_id,event_type,severity,entity_type,entity_id,metadata) values(auth.uid(),event_name,event_severity,entity_kind,entity_key,coalesce(event_metadata,'{}'::jsonb)) returning id into eid;
 return eid;
end $$;
revoke all on function public.record_security_event(text,text,text,text,jsonb) from public;
grant execute on function public.record_security_event(text,text,text,text,jsonb) to authenticated;

create or replace view public.admin_security_summary as
select event_type,severity,count(*)::bigint as event_count,max(created_at) as last_seen
from public.security_events group by event_type,severity;
