-- EMUNAHH-INVEST CUMULATIVE FINAL SQL
-- Generated from the preserved phase migration files.
-- Execute each section from top to bottom. Do not skip a migration.




==============================================================================
-- FILE: 001_initial_schema.sql
==============================================================================

-- Emunahh-Invest production foundation
-- Run this migration in Supabase SQL Editor before enabling production CMS/CRM storage.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff' check (role in ('admin','editor','staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  company_name text not null,
  company_email text not null,
  notification_email text,
  phone text,
  secondary_phone text,
  whatsapp text,
  office_address text,
  email_sender_name text,
  reply_to_email text,
  website_url text,
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id integer primary key default 1 check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null default 'supporting' check (category in ('featured','supporting')),
  tagline text,
  description text,
  bullets jsonb not null default '[]'::jsonb,
  image_url text,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  application_type text not null check (application_type in ('student_financing','investment','business_financing','personal_finance','general_enquiry')),
  full_name text not null,
  email text,
  phone text not null,
  amount text,
  service_id uuid references public.services(id) on delete set null,
  institution_or_business text,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'NEW' check (status in ('NEW','REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED')),
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.application_activity (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null unique,
  public_url text not null,
  title text,
  alt_text text,
  category text not null default 'general' check (category in ('hero','service','about','general','logo')),
  mime_type text,
  file_size bigint,
  width integer,
  height integer,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_logs (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete set null,
  recipient text not null,
  subject text not null,
  status text not null check (status in ('QUEUED','SENT','DELIVERED','FAILED')),
  provider_id text,
  sent_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_type_idx on public.applications(application_type);
create index if not exists applications_created_at_idx on public.applications(created_at desc);
create index if not exists media_category_idx on public.media(category);

-- Role helper. The profiles table remains the source of truth for dashboard permissions.
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'staff');
$$;

create or replace function public.is_admin_or_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in ('admin','editor');
$$;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_content enable row level security;
alter table public.services enable row level security;
alter table public.applications enable row level security;
alter table public.application_notes enable row level security;
alter table public.application_activity enable row level security;
alter table public.media enable row level security;
alter table public.faqs enable row level security;
alter table public.email_logs enable row level security;
alter table public.audit_logs enable row level security;

-- Public website can read published content/services and create applications.
create policy "public read site content" on public.site_content for select using (true);
create policy "public read site settings" on public.site_settings for select using (true);
create policy "public read published services" on public.services for select using (is_published = true);
create policy "public read published faqs" on public.faqs for select using (is_published = true);
create policy "public create applications" on public.applications for insert with check (true);

-- Authenticated management access.
create policy "staff read own profile" on public.profiles for select using (auth.uid() = id or public.current_user_role() = 'admin');
create policy "admin editor manage site content" on public.site_content for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "admin editor manage settings" on public.site_settings for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "admin editor manage services" on public.services for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff read applications" on public.applications for select using (auth.uid() is not null);
create policy "staff update applications" on public.applications for update using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin editor manage media" on public.media for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "admin editor manage faqs" on public.faqs for all using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());
create policy "staff read notes" on public.application_notes for select using (auth.uid() is not null);
create policy "staff create notes" on public.application_notes for insert with check (auth.uid() is not null);
create policy "staff read activity" on public.application_activity for select using (auth.uid() is not null);
create policy "staff create activity" on public.application_activity for insert with check (auth.uid() is not null);
create policy "staff read email logs" on public.email_logs for select using (auth.uid() is not null);
create policy "staff create email logs" on public.email_logs for insert with check (auth.uid() is not null);
create policy "admin read audit logs" on public.audit_logs for select using (public.current_user_role() = 'admin');
create policy "authenticated create audit logs" on public.audit_logs for insert with check (auth.uid() is not null);

-- Storage bucket for managed website media. Files are publicly readable; uploads/deletes remain admin/editor-only.
insert into storage.buckets (id, name, public)
values ('emunahh-media', 'emunahh-media', true)
on conflict (id) do update set public = true;

create policy "public read Emunahh media" on storage.objects for select using (bucket_id = 'emunahh-media');
create policy "admin editor upload Emunahh media" on storage.objects for insert with check (bucket_id = 'emunahh-media' and public.is_admin_or_editor());
create policy "admin editor update Emunahh media" on storage.objects for update using (bucket_id = 'emunahh-media' and public.is_admin_or_editor());
create policy "admin editor delete Emunahh media" on storage.objects for delete using (bucket_id = 'emunahh-media' and public.is_admin_or_editor());




==============================================================================
-- FILE: 002_admin_bootstrap.sql
==============================================================================

-- Emunahh-Invest administrator role foundation.
-- This does NOT create a password or bypass Supabase Auth.
-- The administrator must first exist in auth.users.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff' check (role in ('admin','editor','staff')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- The existing profile RLS from the base migration allows a user to read their own row.
-- Server-side admin checks use the Supabase secret key and therefore do not depend on
-- exposing elevated access to the browser.

-- Safe helper for the one-time admin bootstrap. It only promotes an existing
-- Auth user and can only be executed by the database owner/service role.
create or replace function public.bootstrap_admin(target_email text)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_id uuid;
begin
  select id into target_id
  from auth.users
  where lower(email) = lower(target_email)
  limit 1;

  if target_id is null then
    raise exception 'No Supabase Auth user exists for this email. Create the user in Authentication > Users first.';
  end if;

  insert into public.profiles (id, role)
  values (target_id, 'admin')
  on conflict (id) do update set role = 'admin', updated_at = now();

  return target_id;
end;
$$;




==============================================================================
-- FILE: 003_cms_rbac_v2.sql
==============================================================================

-- EMUNAHH-INVEST CMS/CRM V2
-- Run AFTER 001_initial_schema.sql and 002_admin_bootstrap.sql.
-- Safe to run once. It expands the existing role model and adds the production CMS/CRM layer.

create extension if not exists pgcrypto;

-- 1) Departments / RBAC
create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null unique,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  module text not null,
  action text not null,
  label text not null,
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

alter table public.profiles add column if not exists status text not null default 'active';
alter table public.profiles add column if not exists department_id uuid references public.departments(id) on delete set null;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists last_seen_at timestamptz;
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('super_admin','admin','editor','staff'));

insert into public.roles(key,name,description,is_system) values
('super_admin','Super Admin','Full unrestricted control, including roles, permissions, settings and audit logs.',true),
('admin','Administrator','Operational administration without role/permission governance.',true),
('editor','Content Editor','Website content, media, services, FAQs and publishing.',true),
('staff','Staff','Operational access to assigned applications and enquiries.',true)
on conflict(key) do update set name=excluded.name,description=excluded.description;

insert into public.permissions(key,module,action,label) values
('dashboard.view','dashboard','view','View dashboard'),
('applications.view','applications','view','View applications'),
('applications.update','applications','update','Update applications'),
('applications.assign','applications','assign','Assign applications'),
('applications.email','applications','email','Send application emails'),
('applications.delete','applications','delete','Delete applications'),
('content.view','content','view','View CMS'),
('content.update','content','update','Edit and publish content'),
('services.manage','services','manage','Manage services'),
('faqs.manage','faqs','manage','Manage FAQs'),
('media.manage','media','manage','Upload and manage media'),
('users.view','users','view','View users'),
('users.manage','users','manage','Create, disable and assign users'),
('roles.manage','roles','manage','Create departments, roles and permissions'),
('settings.manage','settings','manage','Manage global settings'),
('emails.view','emails','view','View email logs'),
('audit.view','audit','view','View audit logs')
on conflict(key) do nothing;

-- Grant all permissions to system super_admin.
insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r cross join public.permissions p
where r.key='super_admin'
on conflict do nothing;

-- Seed useful permissions for admin/editor/staff.
insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.key in
('dashboard.view','applications.view','applications.update','applications.assign','applications.email',
 'content.view','content.update','services.manage','faqs.manage','media.manage','emails.view')
where r.key='admin' on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.key in
('dashboard.view','content.view','content.update','services.manage','faqs.manage','media.manage')
where r.key='editor' on conflict do nothing;

insert into public.role_permissions(role_id,permission_id)
select r.id,p.id from public.roles r join public.permissions p on p.key in
('dashboard.view','applications.view','applications.update','applications.email')
where r.key='staff' on conflict do nothing;

-- Existing legacy admins become Super Admins so the current owner does not get locked out.
update public.profiles set role='super_admin', updated_at=now() where role='admin';

insert into public.user_roles(user_id,role_id)
select p.id,r.id from public.profiles p join public.roles r on r.key=p.role
on conflict do nothing;

-- 2) Flexible page/section CMS. The existing site_content table remains compatible.
create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  template text not null default 'standard',
  status text not null default 'published' check (status in ('draft','published','archived')),
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.cms_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  section_key text not null,
  label text not null,
  content jsonb not null default '{}'::jsonb,
  is_enabled boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  unique(page_id,section_key)
);

-- 3) Contact inbox and reusable notification records
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  name text not null,
  email text,
  phone text not null,
  service text,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW','READ','CONTACTED','CLOSED','SPAM')),
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text,
  type text not null default 'info',
  entity_type text,
  entity_id text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists cms_sections_page_order_idx on public.cms_sections(page_id,display_order);
create index if not exists contact_messages_status_idx on public.contact_messages(status);
create index if not exists contact_messages_created_idx on public.contact_messages(created_at desc);
create index if not exists user_roles_user_idx on public.user_roles(user_id);

-- 4) Permission helper. SECURITY DEFINER prevents policy recursion.
create or replace function public.has_permission(permission_key text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles pr
    where pr.id=auth.uid() and pr.status='active' and pr.role='super_admin'
  )
  or exists (
    select 1
    from public.user_roles ur
    join public.roles r on r.id=ur.role_id
    join public.role_permissions rp on rp.role_id=r.id
    join public.permissions p on p.id=rp.permission_id
    join public.profiles pr on pr.id=ur.user_id
    where ur.user_id=auth.uid()
      and pr.status='active'
      and p.key=permission_key
  );
$$;

create or replace function public.current_profile()
returns jsonb
language sql stable security definer set search_path=public
as $$
 select coalesce((select jsonb_build_object('id',p.id,'full_name',p.full_name,'role',p.role,'status',p.status,'department_id',p.department_id) from public.profiles p where p.id=auth.uid()),'{}'::jsonb);
$$;

-- 5) Updated timestamps.
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;

drop trigger if exists cms_pages_updated_at on public.cms_pages;
create trigger cms_pages_updated_at before update on public.cms_pages for each row execute function public.set_updated_at();
drop trigger if exists cms_sections_updated_at on public.cms_sections;
create trigger cms_sections_updated_at before update on public.cms_sections for each row execute function public.set_updated_at();
drop trigger if exists contact_messages_updated_at on public.contact_messages;
create trigger contact_messages_updated_at before update on public.contact_messages for each row execute function public.set_updated_at();
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

-- 6) RLS: remove old broad management policies that allowed any authenticated staff to edit.
do $$
declare p record;
begin
  for p in select policyname,tablename from pg_policies where schemaname='public' and tablename in
  ('site_content','site_settings','services','applications','application_notes','application_activity','media','faqs','email_logs','audit_logs','profiles')
  loop
    execute format('drop policy if exists %I on public.%I',p.policyname,p.tablename);
  end loop;
end $$;

alter table public.departments enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.user_roles enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.contact_messages enable row level security;
alter table public.notifications enable row level security;

-- Public read only for published CMS.
create policy "public cms pages" on public.cms_pages for select using (status='published');
create policy "public cms sections" on public.cms_sections for select using (
  is_enabled=true and exists(select 1 from public.cms_pages p where p.id=page_id and p.status='published')
);
create policy "public create contact messages" on public.contact_messages for insert with check (true);
create policy "public read site content" on public.site_content for select using (true);
create policy "public read site settings" on public.site_settings for select using (true);
create policy "public read published services" on public.services for select using (is_published=true);
create policy "public read published faqs" on public.faqs for select using (is_published=true);
create policy "public create applications" on public.applications for insert with check (true);

-- Staff operations.
create policy "profile self read" on public.profiles for select using (auth.uid()=id or public.has_permission('users.view'));
create policy "site content view" on public.site_content for select using (public.has_permission('content.view'));
create policy "site content update" on public.site_content for update using (public.has_permission('content.update')) with check (public.has_permission('content.update'));
create policy "settings view" on public.site_settings for select using (auth.uid() is not null);
create policy "settings manage" on public.site_settings for all using (public.has_permission('settings.manage')) with check (public.has_permission('settings.manage'));
create policy "services manage" on public.services for all using (public.has_permission('services.manage')) with check (public.has_permission('services.manage'));
create policy "faqs manage" on public.faqs for all using (public.has_permission('faqs.manage')) with check (public.has_permission('faqs.manage'));

create policy "applications view" on public.applications for select using (public.has_permission('applications.view'));
create policy "applications update" on public.applications for update using (public.has_permission('applications.update')) with check (public.has_permission('applications.update'));
create policy "application notes view" on public.application_notes for select using (public.has_permission('applications.view'));
create policy "application notes create" on public.application_notes for insert with check (public.has_permission('applications.update'));
create policy "application activity view" on public.application_activity for select using (public.has_permission('applications.view'));
create policy "application activity create" on public.application_activity for insert with check (auth.uid() is not null);
create policy "media manage" on public.media for all using (public.has_permission('media.manage')) with check (public.has_permission('media.manage'));
create policy "emails view" on public.email_logs for select using (public.has_permission('emails.view'));
create policy "audit view" on public.audit_logs for select using (public.has_permission('audit.view'));
create policy "audit create" on public.audit_logs for insert with check (auth.uid() is not null);
create policy "contact view" on public.contact_messages for select using (public.has_permission('applications.view'));
create policy "contact update" on public.contact_messages for update using (public.has_permission('applications.update')) with check (public.has_permission('applications.update'));

create policy "cms pages manage" on public.cms_pages for all using (public.has_permission('content.update')) with check (public.has_permission('content.update'));
create policy "cms sections manage" on public.cms_sections for all using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

create policy "notifications own" on public.notifications for select using (user_id=auth.uid());
create policy "notifications own update" on public.notifications for update using (user_id=auth.uid()) with check (user_id=auth.uid());

create policy "departments view" on public.departments for select using (auth.uid() is not null);
create policy "departments manage" on public.departments for all using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy "roles view" on public.roles for select using (auth.uid() is not null);
create policy "roles manage" on public.roles for all using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy "permissions view" on public.permissions for select using (auth.uid() is not null);
create policy "role permissions view" on public.role_permissions for select using (auth.uid() is not null);
create policy "role permissions manage" on public.role_permissions for all using (public.has_permission('roles.manage')) with check (public.has_permission('roles.manage'));
create policy "user roles view" on public.user_roles for select using (auth.uid()=user_id or public.has_permission('users.view'));
create policy "user roles manage" on public.user_roles for all using (public.has_permission('users.manage')) with check (public.has_permission('users.manage'));

-- Storage policies for the existing emunahh-media bucket.
drop policy if exists "admin editor upload Emunahh media" on storage.objects;
drop policy if exists "admin editor update Emunahh media" on storage.objects;
drop policy if exists "admin editor delete Emunahh media" on storage.objects;
create policy "cms media upload" on storage.objects for insert with check(bucket_id='emunahh-media' and public.has_permission('media.manage'));
create policy "cms media update" on storage.objects for update using(bucket_id='emunahh-media' and public.has_permission('media.manage'));
create policy "cms media delete" on storage.objects for delete using(bucket_id='emunahh-media' and public.has_permission('media.manage'));

-- Helper to generate collision-resistant public references.
create or replace function public.new_reference(prefix text)
returns text language plpgsql as $$
declare candidate text;
begin
 loop
   candidate := upper(prefix)||'-'||to_char(now(),'YYMMDD')||'-'||lpad(floor(random()*1000000)::text,6,'0');
   if not exists(select 1 from public.applications where reference=candidate)
      and not exists(select 1 from public.contact_messages where reference=candidate) then return candidate; end if;
 end loop;
end $$;

-- Audit trigger for sensitive application changes.
create or replace function public.audit_application_change() returns trigger
language plpgsql security definer set search_path=public
as $$
begin
 if tg_op='UPDATE' and (old.status is distinct from new.status or old.assigned_to is distinct from new.assigned_to) then
   insert into public.application_activity(application_id,actor_id,action,metadata)
   values(new.id,auth.uid(),'APPLICATION_UPDATED',
          jsonb_build_object('old_status',old.status,'new_status',new.status,'old_assigned_to',old.assigned_to,'new_assigned_to',new.assigned_to));
 end if;
 return new;
end $$;
drop trigger if exists applications_audit_trigger on public.applications;
create trigger applications_audit_trigger after update on public.applications for each row execute function public.audit_application_change();

-- Default departments.
insert into public.departments(name,description) values
('Management','Executive and administrative management'),
('Operations','Application processing and customer operations'),
('Finance','Finance and investment operations'),
('Customer Relations','Customer enquiries and follow-up'),
('Content & Marketing','Website, content and communications')
on conflict(name) do nothing;

-- Public-safe application tracking: exposes only reference/status/timestamp.
create or replace function public.track_application(lookup_reference text)
returns jsonb
language sql stable security definer set search_path=public
as $$
  select case when a.id is null then null else jsonb_build_object(
    'reference',a.reference,'status',a.status,'created_at',a.created_at,'updated_at',a.updated_at,
    'application_type',a.application_type
  ) end
  from public.applications a
  where upper(a.reference)=upper(trim(lookup_reference))
  limit 1;
$$;
revoke all on function public.track_application(text) from public;
grant execute on function public.track_application(text) to anon, authenticated;

-- 7) Seed all current public routes into the CMS registry.
insert into public.cms_pages(slug,title,template,status) values
('home','Home','home','published'),('about','About Emunahh-Invest','standard','published'),
('student-loans','Student Loans','service','published'),('investments','Investments','service','published'),
('business-financing','Business Financing','service','published'),('personal-finance','Personal Finance','service','published'),
('other-services','Other Services','service','published'),('blog','Insights & Updates','blog','published'),
('contact','Contact & Headquarters','contact','published'),('apply','Application Portal','application','published'),
('privacy','Privacy Policy','legal','published'),('terms','Terms of Service','legal','published')
on conflict(slug) do nothing;

-- Home sections mirror the current production content and give the CMS a structured starting point.
insert into public.cms_sections(page_id,section_key,label,content,display_order)
select id,'hero','Hero Section',jsonb_build_object(
 'eyebrow','EMUNAHH-INVEST LIMITED','heading','Financial Solutions Designed for Your Next Chapter.',
 'highlightWord','Next Chapter.','description','Practical financial solutions designed to support students, individuals and businesses in achieving meaningful financial goals.',
 'primaryCta','EXPLORE OUR SOLUTIONS','secondaryCta','GET STARTED'),1 from public.cms_pages where slug='home'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,label,content,display_order)
select id,'about','About Section',jsonb_build_object(
 'title','CORPORATE HERITAGE & DISCIPLINE','headline','An Established Financial Institution Founded on Integrity and Accessibility',
 'intro','Emunahh-Invest Limited is a registered Nigerian financial and investment company headquartered in Lagos.',
 'mission','To deliver transparent, dependable education financing and disciplined wealth solutions.',
 'vision','To be recognized across Nigeria as a trusted private finance house.'),2 from public.cms_pages where slug='home'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,label,content,display_order)
select id,'solutions','Solutions Section',jsonb_build_object('heading','Financial Solutions Built Around Real Goals','description','Explore investment, student financing, business financing and personal financial solutions.'),3 from public.cms_pages where slug='home'
on conflict(page_id,section_key) do nothing;

insert into public.cms_sections(page_id,section_key,label,content,display_order)
select id,'cta','Final CTA',jsonb_build_object('heading','Let us discuss your next financial step.','buttonText','Get Started'),4 from public.cms_pages where slug='home'
on conflict(page_id,section_key) do nothing;

-- Seed useful sections for each inner page so every route has a CMS record from day one.
insert into public.cms_sections(page_id,section_key,label,content,display_order)
select p.id,'hero','Page Header',jsonb_build_object('heading',p.title,'description','Manage this page introduction, imagery, calls to action and SEO from the CMS.'),1
from public.cms_pages p where p.slug<>'home'
on conflict(page_id,section_key) do nothing;




==============================================================================
-- FILE: 004_phase4_visual_cms_cloudinary.sql
==============================================================================

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




==============================================================================
-- FILE: 005_phase5_applications_inbox_notifications.sql
==============================================================================

-- EMUNAHH-INVEST Phase 5: Applications, Contact Inbox, Notifications & Email workflow
-- NON-DESTRUCTIVE. Run after the existing 001/002/003/004 migrations.

alter table public.applications add column if not exists notification_sent_at timestamptz;
alter table public.applications add column if not exists decision_reason text;
alter table public.applications add column if not exists reviewed_at timestamptz;
alter table public.applications add column if not exists reviewed_by uuid references auth.users(id) on delete set null;
alter table public.applications add column if not exists decision_at timestamptz;
alter table public.applications add column if not exists decision_by uuid references auth.users(id) on delete set null;

alter table public.contact_messages add column if not exists notification_sent_at timestamptz;
alter table public.contact_messages add column if not exists assigned_to uuid references auth.users(id) on delete set null;
alter table public.contact_messages add column if not exists internal_notes text;

alter table public.email_logs add column if not exists entity_type text;
alter table public.email_logs add column if not exists entity_id text;
alter table public.email_logs add column if not exists error_message text;
alter table public.email_logs add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists applications_assigned_idx on public.applications(assigned_to);
create index if not exists applications_notification_idx on public.applications(notification_sent_at);
create index if not exists contact_messages_assigned_idx on public.contact_messages(assigned_to);
create index if not exists contact_messages_notification_idx on public.contact_messages(notification_sent_at);

-- Safe permission check for Edge Functions using the service role.
create or replace function public.user_has_permission(target_user uuid, permission_key text)
returns boolean
language sql stable security definer set search_path=public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.role_permissions rp on rp.role_id=ur.role_id
    join public.permissions p on p.id=rp.permission_id
    join public.profiles pr on pr.id=ur.user_id
    where ur.user_id=target_user and pr.status='active' and p.key=permission_key
  ) or exists (
    select 1 from public.profiles pr
    where pr.id=target_user and pr.status='active' and pr.role='super_admin'
  );
$$;
revoke all on function public.user_has_permission(uuid,text) from public;
grant execute on function public.user_has_permission(uuid,text) to service_role;

-- Atomically claim a new submission notification. The first caller gets true; subsequent calls get false.
create or replace function public.claim_submission_notification(kind text, target_id uuid)
returns boolean
language plpgsql security definer set search_path=public
as $$
declare claimed boolean := false;
begin
 if kind='application' then
   update public.applications set notification_sent_at=now()
   where id=target_id and notification_sent_at is null
   returning true into claimed;
 elsif kind='contact' then
   update public.contact_messages set notification_sent_at=now()
   where id=target_id and notification_sent_at is null
   returning true into claimed;
 else
   raise exception 'Unsupported submission kind';
 end if;
 return coalesce(claimed,false);
end $$;
revoke all on function public.claim_submission_notification(text,uuid) from public;
grant execute on function public.claim_submission_notification(text,uuid) to service_role;

-- Audit status/assignment changes with a concise activity record.
create or replace function public.audit_application_workflow() returns trigger
language plpgsql security definer set search_path=public
as $$
begin
 if old.status is distinct from new.status then
   insert into public.application_activity(application_id,actor_id,action,metadata)
   values(new.id,auth.uid(),'STATUS_CHANGED',jsonb_build_object('from',old.status,'to',new.status,'reason',new.decision_reason));
 end if;
 if old.assigned_to is distinct from new.assigned_to then
   insert into public.application_activity(application_id,actor_id,action,metadata)
   values(new.id,auth.uid(),'ASSIGNED',jsonb_build_object('from',old.assigned_to,'to',new.assigned_to));
 end if;
 return new;
end $$;
drop trigger if exists applications_workflow_audit on public.applications;
create trigger applications_workflow_audit after update on public.applications for each row execute function public.audit_application_workflow();

-- Public insert policies remain unchanged. Staff can update workflow fields through permission checks.
drop policy if exists "applications update" on public.applications;
create policy "applications update" on public.applications for update
using (public.has_permission('applications.update'))
with check (public.has_permission('applications.update'));

drop policy if exists "contact update" on public.contact_messages;
create policy "contact update" on public.contact_messages for update
using (public.has_permission('applications.update'))
with check (public.has_permission('applications.update'));

-- Staff can create their own application notes; users with application update permission may manage workflow.
drop policy if exists "application notes create" on public.application_notes;
create policy "application notes create" on public.application_notes for insert
with check (public.has_permission('applications.update') and author_id=auth.uid());




==============================================================================
-- FILE: 006_phase6_super_admin_rbac.sql
==============================================================================

-- Emunahh-Invest Phase 6: Super Admin / RBAC hardening
-- NON-DESTRUCTIVE: adds RPCs/tables/policies only; preserves existing content and routes.

create table if not exists public.module_settings (
  module_key text primary key,
  label text not null,
  description text,
  is_enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create table if not exists public.user_module_overrides (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_key text not null references public.module_settings(module_key) on delete cascade,
  is_enabled boolean not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  primary key(user_id,module_key)
);

insert into public.module_settings(module_key,label,description) values
('applications','Applications','Loan, investment and other customer applications'),
('messages','Contact Inbox','Website enquiries and customer messages'),
('content','Website CMS','Pages, sections and public website content'),
('services','Services','Financial service catalogue'),
('media','Media Library','Cloudinary/media records'),
('users','Users & Staff','Staff accounts and assignments'),
('roles','Roles & Permissions','Roles, permissions and departments'),
('emails','Email Log','Outbound email history'),
('audit','Audit Trail','Administrative activity history'),
('settings','Site Settings','Company and notification configuration')
on conflict(module_key) do nothing;

alter table public.module_settings enable row level security;
alter table public.user_module_overrides enable row level security;
drop policy if exists "module settings read active" on public.module_settings;
drop policy if exists "module settings manage" on public.module_settings;
drop policy if exists "module overrides own read" on public.user_module_overrides;
drop policy if exists "module overrides manage" on public.user_module_overrides;

create policy "module settings read active" on public.module_settings for select using (auth.uid() is not null);
create policy "module settings manage" on public.module_settings for all using (public.has_permission('settings.manage')) with check (public.has_permission('settings.manage'));
create policy "module overrides own read" on public.user_module_overrides for select using (user_id=auth.uid() or public.has_permission('users.manage'));
create policy "module overrides manage" on public.user_module_overrides for all using (public.has_permission('users.manage')) with check (public.has_permission('users.manage'));

create or replace function public.admin_get_access()
returns jsonb
language plpgsql stable security definer set search_path=public
as $$
declare uid uuid := auth.uid(); result jsonb;
begin
 if uid is null then return jsonb_build_object('authenticated',false,'permissions','[]'::jsonb,'modules','{}'::jsonb); end if;
 select jsonb_build_object(
   'authenticated',true,
   'user_id',uid,
   'is_super_admin',exists(select 1 from profiles where id=uid and status='active' and role='super_admin'),
   'permissions',coalesce((select jsonb_agg(distinct p.key order by p.key) from user_roles ur join role_permissions rp on rp.role_id=ur.role_id join permissions p on p.id=rp.permission_id where ur.user_id=uid),'[]'::jsonb),
   'modules',coalesce((select jsonb_object_agg(ms.module_key,coalesce(umo.is_enabled,ms.is_enabled)) from module_settings ms left join user_module_overrides umo on umo.module_key=ms.module_key and umo.user_id=uid),'{}'::jsonb)
 ) into result;
 return result;
end $$;
grant execute on function public.admin_get_access() to authenticated;

create or replace function public.admin_set_user_status(target_user uuid, new_status text)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare old_status text; actor uuid:=auth.uid();
begin
 if actor is null or not public.has_permission('users.manage') then raise exception 'User management permission required.'; end if;
 if new_status not in ('active','disabled') then raise exception 'Invalid user status.'; end if;
 select status into old_status from profiles where id=target_user;
 if not found then raise exception 'User profile not found.'; end if;
 if target_user=actor and new_status='disabled' then raise exception 'You cannot disable your own account.'; end if;
 update profiles set status=new_status where id=target_user;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'USER_STATUS_CHANGED','profile',target_user::text,jsonb_build_object('old_status',old_status,'new_status',new_status));
 return jsonb_build_object('success',true,'status',new_status);
end $$;
grant execute on function public.admin_set_user_status(uuid,text) to authenticated;

create or replace function public.admin_assign_user(target_user uuid, target_role text, target_department uuid)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); rid uuid; old_role text; old_department uuid;
begin
 if actor is null or not public.has_permission('users.manage') then raise exception 'User management permission required.'; end if;
 if target_role='super_admin' and not exists(select 1 from profiles where id=actor and role='super_admin' and status='active') then raise exception 'Only Super Admin can assign Super Admin.'; end if;
 select id into rid from roles where key=target_role; if rid is null then raise exception 'Role not found.'; end if;
 select role,department_id into old_role,old_department from profiles where id=target_user; if not found then raise exception 'User profile not found.'; end if;
 update profiles set role=target_role, department_id=target_department where id=target_user;
 insert into user_roles(user_id,role_id) values(target_user,rid) on conflict(user_id) do update set role_id=excluded.role_id;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'USER_ACCESS_CHANGED','profile',target_user::text,jsonb_build_object('old_role',old_role,'new_role',target_role,'old_department',old_department,'new_department',target_department));
 return jsonb_build_object('success',true,'role',target_role,'department_id',target_department);
end $$;
grant execute on function public.admin_assign_user(uuid,text,uuid) to authenticated;

create or replace function public.admin_save_role(target_role uuid, role_key text, role_name text, role_description text)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); existing_key text;
begin
 if actor is null or not public.has_permission('roles.manage') then raise exception 'Role management permission required.'; end if;
 if role_key='super_admin' and not exists(select 1 from roles where id=target_role and is_system=true) then raise exception 'Super Admin role is protected.'; end if;
 select key into existing_key from roles where id=target_role;
 if target_role is null then insert into roles(key,name,description,is_system) values(lower(trim(role_key)),trim(role_name),nullif(trim(role_description),''),false) returning id into target_role;
 else update roles set key=lower(trim(role_key)),name=trim(role_name),description=nullif(trim(role_description),'') where id=target_role;
 end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'ROLE_SAVED','role',target_role::text,jsonb_build_object('old_key',existing_key,'new_key',role_key));
 return jsonb_build_object('success',true,'id',target_role);
end $$;
grant execute on function public.admin_save_role(uuid,text,text,text) to authenticated;

create or replace function public.admin_delete_role(target_role uuid)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); rk text; sys boolean;
begin
 if actor is null or not public.has_permission('roles.manage') then raise exception 'Role management permission required.'; end if;
 select key,is_system into rk,sys from roles where id=target_role;
 if not found then raise exception 'Role not found.'; end if;
 if sys then raise exception 'System roles cannot be deleted.'; end if;
 if exists(select 1 from user_roles where role_id=target_role) then raise exception 'Reassign users before deleting this role.'; end if;
 delete from role_permissions where role_id=target_role; delete from roles where id=target_role;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'ROLE_DELETED','role',target_role::text,jsonb_build_object('key',rk));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_delete_role(uuid) to authenticated;

create or replace function public.admin_set_role_permission(target_role uuid, target_permission uuid, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid(); rk text; pk text;
begin
 if actor is null or not public.has_permission('roles.manage') then raise exception 'Role management permission required.'; end if;
 select key into rk from roles where id=target_role; select key into pk from permissions where id=target_permission;
 if rk='super_admin' then raise exception 'Super Admin permissions are fixed.'; end if;
 if enabled then insert into role_permissions(role_id,permission_id) values(target_role,target_permission) on conflict do nothing; else delete from role_permissions where role_id=target_role and permission_id=target_permission; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'ROLE_PERMISSION_CHANGED','role',target_role::text,jsonb_build_object('permission',pk,'enabled',enabled));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_role_permission(uuid,uuid,boolean) to authenticated;

create or replace function public.admin_set_module_override(target_user uuid, target_module text, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare actor uuid:=auth.uid();
begin
 if actor is null or not public.has_permission('users.manage') then raise exception 'User management permission required.'; end if;
 if not exists(select 1 from module_settings where module_key=target_module) then raise exception 'Module not found.'; end if;
 insert into user_module_overrides(user_id,module_key,is_enabled,updated_by) values(target_user,target_module,enabled,actor)
 on conflict(user_id,module_key) do update set is_enabled=excluded.is_enabled,updated_by=actor,updated_at=now();
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'USER_MODULE_CHANGED','profile',target_user::text,jsonb_build_object('module',target_module,'enabled',enabled));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_module_override(uuid,text,boolean) to authenticated;

-- Profiles remain readable under existing policies; sensitive writes now go through RPCs.
-- Prevent direct role/access manipulation by ordinary clients.
drop policy if exists "profile admin update" on public.profiles;
create policy "profile admin update" on public.profiles for update using (public.has_permission('users.manage')) with check (public.has_permission('users.manage'));

-- Audit writes should be server-side for sensitive operations; keep existing application audit behavior intact.




==============================================================================
-- FILE: 007_phase8_forms_submission_hardening.sql
==============================================================================

-- Phase 8: Forms and public submission hardening
-- Run AFTER 006_phase6_super_admin_rbac.sql. Non-destructive.

alter table public.applications
  add column if not exists consent_at timestamptz,
  add column if not exists source text,
  add column if not exists last_public_update_at timestamptz;

alter table public.contact_messages
  add column if not exists consent_at timestamptz,
  add column if not exists source text,
  add column if not exists last_replied_at timestamptz,
  add column if not exists last_replied_by uuid references auth.users(id) on delete set null;

create table if not exists public.form_configs (
  id uuid primary key default gen_random_uuid(),
  form_key text unique not null,
  title text not null,
  description text,
  is_enabled boolean not null default true,
  require_consent boolean not null default true,
  success_message text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

insert into public.form_configs(form_key,title,description,success_message)
values
 ('application','Financing & Investment Application','Preliminary application intake.','Your application has been received. Keep your reference number for follow-up.'),
 ('contact','Contact Enquiry','General enquiry and service request form.','Your enquiry has been received. Our team will review it and respond.'),
 ('application_tracking','Application Tracking','Check the current status of an existing application.','')
on conflict(form_key) do nothing;

alter table public.form_configs enable row level security;
drop policy if exists "public read enabled form configs" on public.form_configs;
drop policy if exists "staff manage form configs" on public.form_configs;
create policy "public read enabled form configs" on public.form_configs for select using (is_enabled=true);
create policy "staff manage form configs" on public.form_configs for all using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

create index if not exists applications_source_idx on public.applications(source);
create index if not exists contact_messages_source_idx on public.contact_messages(source);

-- Validate that a public application has the minimum contact information before insert.
create or replace function public.validate_public_application()
returns trigger language plpgsql security definer set search_path=public as $$
begin
 if length(trim(new.full_name)) < 2 then raise exception 'Please provide your full name.'; end if;
 if length(regexp_replace(coalesce(new.phone,''),'[^0-9]','','g')) < 7 then raise exception 'Please provide a valid phone number.'; end if;
 if new.email is not null and length(trim(new.email)) > 0 and position('@' in new.email)=0 then raise exception 'Please provide a valid email address.'; end if;
 if new.consent_at is null then new.consent_at=now(); end if;
 new.last_public_update_at=now();
 return new;
end $$;
drop trigger if exists trg_validate_public_application on public.applications;
create trigger trg_validate_public_application before insert on public.applications for each row execute function public.validate_public_application();

create or replace function public.validate_public_contact()
returns trigger language plpgsql security definer set search_path=public as $$
begin
 if length(trim(new.name)) < 2 then raise exception 'Please provide your name.'; end if;
 if length(trim(new.message)) < 5 then raise exception 'Please provide a little more detail.'; end if;
 if new.email is not null and length(trim(new.email)) > 0 and position('@' in new.email)=0 then raise exception 'Please provide a valid email address.'; end if;
 if new.consent_at is null then new.consent_at=now(); end if;
 return new;
end $$;
drop trigger if exists trg_validate_public_contact on public.contact_messages;
create trigger trg_validate_public_contact before insert on public.contact_messages for each row execute function public.validate_public_contact();





==============================================================================
-- FILE: 008_phase9_application_workflow_documents.sql
==============================================================================

-- Phase 9: Applications workflow, documents and contact operations
-- Run AFTER 007_phase8_forms_submission_hardening.sql. Non-destructive.

create table if not exists public.application_documents (
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null references public.applications(id) on delete cascade,
 filename text not null,
 public_url text not null,
 storage_path text,
 mime_type text,
 file_size bigint,
 document_type text not null default 'supporting',
 uploaded_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now()
);

create index if not exists application_documents_application_idx on public.application_documents(application_id,created_at desc);
alter table public.application_documents enable row level security;
drop policy if exists "staff read application documents" on public.application_documents;
drop policy if exists "staff manage application documents" on public.application_documents;
create policy "staff read application documents" on public.application_documents for select using (auth.uid() is not null and public.has_permission('applications.view'));
create policy "staff manage application documents" on public.application_documents for all using (public.has_permission('applications.update')) with check (public.has_permission('applications.update'));

-- Controlled contact workflow action. The browser no longer needs a direct write policy for operational updates.
create or replace function public.admin_update_contact_message(target_id uuid, new_status text, new_assignee uuid, notes text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare actor uuid:=auth.uid(); old_status text; begin
 if actor is null or not public.has_permission('applications.update') then raise exception 'Contact inbox permission required.'; end if;
 if new_status not in ('NEW','READ','CONTACTED','CLOSED','SPAM') then raise exception 'Invalid contact status.'; end if;
 select status into old_status from contact_messages where id=target_id;
 if not found then raise exception 'Contact message not found.'; end if;
 update contact_messages set status=new_status,assigned_to=new_assignee,internal_notes=coalesce(notes,internal_notes) where id=target_id;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(actor,'CONTACT_MESSAGE_UPDATED','contact_message',target_id::text,jsonb_build_object('from',old_status,'to',new_status,'assigned_to',new_assignee));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_update_contact_message(uuid,text,uuid,text) to authenticated;

-- Restrict direct contact-message updates; operational changes go through the RPC above.
drop policy if exists "staff update contact messages" on public.contact_messages;
create policy "staff update contact messages" on public.contact_messages for update using (false) with check (false);





==============================================================================
-- FILE: 009_phase10_email_templates_and_production.sql
==============================================================================

-- Phase 10: Email templates, replies and production controls
-- Run AFTER 008_phase9_application_workflow_documents.sql. Non-destructive.

create table if not exists public.email_templates (
 id uuid primary key default gen_random_uuid(),
 template_key text unique not null,
 name text not null,
 subject text not null,
 html_body text not null,
 category text not null default 'general',
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null
);

insert into public.email_templates(template_key,name,subject,html_body,category)
values
 ('application_received','Application Received','We received your Emunahh-Invest application','<p>Hello {{full_name}},</p><p>We received your application <strong>{{reference}}</strong>.</p><p>Our team will review the information submitted and contact you with the next steps.</p>','application'),
 ('application_status','Application Status Update','Update on your Emunahh-Invest application {{reference}}','<p>Hello {{full_name}},</p><p>Your application <strong>{{reference}}</strong> is now <strong>{{status}}</strong>.</p><p>{{decision_reason}}</p><p>Please contact our team if you need clarification.</p>','application'),
 ('contact_received','Contact Enquiry Received','We received your enquiry','<p>Hello {{name}},</p><p>Thank you for contacting Emunahh-Invest. Your enquiry has been received and will be reviewed by our team.</p>','contact'),
 ('contact_reply','Response from Emunahh-Invest','Response to your enquiry {{reference}}','<p>Hello {{name}},</p><p>{{message}}</p>','contact')
on conflict(template_key) do nothing;

alter table public.email_templates enable row level security;
drop policy if exists "staff read email templates" on public.email_templates;
drop policy if exists "staff manage email templates" on public.email_templates;
create policy "staff read email templates" on public.email_templates for select using (public.has_permission('emails.view'));
create policy "staff manage email templates" on public.email_templates for all using (public.has_permission('settings.manage')) with check (public.has_permission('settings.manage'));

alter table public.email_logs add column if not exists template_id uuid references public.email_templates(id) on delete set null;
alter table public.email_logs add column if not exists reply_to text;
create index if not exists email_logs_application_idx on public.email_logs(application_id,created_at desc);
create index if not exists email_logs_entity_idx on public.email_logs(entity_type,entity_id,created_at desc);

-- Keep the public insert surface narrow. No public reads or updates are introduced.
revoke all on table public.email_templates from anon;
revoke all on table public.email_logs from anon;

-- Audit failed/blocked workflow attempts through application-action/send-email rather than trusting client inserts.
create or replace function public.render_email_template(template_key text, variables jsonb)
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare t email_templates%rowtype; s text; h text; k text; v text; begin
 select * into t from email_templates where email_templates.template_key=render_email_template.template_key and is_active=true;
 if not found then raise exception 'Email template not found.'; end if;
 s:=t.subject; h:=t.html_body;
 for k,v in select key,value from jsonb_each_text(coalesce(variables,'{}'::jsonb)) loop
   s:=replace(s,'{{'||k||'}}',v); h:=replace(h,'{{'||k||'}}',v);
 end loop;
 return jsonb_build_object('subject',s,'html_body',h,'template_id',t.id);
end $$;
grant execute on function public.render_email_template(text,jsonb) to authenticated;





==============================================================================
-- FILE: 010_phase11_cloudinary_foundation.sql
==============================================================================

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




==============================================================================
-- FILE: 011_phase12_media_library.sql
==============================================================================

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




==============================================================================
-- FILE: 012_phase13_visual_cms.sql
==============================================================================

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




==============================================================================
-- FILE: 013_phase14_publishing_preview.sql
==============================================================================

-- Phase 14: publishing/preview/version metadata. Non-destructive.
alter table if exists public.cms_pages add column if not exists preview_token text;
alter table if exists public.cms_pages add column if not exists published_at timestamptz;
alter table if exists public.cms_pages add column if not exists published_by uuid references auth.users(id);
alter table if exists public.cms_pages add column if not exists version integer not null default 1;
alter table if exists public.cms_sections add column if not exists published_at timestamptz;
alter table if exists public.cms_sections add column if not exists published_by uuid references auth.users(id);
alter table if exists public.cms_sections add column if not exists version integer not null default 1;

create table if not exists public.cms_change_log (
 id uuid primary key default gen_random_uuid(),
 page_id uuid references public.cms_pages(id) on delete set null,
 section_id uuid references public.cms_sections(id) on delete set null,
 action text not null,
 version integer,
 snapshot jsonb not null default '{}'::jsonb,
 changed_by uuid references auth.users(id),
 created_at timestamptz not null default now()
);
create index if not exists cms_change_log_page_idx on public.cms_change_log(page_id, created_at desc);

alter table public.cms_change_log enable row level security;
drop policy if exists cms_change_log_read on public.cms_change_log;
create policy cms_change_log_read on public.cms_change_log for select to authenticated using (public.has_permission('content.view') or public.has_permission('audit.view'));
drop policy if exists cms_change_log_insert on public.cms_change_log;
create policy cms_change_log_insert on public.cms_change_log for insert to authenticated with check (public.has_permission('content.update') and changed_by=auth.uid());

create or replace function public.cms_publish_page(target_page uuid)
returns public.cms_pages language plpgsql security definer set search_path=public as $$
declare r public.cms_pages;
begin
 if not public.has_permission('content.update') then raise exception 'Not authorized'; end if;
 update public.cms_pages set status='published',published_at=now(),published_by=auth.uid(),version=version+1 where id=target_page returning * into r;
 insert into public.cms_change_log(page_id,action,version,snapshot,changed_by) values(r.id,'publish',r.version,to_jsonb(r),auth.uid());
 return r;
end $$;

create or replace function public.cms_unpublish_page(target_page uuid)
returns public.cms_pages language plpgsql security definer set search_path=public as $$
declare r public.cms_pages;
begin
 if not public.has_permission('content.update') then raise exception 'Not authorized'; end if;
 update public.cms_pages set status='draft' where id=target_page returning * into r;
 insert into public.cms_change_log(page_id,action,version,snapshot,changed_by) values(r.id,'unpublish',r.version,to_jsonb(r),auth.uid());
 return r;
end $$;




==============================================================================
-- FILE: 014_phase15_authentication_hardening.sql
==============================================================================

-- Phase 15: Authentication hardening. Non-destructive; Supabase Auth remains the identity provider.
create table if not exists public.admin_auth_events (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 event_type text not null check (event_type in ('LOGIN','LOGOUT','PASSWORD_RESET_REQUESTED','PASSWORD_CHANGED','SESSION_REFRESHED','MFA_ENABLED','MFA_DISABLED')),
 user_agent text,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists admin_auth_events_user_idx on public.admin_auth_events(user_id,created_at desc);
create index if not exists admin_auth_events_type_idx on public.admin_auth_events(event_type,created_at desc);
alter table public.admin_auth_events enable row level security;
drop policy if exists admin_auth_events_self_insert on public.admin_auth_events;
drop policy if exists admin_auth_events_admin_read on public.admin_auth_events;
create policy admin_auth_events_self_insert on public.admin_auth_events for insert to authenticated with check (user_id=auth.uid());
create policy admin_auth_events_admin_read on public.admin_auth_events for select to authenticated using (public.has_permission('audit.view') or user_id=auth.uid());

create or replace function public.record_admin_auth_event(event_name text, event_metadata jsonb default '{}'::jsonb)
returns uuid language plpgsql security definer set search_path=public as $$
declare eid uuid;
begin
 if auth.uid() is null then raise exception 'Authentication required.'; end if;
 if event_name not in ('LOGIN','LOGOUT','PASSWORD_RESET_REQUESTED','PASSWORD_CHANGED','SESSION_REFRESHED','MFA_ENABLED','MFA_DISABLED') then raise exception 'Unsupported authentication event.'; end if;
 insert into public.admin_auth_events(user_id,event_type,metadata) values(auth.uid(),event_name,coalesce(event_metadata,'{}'::jsonb)) returning id into eid;
 return eid;
end $$;
revoke all on function public.record_admin_auth_event(text,jsonb) from public;
grant execute on function public.record_admin_auth_event(text,jsonb) to authenticated;




==============================================================================
-- FILE: 015_phase16_granular_rbac.sql
==============================================================================

-- Phase 16: Granular permission overrides. Non-destructive.
create table if not exists public.user_permission_overrides (
 user_id uuid not null references auth.users(id) on delete cascade,
 permission_id uuid not null references public.permissions(id) on delete cascade,
 effect text not null check(effect in ('allow','deny')),
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null,
 primary key(user_id,permission_id)
);
alter table public.user_permission_overrides enable row level security;
drop policy if exists user_permission_overrides_self_read on public.user_permission_overrides;
drop policy if exists user_permission_overrides_manage on public.user_permission_overrides;
create policy user_permission_overrides_self_read on public.user_permission_overrides for select to authenticated using(user_id=auth.uid() or public.has_permission('users.manage'));
create policy user_permission_overrides_manage on public.user_permission_overrides for all to authenticated using(public.has_permission('users.manage')) with check(public.has_permission('users.manage'));

create or replace function public.has_permission(permission_key text)
returns boolean language sql stable security definer set search_path=public as $$
 select case
   when auth.uid() is null then false
   when exists(select 1 from profiles where id=auth.uid() and status='active' and role='super_admin') then true
   when exists(
     select 1 from user_permission_overrides uo join permissions p on p.id=uo.permission_id
     where uo.user_id=auth.uid() and p.key=permission_key and uo.effect='deny'
   ) then false
   when exists(
     select 1 from user_permission_overrides uo join permissions p on p.id=uo.permission_id
     where uo.user_id=auth.uid() and p.key=permission_key and uo.effect='allow'
   ) then true
   else exists(
     select 1 from user_roles ur join role_permissions rp on rp.role_id=ur.role_id join permissions p on p.id=rp.permission_id
     join profiles pr on pr.id=ur.user_id
     where ur.user_id=auth.uid() and pr.status='active' and p.key=permission_key
   )
 end
$$;
revoke all on function public.has_permission(text) from public;
grant execute on function public.has_permission(text) to authenticated,service_role;

insert into public.permissions(key,name,description) values
('users.invite','Invite Users','Create and track administrator invitations'),
('users.view','View Users','View staff accounts and access'),
('departments.view','View Departments','View departments and members'),
('departments.manage','Manage Departments','Create and manage departments'),
('modules.view','View Modules','View enabled modules and entitlements'),
('modules.manage','Manage Modules','Enable, disable and assign modules'),
('security.view','View Security','View authentication and security events'),
('security.manage','Manage Security','Manage security settings and access controls')
on conflict(key) do nothing;




==============================================================================
-- FILE: 016_phase17_departments.sql
==============================================================================

-- Phase 17: Departments and staff membership. Non-destructive.
create table if not exists public.departments (
 id uuid primary key default gen_random_uuid(),
 name text not null unique,
 code text unique,
 description text,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 created_by uuid references auth.users(id) on delete set null
);
create table if not exists public.department_members (
 department_id uuid not null references public.departments(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 is_manager boolean not null default false,
 created_at timestamptz not null default now(),
 created_by uuid references auth.users(id) on delete set null,
 primary key(department_id,user_id)
);
create index if not exists department_members_user_idx on public.department_members(user_id);
alter table public.departments enable row level security;
alter table public.department_members enable row level security;
drop policy if exists departments_read on public.departments;
drop policy if exists departments_manage on public.departments;
drop policy if exists department_members_read on public.department_members;
drop policy if exists department_members_manage on public.department_members;
create policy departments_read on public.departments for select to authenticated using(public.has_permission('departments.view') or public.has_permission('users.manage'));
create policy departments_manage on public.departments for all to authenticated using(public.has_permission('departments.manage')) with check(public.has_permission('departments.manage'));
create policy department_members_read on public.department_members for select to authenticated using(user_id=auth.uid() or public.has_permission('departments.view') or public.has_permission('users.manage'));
create policy department_members_manage on public.department_members for all to authenticated using(public.has_permission('departments.manage') or public.has_permission('users.manage')) with check(public.has_permission('departments.manage') or public.has_permission('users.manage'));

create or replace function public.admin_save_department(target_id uuid, department_name text, department_code text, department_description text, active boolean default true)
returns public.departments language plpgsql security definer set search_path=public as $$
declare r public.departments;
begin
 if not public.has_permission('departments.manage') then raise exception 'Department management permission required.'; end if;
 if target_id is null then insert into public.departments(name,code,description,is_active,created_by) values(trim(department_name),nullif(upper(trim(department_code)),''),nullif(trim(department_description),''),active,auth.uid()) returning * into r;
 else update public.departments set name=trim(department_name),code=nullif(upper(trim(department_code)),''),description=nullif(trim(department_description),''),is_active=active,updated_at=now() where id=target_id returning * into r; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'DEPARTMENT_SAVED','department',r.id::text,to_jsonb(r));
 return r;
end $$;
grant execute on function public.admin_save_department(uuid,text,text,text,boolean) to authenticated;

create or replace function public.admin_set_department_member(target_department uuid, target_user uuid, manager boolean, enabled boolean default true)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('departments.manage') and not public.has_permission('users.manage') then raise exception 'Department membership permission required.'; end if;
 if enabled then insert into department_members(department_id,user_id,is_manager,created_by) values(target_department,target_user,manager,auth.uid()) on conflict(department_id,user_id) do update set is_manager=excluded.is_manager; else delete from department_members where department_id=target_department and user_id=target_user; end if;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'DEPARTMENT_MEMBER_CHANGED','department_member',target_user::text,jsonb_build_object('department_id',target_department,'enabled',enabled,'manager',manager));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_department_member(uuid,uuid,boolean,boolean) to authenticated;




==============================================================================
-- FILE: 017_phase18_module_entitlements.sql
==============================================================================

-- Phase 18: Module access / entitlements. Non-destructive.
create table if not exists public.role_module_access (
 role_id uuid not null references public.roles(id) on delete cascade,
 module_key text not null references public.module_settings(module_key) on delete cascade,
 is_enabled boolean not null default true,
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null,
 primary key(role_id,module_key)
);
create table if not exists public.module_entitlements (
 id uuid primary key default gen_random_uuid(),
 module_key text not null references public.module_settings(module_key) on delete cascade,
 user_id uuid references auth.users(id) on delete cascade,
 department_id uuid references public.departments(id) on delete cascade,
 plan_code text,
 is_enabled boolean not null default true,
 starts_at timestamptz not null default now(),
 expires_at timestamptz,
 updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id) on delete set null,
 check(user_id is not null or department_id is not null)
);
create index if not exists module_entitlements_user_idx on public.module_entitlements(user_id,module_key);
create index if not exists module_entitlements_department_idx on public.module_entitlements(department_id,module_key);
alter table public.role_module_access enable row level security;
alter table public.module_entitlements enable row level security;
create policy role_module_access_read on public.role_module_access for select to authenticated using(public.has_permission('modules.view') or public.has_permission('roles.manage'));
create policy role_module_access_manage on public.role_module_access for all to authenticated using(public.has_permission('modules.manage')) with check(public.has_permission('modules.manage'));
create policy module_entitlements_read on public.module_entitlements for select to authenticated using(user_id=auth.uid() or public.has_permission('modules.view'));
create policy module_entitlements_manage on public.module_entitlements for all to authenticated using(public.has_permission('modules.manage')) with check(public.has_permission('modules.manage'));

create or replace function public.has_module_access(target_module text)
returns boolean language sql stable security definer set search_path=public as $$
 select case
 when auth.uid() is null then false
 when exists(select 1 from profiles where id=auth.uid() and status='active' and role='super_admin') then true
 when exists(select 1 from user_module_overrides where user_id=auth.uid() and module_key=target_module and is_enabled=false) then false
 when exists(select 1 from module_entitlements me where me.module_key=target_module and me.user_id=auth.uid() and me.is_enabled=true and now()>=me.starts_at and (me.expires_at is null or now()<me.expires_at)) then true
 when exists(select 1 from department_members dm join module_entitlements me on me.department_id=dm.department_id where dm.user_id=auth.uid() and me.module_key=target_module and me.is_enabled=true and now()>=me.starts_at and (me.expires_at is null or now()<me.expires_at)) then true
 when exists(select 1 from user_roles ur join role_module_access rma on rma.role_id=ur.role_id where ur.user_id=auth.uid() and rma.module_key=target_module and rma.is_enabled=true) then true
 else coalesce((select is_enabled from module_settings where module_key=target_module),false)
 end
$$;
revoke all on function public.has_module_access(text) from public;
grant execute on function public.has_module_access(text) to authenticated,service_role;

create or replace function public.admin_set_role_module(target_role uuid, target_module text, enabled boolean)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('modules.manage') then raise exception 'Module management permission required.'; end if;
 if not exists(select 1 from module_settings where module_key=target_module) then raise exception 'Module not found.'; end if;
 insert into role_module_access(role_id,module_key,is_enabled,updated_by) values(target_role,target_module,enabled,auth.uid()) on conflict(role_id,module_key) do update set is_enabled=excluded.is_enabled,updated_by=auth.uid(),updated_at=now();
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'ROLE_MODULE_CHANGED','role',target_role::text,jsonb_build_object('module',target_module,'enabled',enabled));
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_set_role_module(uuid,text,boolean) to authenticated;




==============================================================================
-- FILE: 018_phase19_admin_users.sql
==============================================================================

-- Phase 19: Admin users/invitations. Invitation delivery is performed by a trusted Edge Function.
create table if not exists public.admin_invitations (
 id uuid primary key default gen_random_uuid(),
 email text not null,
 role_key text not null default 'admin',
 department_id uuid references public.departments(id) on delete set null,
 token_hash text,
 status text not null default 'pending' check(status in ('pending','sent','accepted','expired','revoked')),
 expires_at timestamptz not null default (now()+interval '7 days'),
 invited_by uuid not null references auth.users(id) on delete restrict,
 accepted_by uuid references auth.users(id) on delete set null,
 sent_at timestamptz,
 accepted_at timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists admin_invitations_email_idx on public.admin_invitations(lower(email),created_at desc);
create index if not exists admin_invitations_status_idx on public.admin_invitations(status,expires_at);
alter table public.admin_invitations enable row level security;
create policy admin_invitations_read on public.admin_invitations for select to authenticated using(public.has_permission('users.view') or invited_by=auth.uid());
create policy admin_invitations_manage on public.admin_invitations for all to authenticated using(public.has_permission('users.invite')) with check(public.has_permission('users.invite'));

create or replace function public.admin_create_invitation(invite_email text, target_role text default 'admin', target_department uuid default null)
returns public.admin_invitations language plpgsql security definer set search_path=public as $$
declare r public.admin_invitations;
begin
 if not public.has_permission('users.invite') then raise exception 'User invitation permission required.'; end if;
 if not exists(select 1 from roles where key=target_role) then raise exception 'Role not found.'; end if;
 insert into admin_invitations(email,role_key,department_id,invited_by) values(lower(trim(invite_email)),target_role,target_department,auth.uid()) returning * into r;
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'ADMIN_INVITATION_CREATED','admin_invitation',r.id::text,jsonb_build_object('email',r.email,'role',r.role_key,'department_id',r.department_id));
 return r;
end $$;
grant execute on function public.admin_create_invitation(text,text,uuid) to authenticated;

create or replace function public.admin_revoke_invitation(target_id uuid)
returns jsonb language plpgsql security definer set search_path=public as $$
begin
 if not public.has_permission('users.invite') then raise exception 'User invitation permission required.'; end if;
 update admin_invitations set status='revoked' where id=target_id and status in ('pending','sent');
 insert into audit_logs(actor_id,action,entity_type,entity_id,metadata) values(auth.uid(),'ADMIN_INVITATION_REVOKED','admin_invitation',target_id::text,'{}'::jsonb);
 return jsonb_build_object('success',true);
end $$;
grant execute on function public.admin_revoke_invitation(uuid) to authenticated;




==============================================================================
-- FILE: 019_phase20_security_audit.sql
==============================================================================

-- Phase 20: Security/audit controls. Non-destructive.
create table if not exists public.security_events (
 id uuid primary key default gen_random_uuid(),
 actor_id uuid references auth.users(id) on delete set null,
 event_type text not null,
 severity text not null default 'info' check(severity in ('info','warning','critical')),
 entity_type text,
 entity_id text,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists security_events_created_idx on public.security_events(created_at desc);
create index if not exists security_events_actor_idx on public.security_events(actor_id,created_at desc);
create index if not exists security_events_type_idx on public.security_events(event_type,created_at desc);
alter table public.security_events enable row level security;
create policy security_events_read on public.security_events for select to authenticated using(public.has_permission('security.view') or public.has_permission('audit.view'));
create policy security_events_insert on public.security_events for insert to authenticated with check(actor_id=auth.uid() and public.has_permission('security.manage'));

create or replace function public.record_security_event(event_name text, event_severity text default 'info', entity_kind text default null, entity_key text default null, event_metadata jsonb default '{}'::jsonb)
returns uuid language plpgsql security definer set search_path=public as $$
declare eid uuid;
begin
 if auth.uid() is null then raise exception 'Authentication required.'; end if;
 if event_severity not in ('info','warning','critical') then raise exception 'Invalid severity.'; end if;
 insert into security_events(actor_id,event_type,severity,entity_type,entity_id,metadata) values(auth.uid(),event_name,event_severity,entity_kind,entity_key,coalesce(event_metadata,'{}'::jsonb)) returning id into eid;
 return eid;
end $$;
revoke all on function public.record_security_event(text,text,text,text,jsonb) from public;
grant execute on function public.record_security_event(text,text,text,text,jsonb) to authenticated;

create or replace view public.admin_security_summary as
select event_type,severity,count(*)::bigint as event_count,max(created_at) as last_seen
from public.security_events group by event_type,severity;




==============================================================================
-- FILE: 020_phase21_unified_access_resolver.sql
==============================================================================

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




==============================================================================
-- FILE: 021_phase22_admin_dashboard.sql
==============================================================================

-- Phase 22: Admin dashboard and operational metrics. Non-destructive.
create or replace view public.admin_dashboard_summary as
select
  (select count(*) from public.profiles where status='active')::bigint as active_users,
  (select count(*) from public.profiles)::bigint as total_users,
  (select count(*) from public.departments where is_active=true)::bigint as active_departments,
  (select count(*) from public.admin_invitations where status in ('pending','sent') and expires_at>now())::bigint as pending_invitations,
  (select count(*) from public.security_events where created_at>=now()-interval '24 hours')::bigint as security_events_24h,
  (select count(*) from public.admin_auth_events where created_at>=now()-interval '24 hours' and event_type='LOGIN')::bigint as logins_24h,
  (select count(*) from public.audit_logs where created_at>=now()-interval '24 hours')::bigint as audit_events_24h,
  (select count(*) from public.module_settings where is_enabled=true)::bigint as enabled_modules;

create or replace function public.admin_get_dashboard_metrics()
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb; uid uuid:=auth.uid();
begin
  if uid is null or not public.has_permission('dashboard.view') then
    raise exception 'Dashboard access permission required.';
  end if;
  select jsonb_build_object(
    'generated_at',now(),
    'summary',(select to_jsonb(s) from public.admin_dashboard_summary s),
    'security_last_7_days',coalesce((select jsonb_agg(x order by x.day desc) from (
      select date_trunc('day',created_at)::date as day,severity,count(*)::bigint as event_count
      from public.security_events where created_at>=now()-interval '7 days'
      group by 1,2
    ) x),'[]'::jsonb),
    'recent_security_events',coalesce((select jsonb_agg(x order by x.created_at desc) from (
      select id,event_type,severity,entity_type,entity_id,created_at from public.security_events order by created_at desc limit 10
    ) x),'[]'::jsonb),
    'recent_audit_events',coalesce((select jsonb_agg(x order by x.created_at desc) from (
      select id,actor_id,action,entity_type,entity_id,created_at from public.audit_logs order by created_at desc limit 10
    ) x),'[]'::jsonb)
  ) into r;
  return r;
end $$;

insert into public.permissions(key,name,description) values
('dashboard.view','View Dashboard','View administrator dashboard metrics and operational summaries')
on conflict(key) do nothing;

grant select on public.admin_dashboard_summary to authenticated;
grant execute on function public.admin_get_dashboard_metrics() to authenticated;




==============================================================================
-- FILE: 022_phase23_security_center.sql
==============================================================================

-- Phase 23: Security center. Non-destructive.
create table if not exists public.security_settings (
  id boolean primary key default true check(id=true),
  session_timeout_minutes integer not null default 60 check(session_timeout_minutes between 5 and 1440),
  max_login_attempts integer not null default 5 check(max_login_attempts between 1 and 20),
  require_mfa_for_admins boolean not null default false,
  notify_on_new_admin boolean not null default true,
  notify_on_failed_login boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);
insert into public.security_settings(id) values(true) on conflict(id) do nothing;
alter table public.security_settings enable row level security;
drop policy if exists security_settings_read on public.security_settings;
drop policy if exists security_settings_manage on public.security_settings;
create policy security_settings_read on public.security_settings for select to authenticated using(public.has_permission('security.view'));
create policy security_settings_manage on public.security_settings for update to authenticated using(public.has_permission('security.manage')) with check(public.has_permission('security.manage'));

create or replace function public.admin_get_security_center()
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb;
begin
  if not public.has_permission('security.view') then raise exception 'Security view permission required.'; end if;
  select jsonb_build_object(
    'settings',(select to_jsonb(s) from public.security_settings s where id=true),
    'auth_events_24h',(select count(*) from public.admin_auth_events where created_at>=now()-interval '24 hours'),
    'failed_login_events_24h',(select count(*) from public.security_events where created_at>=now()-interval '24 hours' and event_type in ('LOGIN_FAILED','AUTH_LOGIN_FAILED')),
    'critical_events_7d',(select count(*) from public.security_events where created_at>=now()-interval '7 days' and severity='critical'),
    'warnings_7d',(select count(*) from public.security_events where created_at>=now()-interval '7 days' and severity='warning'),
    'active_admins',(select count(*) from public.profiles where status='active'),
    'recent_auth',coalesce((select jsonb_agg(x order by x.created_at desc) from (select user_id,event_type,created_at from public.admin_auth_events order by created_at desc limit 25) x),'[]'::jsonb),
    'recent_security',coalesce((select jsonb_agg(x order by x.created_at desc) from (select id,actor_id,event_type,severity,entity_type,entity_id,created_at from public.security_events order by created_at desc limit 25) x),'[]'::jsonb)
  ) into r;
  return r;
end $$;

grant execute on function public.admin_get_security_center() to authenticated;

create or replace function public.admin_update_security_settings(
  p_session_timeout_minutes integer,
  p_max_login_attempts integer,
  p_require_mfa_for_admins boolean,
  p_notify_on_new_admin boolean,
  p_notify_on_failed_login boolean
)
returns public.security_settings language plpgsql security definer set search_path=public as $$
declare r public.security_settings;
begin
  if not public.has_permission('security.manage') then raise exception 'Security management permission required.'; end if;
  update public.security_settings set
    session_timeout_minutes=p_session_timeout_minutes,
    max_login_attempts=p_max_login_attempts,
    require_mfa_for_admins=p_require_mfa_for_admins,
    notify_on_new_admin=p_notify_on_new_admin,
    notify_on_failed_login=p_notify_on_failed_login,
    updated_at=now(),updated_by=auth.uid()
  where id=true returning * into r;
  insert into public.security_events(actor_id,event_type,severity,entity_type,entity_id,metadata)
  values(auth.uid(),'SECURITY_SETTINGS_UPDATED','warning','security_settings','singleton',to_jsonb(r));
  return r;
end $$;

grant execute on function public.admin_update_security_settings(integer,integer,boolean,boolean,boolean) to authenticated;




==============================================================================
-- FILE: 023_phase24_audit_center.sql
==============================================================================

-- Phase 24: Central audit center. Non-destructive.
create index if not exists audit_logs_actor_created_idx on public.audit_logs(actor_id,created_at desc);
create index if not exists audit_logs_entity_created_idx on public.audit_logs(entity_type,entity_id,created_at desc);
create index if not exists audit_logs_action_created_idx on public.audit_logs(action,created_at desc);

create or replace function public.admin_get_audit_center(
  p_limit integer default 100,
  p_action text default null,
  p_entity_type text default null,
  p_actor_id uuid default null,
  p_from timestamptz default null,
  p_to timestamptz default null
)
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare r jsonb;
begin
  if not public.has_permission('audit.view') then raise exception 'Audit view permission required.'; end if;
  p_limit:=least(greatest(coalesce(p_limit,100),1),500);
  select jsonb_build_object(
    'generated_at',now(),
    'total_matches',count(*) over(),
    'events',coalesce(jsonb_agg(to_jsonb(x) order by x.created_at desc),'[]'::jsonb)
  ) into r
  from (
    select id,actor_id,action,entity_type,entity_id,metadata,created_at
    from public.audit_logs
    where (p_action is null or action=p_action)
      and (p_entity_type is null or entity_type=p_entity_type)
      and (p_actor_id is null or actor_id=p_actor_id)
      and (p_from is null or created_at>=p_from)
      and (p_to is null or created_at<p_to)
    order by created_at desc limit p_limit
  ) x;
  return coalesce(r,jsonb_build_object('generated_at',now(),'total_matches',0,'events','[]'::jsonb));
end $$;

grant execute on function public.admin_get_audit_center(integer,text,text,uuid,timestamptz,timestamptz) to authenticated;




==============================================================================
-- FILE: 024_phase25_database_operations.sql
==============================================================================

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




==============================================================================
-- FILE: 025_phase26_platform_operations.sql
==============================================================================

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




==============================================================================
-- FILE: 026_full_visual_cms.sql
==============================================================================

-- EMUNAHH-INVEST FULL VISUAL CMS
-- Run after 003_cms_rbac_v2.sql.
create extension if not exists pgcrypto;

-- Extra CMS metadata used by the no-code editor.
alter table public.cms_pages add column if not exists menu_label text;
alter table public.cms_pages add column if not exists show_in_header boolean not null default true;
alter table public.cms_pages add column if not exists show_in_footer boolean not null default true;
alter table public.cms_pages add column if not exists canonical_url text;
alter table public.cms_pages add column if not exists robots text default 'index,follow';

alter table public.cms_sections add column if not exists section_type text not null default 'content';
alter table public.cms_sections add column if not exists background text not null default 'white';
alter table public.cms_sections add column if not exists anchor_id text;

create table if not exists public.cms_revisions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  section_id uuid references public.cms_sections(id) on delete cascade,
  snapshot jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists cms_revisions_page_idx on public.cms_revisions(page_id,created_at desc);

alter table public.cms_revisions enable row level security;
drop policy if exists "cms revisions read" on public.cms_revisions;
drop policy if exists "cms revisions manage" on public.cms_revisions;
create policy "cms revisions read" on public.cms_revisions for select using (public.has_permission('content.view'));
create policy "cms revisions manage" on public.cms_revisions for all using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

-- Page metadata.
update public.cms_pages set menu_label=case slug
 when 'home' then 'Home' when 'about' then 'About' when 'student-loans' then 'Student Loans'
 when 'investments' then 'Investments' when 'business-financing' then 'Business Financing'
 when 'personal-finance' then 'Personal Finance' when 'other-services' then 'Other Services'
 when 'blog' then 'Insights' when 'contact' then 'Contact' when 'apply' then 'Apply'
 when 'privacy' then 'Privacy' when 'terms' then 'Terms' else title end
where menu_label is null;

-- Helper to upsert a section without destructive replacement.
create or replace function public.seed_cms_section(p_slug text,p_key text,p_label text,p_type text,p_content jsonb,p_order integer,p_background text default 'white')
returns void language plpgsql security definer set search_path=public as $$
declare pid uuid;
begin
 select id into pid from public.cms_pages where slug=p_slug;
 if pid is null then return; end if;
 insert into public.cms_sections(page_id,section_key,label,content,display_order,section_type,background)
 values(pid,p_key,p_label,p_content,p_order,p_type,p_background)
 on conflict(page_id,section_key) do update set
   label=excluded.label,
   section_type=excluded.section_type,
   background=excluded.background,
   content=case when public.cms_sections.content='{}'::jsonb then excluded.content else public.cms_sections.content end,
   display_order=excluded.display_order;
end $$;

-- HOME
select public.seed_cms_section('home','hero','Hero','hero',jsonb_build_object(
 'eyebrow','EMUNAHH-INVEST LIMITED','heading','Financial Solutions Designed for Your Next Chapter.','highlightWord','Next Chapter.',
 'description','Practical financial solutions for students, individuals and businesses—structured around real goals, clear terms and responsible finance.',
 'primaryCta','Explore our solutions','secondaryCta','Start an enquiry','imageUrl',''),1,'navy');
select public.seed_cms_section('home','trust','Trust strip','trust',jsonb_build_object('items',jsonb_build_array('Transparent terms','Structured solutions','Human support','Nigeria-focused')),2,'mint');
select public.seed_cms_section('home','intro','About Emunahh-Invest','split',jsonb_build_object(
 'eyebrow','WHO WE ARE','heading','Finance should create progress—not confusion.','description','Emunahh-Invest Limited provides structured financial and investment solutions for people and businesses navigating important next steps.',
 'points',jsonb_build_array('Clear documentation and repayment terms','Practical funding built around genuine needs','Professional support from enquiry to completion'),'imageUrl',''),3,'white');
select public.seed_cms_section('home','solutions','Our solutions','cards',jsonb_build_object(
 'eyebrow','WHAT WE DO','heading','Solutions built around real financial goals','description','Choose a pathway that matches the outcome you are working toward.',
 'items',jsonb_build_array(
  jsonb_build_object('title','Student Loans / Education Financing','description','Structured tuition support for eligible students and sponsors.','cta','Learn more','href','/student-loans'),
  jsonb_build_object('title','Investment Services','description','Disciplined investment opportunities designed around defined horizons and objectives.','cta','Explore investments','href','/investments'),
  jsonb_build_object('title','Business Financing','description','Working-capital support for verified enterprises and commercial operators.','cta','Explore business finance','href','/business-financing'),
  jsonb_build_object('title','Personal Finance','description','Practical liquidity solutions for eligible professionals.','cta','Explore personal finance','href','/personal-finance')
 )),4,'soft');
select public.seed_cms_section('home','process','How it works','steps',jsonb_build_object('eyebrow','A SIMPLE PROCESS','heading','From enquiry to a clear next step','steps',jsonb_build_array(
 jsonb_build_object('number','01','title','Tell us what you need','description','Submit an enquiry with the basic information required for your chosen solution.'),
 jsonb_build_object('number','02','We review the request','description','Our team reviews the information and contacts you if clarification is required.'),
 jsonb_build_object('number','03','Agree the structure','description','Eligible requests proceed to clear terms, documentation and next-step guidance.'),
 jsonb_build_object('number','04','Move forward','description','Once approved and documented, the agreed solution is executed.'
 ))),5,'white');
select public.seed_cms_section('home','why','Why Emunahh-Invest','features',jsonb_build_object('eyebrow','WHY US','heading','Professional finance with a human point of view','items',jsonb_build_array(
 jsonb_build_object('title','Clarity first','description','Information is presented in practical, understandable terms.'),
 jsonb_build_object('title','Responsible structure','description','Solutions are designed around the purpose of the funding or investment.'),
 jsonb_build_object('title','Responsive support','description','You can reach a real team throughout the process.'),
 jsonb_build_object('title','Built for Nigeria','description','Our solutions are designed around the Nigerian operating environment.')
)),6,'mint');
select public.seed_cms_section('home','faq','Frequently asked questions','faq',jsonb_build_object('items',jsonb_build_array(
 jsonb_build_object('question','How do I start an enquiry?','answer','Use the application or contact form and select the solution you are interested in.'),
 jsonb_build_object('question','Do you support student tuition payments?','answer','Yes. Eligible education-financing requests can be structured around tuition and related approved education costs.'),
 jsonb_build_object('question','Can businesses apply for financing?','answer','Yes. Business-financing requests are assessed using the information required for the relevant facility.'),
 jsonb_build_object('question','Can I speak with your team before applying?','answer','Yes. Use the contact page or WhatsApp desk to begin a conversation.')
)),7,'white');
select public.seed_cms_section('home','cta','Start your next step','cta',jsonb_build_object('heading','Have a financial goal in mind?','description','Tell us what you are working toward and let our team guide you to the appropriate next step.','buttonText','Start an enquiry','href','/contact'),8,'navy');

-- Inner service pages: every section is editable through the same editor.
select public.seed_cms_section('student-loans','hero','Page hero','hero',jsonb_build_object('eyebrow','EDUCATION FINANCING','heading','Keep your education moving forward.','description','Structured tuition financing for eligible students, sponsors and professional learners.','primaryCta','Apply / enquire','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('student-loans','overview','Overview','split',jsonb_build_object('eyebrow','STUDENT FINANCING','heading','A practical way to manage approved education costs','description','Education expenses can arrive at the wrong time. Our structured approach is designed to help eligible applicants plan tuition-related funding with clear documentation and repayment expectations.','points',jsonb_build_array('Tuition-focused funding','Clear documentation','Structured repayment','Human support'),'imageUrl',''),2,'white');
select public.seed_cms_section('student-loans','benefits','Key features','features',jsonb_build_object('eyebrow','WHAT YOU GET','heading','Built around the education journey','items',jsonb_build_array(jsonb_build_object('title','Institution-focused','description','Funding can be structured around approved institutional tuition obligations.'),jsonb_build_object('title','Clear terms','description','Repayment expectations are documented before execution.'),jsonb_build_object('title','Responsive review','description','Our team works through the information needed for assessment.'))),3,'soft');
select public.seed_cms_section('student-loans','process','Application process','steps',jsonb_build_object('eyebrow','HOW IT WORKS','heading','A clear four-step journey','steps',jsonb_build_array(jsonb_build_object('number','01','title','Submit','description','Provide the required application information.'),jsonb_build_object('number','02','title','Review','description','Our team reviews eligibility and supporting information.'),jsonb_build_object('number','03','Document','description','Eligible requests proceed to agreed documentation.'),jsonb_build_object('number','04','Execute','description','Approved tuition support is executed according to the agreed structure.'))),4,'white');
select public.seed_cms_section('student-loans','cta','Student financing CTA','cta',jsonb_build_object('heading','Ready to discuss your education funding?','description','Start an enquiry and our team will guide you through the next step.','buttonText','Start an enquiry','href','/apply'),5,'navy');

select public.seed_cms_section('investments','hero','Page hero','hero',jsonb_build_object('eyebrow','INVESTMENT SERVICES','heading','Grow capital with structure and purpose.','description','Investment solutions designed around defined goals, time horizons and disciplined decision-making.','primaryCta','Discuss an investment','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('investments','overview','Investment approach','split',jsonb_build_object('eyebrow','OUR APPROACH','heading','A disciplined approach to deploying capital','description','We focus on clarity of purpose, documented terms and an investment structure that matches the client’s objectives and horizon.','points',jsonb_build_array('Goal-aligned structures','Defined tenures','Documented terms','Ongoing communication'),'imageUrl',''),2,'white');
select public.seed_cms_section('investments','features','Investment features','features',jsonb_build_object('eyebrow','KEY FEATURES','heading','What to expect','items',jsonb_build_array(jsonb_build_object('title','Defined objectives','description','Start with the outcome and timeframe you are targeting.'),jsonb_build_object('title','Structured documentation','description','Key terms and obligations are clearly documented.'),jsonb_build_object('title','Professional communication','description','Receive practical updates and support throughout the relationship.'))),3,'soft');
select public.seed_cms_section('investments','cta','Investment CTA','cta',jsonb_build_object('heading','Let us discuss your investment objective.','description','Tell us your goals and timeframe so we can explain the relevant options.','buttonText','Start an enquiry','href','/contact'),4,'navy');

select public.seed_cms_section('business-financing','hero','Page hero','hero',jsonb_build_object('eyebrow','BUSINESS FINANCING','heading','Working capital for businesses ready to move.','description','Structured financing for eligible enterprises seeking practical support for inventory, operations and growth.','primaryCta','Apply / enquire','secondaryCta','Talk to us','imageUrl',''),1,'navy');
select public.seed_cms_section('business-financing','overview','Business financing','split',jsonb_build_object('eyebrow','BUSINESS FINANCE','heading','Funding designed around commercial reality','description','We look at the information relevant to the facility and the operating profile of the business rather than relying on a one-size-fits-all process.','points',jsonb_build_array('Working-capital needs','Inventory and supply cycles','Verified business information','Clear repayment structure'),'imageUrl',''),2,'white');
select public.seed_cms_section('business-financing','features','Business features','features',jsonb_build_object('eyebrow','WHAT WE SUPPORT','heading','Practical commercial use cases','items',jsonb_build_array(jsonb_build_object('title','Inventory restocking','description','Support eligible inventory and supply-cycle requirements.'),jsonb_build_object('title','Operational liquidity','description','Structure working-capital support for qualifying businesses.'),jsonb_build_object('title','Growth initiatives','description','Discuss financing needs connected to measurable business activity.'))),3,'soft');
select public.seed_cms_section('business-financing','cta','Business CTA','cta',jsonb_build_object('heading','Have a business funding need?','description','Share the basics of your business and the funding objective.','buttonText','Start an enquiry','href','/apply'),4,'navy');

select public.seed_cms_section('personal-finance','hero','Page hero','hero',jsonb_build_object('eyebrow','PERSONAL FINANCE','heading','Practical liquidity for important moments.','description','Personal finance solutions for eligible professionals who need a structured way to manage a genuine financial commitment.','primaryCta','Start an enquiry','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('personal-finance','overview','Personal finance overview','split',jsonb_build_object('eyebrow','PERSONAL FINANCE','heading','Clear support without unnecessary complexity','description','We help eligible applicants explore structured personal-finance options with clear documentation and repayment expectations.','points',jsonb_build_array('Purpose-led requests','Transparent terms','Structured repayment','Human review'),'imageUrl',''),2,'white');
select public.seed_cms_section('personal-finance','features','Personal finance features','features',jsonb_build_object('eyebrow','KEY FEATURES','heading','Designed for real-life commitments','items',jsonb_build_array(jsonb_build_object('title','Professional applicants','description','Solutions for qualifying professionals with verifiable income.'),jsonb_build_object('title','Plain terms','description','Understand the repayment structure before proceeding.'),jsonb_build_object('title','Human review','description','Your request is considered in context, not only by an automated score.'))),3,'soft');
select public.seed_cms_section('personal-finance','cta','Personal finance CTA','cta',jsonb_build_object('heading','Discuss your financial requirement with us.','description','Start with a short enquiry and our team will explain the next step.','buttonText','Start an enquiry','href','/apply'),4,'navy');

select public.seed_cms_section('other-services','hero','Page hero','hero',jsonb_build_object('eyebrow','OTHER SERVICES','heading','More ways to work with Emunahh-Invest.','description','Explore additional financial and advisory support available through our team.','primaryCta','Contact us','secondaryCta','Start an enquiry','imageUrl',''),1,'navy');
select public.seed_cms_section('other-services','overview','Other services','cards',jsonb_build_object('eyebrow','ADDITIONAL SUPPORT','heading','Flexible support for your financial goals','description','Talk to us about the requirement and we will direct you to the appropriate service path.','items',jsonb_build_array(jsonb_build_object('title','Financial Advisory','description','Discuss a financial requirement and understand the available route.','cta','Contact us','href','/contact'),jsonb_build_object('title','General Enquiries','description','Questions about our services, eligibility or documentation.','cta','Ask a question','href','/contact'),jsonb_build_object('title','Partnerships','description','Business and institutional partnership discussions.','cta','Discuss a partnership','href','/contact'))),2,'white');
select public.seed_cms_section('other-services','cta','Other services CTA','cta',jsonb_build_object('heading','Not sure which service fits?','description','Tell us what you are trying to achieve and we will point you in the right direction.','buttonText','Contact us','href','/contact'),3,'navy');

-- ABOUT
select public.seed_cms_section('about','hero','About hero','hero',jsonb_build_object('eyebrow','ABOUT EMUNAHH-INVEST','heading','A professional financial partner built around clarity and trust.','description','We provide structured financial and investment solutions from our Lagos base, with a focus on transparent communication and responsible execution.','primaryCta','Explore solutions','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('about','story','Our story','split',jsonb_build_object('eyebrow','OUR STORY','heading','Built to make financial conversations clearer','description','Emunahh-Invest Limited was established to provide practical financial solutions in an environment where people and businesses need clarity, speed and professional guidance.','points',jsonb_build_array('Lagos-based Nigerian company','Human-led support','Purpose-driven solutions','Professional documentation'),'imageUrl',''),2,'white');
select public.seed_cms_section('about','values','Our values','features',jsonb_build_object('eyebrow','OUR VALUES','heading','The standards behind our work','items',jsonb_build_array(jsonb_build_object('title','Integrity','description','We communicate honestly and document important terms clearly.'),jsonb_build_object('title','Professionalism','description','We approach every engagement with structure and accountability.'),jsonb_build_object('title','Accessibility','description','We make it easier to understand what is required and what happens next.'),jsonb_build_object('title','Customer focus','description','We build relationships around real goals and long-term outcomes.'))),3,'mint');
select public.seed_cms_section('about','mission','Mission & vision','cards',jsonb_build_object('items',jsonb_build_array(jsonb_build_object('title','Mission','description','To deliver transparent, dependable financial solutions that support education, personal stability and commercial progress.'),jsonb_build_object('title','Vision','description','To be recognized as a trusted Nigerian private finance house distinguished by responsible solutions and professional service.'))),4,'white');
select public.seed_cms_section('about','cta','About CTA','cta',jsonb_build_object('heading','Let us help you take the next step.','description','Explore our services or start a conversation with our team.','buttonText','Explore services','href','/'),5,'navy');

-- CONTACT / LEGAL / APPLICATION supporting editable content.
select public.seed_cms_section('contact','hero','Contact hero','hero',jsonb_build_object('eyebrow','CONTACT','heading','Let’s talk about your next financial step.','description','Reach our Lagos team by phone, email, WhatsApp or the enquiry form.','primaryCta','Send an enquiry','secondaryCta','WhatsApp us','imageUrl',''),1,'navy');
select public.seed_cms_section('contact','details','Contact details','contact',jsonb_build_object('heading','Emunahh-Invest Limited','description','33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.','phone','+234 802 319 0807','email','contact@emunahhinvest.com','hours','Monday – Friday: 8:30 AM – 5:00 PM (WAT)'),2,'white');
select public.seed_cms_section('contact','cta','Contact CTA','cta',jsonb_build_object('heading','Prefer to start online?','description','Send a short enquiry and our team will respond using the details you provide.','buttonText','Open enquiry form','href','/apply'),3,'mint');

select public.seed_cms_section('privacy','hero','Privacy header','hero',jsonb_build_object('eyebrow','LEGAL','heading','Privacy Policy','description','How Emunahh-Invest handles information submitted through this website.','primaryCta','Contact us','secondaryCta','','imageUrl',''),1,'navy');
select public.seed_cms_section('privacy','body','Privacy policy','legal',jsonb_build_object('sections',jsonb_build_array(jsonb_build_object('title','Information we collect','body','We may collect information you voluntarily provide through application, enquiry and contact forms.'),jsonb_build_object('title','How we use information','body','Information is used to respond to requests, assess submitted enquiries and provide relevant services.'),jsonb_build_object('title','Data security','body','We apply reasonable technical and organisational safeguards to protect information handled through the service.'),jsonb_build_object('title','Contact','body','For privacy questions, contact the company using the details published on the Contact page.'))),2,'white');
select public.seed_cms_section('terms','hero','Terms header','hero',jsonb_build_object('eyebrow','LEGAL','heading','Terms of Service','description','General terms governing use of this website and submission of enquiries.','primaryCta','Contact us','secondaryCta','','imageUrl',''),1,'navy');
select public.seed_cms_section('terms','body','Terms of service','legal',jsonb_build_object('sections',jsonb_build_array(jsonb_build_object('title','Website use','body','This website provides general information and enquiry facilities. Information shown is not a substitute for a formal offer or contractual document.'),jsonb_build_object('title','Applications','body','Submitting an application does not by itself create an obligation to approve or provide funding.'),jsonb_build_object('title','Accuracy','body','Applicants are responsible for providing complete and accurate information.'),jsonb_build_object('title','Contact','body','Questions about these terms can be directed to the company through the Contact page.'))),2,'white');

-- Publish only registered pages; leave application/blog as their functional specialist views.
update public.cms_pages set status='published' where slug in ('home','about','student-loans','investments','business-financing','personal-finance','other-services','contact','privacy','terms');

drop function if exists public.seed_cms_section(text,text,text,text,jsonb,integer,text);




==============================================================================
-- FILE: 027_global_cms.sql
==============================================================================

-- Global site chrome CMS: header, footer and CTA labels.
insert into public.cms_pages(slug,title,template,status,menu_label,show_in_header,show_in_footer)
values('global','Global Website Settings','global','published','Global',false,false)
on conflict(slug) do nothing;

insert into public.cms_sections(page_id,section_key,label,section_type,content,display_order,background) select id,'header','Header navigation','header',jsonb_build_object('ctaLabel','Get Started','logoUrl','', 'links',jsonb_build_array(jsonb_build_object('label','Home','href','/'),jsonb_build_object('label','About','href','/about'),jsonb_build_object('label','Student Loans','href','/student-loans'),jsonb_build_object('label','Investments','href','/investments'),jsonb_build_object('label','Business Financing','href','/business-financing'),jsonb_build_object('label','Insights','href','/blog'),jsonb_build_object('label','Contact','href','/contact'))),1,'white' from public.cms_pages where slug='global' on conflict(page_id,section_key) do nothing;
insert into public.cms_sections(page_id,section_key,label,section_type,content,display_order,background) select id,'footer','Footer','footer',jsonb_build_object('statement','Emunahh-Invest Limited is an incorporated Nigerian financial and investment company focused on structured financial solutions and professional service.','companyHeading','Company','resourcesHeading','Resources','hoursHeading','Advisory Hours','governanceHeading','Institutional Governance & Disclosures','governance','Information on this website is general in nature. Applications and facilities are subject to verification, eligibility, formal documentation and approval.'),2,'navy' from public.cms_pages where slug='global' on conflict(page_id,section_key) do nothing;




==============================================================================
-- FILE: 028_phase33_security_hardening.sql
==============================================================================

-- Phase 33 — security hardening. Non-destructive.
alter table public.profiles add column if not exists status text not null default 'active';
alter table public.profiles drop constraint if exists profiles_status_check;
alter table public.profiles add constraint profiles_status_check check (status in ('active','inactive','suspended'));
create index if not exists profiles_status_idx on public.profiles(status);
create index if not exists application_activity_created_idx on public.application_activity(created_at desc);
create index if not exists audit_logs_created_idx on public.audit_logs(created_at desc);

alter table public.media add column if not exists provider text not null default 'supabase';
alter table public.media add column if not exists public_id text;
alter table public.media add column if not exists folder text;
alter table public.media add column if not exists format text;
alter table public.media add column if not exists bytes bigint;
create index if not exists media_provider_public_id_idx on public.media(provider, public_id);




==============================================================================
-- FILE: 029_phase34_performance.sql
==============================================================================

-- Phase 34 — performance. Non-destructive.
create index if not exists applications_status_created_idx on public.applications(status, created_at desc);
create index if not exists applications_type_created_idx on public.applications(application_type, created_at desc);
create index if not exists contact_messages_status_created_idx on public.contact_messages(status, created_at desc);
create index if not exists cms_pages_status_slug_idx on public.cms_pages(status, slug);
create index if not exists cms_sections_page_enabled_order_idx on public.cms_sections(page_id, is_enabled, display_order);
create index if not exists media_created_idx on public.media(created_at desc);
create index if not exists services_published_order_idx on public.services(is_published, display_order);




==============================================================================
-- FILE: 030_phase35_testing_readiness.sql
==============================================================================

-- Phase 35 — testing/observability readiness. Non-destructive.
create index if not exists email_logs_status_created_idx on public.email_logs(status, created_at desc);
create index if not exists contact_messages_created_idx on public.contact_messages(created_at desc);
create index if not exists cms_revisions_created_idx on public.cms_revisions(created_at desc);

-- EMUNAHH-INVEST FINAL BRAND / NAVIGATION / SERVICES CORRECTION
-- Non-destructive reconciliation migration.
-- Run after the existing cumulative migrations.

-- 1. Keep the public header intentionally small and professional.
update public.cms_pages
set show_in_header = false
where slug not in ('home','about','services','blog','contact','global');

update public.cms_pages
set menu_label = case slug
  when 'home' then 'Home'
  when 'about' then 'About'
  when 'services' then 'Services'
  when 'blog' then 'Blog'
  when 'contact' then 'Contact'
  when 'privacy' then 'Privacy Policy'
  when 'terms' then 'Terms'
  else menu_label
end
where slug in ('home','about','services','blog','contact','privacy','terms');

update public.cms_pages
set show_in_header = true
where slug in ('home','about','services','blog','contact');

-- 2. Keep legal pages available in the footer, but out of the main header.
update public.cms_pages set show_in_footer = true where slug in ('privacy','terms');
update public.cms_pages set show_in_footer = false where slug in ('student-loans','investments','business-financing','personal-finance','other-services','apply','resources');

-- 3. Reconcile the service catalogue. Existing application records remain linked by UUID.
update public.services
set slug='education-financing',
    title='Education Financing',
    tagline='Structured support for education costs',
    description='Financing designed around eligible tuition and education-related obligations, with clear documentation and structured repayment.',
    bullets=jsonb_build_array('Education and tuition-related funding','Clear application and documentation process','Structured repayment expectations','Support from enquiry through completion'),
    display_order=1,
    is_published=true,
    updated_at=now()
where slug='student-loans';

update public.services
set slug='investment-services',
    title='Investment Services',
    tagline='Structured investment and wealth solutions',
    description='Investment solutions designed around objectives, time horizons, documented terms and responsible decision-making.',
    bullets=jsonb_build_array('Goal-aligned investment structures','Defined horizons and terms','Professional communication','Ongoing relationship support'),
    display_order=5,
    is_published=true,
    updated_at=now()
where slug='investments';

update public.services
set title='Business Financing',
    tagline='Working capital for growing businesses',
    description='Practical financing for verified businesses and commercial operators that need support for working capital and growth.',
    bullets=jsonb_build_array('Working-capital support','Inventory and operating needs','Business cash-flow assessment','Structured repayment terms'),
    display_order=3,
    is_published=true,
    updated_at=now()
where slug='business-financing';

update public.services
set title='Personal Finance',
    tagline='Flexible funding for eligible individuals',
    description='Responsible personal financing for eligible clients with clear terms, documentation and repayment expectations.',
    bullets=jsonb_build_array('Personal funding needs','Transparent terms','Defined repayment schedules','Human support throughout the process'),
    display_order=4,
    is_published=true,
    updated_at=now()
where slug='personal-finance';

insert into public.services(slug,title,category,tagline,description,bullets,image_url,is_published,display_order)
values
('travel-financing','Travel Financing','supporting','Funding for approved travel plans','Structured financing for eligible travel-related expenses, subject to assessment, documentation and approval.',jsonb_build_array('Travel and trip-related expenses','Clear eligibility and documentation','Defined repayment structure','Professional application support'),null,true,2)
on conflict(slug) do update set
 title=excluded.title,
 category=excluded.category,
 tagline=excluded.tagline,
 description=excluded.description,
 bullets=excluded.bullets,
 is_published=excluded.is_published,
 display_order=excluded.display_order,
 updated_at=now();

-- 4. Correct the global header. No student-loan/investment/business pages in the main menu.
update public.cms_sections
set content=jsonb_build_object(
  'ctaLabel','Start an enquiry',
  'logoUrl','',
  'links',jsonb_build_array(
    jsonb_build_object('label','Home','href','/'),
    jsonb_build_object('label','About','href','/about'),
    jsonb_build_object('label','Services','href','/services'),
    jsonb_build_object('label','Blog','href','/blog'),
    jsonb_build_object('label','Contact','href','/contact')
  )
),
updated_at=now()
where section_key='header'
  and page_id=(select id from public.cms_pages where slug='global');

-- 5. Correct the global footer and remove governance/disclosure copy from the visible footer.
update public.cms_sections
set content=jsonb_build_object(
  'statement','Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.',
  'companyHeading','Company',
  'resourcesHeading','Resources',
  'hoursHeading','Advisory Hours'
),
updated_at=now()
where section_key='footer'
  and page_id=(select id from public.cms_pages where slug='global');

-- 6. Correct the home-page CMS seed so the brand is international-facing and Services is the hub.
update public.cms_sections
set content=jsonb_build_object(
  'items',jsonb_build_array('Clear terms','Structured solutions','Professional support','International outlook')
),updated_at=now()
where page_id=(select id from public.cms_pages where slug='home') and section_key='trust';

update public.cms_sections
set content=jsonb_build_object(
  'eyebrow','WHAT WE DO',
  'heading','Financial solutions built around real goals',
  'description','Explore the services available and choose the path that best matches what you are trying to achieve.',
  'items',jsonb_build_array(
    jsonb_build_object('title','Education Financing','description','Structured support for eligible education and tuition-related costs.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Travel Financing','description','Structured support for eligible travel-related expenses.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Business Financing','description','Working-capital and commercial financing for eligible businesses.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Personal Finance','description','Responsible personal financing with clear terms and repayment expectations.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Investment Services','description','Structured investment solutions built around objectives and time horizons.','cta','Explore service','href','/services')
  )
),updated_at=now()
where page_id=(select id from public.cms_pages where slug='home') and section_key='solutions';

-- 7. Remove Nigeria-centric wording from the stored global/site content where it is the default marketing copy.
update public.site_content
set content=jsonb_set(
  jsonb_set(
    jsonb_set(content,'{hero,description}',to_jsonb('Professional financial and investment solutions for individuals, families, professionals and businesses, built around clear objectives, responsible structures and dependable support.'::text),true),
    '{about,intro}',to_jsonb('Emunahh-Invest Limited provides structured financial and investment solutions for clients navigating important personal, educational, commercial and investment decisions.'::text),true
  ),
  '{footer,statement}',to_jsonb('Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.'::text),true
),updated_at=now()
where id=1;

-- 8. Make the services page itself the central public service catalogue.
update public.cms_pages
set title='Services', menu_label='Services', show_in_header=true, show_in_footer=false, status='published'
where slug='services';

-- 9. Ensure the legacy student/investment detail pages remain reachable from service cards,
-- but never appear as main-menu items.
update public.cms_pages set show_in_header=false where slug in ('student-loans','investments','business-financing','personal-finance','other-services');

-- 10. Legal pages remain directly reachable from the footer.
update public.cms_pages set show_in_header=false, show_in_footer=true where slug in ('privacy','terms');


==============================================================================
-- FILE: 031_final_brand_navigation_services.sql
==============================================================================

-- EMUNAHH-INVEST FINAL BRAND / NAVIGATION / SERVICES CORRECTION
-- Non-destructive reconciliation migration.
-- Run after the existing cumulative migrations.

-- 1. Keep the public header intentionally small and professional.
update public.cms_pages
set show_in_header = false
where slug not in ('home','about','services','blog','contact','global');

update public.cms_pages
set menu_label = case slug
  when 'home' then 'Home'
  when 'about' then 'About'
  when 'services' then 'Services'
  when 'blog' then 'Blog'
  when 'contact' then 'Contact'
  when 'privacy' then 'Privacy Policy'
  when 'terms' then 'Terms'
  else menu_label
end
where slug in ('home','about','services','blog','contact','privacy','terms');

update public.cms_pages
set show_in_header = true
where slug in ('home','about','services','blog','contact');

-- 2. Keep legal pages available in the footer, but out of the main header.
update public.cms_pages set show_in_footer = true where slug in ('privacy','terms');
update public.cms_pages set show_in_footer = false where slug in ('student-loans','investments','business-financing','personal-finance','other-services','apply','resources');

-- 3. Reconcile the service catalogue. Existing application records remain linked by UUID.
update public.services
set slug='education-financing',
    title='Education Financing',
    tagline='Structured support for education costs',
    description='Financing designed around eligible tuition and education-related obligations, with clear documentation and structured repayment.',
    bullets=jsonb_build_array('Education and tuition-related funding','Clear application and documentation process','Structured repayment expectations','Support from enquiry through completion'),
    display_order=1,
    is_published=true,
    updated_at=now()
where slug='student-loans';

update public.services
set slug='investment-services',
    title='Investment Services',
    tagline='Structured investment and wealth solutions',
    description='Investment solutions designed around objectives, time horizons, documented terms and responsible decision-making.',
    bullets=jsonb_build_array('Goal-aligned investment structures','Defined horizons and terms','Professional communication','Ongoing relationship support'),
    display_order=5,
    is_published=true,
    updated_at=now()
where slug='investments';

update public.services
set title='Business Financing',
    tagline='Working capital for growing businesses',
    description='Practical financing for verified businesses and commercial operators that need support for working capital and growth.',
    bullets=jsonb_build_array('Working-capital support','Inventory and operating needs','Business cash-flow assessment','Structured repayment terms'),
    display_order=3,
    is_published=true,
    updated_at=now()
where slug='business-financing';

update public.services
set title='Personal Finance',
    tagline='Flexible funding for eligible individuals',
    description='Responsible personal financing for eligible clients with clear terms, documentation and repayment expectations.',
    bullets=jsonb_build_array('Personal funding needs','Transparent terms','Defined repayment schedules','Human support throughout the process'),
    display_order=4,
    is_published=true,
    updated_at=now()
where slug='personal-finance';

insert into public.services(slug,title,category,tagline,description,bullets,image_url,is_published,display_order)
values
('travel-financing','Travel Financing','supporting','Funding for approved travel plans','Structured financing for eligible travel-related expenses, subject to assessment, documentation and approval.',jsonb_build_array('Travel and trip-related expenses','Clear eligibility and documentation','Defined repayment structure','Professional application support'),null,true,2)
on conflict(slug) do update set
 title=excluded.title,
 category=excluded.category,
 tagline=excluded.tagline,
 description=excluded.description,
 bullets=excluded.bullets,
 is_published=excluded.is_published,
 display_order=excluded.display_order,
 updated_at=now();

-- 4. Correct the global header. No student-loan/investment/business pages in the main menu.
update public.cms_sections
set content=jsonb_build_object(
  'ctaLabel','Start an enquiry',
  'logoUrl','',
  'links',jsonb_build_array(
    jsonb_build_object('label','Home','href','/'),
    jsonb_build_object('label','About','href','/about'),
    jsonb_build_object('label','Services','href','/services'),
    jsonb_build_object('label','Blog','href','/blog'),
    jsonb_build_object('label','Contact','href','/contact')
  )
),
updated_at=now()
where section_key='header'
  and page_id=(select id from public.cms_pages where slug='global');

-- 5. Correct the global footer and remove governance/disclosure copy from the visible footer.
update public.cms_sections
set content=jsonb_build_object(
  'statement','Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.',
  'companyHeading','Company',
  'resourcesHeading','Resources',
  'hoursHeading','Advisory Hours'
),
updated_at=now()
where section_key='footer'
  and page_id=(select id from public.cms_pages where slug='global');

-- 6. Correct the home-page CMS seed so the brand is international-facing and Services is the hub.
update public.cms_sections
set content=jsonb_build_object(
  'items',jsonb_build_array('Clear terms','Structured solutions','Professional support','International outlook')
),updated_at=now()
where page_id=(select id from public.cms_pages where slug='home') and section_key='trust';

update public.cms_sections
set content=jsonb_build_object(
  'eyebrow','WHAT WE DO',
  'heading','Financial solutions built around real goals',
  'description','Explore the services available and choose the path that best matches what you are trying to achieve.',
  'items',jsonb_build_array(
    jsonb_build_object('title','Education Financing','description','Structured support for eligible education and tuition-related costs.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Travel Financing','description','Structured support for eligible travel-related expenses.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Business Financing','description','Working-capital and commercial financing for eligible businesses.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Personal Finance','description','Responsible personal financing with clear terms and repayment expectations.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Investment Services','description','Structured investment solutions built around objectives and time horizons.','cta','Explore service','href','/services')
  )
),updated_at=now()
where page_id=(select id from public.cms_pages where slug='home') and section_key='solutions';

-- 7. Remove Nigeria-centric wording from the stored global/site content where it is the default marketing copy.
update public.site_content
set content=jsonb_set(
  jsonb_set(
    jsonb_set(content,'{hero,description}',to_jsonb('Professional financial and investment solutions for individuals, families, professionals and businesses, built around clear objectives, responsible structures and dependable support.'::text),true),
    '{about,intro}',to_jsonb('Emunahh-Invest Limited provides structured financial and investment solutions for clients navigating important personal, educational, commercial and investment decisions.'::text),true
  ),
  '{footer,statement}',to_jsonb('Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.'::text),true
),updated_at=now()
where id=1;

-- 8. Make the services page itself the central public service catalogue.
update public.cms_pages
set title='Services', menu_label='Services', show_in_header=true, show_in_footer=false, status='published'
where slug='services';

-- 9. Ensure the legacy student/investment detail pages remain reachable from service cards,
-- but never appear as main-menu items.
update public.cms_pages set show_in_header=false where slug in ('student-loans','investments','business-financing','personal-finance','other-services');

-- 10. Legal pages remain directly reachable from the footer.
update public.cms_pages set show_in_header=false, show_in_footer=true where slug in ('privacy','terms');

-- 11. Remove Nigeria-centric marketing language from non-contact public CMS sections.
-- The office address on Contact/Privacy/Terms is intentionally left untouched.
update public.cms_sections
set content=(replace(replace(content::text,'Nigeria-focused','International outlook'),'Nigerian','international'))::jsonb,
    updated_at=now()
where page_id in (
  select id from public.cms_pages where slug in ('home','about','services','student-loans','investments','business-financing','personal-finance','other-services','blog')
)
and content::text ilike '%Niger%';
