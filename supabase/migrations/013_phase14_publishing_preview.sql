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
