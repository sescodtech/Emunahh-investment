-- Phase 18: Module access / entitlements. Non-destructive.
create table if not exists public.role_module_access (
 role_id uuid not null references public.roles(id) on delete cascade,
 module_key text not null references public.module_settings(module_key) on delete cascade,
 is_enabled boolean not null default true,
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null,
 primary key(role_id,module_key)
);
create table if not exists public.module_entitlements (
 id uuid primary key default gen_random_uuid(),
 module_key text not null references public.module_settings(module_key) on delete cascade,
 user_id uuid references auth.users(id) on delete cascade,
 department_id uuid references public.departments(id) on delete cascade,
 plan_code text,
 is_enabled boolean not null default true,
 starts_at timestamptz not null default now(),
 expires_at timestamptz,
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null,
 check(user_id is not null or department_id is not null)
);
create index if not exists module_entitlements_user_idx on public.module_entitlements(user_id,module_key);
create index if not exists module_entitlements_department_idx on public.module_entitlements(department_id,module_key);
alter table public.role_module_access enable row level security;
alter table public.module_entitlements enable row level security;
create policy role_module_access_read on public.role_module_access for select to authenticated using(public.has_permission('modules.view') or public.has_permission('roles.manage'));
create policy role_module_access_manage on public.role_module_access for all to authenticated using(public.has_permission('modules.manage')) with check(public.has_permission('modules.manage'));
create policy module_entitlements_read on public.module_entitlements for select to authenticated using(user_id=auth.uid() or public.has_permission('modules.view'));
create policy module_entitlements_manage on public.module_entitlements for all to authenticated using(public.has_permission('modules.manage')) with check(public.has_permission('modules.manage'));

create or replace function public.has_module_access(target_module text)
returns boolean language sql stable security definer set search_path=public as $$
 select case
 when auth.uid() is null then false
 when exists(select 1 from profiles where id=auth.uid() and status='active' and role='super_admin') then true
 when exists(select 1 from user_module_overrides where user_id=auth.uid() and module_key=target_module and is_enabled=false) then false
 when exists(select 1 from module_entitlements me where me.module_key=target_module and me.user_id=auth.uid() and me.is_enabled=true and now()>=me.starts_at and (me.expires_at is null or now()<me.expires_at)) then true
 when exists(select 1 from department_members dm join module_entitlements me on me.department_id=dm.department_id where dm.user_id=auth.uid() and me.module_key=target_module and me.is_enabled=true and now()>=me.starts_at and (me.expires_at is null or now()<me.expires_at)) then true
 when exists(select 1 from user_roles ur join role_module_access rma on rma.role_id=ur.role_id where ur.user_id=auth.uid() and rma.module_key=target_module and rma.is_enabled=true) then true
 else coalesce((select is_enabled from module_settings where module_key=target_module),false)
 end
$$;
revoke all on function public.has_module_access(text) from public;
grant execute on function public.has_module_access(text) to authenticated,service_role;

create or replace function public.admin_set_role_module(target_role uuid, target_module text, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('modules.manage') then raise exception 'Module management permission required.'; end if;
 if not exists(select 1 from module_settings where module_key=target_module) then raise exception 'Module not found.'; end if;
 insert into role_module_access(role_id,module_key,is_enabled,updated_by) values(target_role,target_module,enabled,auth.uid()) on conflict(role_id,module_key) do update set is_enabled=excluded.is_enabled,updated_by=auth.uid(),updated_at=now();
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'ROLE_MODULE_CHANGED','role',target_role::text,jsonb_build_object('module',target_module,'enabled',enabled));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_role_module(uuid,text,boolean) to authenticated;
