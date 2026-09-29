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

