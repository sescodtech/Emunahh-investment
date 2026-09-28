-- EMUNAHH-INVEST ADVANCED CMS / RBAC / CRM
-- Run after 001_initial_schema.sql and 002_admin_bootstrap.sql.
-- This migration is idempotent and does not delete existing public content.

create extension if not exists pgcrypto;

-- Expand roles without changing existing profile IDs.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('super_admin','admin','editor','staff'));

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  permission_key text not null unique,
  label text not null,
  description text,
  module_key text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  primary key (user_id, role_id)
);

create table if not exists public.user_departments (
  user_id uuid not null references auth.users(id) on delete cascade,
  department_id uuid not null references public.departments(id) on delete cascade,
  primary key (user_id, department_id)
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  module_key text not null unique,
  name text not null,
  description text,
  is_enabled boolean not null default true,
  is_system boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  is_published boolean not null default true,
  seo_title text,
  seo_description text,
  seo_image_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.cms_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  section_key text not null,
  section_type text not null default 'content',
  title text,
  content jsonb not null default '{}'::jsonb,
  is_visible boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  unique(page_id, section_key)
);

create table if not exists public.cms_navigation (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  parent_id uuid references public.cms_navigation(id) on delete cascade,
  is_visible boolean not null default true,
  display_order integer not null default 0,
  open_in_new_tab boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_global_settings (
  id integer primary key default 1 check (id = 1),
  header jsonb not null default '{}'::jsonb,
  footer jsonb not null default '{}'::jsonb,
  branding jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

-- Cloudinary is the binary media provider; Supabase stores the media catalogue.
alter table public.media add column if not exists provider text not null default 'supabase';
alter table public.media add column if not exists provider_public_id text;
alter table public.media add column if not exists folder text;
alter table public.media add column if not exists tags text[] not null default '{}';
alter table public.media add column if not exists updated_at timestamptz not null default now();

insert into public.departments(name, description) values
 ('Management','Executive and company-wide administration'),
 ('Operations','Applications, customer operations and service delivery'),
 ('Finance','Financial administration and reporting'),
 ('Marketing','Website, campaigns and communications'),
 ('Customer Service','Customer enquiries and follow-up')
on conflict (name) do nothing;

insert into public.roles(name, description, is_system) values
 ('super_admin','Full system access including users, roles, permissions and modules',true),
 ('admin','Administrative access to operational and CMS functions',true),
 ('editor','Website content and media management',true),
 ('staff','Operational access granted through permissions',true)
on conflict (name) do nothing;

insert into public.permissions(permission_key,label,description,module_key) values
 ('dashboard.view','View dashboard','View dashboard statistics and activity','dashboard'),
 ('cms.view','View CMS','View website content management','cms'),
 ('cms.edit','Edit CMS','Edit pages and sections','cms'),
 ('cms.publish','Publish CMS','Publish/unpublish website content','cms'),
 ('media.view','View media','Browse media library','media'),
 ('media.upload','Upload media','Upload images to Cloudinary','media'),
 ('media.delete','Delete media','Remove media catalogue records','media'),
 ('services.manage','Manage services','Create and edit services','services'),
 ('applications.view','View applications','View submitted applications','applications'),
 ('applications.manage','Manage applications','Update application statuses and assignments','applications'),
 ('messages.view','View messages','View general contact enquiries','messages'),
 ('messages.manage','Manage messages','Update message statuses','messages'),
 ('email.send','Send email','Send replies from admin portal','email'),
 ('users.view','View users','View administrative users','users'),
 ('users.manage','Manage users','Create/update/deactivate admin users','users'),
 ('roles.manage','Manage roles','Manage role permissions','roles'),
 ('departments.manage','Manage departments','Manage departments and assignments','departments'),
 ('modules.manage','Manage modules','Enable or disable optional modules','modules'),
 ('settings.manage','Manage settings','Manage global website settings','settings'),
 ('audit.view','View audit logs','Review administrative activity','audit')
on conflict (permission_key) do nothing;

insert into public.modules(module_key,name,description,is_system,display_order) values
 ('cms','Visual CMS','Pages, sections, navigation and SEO',true,1),
 ('media','Media Library','Cloudinary image management',true,2),
 ('services','Services','Public service catalogue',true,3),
 ('applications','Applications','Loan, investment and service applications',true,4),
 ('messages','Messages','Contact and general enquiries',true,5),
 ('email','Email','Customer email replies and logs',false,6),
 ('users','Users','Administrative users',true,7),
 ('roles','Roles & Permissions','RBAC management',true,8),
 ('departments','Departments','Staff department management',false,9),
 ('modules','Modules','Optional feature switches',true,10),
 ('settings','Settings','Company, branding and global settings',true,11),
 ('audit','Audit Log','Security and administrative activity',true,12)
on conflict (module_key) do nothing;

-- Grant permissions by system role.
insert into public.role_permissions(role_id, permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.name='super_admin'
on conflict do nothing;
insert into public.role_permissions(role_id, permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.name='admin' and p.permission_key not in ('roles.manage','modules.manage','users.manage')
on conflict do nothing;
insert into public.role_permissions(role_id, permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.permission_key in
 ('dashboard.view','cms.view','cms.edit','cms.publish','media.view','media.upload','media.delete','services.manage','settings.manage')
where r.name='editor'
on conflict do nothing;
insert into public.role_permissions(role_id, permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.permission_key in
 ('dashboard.view','applications.view','applications.manage','messages.view','messages.manage','media.view')
where r.name='staff'
on conflict do nothing;

-- Existing role values map to the new RBAC roles.
update public.profiles set role='super_admin'
where id = (select id from public.profiles where role='admin' order by created_at asc limit 1)
  and not exists (select 1 from public.profiles p2 where p2.role='super_admin');

insert into public.user_roles(user_id, role_id)
select p.id,r.id from public.profiles p join public.roles r on r.name=p.role
on conflict do nothing;

-- CMS page registry. Existing public components remain the visual fallback.
insert into public.cms_pages(slug,title,description,display_order) values
 ('home','Home','Main company landing page',1),
 ('about','About','Company profile and values',2),
 ('student-loans','Student Loans','Education financing page',3),
 ('investments','Investments','Investment services page',4),
 ('business-financing','Business Financing','Business financing page',5),
 ('personal-finance','Personal Finance','Personal finance page',6),
 ('other-services','Other Services','Other services page',7),
 ('blog','Blog','Company articles and insights',8),
 ('contact','Contact','Contact page',9),
 ('apply','Apply','Application page',10),
 ('terms','Terms','Terms of service',11),
 ('privacy','Privacy','Privacy policy',12)
on conflict (slug) do nothing;

insert into public.cms_global_settings(header,footer,branding,seo)
values (
 jsonb_build_object('showTopBar',true,'showApplyButton',true,'applyLabel','GET STARTED'),
 jsonb_build_object('statement','Emunahh-Invest Limited is an incorporated financial and investment company in the Federal Republic of Nigeria.'),
 jsonb_build_object('primaryColor','#0d0a64','accentColor','#e7020b','companyName','Emunahh-Invest Limited'),
 jsonb_build_object('title','Emunahh-Invest Limited','description','Financial solutions, education financing, investments and business financing in Nigeria.')
)
on conflict (id) do nothing;

-- Seed page sections from the existing content model. They are additive and do not replace the existing UI.
with pages as (select id,slug from public.cms_pages)
insert into public.cms_sections(page_id,section_key,section_type,title,content,display_order)
select p.id,'hero','hero','Hero',jsonb_build_object('eyebrow','EMUNAHH-INVEST LIMITED','heading','Financial Solutions Designed for Your Next Chapter.','highlightWord','Next Chapter.','description','Practical financial solutions designed to support students, individuals and businesses in achieving meaningful financial goals.','primaryCta','EXPLORE OUR SOLUTIONS','secondaryCta','GET STARTED'),1 from pages p where p.slug='home'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,section_type,title,content,display_order)
select p.id,'about','content','About',jsonb_build_object('title','CORPORATE HERITAGE & DISCIPLINE','headline','An Established Financial Institution Founded on Integrity and Accessibility'),2 from public.cms_pages p where p.slug='home'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,section_type,title,content,display_order)
select p.id,'contact','contact','Contact',jsonb_build_object('officeAddress','33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.','phone','+234 802 319 0807','email','contact@emunahhinvest.com'),3 from public.cms_pages p where p.slug='contact'
on conflict(page_id,section_key) do nothing;

-- Permission helpers.
create or replace function public.has_permission(permission_key_input text)
returns boolean language sql stable security definer set search_path=public as $$
  select exists (
    select 1 from public.user_roles ur
    join public.role_permissions rp on rp.role_id=ur.role_id
    join public.permissions p on p.id=rp.permission_id
    where ur.user_id=auth.uid() and p.permission_key=permission_key_input
  ) or exists (
    select 1 from public.profiles pr where pr.id=auth.uid() and pr.role='super_admin'
  );
$$;

create or replace function public.current_user_role()
returns text language sql stable security definer set search_path=public as $$
  select coalesce((select role from public.profiles where id=auth.uid()), 'staff');
$$;

create or replace function public.is_admin_or_editor()
returns boolean language sql stable security definer set search_path=public as $$
  select public.current_user_role() in ('super_admin','admin','editor');
$$;

-- RLS for all advanced tables.
alter table public.departments enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.user_roles enable row level security;
alter table public.user_departments enable row level security;
alter table public.modules enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.cms_navigation enable row level security;
alter table public.cms_global_settings enable row level security;

-- Public read-only CMS data.
drop policy if exists "public read published cms pages" on public.cms_pages;
create policy "public read published cms pages" on public.cms_pages for select using (is_published=true);
drop policy if exists "public read visible cms sections" on public.cms_sections;
create policy "public read visible cms sections" on public.cms_sections for select using (is_visible=true);
drop policy if exists "public read navigation" on public.cms_navigation;
create policy "public read navigation" on public.cms_navigation for select using (is_visible=true);
drop policy if exists "public read global cms" on public.cms_global_settings;
create policy "public read global cms" on public.cms_global_settings for select using (true);

-- Permission-driven admin access.
drop policy if exists "cms manage pages" on public.cms_pages;
create policy "cms manage pages" on public.cms_pages for all using (public.has_permission('cms.edit')) with check (public.has_permission('cms.edit'));
drop policy if exists "cms manage sections" on public.cms_sections;
create policy "cms manage sections" on public.cms_sections for all using (public.has_permission('cms.edit')) with check (public.has_permission('cms.edit'));
drop policy if exists "cms manage navigation" on public.cms_navigation;
create policy "cms manage navigation" on public.cms_navigation for all using (public.has_permission('cms.edit')) with check (public.has_permission('cms.edit'));
drop policy if exists "cms manage global" on public.cms_global_settings;
create policy "cms manage global" on public.cms_global_settings for all using (public.has_permission('settings.manage')) with check (public.has_permission('settings.manage'));
drop policy if exists "roles read" on public.roles;
create policy "roles read" on public.roles for select using (auth.uid() is not null);
drop policy if exists "permissions read" on public.permissions;
create policy "permissions read" on public.permissions for select using (auth.uid() is not null);
drop policy if exists "role permissions manage" on public.role_permissions;
create policy "role permissions manage" on public.role_permissions for all using (public.current_user_role() in ('super_admin','admin')) with check (public.current_user_role() in ('super_admin','admin'));
drop policy if exists "user roles read" on public.user_roles;
create policy "user roles read" on public.user_roles for select using (auth.uid()=user_id or public.current_user_role() in ('super_admin','admin'));
drop policy if exists "user roles manage" on public.user_roles;
create policy "user roles manage" on public.user_roles for all using (public.current_user_role() in ('super_admin','admin')) with check (public.current_user_role() in ('super_admin','admin'));
drop policy if exists "departments read" on public.departments;
create policy "departments read" on public.departments for select using (auth.uid() is not null);
drop policy if exists "departments manage" on public.departments;
create policy "departments manage" on public.departments for all using (public.current_user_role() in ('super_admin','admin')) with check (public.current_user_role() in ('super_admin','admin'));
drop policy if exists "user departments manage" on public.user_departments;
create policy "user departments manage" on public.user_departments for all using (public.current_user_role() in ('super_admin','admin')) with check (public.current_user_role() in ('super_admin','admin'));
drop policy if exists "modules manage" on public.modules;
create policy "modules manage" on public.modules for all using (public.current_user_role()='super_admin') with check (public.current_user_role()='super_admin');
drop policy if exists "modules read authenticated" on public.modules;
create policy "modules read authenticated" on public.modules for select using (auth.uid() is not null);

-- Allow editors/admins to manage media catalogue, preserving existing public-read policy.
drop policy if exists "media permission manage" on public.media;
create policy "media permission manage" on public.media for all using (public.has_permission('media.upload') or public.has_permission('media.delete')) with check (public.has_permission('media.upload'));

-- Audit helper.
create or replace function public.write_audit(action_input text, entity_type_input text, entity_id_input text, metadata_input jsonb default '{}'::jsonb)
returns void language plpgsql security definer set search_path=public as $$
begin
 insert into public.audit_logs(actor_id,action,entity_type,entity_id,metadata)
 values(auth.uid(),action_input,entity_type_input,entity_id_input,coalesce(metadata_input,'{}'::jsonb));
end;
$$;

-- Keep timestamps current.
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists trg_cms_pages_updated on public.cms_pages;
create trigger trg_cms_pages_updated before update on public.cms_pages for each row execute function public.touch_updated_at();
drop trigger if exists trg_cms_sections_updated on public.cms_sections;
create trigger trg_cms_sections_updated before update on public.cms_sections for each row execute function public.touch_updated_at();
drop trigger if exists trg_modules_updated on public.modules;
create trigger trg_modules_updated before update on public.modules for each row execute function public.touch_updated_at();
