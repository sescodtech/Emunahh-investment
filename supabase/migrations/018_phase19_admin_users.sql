-- Phase 19: Admin users/invitations. Invitation delivery is performed by a trusted Edge Function.
create table if not exists public.admin_invitations (
 id uuid primary key default gen_random_uuid(),
 email text not null,
 role_key text not null default 'admin',
 department_id uuid references public.departments(id) on delete set null,
 token_hash text,
 status text not null default 'pending' check(status in ('pending','sent','accepted','expired','revoked')),
 expires_at timestamptz not null default (now()+interval '7 days'),
 invited_by uuid not null references auth.users(id) on delete restrict,
 accepted_by uuid references auth.users(id) on delete set null,
 sent_at timestamptz,
 accepted_at timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists admin_invitations_email_idx on public.admin_invitations(lower(email),created_at desc);
create index if not exists admin_invitations_status_idx on public.admin_invitations(status,expires_at);
alter table public.admin_invitations enable row level security;
create policy admin_invitations_read on public.admin_invitations for select to authenticated using(public.has_permission('users.view') or invited_by=auth.uid());
create policy admin_invitations_manage on public.admin_invitations for all to authenticated using(public.has_permission('users.invite')) with check(public.has_permission('users.invite'));

create or replace function public.admin_create_invitation(invite_email text, target_role text default 'admin', target_department uuid default null)
returns public.admin_invitations language plpgsql security definer set search_path=public as $$
declare r public.admin_invitations;
begin
 if not public.has_permission('users.invite') then raise exception 'User invitation permission required.'; end if;
 if not exists(select 1 from roles where key=target_role) then raise exception 'Role not found.'; end if;
 insert into admin_invitations(email,role_key,department_id,invited_by) values(lower(trim(invite_email)),target_role,target_department,auth.uid()) returning * into r;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'ADMIN_INVITATION_CREATED','admin_invitation',r.id::text,jsonb_build_object('email',r.email,'role',r.role_key,'department_id',r.department_id));
 return r;
end $$;
grant execute on function public.admin_create_invitation(text,text,uuid) to authenticated;

create or replace function public.admin_revoke_invitation(target_id uuid)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('users.invite') then raise exception 'User invitation permission required.'; end if;
 update admin_invitations set status='revoked' where id=target_id and status in ('pending','sent');
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'ADMIN_INVITATION_REVOKED','admin_invitation',target_id::text,'{}'::jsonb);
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_revoke_invitation(uuid) to authenticated;
