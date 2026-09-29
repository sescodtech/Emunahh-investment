-- Phase 35 — testing/observability readiness. Non-destructive.
create index if not exists email_logs_status_created_idx on public.email_logs(status, created_at desc);
create index if not exists contact_messages_created_idx on public.contact_messages(created_at desc);
create index if not exists cms_revisions_created_idx on public.cms_revisions(created_at desc);
