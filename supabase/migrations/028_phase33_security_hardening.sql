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
