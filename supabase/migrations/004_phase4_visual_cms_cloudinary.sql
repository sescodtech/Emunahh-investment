-- Emunahh-Invest Phase 4: Visual CMS + Cloudinary media foundation
-- NON-DESTRUCTIVE. Run after the existing CMS/RBAC migrations.

alter table public.media add column if not exists provider text not null default 'supabase';
alter table public.media add column if not exists provider_asset_id text;
alter table public.media add column if not exists folder text;
alter table public.media add column if not exists alt_text text;
alter table public.media add column if not exists width integer;
alter table public.media add column if not exists height integer;
alter table public.media add column if not exists format text;

create index if not exists media_provider_asset_idx on public.media(provider, provider_asset_id);

-- Keep the existing live content row intact. This only creates it if it does not exist.
insert into public.site_content(id,content)
values (1,'{}'::jsonb)
on conflict (id) do nothing;

-- Register the existing public routes in the flexible CMS registry.
insert into public.cms_pages(slug,title,template,status)
values
 ('home','Home','home','published'),
 ('about','About','standard','published'),
 ('services','Services','services','published'),
 ('blog','Resources','blog','published'),
 ('contact','Contact','contact','published'),
 ('apply','Apply','application','published'),
 ('terms','Terms of Service','legal','published'),
 ('privacy','Privacy Policy','legal','published')
on conflict(slug) do nothing;

-- Register section slots. Content continues to live in the existing site_content JSON until
-- each React section is migrated to cms_sections. This makes the admin registry ready without
-- replacing the current public website.
insert into public.cms_sections(page_id,section_key,label,content,is_enabled,display_order)
select p.id,v.section_key,v.label,'{}'::jsonb,true,v.display_order
from public.cms_pages p
join (values
 ('home','hero','Hero',1),
 ('home','services','Services',2),
 ('home','education-financing','Education Financing',3),
 ('home','investment','Investment',4),
 ('home','about','About',5),
 ('home','contact','Contact',6),
 ('home','cta','Final CTA',7),
 ('about','profile','Company Profile',1),
 ('about','mission-vision','Mission & Vision',2),
 ('about','values','Core Values',3),
 ('services','service-list','Services List',1),
 ('blog','posts','Resources / Blog',1),
 ('contact','contact-details','Contact Details',1),
 ('contact','contact-form','Contact Form',2),
 ('apply','application-form','Application Form',1),
 ('terms','legal-content','Terms Content',1),
 ('privacy','legal-content','Privacy Content',1)
) as v(slug,section_key,label,display_order) on v.slug=p.slug
on conflict(page_id,section_key) do nothing;

-- Media is managed by authenticated staff with media.manage permission.
drop policy if exists "media management" on public.media;
create policy "media management" on public.media for all
using (public.has_permission('media.manage'))
with check (public.has_permission('media.manage'));

-- Public media can be read because the URL itself is intended for the public website.
drop policy if exists "public media read" on public.media;
create policy "public media read" on public.media for select using (true);
