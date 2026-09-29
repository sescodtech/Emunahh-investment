-- Phase 16: Granular permission overrides. Non-destructive.
create table if not exists public.user_permission_overrides (
 user_id uuid not null references auth.users(id) on delete cascade,
 permission_id uuid not null references public.permissions(id) on delete cascade,
 effect text not null check(effect in ('allow','deny')),
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null,
 primary key(user_id,permission_id)
);
alter table public.user_permission_overrides enable row level security;
drop policy if exists user_permission_overrides_self_read on public.user_permission_overrides;
drop policy if exists user_permission_overrides_manage on public.user_permission_overrides;
create policy user_permission_overrides_self_read on public.user_permission_overrides for select to authenticated using(user_id=auth.uid() or public.has_permission('users.manage'));
create policy user_permission_overrides_manage on public.user_permission_overrides for all to authenticated using(public.has_permission('users.manage')) with check(public.has_permission('users.manage'));

create or replace function public.has_permission(permission_key text)
returns boolean language sql stable security definer set search_path=public as $$
 select case
   when auth.uid() is null then false
   when exists(select 1 from profiles where id=auth.uid() and status='active' and role='super_admin') then true
   when exists(
     select 1 from user_permission_overrides uo join permissions p on p.id=uo.permission_id
     where uo.user_id=auth.uid() and p.key=permission_key and uo.effect='deny'
   ) then false
   when exists(
     select 1 from user_permission_overrides uo join permissions p on p.id=uo.permission_id
     where uo.user_id=auth.uid() and p.key=permission_key and uo.effect='allow'
   ) then true
   else exists(
     select 1 from user_roles ur join role_permissions rp on rp.role_id=ur.role_id join permissions p on p.id=rp.permission_id
     join profiles pr on pr.id=ur.user_id
     where ur.user_id=auth.uid() and pr.status='active' and p.key=permission_key
   )
 end
$$;
revoke all on function public.has_permission(text) from public;
grant execute on function public.has_permission(text) to authenticated,service_role;

insert into public.permissions(key,name,description) values
('users.invite','Invite Users','Create and track administrator invitations'),
('users.view','View Users','View staff accounts and access'),
('departments.view','View Departments','View departments and members'),
('departments.manage','Manage Departments','Create and manage departments'),
('modules.view','View Modules','View enabled modules and entitlements'),
('modules.manage','Manage Modules','Enable, disable and assign modules'),
('security.view','View Security','View authentication and security events'),
('security.manage','Manage Security','Manage security settings and access controls')
on conflict(key) do nothing;
