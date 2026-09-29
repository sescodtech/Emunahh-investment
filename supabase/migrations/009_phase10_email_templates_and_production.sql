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

