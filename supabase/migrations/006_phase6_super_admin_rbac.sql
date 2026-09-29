-- Emunahh-Invest Phase 6: Super Admin / RBAC hardening
-- NON-DESTRUCTIVE: adds RPCs/tables/policies only; preserves existing content and routes.

create table if not exists public.module_settings (
  module_key text primary key,
  label text not null,
  description text,
  is_enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.user_module_overrides (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_key text not null references public.module_settings(module_key) on delete cascade,
  is_enabled boolean not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  primary key(user_id,module_key)
);

insert into public.module_settings(module_key,label,description) values
('applications','Applications','Loan, investment and other customer applications'),
('messages','Contact Inbox','Website enquiries and customer messages'),
('content','Website CMS','Pages, sections and public website content'),
('services','Services','Financial service catalogue'),
('media','Media Library','Cloudinary/media records'),
('users','Users & Staff','Staff accounts and assignments'),
('roles','Roles & Permissions','Roles, permissions and departments'),
('emails','Email Log','Outbound email history'),
('audit','Audit Trail','Administrative activity history'),
('settings','Site Settings','Company and notification configuration')
on conflict(module_key) do nothing;

alter table public.module_settings enable row level security;
alter table public.user_module_overrides enable row level security;
drop policy if exists "module settings read active" on public.module_settings;
drop policy if exists "module settings manage" on public.module_settings;
drop policy if exists "module overrides own read" on public.user_module_overrides;
drop policy if exists "module overrides manage" on public.user_module_overrides;

create policy "module settings read active" on public.module_settings for select using (auth.uid() is not null);
create policy "module settings manage" on public.module_settings for all using (public.has_permission('settings.manage')) with check (public.has_permission('settings.manage'));
create policy "module overrides own read" on public.user_module_overrides for select using (user_id=auth.uid() or public.has_permission('users.manage'));
create policy "module overrides manage" on public.user_module_overrides for all using (public.has_permission('users.manage')) with check (public.has_permission('users.manage'));

create or replace function public.admin_get_access()
returns jsonb
language plpgsql stable security definer set search_path=public
as $$
declare uid uuid := auth.uid(); result jsonb;
begin
 if uid is null then return jsonb_build_object('authenticated',false,'permissions','[]'::jsonb,'modules','{}'::jsonb); end if;
 select jsonb_build_object(
   'authenticated',true,
   'user_id',uid,
   'is_super_admin',exists(select 1 from profiles where id=uid and status='active' and role='super_admin'),
   'permissions',coalesce((select jsonb_agg(distinct p.key order by p.key) from user_roles ur join role_permissions rp on rp.role_id=ur.role_id join permissions p on p.id=rp.permission_id where ur.user_id=uid),'[]'::jsonb),
   'modules',coalesce((select jsonb_object_agg(ms.module_key,coalesce(umo.is_enabled,ms.is_enabled)) from module_settings ms left join user_module_overrides umo on umo.module_key=ms.module_key and umo.user_id=uid),'{}'::jsonb)
 ) into result;
 return result;
end $$;
grant execute on function public.admin_get_access() to authenticated;

create or replace function public.admin_set_user_status(target_user uuid, new_status text)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare old_status text; actor uuid:=auth.uid();
begin
 if actor is null or not public.has_permission('users.manage') then raise exception 'User management permission required.'; end if;
 if new_status not in ('active','disabled') then raise exception 'Invalid user status.'; end if;
 select status into old_status from profiles where id=target_user;
 if not found then raise exception 'User profile not found.'; end if;
 if target_user=actor and new_status='disabled' then raise exception 'You cannot disable your own account.'; end if;
 update profiles set status=new_status where id=target_user;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'USER_STATUS_CHANGED','profile',target_user::text,jsonb_build_object('old_status',old_status,'new_status',new_status));
 return jsonb_build_object('success',true,'status',new_status);
end $$;
grant execute on function public.admin_set_user_status(uuid,text) to authenticated;

create or replace function public.admin_assign_user(target_user uuid, target_role text, target_department uuid)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); rid uuid; old_role text; old_department uuid;
begin
 if actor is null or not public.has_permission('users.manage') then raise exception 'User management permission required.'; end if;
 if target_role='super_admin' and not exists(select 1 from profiles where id=actor and role='super_admin' and status='active') then raise exception 'Only Super Admin can assign Super Admin.'; end if;
 select id into rid from roles where key=target_role; if rid is null then raise exception 'Role not found.'; end if;
 select role,department_id into old_role,old_department from profiles where id=target_user; if not found then raise exception 'User profile not found.'; end if;
 update profiles set role=target_role, department_id=target_department where id=target_user;
 insert into user_roles(user_id,role_id) values(target_user,rid) on conflict(user_id) do update set role_id=excluded.role_id;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'USER_ACCESS_CHANGED','profile',target_user::text,jsonb_build_object('old_role',old_role,'new_role',target_role,'old_department',old_department,'new_department',target_department));
 return jsonb_build_object('success',true,'role',target_role,'department_id',target_department);
end $$;
grant execute on function public.admin_assign_user(uuid,text,uuid) to authenticated;

create or replace function public.admin_save_role(target_role uuid, role_key text, role_name text, role_description text)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); existing_key text;
begin
 if actor is null or not public.has_permission('roles.manage') then raise exception 'Role management permission required.'; end if;
 if role_key='super_admin' and not exists(select 1 from roles where id=target_role and is_system=true) then raise exception 'Super Admin role is protected.'; end if;
 select key into existing_key from roles where id=target_role;
 if target_role is null then insert into roles(key,name,description,is_system) values(lower(trim(role_key)),trim(role_name),nullif(trim(role_description),''),false) returning id into target_role;
 else update roles set key=lower(trim(role_key)),name=trim(role_name),description=nullif(trim(role_description),'') where id=target_role;
 end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'ROLE_SAVED','role',target_role::text,jsonb_build_object('old_key',existing_key,'new_key',role_key));
 return jsonb_build_object('success',true,'id',target_role);
end $$;
grant execute on function public.admin_save_role(uuid,text,text,text) to authenticated;

create or replace function public.admin_delete_role(target_role uuid)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); rk text; sys boolean;
begin
 if actor is null or not public.has_permission('roles.manage') then raise exception 'Role management permission required.'; end if;
 select key,is_system into rk,sys from roles where id=target_role;
 if not found then raise exception 'Role not found.'; end if;
 if sys then raise exception 'System roles cannot be deleted.'; end if;
 if exists(select 1 from user_roles where role_id=target_role) then raise exception 'Reassign users before deleting this role.'; end if;
 delete from role_permissions where role_id=target_role; delete from roles where id=target_role;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'ROLE_DELETED','role',target_role::text,jsonb_build_object('key',rk));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_delete_role(uuid) to authenticated;

create or replace function public.admin_set_role_permission(target_role uuid, target_permission uuid, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); rk text; pk text;
begin
 if actor is null or not public.has_permission('roles.manage') then raise exception 'Role management permission required.'; end if;
 select key into rk from roles where id=target_role; select key into pk from permissions where id=target_permission;
 if rk='super_admin' then raise exception 'Super Admin permissions are fixed.'; end if;
 if enabled then insert into role_permissions(role_id,permission_id) values(target_role,target_permission) on conflict do nothing; else delete from role_permissions where role_id=target_role and permission_id=target_permission; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'ROLE_PERMISSION_CHANGED','role',target_role::text,jsonb_build_object('permission',pk,'enabled',enabled));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_role_permission(uuid,uuid,boolean) to authenticated;

create or replace function public.admin_set_module_override(target_user uuid, target_module text, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid();
begin
 if actor is null or not public.has_permission('users.manage') then raise exception 'User management permission required.'; end if;
 if not exists(select 1 from module_settings where module_key=target_module) then raise exception 'Module not found.'; end if;
 insert into user_module_overrides(user_id,module_key,is_enabled,updated_by) values(target_user,target_module,enabled,actor)
 on conflict(user_id,module_key) do update set is_enabled=excluded.is_enabled,updated_by=actor,updated_at=now();
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'USER_MODULE_CHANGED','profile',target_user::text,jsonb_build_object('module',target_module,'enabled',enabled));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_module_override(uuid,text,boolean) to authenticated;

-- Profiles remain readable under existing policies; sensitive writes now go through RPCs.
-- Prevent direct role/access manipulation by ordinary clients.
drop policy if exists "profile admin update" on public.profiles;
create policy "profile admin update" on public.profiles for update using (public.has_permission('users.manage')) with check (public.has_permission('users.manage'));

-- Audit writes should be server-side for sensitive operations; keep existing application audit behavior intact.
