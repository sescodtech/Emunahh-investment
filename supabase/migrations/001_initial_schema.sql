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
