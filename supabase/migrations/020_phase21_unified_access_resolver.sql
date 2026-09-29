-- Phase 21: Unified access resolver for the Vite admin UI. Non-destructive.
create or replace function public.admin_get_access_v2()
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare uid uuid:=auth.uid(); r jsonb;
begin
 if uid is null then return jsonb_build_object('authenticated',false,'permissions','[]'::jsonb,'modules','{}'::jsonb,'departments','[]'::jsonb); end if;
 select jsonb_build_object(
  'authenticated',true,
  'user_id',uid,
  'is_super_admin',exists(select 1 from profiles where id=uid and status='active' and role='super_admin'),
  'permissions',coalesce((select jsonb_agg(x.key order by x.key) from (select distinct p.key from permissions p where public.has_permission(p.key)) x),'[]'::jsonb),
  'modules',coalesce((select jsonb_object_agg(ms.module_key,public.has_module_access(ms.module_key)) from module_settings ms),'{}'::jsonb),
  'departments',coalesce((select jsonb_agg(jsonb_build_object('id',d.id,'name',d.name,'code',d.code,'is_manager',dm.is_manager) order by d.name) from department_members dm join departments d on d.id=dm.department_id where dm.user_id=uid and d.is_active=true),'[]'::jsonb),
  'role',coalesce((select role from profiles where id=uid),'')
 ) into r;
 return r;
end $$;
revoke all on function public.admin_get_access_v2() from public;
grant execute on function public.admin_get_access_v2() to authenticated;

create or replace function public.admin_set_module_status(target_module text, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('modules.manage') then raise exception 'Module management permission required.'; end if;
 update module_settings set is_enabled=enabled,updated_by=auth.uid(),updated_at=now() where module_key=target_module;
 if not found then raise exception 'Module not found.'; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'MODULE_STATUS_CHANGED','module',target_module,jsonb_build_object('enabled',enabled));
 return jsonb_build_object('success',true,'module',target_module,'enabled',enabled);
end $$;
grant execute on function public.admin_set_module_status(text,boolean) to authenticated;
