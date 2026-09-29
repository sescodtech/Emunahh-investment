-- Phase 17: Departments and staff membership. Non-destructive.
create table if not exists public.departments (
 id uuid primary key default gen_random_uuid(),
 name text not null unique,
 code text unique,
 description text,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 created_by uuid references auth.users(id) on delete set null
);
create table if not exists public.department_members (
 department_id uuid not null references public.departments(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 is_manager boolean not null default false,
 created_at timestamptz not null default now(),
 created_by uuid references auth.users(id) on delete set null,
 primary key(department_id,user_id)
);
create index if not exists department_members_user_idx on public.department_members(user_id);
alter table public.departments enable row level security;
alter table public.department_members enable row level security;
drop policy if exists departments_read on public.departments;
drop policy if exists departments_manage on public.departments;
drop policy if exists department_members_read on public.department_members;
drop policy if exists department_members_manage on public.department_members;
create policy departments_read on public.departments for select to authenticated using(public.has_permission('departments.view') or public.has_permission('users.manage'));
create policy departments_manage on public.departments for all to authenticated using(public.has_permission('departments.manage')) with check(public.has_permission('departments.manage'));
create policy department_members_read on public.department_members for select to authenticated using(user_id=auth.uid() or public.has_permission('departments.view') or public.has_permission('users.manage'));
create policy department_members_manage on public.department_members for all to authenticated using(public.has_permission('departments.manage') or public.has_permission('users.manage')) with check(public.has_permission('departments.manage') or public.has_permission('users.manage'));

create or replace function public.admin_save_department(target_id uuid, department_name text, department_code text, department_description text, active boolean default true)
returns public.departments language plpgsql security definer set search_path=public as $$
declare r public.departments;
begin
 if not public.has_permission('departments.manage') then raise exception 'Department management permission required.'; end if;
 if target_id is null then insert into public.departments(name,code,description,is_active,created_by) values(trim(department_name),nullif(upper(trim(department_code)),''),nullif(trim(department_description),''),active,auth.uid()) returning * into r;
 else update public.departments set name=trim(department_name),code=nullif(upper(trim(department_code)),''),description=nullif(trim(department_description),''),is_active=active,updated_at=now() where id=target_id returning * into r; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'DEPARTMENT_SAVED','department',r.id::text,to_jsonb(r));
 return r;
end $$;
grant execute on function public.admin_save_department(uuid,text,text,text,boolean) to authenticated;

create or replace function public.admin_set_department_member(target_department uuid, target_user uuid, manager boolean, enabled boolean default true)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('departments.manage') and not public.has_permission('users.manage') then raise exception 'Department membership permission required.'; end if;
 if enabled then insert into department_members(department_id,user_id,is_manager,created_by) values(target_department,target_user,manager,auth.uid()) on conflict(department_id,user_id) do update set is_manager=excluded.is_manager; else delete from department_members where department_id=target_department and user_id=target_user; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'DEPARTMENT_MEMBER_CHANGED','department_member',target_user::text,jsonb_build_object('department_id',target_department,'enabled',enabled,'manager',manager));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_department_member(uuid,uuid,boolean,boolean) to authenticated;
