-- ============================================================
-- EMUNAHH-INVEST PHASE 7
-- INSIGHTS / BLOG EDITORIAL SYSTEM
-- Run AFTER 032_phase6_trust_governance_content.sql
-- Non-destructive. Does not alter existing applications/services data.
-- ============================================================

begin;

-- -----------------------------------------------------------------------------
-- PREFLIGHT
-- -----------------------------------------------------------------------------
do $preflight$
begin
  if to_regclass('public.cms_pages') is null then
    raise exception 'Phase 7 requires the existing CMS schema.';
  end if;
  if to_regprocedure('public.has_permission(text)') is null then
    raise exception 'Phase 7 requires public.has_permission(text).';
  end if;
end
$preflight$;

-- -----------------------------------------------------------------------------
-- EDITORIAL TAXONOMY
-- -----------------------------------------------------------------------------
create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_authors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  role_title text,
  bio text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  category_id uuid references public.blog_categories(id) on delete set null,
  author_id uuid references public.blog_authors(id) on delete set null,
  hero_image_url text,
  hero_image_alt text,
  status text not null default 'draft' check (status in ('draft','scheduled','published','archived')),
  is_featured boolean not null default false,
  tags text[] not null default '{}',
  reading_time_minutes integer not null default 5 check (reading_time_minutes between 1 and 120),
  seo_title text,
  seo_description text,
  canonical_url text,
  og_image_url text,
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_publication_idx
  on public.blog_posts(status, published_at desc);
create index if not exists blog_posts_category_idx
  on public.blog_posts(category_id, published_at desc);
create index if not exists blog_posts_author_idx
  on public.blog_posts(author_id, published_at desc);
create index if not exists blog_posts_featured_idx
  on public.blog_posts(is_featured, published_at desc);
create index if not exists blog_posts_tags_gin_idx
  on public.blog_posts using gin(tags);
create index if not exists blog_categories_order_idx
  on public.blog_categories(is_active, display_order, name);

create or replace function public.touch_editorial_updated_at()
returns trigger
language plpgsql
set search_path=public
as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists blog_categories_touch_updated_at on public.blog_categories;
create trigger blog_categories_touch_updated_at
before update on public.blog_categories
for each row execute function public.touch_editorial_updated_at();

drop trigger if exists blog_authors_touch_updated_at on public.blog_authors;
create trigger blog_authors_touch_updated_at
before update on public.blog_authors
for each row execute function public.touch_editorial_updated_at();

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at
before update on public.blog_posts
for each row execute function public.touch_editorial_updated_at();

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- -----------------------------------------------------------------------------
alter table public.blog_categories enable row level security;
alter table public.blog_authors enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "public read blog categories" on public.blog_categories;
create policy "public read blog categories"
on public.blog_categories for select
using (is_active = true);

drop policy if exists "manage blog categories" on public.blog_categories;
create policy "manage blog categories"
on public.blog_categories for all to authenticated
using (public.has_permission('content.update'))
with check (public.has_permission('content.update'));

drop policy if exists "public read blog authors" on public.blog_authors;
create policy "public read blog authors"
on public.blog_authors for select
using (is_active = true);

drop policy if exists "manage blog authors" on public.blog_authors;
create policy "manage blog authors"
on public.blog_authors for all to authenticated
using (public.has_permission('content.update'))
with check (public.has_permission('content.update'));

drop policy if exists "public read published blog posts" on public.blog_posts;
create policy "public read published blog posts"
on public.blog_posts for select
using (
  status in ('published','scheduled')
  and published_at is not null
  and published_at <= now()
);

drop policy if exists "manage blog posts" on public.blog_posts;
create policy "manage blog posts"
on public.blog_posts for all to authenticated
using (public.has_permission('content.update'))
with check (public.has_permission('content.update'));

grant select on public.blog_categories, public.blog_authors, public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_categories, public.blog_authors, public.blog_posts to authenticated;

-- -----------------------------------------------------------------------------
-- INITIAL TAXONOMY
-- -----------------------------------------------------------------------------
insert into public.blog_categories(slug,name,description,display_order)
values
  ('financial-planning','Financial Planning','Practical guidance for clearer personal and household financial decisions.',1),
  ('education-financing','Education Financing','Perspectives on preparing, structuring and managing education-related financial commitments.',2),
  ('investment-perspectives','Investment Perspectives','Disciplined thinking around objectives, risk, liquidity and investment decision-making.',3),
  ('business-enterprise','Business & Enterprise','Funding, working-capital and financial planning considerations for businesses.',4),
  ('personal-finance','Personal Finance','Practical considerations for responsible personal financial decisions.',5),
  ('travel-mobility','Travel & Mobility','Financial planning considerations for eligible travel-related commitments.',6)
on conflict(slug) do nothing;

insert into public.blog_authors(slug,name,role_title,bio,is_active)
values (
  'emunahh-invest-editorial-team',
  'Emunahh-Invest Editorial Team',
  'Insights & Research',
  'The Emunahh-Invest editorial team publishes general educational perspectives designed to support clearer financial conversations. Content is general information and is not a substitute for personalised professional advice.',
  true
)
on conflict(slug) do nothing;

-- -----------------------------------------------------------------------------
-- MIGRATE THE EXISTING HARD-CODED ARTICLES INTO THE EDITORIAL CMS
-- -----------------------------------------------------------------------------
insert into public.blog_posts(
  slug,title,excerpt,body,category_id,author_id,status,is_featured,tags,
  reading_time_minutes,seo_title,seo_description,published_at
)
select
  'approaching-education-financing-responsibly',
  'How to Approach Education Financing Responsibly',
  'A practical guide to understanding education-financing applications, documentation and repayment expectations.',
  E'Education and professional development can require significant upfront funding at important moments. Registration deadlines, tuition schedules and examination fees can also arrive before a household has planned for the full cash requirement.\n\n## Start with the purpose and timing\nA responsible education-financing process should begin with a clear understanding of the programme, institution, fee obligation, applicant or sponsor profile and the timing of the commitment. The appropriate structure depends on assessment, documentation and approval.\n\n## Prepare the supporting information\nUseful documentation can include admission or enrolment evidence, an official fee invoice, identification and information that helps demonstrate repayment capacity.\n\n## Keep repayment realistic\nWhen considering repayment, align the proposed schedule with realistic and documented income or sponsor cash-flow patterns rather than optimistic assumptions.\n\nThe objective is not simply to obtain funding. It is to structure the obligation in a way that can be understood, documented and managed responsibly.',
  (select id from public.blog_categories where slug='education-financing'),
  (select id from public.blog_authors where slug='emunahh-invest-editorial-team'),
  'published',true,array['education','planning','documentation'],5,
  'How to Approach Education Financing Responsibly | Emunahh-Invest',
  'Practical guidance on preparing for education financing, documentation, timing and responsible repayment planning.',
  '2026-09-12 09:00:00+00'
where not exists (select 1 from public.blog_posts where slug='approaching-education-financing-responsibly');

insert into public.blog_posts(
  slug,title,excerpt,body,category_id,author_id,status,is_featured,tags,
  reading_time_minutes,seo_title,seo_description,published_at
)
select
  'capital-preservation-disciplined-investment-approach',
  'Capital Preservation: Building a Disciplined Investment Approach',
  'Why disciplined investment planning matters and how objectives, time horizons, liquidity and risk shape long-term capital decisions.',
  E'Managing capital in uncertain markets requires discipline, clear objectives and an understanding of risk. Decisions should not be based on promotional return claims without considering the underlying structure, liquidity and downside exposure.\n\n## Define the objective first\nA disciplined investment process begins by defining the objective, time horizon, liquidity needs and risk tolerance, then reviewing the terms and underlying exposure of any opportunity before making a decision.\n\n## Separate liquidity from long-term capital\nSeparating near-term liquidity needs from longer-term investment capital can help investors avoid committing funds that may be required unexpectedly and can support a more deliberate portfolio structure.\n\n## Understand the arrangement\nBefore committing capital, investors should understand who they are dealing with, what documentation governs the arrangement, how reporting works and what risks or restrictions may apply.\n\nInvestment values can rise or fall. No investment decision should be made solely on the basis of a headline return or promotional statement.',
  (select id from public.blog_categories where slug='investment-perspectives'),
  (select id from public.blog_authors where slug='emunahh-invest-editorial-team'),
  'published',false,array['investing','risk','liquidity'],6,
  'Capital Preservation and Disciplined Investing | Emunahh-Invest',
  'A general perspective on investment objectives, liquidity, risk and disciplined capital decision-making.',
  '2026-08-20 09:00:00+00'
where not exists (select 1 from public.blog_posts where slug='capital-preservation-disciplined-investment-approach');

insert into public.blog_posts(
  slug,title,excerpt,body,category_id,author_id,status,is_featured,tags,
  reading_time_minutes,seo_title,seo_description,published_at
)
select
  'working-capital-vs-asset-finance',
  'Working Capital vs. Asset Finance: Matching Funding to the Business Need',
  'Understanding how financing structure should match the business cash-flow cycle can reduce unnecessary strain and support more sustainable decisions.',
  E'Business operators can experience a growth paradox: sales are increasing and orders are booked, but cash remains tied up in receivables, stock or the operating cycle.\n\n## Match the funding to the purpose\nWhen evaluating financing, distinguish between short-cycle working-capital needs and longer-lived asset or expansion requirements. The financing term should be appropriate for the purpose and expected cash-generation period.\n\n## Consider the cash-flow cycle\nUsing a long-term facility for a short seasonal requirement can increase total financing cost, while relying on very short-term credit for a long-lived asset can pressure operating cash flow.\n\n## Look beyond the amount\nAssessment should consider the purpose, timing, repayment capacity and expected cash-flow pattern together. The right question is not only how much funding is available, but whether the structure fits the underlying commercial need.',
  (select id from public.blog_categories where slug='business-enterprise'),
  (select id from public.blog_authors where slug='emunahh-invest-editorial-team'),
  'published',false,array['business','working-capital','cash-flow'],5,
  'Working Capital vs Asset Finance | Emunahh-Invest',
  'A practical explanation of matching working-capital and asset-finance structures to business cash-flow needs.',
  '2026-07-18 09:00:00+00'
where not exists (select 1 from public.blog_posts where slug='working-capital-vs-asset-finance');

insert into public.blog_posts(
  slug,title,excerpt,body,category_id,author_id,status,is_featured,tags,
  reading_time_minutes,seo_title,seo_description,published_at
)
select
  'sponsor-guide-education-financing',
  'Sponsor Guide: Structuring Education Financing Responsibly',
  'What sponsors and families should consider when supporting an education-financing commitment.',
  E'Supporting a student or learner can require careful planning when large tuition or education commitments fall due at once.\n\n## Understand the full commitment\nSponsors considering education financing should understand the total obligation, repayment schedule and affordability implications before accepting any arrangement.\n\n## Plan around real cash flow\nThe repayment structure should be considered alongside existing household commitments and realistic income patterns.\n\n## Read the documentation\nSponsors should review the formal documentation carefully, understand their responsibilities and ask questions before proceeding. A responsible commitment is one that is clearly understood by everyone involved.',
  (select id from public.blog_categories where slug='education-financing'),
  (select id from public.blog_authors where slug='emunahh-invest-editorial-team'),
  'published',false,array['education','sponsor','repayment'],4,
  'Sponsor Guide to Education Financing | Emunahh-Invest',
  'General guidance for sponsors considering an education-financing commitment and repayment responsibilities.',
  '2026-06-10 09:00:00+00'
where not exists (select 1 from public.blog_posts where slug='sponsor-guide-education-financing');

-- -----------------------------------------------------------------------------
-- BLOG PAGE CMS METADATA
-- -----------------------------------------------------------------------------
update public.cms_pages
set title='Insights',
    menu_label='Insights',
    template='blog',
    status='published',
    show_in_header=true,
    seo_title='Insights | Emunahh-Invest',
    seo_description='General perspectives on financial planning, education financing, business funding and disciplined investment decision-making.',
    robots='index,follow'
where slug='blog';

-- -----------------------------------------------------------------------------
-- VALIDATION
-- -----------------------------------------------------------------------------
do $validation$
begin
  if to_regclass('public.blog_posts') is null
     or to_regclass('public.blog_categories') is null
     or to_regclass('public.blog_authors') is null then
    raise exception 'Phase 7 validation failed: editorial tables are missing.';
  end if;

  if (select count(*) from public.blog_categories) < 6 then
    raise exception 'Phase 7 validation failed: expected initial blog categories.';
  end if;

  if not exists (select 1 from public.blog_authors where slug='emunahh-invest-editorial-team') then
    raise exception 'Phase 7 validation failed: default editorial author is missing.';
  end if;

  if (select count(*) from public.blog_posts where status='published') < 4 then
    raise exception 'Phase 7 validation failed: initial published articles are missing.';
  end if;
end
$validation$;

commit;

select 'Phase 7 editorial tables' as check_item,
       case when to_regclass('public.blog_posts') is not null then 'PASS' else 'FAIL' end as status
union all
select 'Initial categories',
       case when (select count(*) from public.blog_categories) >= 6 then 'PASS' else 'FAIL' end
union all
select 'Editorial author',
       case when exists (select 1 from public.blog_authors where slug='emunahh-invest-editorial-team') then 'PASS' else 'FAIL' end
union all
select 'Published seed articles',
       case when (select count(*) from public.blog_posts where status='published') >= 4 then 'PASS' else 'FAIL' end;
