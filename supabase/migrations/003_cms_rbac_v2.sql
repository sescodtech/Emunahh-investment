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
