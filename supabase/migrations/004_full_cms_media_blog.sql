-- Emunahh-Invest full CMS expansion.
-- Run after 001, 002 and 003.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content jsonb not null default '[]'::jsonb,
  featured_image_url text,
  category text,
  tags jsonb not null default '[]'::jsonb,
  author_name text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts(status);
create index if not exists blog_posts_published_idx on public.blog_posts(published_at desc);

alter table public.blog_posts enable row level security;
drop policy if exists "public read published blog posts" on public.blog_posts;
drop policy if exists "blog posts manage" on public.blog_posts;
create policy "public read published blog posts" on public.blog_posts for select using (status='published');
create policy "blog posts manage" on public.blog_posts for all using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

-- Make media metadata editable from the no-code media library.
alter table public.media add column if not exists folder text not null default 'general';
alter table public.media add column if not exists caption text;
alter table public.media add column if not exists cloudinary_public_id text;
create index if not exists media_folder_idx on public.media(folder);

-- Seed stronger CMS fields for existing routes without overwriting admin edits.
insert into public.cms_sections(page_id,section_key,label,content,display_order)
select p.id,'seo','SEO & Social Metadata',jsonb_build_object('keywords','investment, student loans, business financing, personal finance, Nigeria'),99
from public.cms_pages p
where not exists (select 1 from public.cms_sections s where s.page_id=p.id and s.section_key='seo');

-- Useful default blog records are intentionally not seeded; admins create their own published posts.
