-- EMUNAHH-INVEST
-- RECONCILED PHASE 004 + 005 REPAIR
-- Intended for a database where 001-003 were run and 004/005 may have been run fully or partially.
-- Non-destructive: does not drop application/content data.
-- Main reconciliations:
--   1) Preserve existing media provider values, but make Cloudinary the default for NEW media.
--   2) Keep one canonical media management policy.
--   3) Remove the older Phase 003 application audit trigger before installing the Phase 005 workflow trigger,
--      preventing duplicate activity rows on status/assignment changes.
--   4) Reapply Phase 005 workflow columns/functions/policies safely.

begin;

-- -----------------------------------------------------------------------------
-- PREFLIGHT: 001-003 must already exist.
-- -----------------------------------------------------------------------------
do $$
begin
  if to_regclass('public.media') is null then
    raise exception 'Missing public.media. Run/repair migration 001 first.';
  end if;
  if to_regclass('public.site_content') is null then
    raise exception 'Missing public.site_content. Run/repair migration 001 first.';
  end if;
  if to_regclass('public.cms_pages') is null then
    raise exception 'Missing public.cms_pages. Migration 003 is not complete.';
  end if;
  if to_regclass('public.cms_sections') is null then
    raise exception 'Missing public.cms_sections. Migration 003 is not complete.';
  end if;
  if to_regclass('public.applications') is null then
    raise exception 'Missing public.applications. Run/repair migration 001 first.';
  end if;
  if to_regclass('public.contact_messages') is null then
    raise exception 'Missing public.contact_messages. Migration 003 is not complete.';
  end if;
  if to_regclass('public.email_logs') is null then
    raise exception 'Missing public.email_logs. Run/repair migration 001 first.';
  end if;
  if to_regclass('public.application_notes') is null then
    raise exception 'Missing public.application_notes. Run/repair migration 001 first.';
  end if;
  if to_regclass('public.application_activity') is null then
    raise exception 'Missing public.application_activity. Run/repair migration 001 first.';
  end if;
  if to_regclass('public.user_roles') is null
     or to_regclass('public.roles') is null
     or to_regclass('public.permissions') is null
     or to_regclass('public.role_permissions') is null then
    raise exception 'RBAC tables are missing. Migration 003 is not complete.';
  end if;
  if to_regprocedure('public.has_permission(text)') is null then
    raise exception 'public.has_permission(text) is missing. Migration 003 is not complete.';
  end if;
end $$;

-- =============================================================================
-- PHASE 004 RECONCILIATION — VISUAL CMS + MEDIA / CLOUDINARY FOUNDATION
-- =============================================================================

-- Add provider as nullable first so existing rows can be labelled safely.
alter table public.media add column if not exists provider text;
alter table public.media add column if not exists provider_asset_id text;
alter table public.media add column if not exists folder text;
alter table public.media add column if not exists alt_text text;
alter table public.media add column if not exists width integer;
alter table public.media add column if not exists height integer;
alter table public.media add column if not exists format text;

-- Existing legacy media records came from the original Supabase-media structure.
-- Keep their provider identity. Do not rewrite real existing Supabase assets as Cloudinary.
update public.media
set provider = 'supabase'
where provider is null or btrim(provider) = '';

-- Final project is Cloudinary-first for NEW uploads.
alter table public.media alter column provider set default 'cloudinary';
alter table public.media alter column provider set not null;

create index if not exists media_provider_asset_idx
  on public.media(provider, provider_asset_id);

-- Keep existing live site_content intact.
insert into public.site_content(id,content)
values (1,'{}'::jsonb)
on conflict (id) do nothing;

-- Register the core public routes without overwriting content already created in Phase 003.
insert into public.cms_pages(slug,title,template,status)
values
 ('home','Home','home','published'),
 ('about','About','standard','published'),
 ('services','Services','services','published'),
 ('blog','Blog','blog','published'),
 ('contact','Contact','contact','published'),
 ('apply','Apply','application','published'),
 ('terms','Terms of Service','legal','published'),
 ('privacy','Privacy Policy','legal','published')
on conflict(slug) do nothing;

-- Register the Phase 004 section slots without replacing any section content already stored.
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
 ('blog','posts','Blog',1),
 ('contact','contact-details','Contact Details',1),
 ('contact','contact-form','Contact Form',2),
 ('apply','application-form','Application Form',1),
 ('terms','legal-content','Terms Content',1),
 ('privacy','legal-content','Privacy Content',1)
) as v(slug,section_key,label,display_order) on v.slug=p.slug
on conflict(page_id,section_key) do nothing;

-- Reconcile media policies to one canonical management policy.
-- Drop both the Phase 003 and old Phase 004 policy names before recreating.
drop policy if exists "admin editor manage media" on public.media;
drop policy if exists "media management" on public.media;
drop policy if exists "media manage" on public.media;

create policy "media manage" on public.media for all
using (public.has_permission('media.manage'))
with check (public.has_permission('media.manage'));

drop policy if exists "public media read" on public.media;
create policy "public media read" on public.media for select using (true);

-- =============================================================================
-- PHASE 005 RECONCILIATION — APPLICATIONS / INBOX / NOTIFICATIONS / EMAIL WORKFLOW
-- =============================================================================

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

-- Safe permission check for trusted server/Edge Function operations.
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
    where ur.user_id=target_user
      and pr.status='active'
      and p.key=permission_key
  ) or exists (
    select 1
    from public.profiles pr
    where pr.id=target_user
      and pr.status='active'
      and pr.role='super_admin'
  );
$$;

revoke all on function public.user_has_permission(uuid,text) from public;
grant execute on function public.user_has_permission(uuid,text) to service_role;

-- Atomic notification claim.
create or replace function public.claim_submission_notification(kind text, target_id uuid)
returns boolean
language plpgsql security definer set search_path=public
as $$
declare
  claimed boolean := false;
begin
  if kind='application' then
    update public.applications
       set notification_sent_at=now()
     where id=target_id
       and notification_sent_at is null
    returning true into claimed;
  elsif kind='contact' then
    update public.contact_messages
       set notification_sent_at=now()
     where id=target_id
       and notification_sent_at is null
    returning true into claimed;
  else
    raise exception 'Unsupported submission kind';
  end if;

  return coalesce(claimed,false);
end $$;

revoke all on function public.claim_submission_notification(text,uuid) from public;
grant execute on function public.claim_submission_notification(text,uuid) to service_role;

-- Canonical workflow audit function.
create or replace function public.audit_application_workflow()
returns trigger
language plpgsql security definer set search_path=public
as $$
begin
  if old.status is distinct from new.status then
    insert into public.application_activity(application_id,actor_id,action,metadata)
    values(
      new.id,
      auth.uid(),
      'STATUS_CHANGED',
      jsonb_build_object('from',old.status,'to',new.status,'reason',new.decision_reason)
    );
  end if;

  if old.assigned_to is distinct from new.assigned_to then
    insert into public.application_activity(application_id,actor_id,action,metadata)
    values(
      new.id,
      auth.uid(),
      'ASSIGNED',
      jsonb_build_object('from',old.assigned_to,'to',new.assigned_to)
    );
  end if;

  return new;
end $$;

-- IMPORTANT REPAIR:
-- Phase 003 installed applications_audit_trigger and the old Phase 005 added another trigger.
-- Keep only the Phase 005 workflow trigger so one change creates one workflow audit record.
drop trigger if exists applications_audit_trigger on public.applications;
drop trigger if exists applications_workflow_audit on public.applications;
create trigger applications_workflow_audit
after update on public.applications
for each row execute function public.audit_application_workflow();

-- Remove any legacy broad update policy name and install canonical RBAC update policy.
drop policy if exists "staff update applications" on public.applications;
drop policy if exists "applications update" on public.applications;
create policy "applications update" on public.applications for update
using (public.has_permission('applications.update'))
with check (public.has_permission('applications.update'));

-- Contact inbox workflow remains permission controlled.
drop policy if exists "contact update" on public.contact_messages;
create policy "contact update" on public.contact_messages for update
using (public.has_permission('applications.update'))
with check (public.has_permission('applications.update'));

-- Harden note creation so staff can only create a note attributed to their own authenticated user.
drop policy if exists "staff create notes" on public.application_notes;
drop policy if exists "application notes create" on public.application_notes;
create policy "application notes create" on public.application_notes for insert
with check (
  public.has_permission('applications.update')
  and author_id=auth.uid()
);

commit;

-- =============================================================================
-- VERIFICATION OUTPUT — these SELECTs do not change data.
-- =============================================================================

-- A. Cloudinary should now be the DEFAULT for new media; existing rows are preserved.
select
  'media_provider_default' as check_name,
  column_default as result
from information_schema.columns
where table_schema='public'
  and table_name='media'
  and column_name='provider';

-- B. Required Phase 005 workflow columns should all be present.
select
  'phase005_application_columns' as check_name,
  count(*) filter (where column_name in (
    'notification_sent_at','decision_reason','reviewed_at','reviewed_by','decision_at','decision_by'
  )) as found_columns,
  6 as expected_columns
from information_schema.columns
where table_schema='public'
  and table_name='applications';

-- C. Only the canonical Phase 005 application workflow trigger should remain from these two phases.
select
  'application_workflow_triggers' as check_name,
  trigger_name as result
from information_schema.triggers
where event_object_schema='public'
  and event_object_table='applications'
  and trigger_name in ('applications_audit_trigger','applications_workflow_audit')
order by trigger_name;

-- D. Confirm the important Phase 004/005 policies.
select
  'phase004_005_policies' as check_name,
  tablename || ' :: ' || policyname as result
from pg_policies
where schemaname='public'
  and (
    (tablename='media' and policyname in ('media manage','public media read'))
    or (tablename='applications' and policyname='applications update')
    or (tablename='contact_messages' and policyname='contact update')
    or (tablename='application_notes' and policyname='application notes create')
  )
order by tablename,policyname;

-- E. Confirm the server-side helper functions exist.
select
  'phase005_functions' as check_name,
  p.proname as result
from pg_proc p
join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public'
  and p.proname in ('user_has_permission','claim_submission_notification','audit_application_workflow')
order by p.proname;
