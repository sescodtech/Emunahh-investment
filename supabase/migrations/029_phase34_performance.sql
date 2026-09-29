-- Phase 34 — performance. Non-destructive.
create index if not exists applications_status_created_idx on public.applications(status, created_at desc);
create index if not exists applications_type_created_idx on public.applications(application_type, created_at desc);
create index if not exists contact_messages_status_created_idx on public.contact_messages(status, created_at desc);
create index if not exists cms_pages_status_slug_idx on public.cms_pages(status, slug);
create index if not exists cms_sections_page_enabled_order_idx on public.cms_sections(page_id, is_enabled, display_order);
create index if not exists media_created_idx on public.media(created_at desc);
create index if not exists services_published_order_idx on public.services(is_published, display_order);
