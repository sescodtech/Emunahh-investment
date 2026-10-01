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
