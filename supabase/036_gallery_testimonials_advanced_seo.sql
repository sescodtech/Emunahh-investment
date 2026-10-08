-- EMUNAHH-INVEST — MIGRATION 036
-- Gallery + Testimonials + Advanced SEO
-- Run AFTER successful 001-035 state. Non-destructive.

begin;

create table if not exists public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text,
  alt_text text not null default '',
  image_url text not null,
  cloudinary_public_id text,
  category_id uuid references public.gallery_categories(id) on delete set null,
  is_featured boolean not null default false,
  show_on_homepage boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  display_order integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_role text,
  company text,
  service_label text,
  review text not null,
  rating smallint check (rating is null or rating between 1 and 5),
  image_url text,
  cloudinary_public_id text,
  consent_confirmed boolean not null default false,
  is_featured boolean not null default false,
  show_on_homepage boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  display_order integer not null default 0,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_items_public_idx on public.gallery_items(status, show_on_homepage, display_order);
create index if not exists gallery_items_category_idx on public.gallery_items(category_id, status, display_order);
create index if not exists testimonials_public_idx on public.testimonials(status, consent_confirmed, show_on_homepage, display_order);

create or replace function public.touch_phase11_content_updated_at()
returns trigger language plpgsql set search_path=public as $$
begin new.updated_at=now(); return new; end $$;

drop trigger if exists gallery_categories_touch on public.gallery_categories;
create trigger gallery_categories_touch before update on public.gallery_categories for each row execute function public.touch_phase11_content_updated_at();
drop trigger if exists gallery_items_touch on public.gallery_items;
create trigger gallery_items_touch before update on public.gallery_items for each row execute function public.touch_phase11_content_updated_at();
drop trigger if exists testimonials_touch on public.testimonials;
create trigger testimonials_touch before update on public.testimonials for each row execute function public.touch_phase11_content_updated_at();

alter table public.gallery_categories enable row level security;
alter table public.gallery_items enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "public read gallery categories" on public.gallery_categories;
create policy "public read gallery categories" on public.gallery_categories for select using (is_active=true);
drop policy if exists "manage gallery categories" on public.gallery_categories;
create policy "manage gallery categories" on public.gallery_categories for all to authenticated using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

drop policy if exists "public read gallery items" on public.gallery_items;
create policy "public read gallery items" on public.gallery_items for select using (status='published');
drop policy if exists "manage gallery items" on public.gallery_items;
create policy "manage gallery items" on public.gallery_items for all to authenticated using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (status='published' and consent_confirmed=true);
drop policy if exists "manage testimonials" on public.testimonials;
create policy "manage testimonials" on public.testimonials for all to authenticated using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

grant select on public.gallery_categories, public.gallery_items, public.testimonials to anon, authenticated;
grant insert, update, delete on public.gallery_categories, public.gallery_items, public.testimonials to authenticated;

insert into public.gallery_categories(slug,name,description,display_order)
values
 ('company','Company','Company and workplace moments.',1),
 ('events','Events','Selected events and professional engagements.',2),
 ('client-engagements','Client Engagements','Approved client-facing engagement imagery.',3),
 ('team','Team','Approved team and people imagery.',4),
 ('community','Community','Approved community and outreach activities.',5),
 ('other','Other','Other approved gallery content.',6)
on conflict(slug) do nothing;

alter table public.site_settings
  add column if not exists homepage_gallery_enabled boolean not null default true,
  add column if not exists homepage_testimonials_enabled boolean not null default true,
  add column if not exists google_site_verification text;

insert into public.cms_pages(slug,title,template,status,menu_label,show_in_header,show_in_footer,seo_title,seo_description,canonical_url,robots)
values
 ('gallery','Gallery','gallery','published','Gallery',false,true,'Gallery | Emunahh-Invest Limited','View selected Emunahh-Invest company activities, professional engagements and approved visual highlights.','https://emunahhinvest.com/gallery','index,follow'),
 ('testimonials','Client Testimonials','testimonials','published','Testimonials',false,true,'Client Testimonials | Emunahh-Invest Limited','Read approved client experiences shared about working with Emunahh-Invest Limited.','https://emunahhinvest.com/testimonials','index,follow')
on conflict(slug) do update set
  title=excluded.title,
  template=excluded.template,
  status='published',
  menu_label=excluded.menu_label,
  show_in_footer=true,
  seo_title=coalesce(public.cms_pages.seo_title,excluded.seo_title),
  seo_description=coalesce(public.cms_pages.seo_description,excluded.seo_description),
  canonical_url=coalesce(public.cms_pages.canonical_url,excluded.canonical_url),
  robots=coalesce(public.cms_pages.robots,'index,follow');

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'hero','Gallery hero','hero',jsonb_build_object(
 'eyebrow','GALLERY',
 'heading','A closer look at our engagements and activities.',
 'description','Selected moments from our professional engagements, company activities and client-facing work.'
),true,1,'navy' from public.cms_pages where slug='gallery'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'hero','Testimonials hero','hero',jsonb_build_object(
 'eyebrow','CLIENT EXPERIENCES',
 'heading','What clients say about working with us.',
 'description','Published testimonials are shared with client approval and reflect individual experiences.'
),true,1,'white' from public.cms_pages where slug='testimonials'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'gallery','Homepage Gallery','features',jsonb_build_object(
 'eyebrow','INSIDE EMUNAHH-INVEST',
 'heading','A closer look at our engagements and activities.',
 'description','Selected moments from our professional engagements and company activities.'
),true,9,'white' from public.cms_pages where slug='home'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'testimonials','Homepage Testimonials','features',jsonb_build_object(
 'eyebrow','CLIENT EXPERIENCES',
 'heading','What clients say about working with us.',
 'description','Approved experiences shared by clients who have worked with Emunahh-Invest.'
),true,10,'soft' from public.cms_pages where slug='home'
on conflict(page_id,section_key) do nothing;

commit;

select '036 gallery tables' as check_item,
       case when to_regclass('public.gallery_items') is not null and to_regclass('public.gallery_categories') is not null then 'PASS' else 'FAIL' end as status
union all
select '036 testimonials table',
       case when to_regclass('public.testimonials') is not null then 'PASS' else 'FAIL' end
union all
select '036 public pages',
       case when (select count(*) from public.cms_pages where slug in ('gallery','testimonials') and status='published')=2 then 'PASS' else 'FAIL' end
union all
select '036 SEO/Search Console settings',
       case when exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='google_site_verification') then 'PASS' else 'FAIL' end;
