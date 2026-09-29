-- Phase 12: Media library metadata and safe management. Non-destructive.
alter table if exists public.media add column if not exists title text;
alter table if exists public.media add column if not exists alt_text text default '';
alter table if exists public.media add column if not exists caption text default '';
alter table if exists public.media add column if not exists focal_x numeric default 50;
alter table if exists public.media add column if not exists focal_y numeric default 50;
alter table if exists public.media add column if not exists is_archived boolean not null default false;
alter table if exists public.media add column if not exists updated_at timestamptz not null default now();
create index if not exists media_archived_idx on public.media(is_archived, created_at desc);

create or replace function public.media_touch_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
drop trigger if exists media_touch_updated_at on public.media;
create trigger media_touch_updated_at before update on public.media for each row execute function public.media_touch_updated_at();

-- Only authorized CMS users can archive/update media.
drop policy if exists "media_manage_update" on public.media;
create policy "media_manage_update" on public.media for update to authenticated
using (public.has_permission('media.manage')) with check (public.has_permission('media.manage'));
