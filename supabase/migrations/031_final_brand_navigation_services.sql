-- EMUNAHH-INVEST FINAL BRAND / NAVIGATION / SERVICES CORRECTION
-- Non-destructive reconciliation migration.
-- Run after the existing cumulative migrations.

-- 1. Keep the public header intentionally small and professional.
update public.cms_pages
set show_in_header = false
where slug not in ('home','about','services','blog','contact','global');

update public.cms_pages
set menu_label = case slug
  when 'home' then 'Home'
  when 'about' then 'About'
  when 'services' then 'Services'
  when 'blog' then 'Blog'
  when 'contact' then 'Contact'
  when 'privacy' then 'Privacy Policy'
  when 'terms' then 'Terms'
  else menu_label
end
where slug in ('home','about','services','blog','contact','privacy','terms');

update public.cms_pages
set show_in_header = true
where slug in ('home','about','services','blog','contact');

-- 2. Keep legal pages available in the footer, but out of the main header.
update public.cms_pages set show_in_footer = true where slug in ('privacy','terms');
update public.cms_pages set show_in_footer = false where slug in ('student-loans','investments','business-financing','personal-finance','other-services','apply','resources');

-- 3. Reconcile the service catalogue. Existing application records remain linked by UUID.
update public.services
set slug='education-financing',
    title='Education Financing',
    tagline='Structured support for education costs',
    description='Financing designed around eligible tuition and education-related obligations, with clear documentation and structured repayment.',
    bullets=jsonb_build_array('Education and tuition-related funding','Clear application and documentation process','Structured repayment expectations','Support from enquiry through completion'),
    display_order=1,
    is_published=true,
    updated_at=now()
where slug='student-loans';

update public.services
set slug='investment-services',
    title='Investment Services',
    tagline='Structured investment and wealth solutions',
    description='Investment solutions designed around objectives, time horizons, documented terms and responsible decision-making.',
    bullets=jsonb_build_array('Goal-aligned investment structures','Defined horizons and terms','Professional communication','Ongoing relationship support'),
    display_order=5,
    is_published=true,
    updated_at=now()
where slug='investments';

update public.services
set title='Business Financing',
    tagline='Working capital for growing businesses',
    description='Practical financing for verified businesses and commercial operators that need support for working capital and growth.',
    bullets=jsonb_build_array('Working-capital support','Inventory and operating needs','Business cash-flow assessment','Structured repayment terms'),
    display_order=3,
    is_published=true,
    updated_at=now()
where slug='business-financing';

update public.services
set title='Personal Finance',
    tagline='Flexible funding for eligible individuals',
    description='Responsible personal financing for eligible clients with clear terms, documentation and repayment expectations.',
    bullets=jsonb_build_array('Personal funding needs','Transparent terms','Defined repayment schedules','Human support throughout the process'),
    display_order=4,
    is_published=true,
    updated_at=now()
where slug='personal-finance';

insert into public.services(slug,title,category,tagline,description,bullets,image_url,is_published,display_order)
values
('travel-financing','Travel Financing','supporting','Funding for approved travel plans','Structured financing for eligible travel-related expenses, subject to assessment, documentation and approval.',jsonb_build_array('Travel and trip-related expenses','Clear eligibility and documentation','Defined repayment structure','Professional application support'),null,true,2)
on conflict(slug) do update set
 title=excluded.title,
 category=excluded.category,
 tagline=excluded.tagline,
 description=excluded.description,
 bullets=excluded.bullets,
 is_published=excluded.is_published,
 display_order=excluded.display_order,
 updated_at=now();

-- 4. Correct the global header. No student-loan/investment/business pages in the main menu.
update public.cms_sections
set content=jsonb_build_object(
  'ctaLabel','Start an enquiry',
  'logoUrl','',
  'links',jsonb_build_array(
    jsonb_build_object('label','Home','href','/'),
    jsonb_build_object('label','About','href','/about'),
    jsonb_build_object('label','Services','href','/services'),
    jsonb_build_object('label','Blog','href','/blog'),
    jsonb_build_object('label','Contact','href','/contact')
  )
),
updated_at=now()
where section_key='header'
  and page_id=(select id from public.cms_pages where slug='global');

-- 5. Correct the global footer and remove governance/disclosure copy from the visible footer.
update public.cms_sections
set content=jsonb_build_object(
  'statement','Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.',
  'companyHeading','Company',
  'resourcesHeading','Resources',
  'hoursHeading','Advisory Hours'
),
updated_at=now()
where section_key='footer'
  and page_id=(select id from public.cms_pages where slug='global');

-- 6. Correct the home-page CMS seed so the brand is international-facing and Services is the hub.
update public.cms_sections
set content=jsonb_build_object(
  'items',jsonb_build_array('Clear terms','Structured solutions','Professional support','International outlook')
),updated_at=now()
where page_id=(select id from public.cms_pages where slug='home') and section_key='trust';

update public.cms_sections
set content=jsonb_build_object(
  'eyebrow','WHAT WE DO',
  'heading','Financial solutions built around real goals',
  'description','Explore the services available and choose the path that best matches what you are trying to achieve.',
  'items',jsonb_build_array(
    jsonb_build_object('title','Education Financing','description','Structured support for eligible education and tuition-related costs.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Travel Financing','description','Structured support for eligible travel-related expenses.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Business Financing','description','Working-capital and commercial financing for eligible businesses.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Personal Finance','description','Responsible personal financing with clear terms and repayment expectations.','cta','Explore service','href','/services'),
    jsonb_build_object('title','Investment Services','description','Structured investment solutions built around objectives and time horizons.','cta','Explore service','href','/services')
  )
),updated_at=now()
where page_id=(select id from public.cms_pages where slug='home') and section_key='solutions';

-- 7. Remove Nigeria-centric wording from the stored global/site content where it is the default marketing copy.
update public.site_content
set content=jsonb_set(
  jsonb_set(
    jsonb_set(content,'{hero,description}',to_jsonb('Professional financial and investment solutions for individuals, families, professionals and businesses, built around clear objectives, responsible structures and dependable support.'::text),true),
    '{about,intro}',to_jsonb('Emunahh-Invest Limited provides structured financial and investment solutions for clients navigating important personal, educational, commercial and investment decisions.'::text),true
  ),
  '{footer,statement}',to_jsonb('Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.'::text),true
),updated_at=now()
where id=1;

-- 8. Make the services page itself the central public service catalogue.
update public.cms_pages
set title='Services', menu_label='Services', show_in_header=true, show_in_footer=false, status='published'
where slug='services';

-- 9. Ensure the legacy student/investment detail pages remain reachable from service cards,
-- but never appear as main-menu items.
update public.cms_pages set show_in_header=false where slug in ('student-loans','investments','business-financing','personal-finance','other-services');

-- 10. Legal pages remain directly reachable from the footer.
update public.cms_pages set show_in_header=false, show_in_footer=true where slug in ('privacy','terms');

-- 11. Remove Nigeria-centric marketing language from non-contact public CMS sections.
-- The office address on Contact/Privacy/Terms is intentionally left untouched.
update public.cms_sections
set content=(replace(replace(content::text,'Nigeria-focused','International outlook'),'Nigerian','international'))::jsonb,
    updated_at=now()
where page_id in (
  select id from public.cms_pages where slug in ('home','about','services','student-loans','investments','business-financing','personal-finance','other-services','blog')
)
and content::text ilike '%Niger%';
