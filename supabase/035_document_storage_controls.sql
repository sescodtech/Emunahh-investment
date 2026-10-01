-- ============================================================
-- EMUNAHH-INVEST — MIGRATION 035
-- Secure application-document storage controls
-- Run after 034_phase8_9_admin_seo_professionalisation.sql.
-- Non-destructive. Does not move/delete existing application documents.
-- ============================================================

begin;

alter table public.site_settings
  add column if not exists document_uploads_enabled boolean not null default false,
  add column if not exists document_storage_provider text not null default 'disabled',
  add column if not exists document_test_mode boolean not null default true,
  add column if not exists document_max_size_mb integer not null default 10,
  add column if not exists document_allowed_extensions text not null default 'pdf,jpg,jpeg,png,webp',
  add column if not exists document_cloudinary_folder text not null default 'emunahh-invest/applications',
  add column if not exists document_google_drive_folder_id text;

alter table public.site_settings drop constraint if exists site_settings_document_storage_provider_check;
alter table public.site_settings
  add constraint site_settings_document_storage_provider_check
  check (document_storage_provider in ('disabled','cloudinary','google_drive'));

alter table public.site_settings drop constraint if exists site_settings_document_max_size_check;
alter table public.site_settings
  add constraint site_settings_document_max_size_check
  check (document_max_size_mb between 1 and 25);

alter table public.application_documents
  add column if not exists provider text not null default 'legacy',
  add column if not exists provider_file_id text,
  add column if not exists provider_asset_id text,
  add column if not exists resource_type text,
  add column if not exists format text,
  add column if not exists storage_status text not null default 'stored',
  add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.application_documents drop constraint if exists application_documents_provider_check;
alter table public.application_documents
  add constraint application_documents_provider_check
  check (provider in ('legacy','test','cloudinary','google_drive'));

alter table public.application_documents drop constraint if exists application_documents_storage_status_check;
alter table public.application_documents
  add constraint application_documents_storage_status_check
  check (storage_status in ('stored','test','failed'));

create index if not exists application_documents_provider_idx
  on public.application_documents(provider, created_at desc);

create index if not exists application_documents_type_idx
  on public.application_documents(application_id, document_type, created_at desc);

create or replace function public.get_public_document_upload_config()
returns jsonb
language sql
stable
security definer
set search_path=public
as $$
  select jsonb_build_object(
    'enabled', coalesce(document_uploads_enabled,false) and document_storage_provider <> 'disabled',
    'test_mode', coalesce(document_test_mode,true),
    'max_size_mb', greatest(1,least(coalesce(document_max_size_mb,10),25)),
    'allowed_extensions', coalesce(document_allowed_extensions,'pdf,jpg,jpeg,png,webp')
  )
  from public.site_settings
  where id=1
$$;

grant execute on function public.get_public_document_upload_config() to anon, authenticated;

-- Ensure a sensible safe default on existing installations.
update public.site_settings
set document_storage_provider = coalesce(nullif(document_storage_provider,''),'disabled'),
    document_test_mode = coalesce(document_test_mode,true),
    document_max_size_mb = greatest(1,least(coalesce(document_max_size_mb,10),25)),
    document_allowed_extensions = coalesce(nullif(document_allowed_extensions,''),'pdf,jpg,jpeg,png,webp'),
    document_cloudinary_folder = coalesce(nullif(document_cloudinary_folder,''),'emunahh-invest/applications')
where id=1;

commit;

select '035 document settings columns' as check_item,
       case when exists (
         select 1 from information_schema.columns
         where table_schema='public' and table_name='site_settings' and column_name='document_storage_provider'
       ) then 'PASS' else 'FAIL' end as status
union all
select '035 application document provider metadata',
       case when exists (
         select 1 from information_schema.columns
         where table_schema='public' and table_name='application_documents' and column_name='provider_file_id'
       ) then 'PASS' else 'FAIL' end
union all
select '035 public upload config RPC',
       case when to_regprocedure('public.get_public_document_upload_config()') is not null then 'PASS' else 'FAIL' end;
