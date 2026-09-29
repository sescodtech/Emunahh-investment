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
