-- Phase 11: Cloudinary foundation. Non-destructive.
alter table if exists public.media add column if not exists provider text not null default 'cloudinary';
alter table if exists public.media add column if not exists resource_type text default 'image';
alter table if exists public.media add column if not exists folder text default 'emunahh-invest';
alter table if exists public.media add column if not exists format text;
alter table if exists public.media add column if not exists width integer;
alter table if exists public.media add column if not exists height integer;
alter table if exists public.media add column if not exists bytes integer;
alter table if exists public.media add column if not exists public_id text;
alter table if exists public.media add column if not exists tags text[] default '{}';
alter table if exists public.media add column if not exists metadata jsonb not null default '{}'::jsonb;
create index if not exists media_provider_public_id_idx on public.media(provider, public_id);
create index if not exists media_folder_idx on public.media(folder);
create index if not exists media_tags_gin_idx on public.media using gin(tags);

insert into public.site_settings (id, company_name)
values (1, 'Emunahh-Invest Limited')
on conflict (id) do nothing;

alter table if exists public.site_settings add column if not exists cloudinary_cloud_name text;
alter table if exists public.site_settings add column if not exists cloudinary_upload_preset text;
alter table if exists public.site_settings add column if not exists cloudinary_folder text default 'emunahh-invest';
