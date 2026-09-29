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

