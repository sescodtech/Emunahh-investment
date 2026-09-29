-- Phase 26: Platform operations, maintenance log and admin system controls. Non-destructive.
create table if not exists public.platform_operations_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  operation text not null,
  status text not null check(status in ('started','completed','failed')),
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists platform_operations_log_created_idx on public.platform_operations_log(created_at desc);
alter table public.platform_operations_log enable row level security;
drop policy if exists platform_operations_log_read on public.platform_operations_log;
create policy platform_operations_log_read on public.platform_operations_log for select to authenticated using(public.has_permission('security.view') or public.has_permission('database.view'));

create table if not exists public.admin_system_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
insert into public.admin_system_settings(key,value) values
('maintenance_mode','false'::jsonb),
('maintenance_message','"The website is temporarily under maintenance."'::jsonb),
('admin_session_refresh_seconds','300'::jsonb)
on conflict(key) do nothing;
alter table public.admin_system_settings enable row level security;
drop policy if exists admin_system_settings_read on public.admin_system_settings;
drop policy if exists admin_system_settings_manage on public.admin_system_settings;
create policy admin_system_settings_read on public.admin_system_settings for select to authenticated using(public.has_permission('security.view'));
create policy admin_system_settings_manage on public.admin_system_settings for all to authenticated using(public.has_permission('security.manage')) with check(public.has_permission('security.manage'));

create or replace function public.admin_get_platform_operations()
returns jsonb language sql stable security definer set search_path=public as $$
  select jsonb_build_object(
    'maintenance_mode',coalesce((select value from public.admin_system_settings where key='maintenance_mode'),'false'::jsonb),
    'maintenance_message',coalesce((select value from public.admin_system_settings where key='maintenance_message'),'null'::jsonb),
    'recent_operations',coalesce((select jsonb_agg(to_jsonb(x) order by x.created_at desc) from (select id,actor_id,operation,status,details,created_at from public.platform_operations_log order by created_at desc limit 25) x),'[]'::jsonb)
  )
$$;
grant execute on function public.admin_get_platform_operations() to authenticated;

create or replace function public.admin_set_system_setting(p_key text,p_value jsonb)
returns public.admin_system_settings language plpgsql security definer set search_path=public as $$
declare r public.admin_system_settings;
begin
  if not public.has_permission('security.manage') then raise exception 'Security management permission required.'; end if;
  if p_key not in ('maintenance_mode','maintenance_message','admin_session_refresh_seconds') then raise exception 'Unsupported system setting.'; end if;
  update public.admin_system_settings set value=p_value,updated_at=now(),updated_by=auth.uid() where key=p_key returning * into r;
  if r.key is null then raise exception 'System setting not found.'; end if;
  insert into public.platform_operations_log(actor_id,operation,status,details) values(auth.uid(),'SYSTEM_SETTING_UPDATED','completed',jsonb_build_object('key',p_key));
  insert into public.audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'SYSTEM_SETTING_UPDATED','system_setting',p_key,jsonb_build_object('value',p_value));
  return r;
end $$;

grant execute on function public.admin_set_system_setting(text,jsonb) to authenticated;
