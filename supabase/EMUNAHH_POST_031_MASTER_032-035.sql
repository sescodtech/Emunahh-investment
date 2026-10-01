-- EMUNAHH-INVEST POST-031 MASTER: 032 -> 035
-- USE ONLY when SQL_STATE_CHECK_031-035 shows 032, 033, 034 and 035 are ALL MISSING.
-- If any later phase already shows PASS, run only the specific missing migration(s) instead.

-- ============================================================
-- EMUNAHH-INVEST — PHASE 6
-- 032_phase6_trust_governance_content.sql
--
-- Purpose:
--   * Register Trust & Security and Disclosures as CMS-managed pages.
--   * Reconcile About, Privacy and Terms content with the institutional brand.
--   * Preserve the successful 001-031 schema and application data.
--
-- IMPORTANT:
--   * Run ONLY after the successful reconciled 001-031 database state.
--   * Do NOT rerun 001-031.
-- ============================================================

begin;

-- ---------------------------------------------------------------------------
-- PRE-FLIGHT
-- ---------------------------------------------------------------------------
do $preflight$
begin
  if to_regclass('public.cms_pages') is null or to_regclass('public.cms_sections') is null then
    raise exception 'Phase 6 requires the existing CMS schema from migrations 001-031.';
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='cms_pages' and column_name='show_in_footer'
  ) then
    raise exception 'Phase 6 requires the final CMS page metadata from the successful 001-031 state.';
  end if;
end
$preflight$;

-- ---------------------------------------------------------------------------
-- PAGE REGISTRY
-- ---------------------------------------------------------------------------
insert into public.cms_pages(
  slug,title,template,status,menu_label,show_in_header,show_in_footer,robots
)
values
  ('trust-security','Trust & Security','standard','published','Trust & Security',false,true,'index,follow'),
  ('disclosures','Disclosures','standard','published','Disclosures',false,true,'index,follow')
on conflict(slug) do update set
  title=excluded.title,
  template=excluded.template,
  status='published',
  menu_label=excluded.menu_label,
  show_in_header=false,
  show_in_footer=true,
  robots='index,follow';

-- ---------------------------------------------------------------------------
-- ABOUT PAGE — institutional, geography-neutral positioning
-- ---------------------------------------------------------------------------
insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'hero','About hero','hero',jsonb_build_object(
  'eyebrow','ABOUT EMUNAHH-INVEST',
  'heading','A professional financial partner built around clarity and trust.',
  'description','Emunahh-Invest Limited provides structured financial and investment solutions for clients navigating important personal, educational, commercial and investment decisions.'
),true,1,'navy'
from public.cms_pages where slug='about'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'story','Our approach','split',jsonb_build_object(
  'eyebrow','OUR APPROACH',
  'heading','Financial relationships should be built on clarity, structure and accountability.',
  'description','Our approach combines clear communication, responsible assessment, documented terms and practical support from enquiry through completion.',
  'points',jsonb_build_array(
    'Clear documentation and expectations',
    'Professional support through each stage',
    'Purpose-led financial solutions',
    'Responsible assessment and decision-making'
  )
),true,2,'white'
from public.cms_pages where slug='about'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'values','Service standards','features',jsonb_build_object(
  'eyebrow','SERVICE STANDARDS',
  'heading','The standards behind our work',
  'items',jsonb_build_array(
    jsonb_build_object('title','Clarity','description','Important requirements, terms and next steps are explained as clearly as possible.'),
    jsonb_build_object('title','Professionalism','description','Each engagement is handled with structure, care and accountability.'),
    jsonb_build_object('title','Responsibility','description','Services are approached around genuine objectives, supporting information and documented obligations.'),
    jsonb_build_object('title','Client focus','description','We organise financial conversations around the client objective and the relevant service path.')
  )
),true,3,'soft'
from public.cms_pages where slug='about'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'governance','Governance principles','features',jsonb_build_object(
  'heading','Governance in the client journey',
  'description','Good governance is reflected in how information is handled, how decisions are documented and how responsibilities remain clear through the service lifecycle.',
  'items',jsonb_build_array(
    jsonb_build_object('title','Documented process','description','Material requirements, decisions and next steps should be captured clearly enough to support consistent follow-through.'),
    jsonb_build_object('title','Access & accountability','description','Administrative access should be role-based, and sensitive operational changes should be attributable through controlled workflows and audit records.'),
    jsonb_build_object('title','Formal terms prevail','description','General website information supports discovery and enquiries; approved transaction or service documentation governs the specific engagement.'),
    jsonb_build_object('title','Security & escalation','description','Unusual requests, suspected impersonation and information-security concerns should be verified and escalated through published channels.')
  )
),true,5,'soft'
from public.cms_pages where slug='about'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'mission','Mission & direction','cards',jsonb_build_object(
  'items',jsonb_build_array(
    jsonb_build_object('title','Mission','description','To provide dependable financial solutions that help clients make progress with confidence.'),
    jsonb_build_object('title','Direction','description','To build a trusted financial and investment brand known for professional service, responsible structures and clear communication.')
  )
),true,4,'white'
from public.cms_pages where slug='about'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

-- ---------------------------------------------------------------------------
-- TRUST & SECURITY
-- ---------------------------------------------------------------------------
insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'hero','Trust & Security hero','hero',jsonb_build_object(
  'eyebrow','TRUST & SECURITY',
  'heading','Protecting the integrity of every client interaction.',
  'description','Financial decisions deserve careful verification. Practical security habits help reduce fraud, impersonation and information-security risk.'
),true,1,'navy'
from public.cms_pages where slug='trust-security'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'principles','Security principles','features',jsonb_build_object(
  'heading','Verify before you act',
  'description','Independent verification is one of the strongest protections against impersonation and payment fraud.',
  'items',jsonb_build_array(
    'Use only contact details and website addresses published through official Emunahh-Invest channels.',
    'Do not share passwords, PINs, one-time codes or full payment-card credentials with anyone.',
    'Treat unexpected requests to move money, change payment details or bypass normal documentation with caution.',
    'Review documents, recipient details and payment instructions carefully before acting.',
    'Report suspicious messages or unusual requests using the published client-enquiries channel.'
  )
),true,2,'white'
from public.cms_pages where slug='trust-security'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'reporting','Suspicious activity','cta',jsonb_build_object(
  'heading','If something does not look right, verify before proceeding.',
  'description','Pause unusual financial instructions and independently verify the request through the published contact channel.'
),true,3,'soft'
from public.cms_pages where slug='trust-security'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

-- ---------------------------------------------------------------------------
-- DISCLOSURES
-- ---------------------------------------------------------------------------
insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'hero','Disclosures hero','hero',jsonb_build_object(
  'eyebrow','IMPORTANT INFORMATION',
  'heading','Disclosures & important information',
  'description','How to interpret general information published on this website and the limits of an online enquiry or application.'
),true,1,'soft'
from public.cms_pages where slug='disclosures'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'items','Core disclosures','legal',jsonb_build_object(
  'items',jsonb_build_array(
    jsonb_build_object('title','General information only','description','Website content is provided for general information and enquiry purposes and should not be treated as personalised financial, legal, tax or investment advice.'),
    jsonb_build_object('title','No automatic approval or offer','description','Submitting an enquiry or application does not create an obligation to provide financing, accept an investment instruction or enter into a contract.'),
    jsonb_build_object('title','Investment risk','description','Where investment services are discussed, values and outcomes can vary. General examples or past results should not be interpreted as a guarantee of future results.'),
    jsonb_build_object('title','Accuracy and availability','description','Services, criteria, documentation requirements and availability may change. Formal documentation takes precedence over general website content.')
  )
),true,2,'white'
from public.cms_pages where slug='disclosures'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'decision','Decision-making','legal',jsonb_build_object(
  'heading','Read the formal terms before committing.',
  'paragraphs',jsonb_build_array(
    'Any formal facility, investment arrangement or other service relationship should be governed by the relevant approved documentation, not by a general website summary.',
    'Clients should review the applicable structure, costs, responsibilities, timing, risks and conditions and ask for clarification before proceeding.',
    'If website information conflicts with formal documentation issued for a specific engagement, the formal documentation should be reviewed as the authoritative source for that engagement.'
  )
),true,3,'navy'
from public.cms_pages where slug='disclosures'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

-- ---------------------------------------------------------------------------
-- PRIVACY + TERMS — richer legal defaults for the dedicated legal layouts
-- ---------------------------------------------------------------------------
insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'body','Privacy policy','legal',jsonb_build_object(
  'sections',jsonb_build_array(
    jsonb_build_object('title','Information we collect','body','We may collect information you choose to provide through enquiry, application, contact and administrative forms, together with technical information reasonably required to operate and secure the website.'),
    jsonb_build_object('title','How information is used','body','Information may be used to respond to requests, assess submitted enquiries, administer services, communicate about a request, maintain records, improve service delivery and support security or legal obligations.'),
    jsonb_build_object('title','Sharing and service providers','body','Information may be processed by service providers that support website hosting, communications, document handling or other operational functions, subject to appropriate access controls and applicable obligations.'),
    jsonb_build_object('title','Data security','body','We use reasonable technical and organisational measures designed to reduce unauthorised access, loss, misuse or disclosure. No online system can guarantee absolute security.'),
    jsonb_build_object('title','Retention','body','Information is retained for as long as reasonably necessary for the purpose for which it was collected, operational requirements, dispute management, record-keeping or applicable legal obligations.'),
    jsonb_build_object('title','Your choices','body','You may contact us to ask a privacy question, request correction of inaccurate information or raise a concern about how information submitted through the website is handled, subject to applicable requirements.')
  )
),true,2,'white'
from public.cms_pages where slug='privacy'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

insert into public.cms_sections(page_id,section_key,label,section_type,content,is_enabled,display_order,background)
select id,'body','Terms of service','legal',jsonb_build_object(
  'sections',jsonb_build_array(
    jsonb_build_object('title','Website use','body','This website provides general information, service descriptions and enquiry facilities. Use of the website does not by itself create a client relationship, financing agreement, investment mandate or other contract.'),
    jsonb_build_object('title','Applications and enquiries','body','Submitting information does not guarantee eligibility, approval, availability, pricing or any other outcome. Additional information, verification, documentation and assessment may be required.'),
    jsonb_build_object('title','Information accuracy','body','You are responsible for ensuring that information you submit is complete and accurate. You should review important details before submitting an application or acting on financial instructions.'),
    jsonb_build_object('title','Intellectual property','body','Website content, branding, layouts and materials may be protected by intellectual-property rights. They should not be reproduced or represented as another party’s material without appropriate permission.'),
    jsonb_build_object('title','Third-party services','body','The website may rely on or link to third-party services. Their availability, security, content and terms are controlled by the relevant provider.'),
    jsonb_build_object('title','Changes','body','Website information and these terms may be updated from time to time. The version published on the website should be reviewed when using the service.')
  )
),true,2,'white'
from public.cms_pages where slug='terms'
on conflict(page_id,section_key) do update set
  label=excluded.label,section_type=excluded.section_type,content=excluded.content,is_enabled=true,display_order=excluded.display_order,background=excluded.background;

-- Avoid duplicate legacy legal blocks being shown in the admin CMS.
update public.cms_sections s
set is_enabled=false
where s.section_key='legal-content'
  and s.page_id in (select id from public.cms_pages where slug in ('privacy','terms'));

commit;

-- ---------------------------------------------------------------------------
-- STATUS REPORT
-- ---------------------------------------------------------------------------
select 'Phase 6 CMS pages' as check_item,
       case when (select count(*) from public.cms_pages where slug in ('trust-security','disclosures') and status='published')=2 then 'PASS' else 'FAIL' end as status
union all
select 'Phase 6 footer pages',
       case when (select count(*) from public.cms_pages where slug in ('trust-security','disclosures') and show_in_footer=true)=2 then 'PASS' else 'FAIL' end
union all
select 'About institutional content',
       case when exists (
         select 1 from public.cms_sections s join public.cms_pages p on p.id=s.page_id
         where p.slug='about' and s.section_key='hero' and s.is_enabled=true
       ) then 'PASS' else 'FAIL' end
union all
select 'Legal body sections',
       case when (
         select count(*) from public.cms_sections s join public.cms_pages p on p.id=s.page_id
         where p.slug in ('privacy','terms') and s.section_key='body' and s.is_enabled=true
       )=2 then 'PASS' else 'FAIL' end;

-- ===== NEXT: 033 =====

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

-- ===== NEXT: 034 =====

-- EMUNAHH-INVEST
-- Phase 8 + 9: Admin professionalisation + SEO/platform metadata
-- Run AFTER 033_phase7_insights_editorial_system.sql
-- Non-destructive. Does not rerun or replace migrations 001-033.

begin;

-- -----------------------------------------------------------------------------
-- PHASE 8: controlled application workflow mutation
-- -----------------------------------------------------------------------------
create or replace function public.admin_update_application_workflow(
  target_id uuid,
  new_status text,
  new_assignee uuid default null,
  reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  actor uuid:=auth.uid();
  old_status text;
  old_assignee uuid;
begin
  if actor is null or not public.has_permission('applications.update') then
    raise exception 'Application update permission required.';
  end if;

  if new_status not in ('NEW','REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED') then
    raise exception 'Invalid application status.';
  end if;

  select status,assigned_to into old_status,old_assignee
  from public.applications where id=target_id;
  if not found then raise exception 'Application not found.'; end if;

  update public.applications
  set status=new_status,
      assigned_to=new_assignee,
      reviewed_at=case when new_status in ('REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED')
                       then coalesce(reviewed_at,now()) else reviewed_at end,
      reviewed_by=case when new_status in ('REVIEWING','CONTACTED','PROCESSING','COMPLETED','DECLINED','CLOSED')
                       then coalesce(reviewed_by,actor) else reviewed_by end,
      decision_at=case when new_status in ('COMPLETED','DECLINED','CLOSED') then now() else decision_at end,
      decision_by=case when new_status in ('COMPLETED','DECLINED','CLOSED') then actor else decision_by end,
      decision_reason=case when reason is not null and length(trim(reason))>0 then trim(reason) else decision_reason end
  where id=target_id;

  insert into public.audit_logs(actor_id,action,entity_type,entity_id,metadata)
  values(actor,'APPLICATION_WORKFLOW_UPDATED','application',target_id::text,
    jsonb_build_object('from_status',old_status,'to_status',new_status,'from_assignee',old_assignee,'to_assignee',new_assignee,'reason',reason));

  return jsonb_build_object('success',true,'status',new_status);
end $$;

revoke all on function public.admin_update_application_workflow(uuid,text,uuid,text) from public;
grant execute on function public.admin_update_application_workflow(uuid,text,uuid,text) to authenticated;

-- -----------------------------------------------------------------------------
-- PHASE 9: site-wide SEO defaults / social metadata
-- -----------------------------------------------------------------------------
alter table public.site_settings add column if not exists default_seo_title text;
alter table public.site_settings add column if not exists default_seo_description text;
alter table public.site_settings add column if not exists default_og_image_url text;
alter table public.site_settings add column if not exists social_linkedin_url text;
alter table public.site_settings add column if not exists social_x_url text;

update public.site_settings
set default_seo_title=coalesce(nullif(default_seo_title,''),'Emunahh-Invest Limited | Structured Financial & Investment Solutions'),
    default_seo_description=coalesce(nullif(default_seo_description,''),'Structured financial and investment solutions with professional service, clear communication and responsible execution.')
where id=1;

-- Gives the admin a quick, permission-protected SEO/content quality snapshot.
create or replace function public.admin_get_seo_health()
returns jsonb
language plpgsql
stable
security definer
set search_path=public
as $$
declare
  total_pages integer;
  missing_title integer;
  missing_description integer;
  missing_canonical integer;
  noindex_pages integer;
begin
  if auth.uid() is null or not (public.has_permission('content.view') or public.has_permission('content.update')) then
    raise exception 'Content access required.';
  end if;

  select count(*) into total_pages from public.cms_pages where status='published';
  select count(*) into missing_title from public.cms_pages where status='published' and coalesce(trim(seo_title),'')='';
  select count(*) into missing_description from public.cms_pages where status='published' and coalesce(trim(seo_description),'')='';
  select count(*) into missing_canonical from public.cms_pages where status='published' and coalesce(trim(canonical_url),'')='';
  select count(*) into noindex_pages from public.cms_pages where status='published' and coalesce(robots,'index,follow') ilike '%noindex%';

  return jsonb_build_object(
    'published_pages',total_pages,
    'missing_seo_titles',missing_title,
    'missing_seo_descriptions',missing_description,
    'missing_canonicals',missing_canonical,
    'noindex_pages',noindex_pages
  );
end $$;

revoke all on function public.admin_get_seo_health() from public;
grant execute on function public.admin_get_seo_health() to authenticated;

-- -----------------------------------------------------------------------------
-- Validation
-- -----------------------------------------------------------------------------
do $$
begin
  if to_regprocedure('public.admin_update_application_workflow(uuid,text,uuid,text)') is null then
    raise exception 'Validation failed: application workflow RPC missing.';
  end if;
  if to_regprocedure('public.admin_get_seo_health()') is null then
    raise exception 'Validation failed: SEO health RPC missing.';
  end if;
  if not exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='default_seo_title') then
    raise exception 'Validation failed: SEO settings columns missing.';
  end if;
end $$;

commit;

select 'Phase 8 controlled application workflow' as check_item,
       case when to_regprocedure('public.admin_update_application_workflow(uuid,text,uuid,text)') is not null then 'PASS' else 'FAIL' end as status
union all
select 'Phase 9 SEO defaults',
       case when exists(select 1 from information_schema.columns where table_schema='public' and table_name='site_settings' and column_name='default_seo_title') then 'PASS' else 'FAIL' end
union all
select 'Phase 9 SEO health RPC',
       case when to_regprocedure('public.admin_get_seo_health()') is not null then 'PASS' else 'FAIL' end;
-- ============================================================
-- EMUNAHH-INVEST — MIGRATION 035
-- Secure application-document storage controls
-- Run after 034_phase8_9_admin_seo_professionalisation.sql.
-- Non-destructive. Does not move/delete existing application documents.
-- ============================================================

begin;

alter table public.site_settings
  add column if not exists document_uploads_enabled boolean not null default false,
  add column if not exists document_storage_provider text not null default 'disabled',
  add column if not exists document_test_mode boolean not null default true,
  add column if not exists document_max_size_mb integer not null default 10,
  add column if not exists document_allowed_extensions text not null default 'pdf,jpg,jpeg,png,webp',
  add column if not exists document_cloudinary_folder text not null default 'emunahh-invest/applications',
  add column if not exists document_google_drive_folder_id text;

alter table public.site_settings drop constraint if exists site_settings_document_storage_provider_check;
alter table public.site_settings
  add constraint site_settings_document_storage_provider_check
  check (document_storage_provider in ('disabled','cloudinary','google_drive'));

alter table public.site_settings drop constraint if exists site_settings_document_max_size_check;
alter table public.site_settings
  add constraint site_settings_document_max_size_check
  check (document_max_size_mb between 1 and 25);

alter table public.application_documents
  add column if not exists provider text not null default 'legacy',
  add column if not exists provider_file_id text,
  add column if not exists provider_asset_id text,
  add column if not exists resource_type text,
  add column if not exists format text,
  add column if not exists storage_status text not null default 'stored',
  add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.application_documents drop constraint if exists application_documents_provider_check;
alter table public.application_documents
  add constraint application_documents_provider_check
  check (provider in ('legacy','test','cloudinary','google_drive'));

alter table public.application_documents drop constraint if exists application_documents_storage_status_check;
alter table public.application_documents
  add constraint application_documents_storage_status_check
  check (storage_status in ('stored','test','failed'));

create index if not exists application_documents_provider_idx
  on public.application_documents(provider, created_at desc);

create index if not exists application_documents_type_idx
  on public.application_documents(application_id, document_type, created_at desc);

create or replace function public.get_public_document_upload_config()
returns jsonb
language sql
stable
security definer
set search_path=public
as $$
  select jsonb_build_object(
    'enabled', coalesce(document_uploads_enabled,false) and document_storage_provider <> 'disabled',
    'test_mode', coalesce(document_test_mode,true),
    'max_size_mb', greatest(1,least(coalesce(document_max_size_mb,10),25)),
    'allowed_extensions', coalesce(document_allowed_extensions,'pdf,jpg,jpeg,png,webp')
  )
  from public.site_settings
  where id=1
$$;

grant execute on function public.get_public_document_upload_config() to anon, authenticated;

-- Ensure a sensible safe default on existing installations.
update public.site_settings
set document_storage_provider = coalesce(nullif(document_storage_provider,''),'disabled'),
    document_test_mode = coalesce(document_test_mode,true),
    document_max_size_mb = greatest(1,least(coalesce(document_max_size_mb,10),25)),
    document_allowed_extensions = coalesce(nullif(document_allowed_extensions,''),'pdf,jpg,jpeg,png,webp'),
    document_cloudinary_folder = coalesce(nullif(document_cloudinary_folder,''),'emunahh-invest/applications')
where id=1;

commit;

select '035 document settings columns' as check_item,
       case when exists (
         select 1 from information_schema.columns
         where table_schema='public' and table_name='site_settings' and column_name='document_storage_provider'
       ) then 'PASS' else 'FAIL' end as status
union all
select '035 application document provider metadata',
       case when exists (
         select 1 from information_schema.columns
         where table_schema='public' and table_name='application_documents' and column_name='provider_file_id'
       ) then 'PASS' else 'FAIL' end
union all
select '035 public upload config RPC',
       case when to_regprocedure('public.get_public_document_upload_config()') is not null then 'PASS' else 'FAIL' end;
