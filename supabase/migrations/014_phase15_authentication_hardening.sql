-- Phase 15: Authentication hardening. Non-destructive; Supabase Auth remains the identity provider.
create table if not exists public.admin_auth_events (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 event_type text not null check (event_type in ('LOGIN','LOGOUT','PASSWORD_RESET_REQUESTED','PASSWORD_CHANGED','SESSION_REFRESHED','MFA_ENABLED','MFA_DISABLED')),
 user_agent text,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists admin_auth_events_user_idx on public.admin_auth_events(user_id,created_at desc);
create index if not exists admin_auth_events_type_idx on public.admin_auth_events(event_type,created_at desc);
alter table public.admin_auth_events enable row level security;
drop policy if exists admin_auth_events_self_insert on public.admin_auth_events;
drop policy if exists admin_auth_events_admin_read on public.admin_auth_events;
create policy admin_auth_events_self_insert on public.admin_auth_events for insert to authenticated with check (user_id=auth.uid());
create policy admin_auth_events_admin_read on public.admin_auth_events for select to authenticated using (public.has_permission('audit.view') or user_id=auth.uid());

create or replace function public.record_admin_auth_event(event_name text, event_metadata jsonb default '{}'::jsonb)
returns uuid language plpgsql security definer set search_path=public as $$
declare eid uuid;
begin
 if auth.uid() is null then raise exception 'Authentication required.'; end if;
 if event_name not in ('LOGIN','LOGOUT','PASSWORD_RESET_REQUESTED','PASSWORD_CHANGED','SESSION_REFRESHED','MFA_ENABLED','MFA_DISABLED') then raise exception 'Unsupported authentication event.'; end if;
 insert into public.admin_auth_events(user_id,event_type,metadata) values(auth.uid(),event_name,coalesce(event_metadata,'{}'::jsonb)) returning id into eid;
 return eid;
end $$;
revoke all on function public.record_admin_auth_event(text,jsonb) from public;
grant execute on function public.record_admin_auth_event(text,jsonb) to authenticated;
