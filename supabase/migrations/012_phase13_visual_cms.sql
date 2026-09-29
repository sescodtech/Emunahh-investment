-- Phase 13: Visual CMS block registry. Non-destructive.
alter table if exists public.cms_sections add column if not exists content_type text not null default 'json';
alter table if exists public.cms_sections add column if not exists component_key text;
alter table if exists public.cms_sections add column if not exists preview_image_url text;
alter table if exists public.cms_sections add column if not exists updated_at timestamptz not null default now();
create index if not exists cms_sections_component_key_idx on public.cms_sections(component_key);

create or replace function public.cms_sections_touch_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;

drop trigger if exists cms_sections_touch_updated_at on public.cms_sections;
create trigger cms_sections_touch_updated_at before update on public.cms_sections for each row execute function public.cms_sections_touch_updated_at();

-- Seed missing editable blocks from the current site_content without replacing existing rows.
insert into public.cms_pages (slug,title,status) values
('home','Home','published'),('about','About','published'),('services','Services','published'),('resources','Resources','published'),('contact','Contact','published')
on conflict (slug) do nothing;
