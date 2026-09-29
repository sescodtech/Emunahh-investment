-- Phase 25: Database operations and health telemetry. Non-destructive.
create table if not exists public.admin_database_health_snapshots (
  id uuid primary key default gen_random_uuid(),
  captured_by uuid references auth.users(id) on delete set null,
  table_counts jsonb not null default '{}'::jsonb,
  captured_at timestamptz not null default now()
);
create index if not exists admin_database_health_snapshots_time_idx on public.admin_database_health_snapshots(captured_at desc);
alter table public.admin_database_health_snapshots enable row level security;
drop policy if exists admin_database_health_snapshots_read on public.admin_database_health_snapshots;
create policy admin_database_health_snapshots_read on public.admin_database_health_snapshots for select to authenticated using(public.has_permission('database.view'));

insert into public.permissions(key,name,description) values
('database.view','View Database Health','View operational database health and record counts'),
('database.manage','Manage Database Operations','Run approved database maintenance operations')
on conflict(key) do nothing;

create or replace function public.admin_get_database_health()
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb; counts jsonb:='{}'::jsonb; t text; n bigint;
  known_tables text[]:=array['profiles','roles','user_roles','permissions','role_permissions','departments','department_members','module_settings','role_module_access','module_entitlements','admin_invitations','admin_auth_events','security_events','audit_logs'];
begin
  if not public.has_permission('database.view') then raise exception 'Database view permission required.'; end if;
  foreach t in array known_tables loop
    if to_regclass('public.'||t) is not null then
      execute format('select count(*) from public.%I',t) into n;
      counts:=counts || jsonb_build_object(t,n);
    end if;
  end loop;
  insert into public.admin_database_health_snapshots(captured_by,table_counts) values(auth.uid(),counts);
  select jsonb_build_object(
    'captured_at',now(),
    'table_counts',counts,
    'rls_tables',coalesce((select jsonb_agg(tablename order by tablename) from pg_tables where schemaname='public' and rowsecurity=true),'[]'::jsonb),
    'latest_snapshot',(select to_jsonb(s) from public.admin_database_health_snapshots s order by captured_at desc limit 1)
  ) into r;
  return r;
end $$;

grant execute on function public.admin_get_database_health() to authenticated;
