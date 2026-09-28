-- EMUNAHH-INVEST FULL VISUAL CMS
-- Run after 003_cms_rbac_v2.sql.
create extension if not exists pgcrypto;

-- Extra CMS metadata used by the no-code editor.
alter table public.cms_pages add column if not exists menu_label text;
alter table public.cms_pages add column if not exists show_in_header boolean not null default true;
alter table public.cms_pages add column if not exists show_in_footer boolean not null default true;
alter table public.cms_pages add column if not exists canonical_url text;
alter table public.cms_pages add column if not exists robots text default 'index,follow';

alter table public.cms_sections add column if not exists section_type text not null default 'content';
alter table public.cms_sections add column if not exists background text not null default 'white';
alter table public.cms_sections add column if not exists anchor_id text;

create table if not exists public.cms_revisions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  section_id uuid references public.cms_sections(id) on delete cascade,
  snapshot jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists cms_revisions_page_idx on public.cms_revisions(page_id,created_at desc);

alter table public.cms_revisions enable row level security;
drop policy if exists "cms revisions read" on public.cms_revisions;
drop policy if exists "cms revisions manage" on public.cms_revisions;
create policy "cms revisions read" on public.cms_revisions for select using (public.has_permission('content.view'));
create policy "cms revisions manage" on public.cms_revisions for all using (public.has_permission('content.update')) with check (public.has_permission('content.update'));

-- Page metadata.
update public.cms_pages set menu_label=case slug
 when 'home' then 'Home' when 'about' then 'About' when 'student-loans' then 'Student Loans'
 when 'investments' then 'Investments' when 'business-financing' then 'Business Financing'
 when 'personal-finance' then 'Personal Finance' when 'other-services' then 'Other Services'
 when 'blog' then 'Insights' when 'contact' then 'Contact' when 'apply' then 'Apply'
 when 'privacy' then 'Privacy' when 'terms' then 'Terms' else title end
where menu_label is null;

-- Helper to upsert a section without destructive replacement.
create or replace function public.seed_cms_section(p_slug text,p_key text,p_label text,p_type text,p_content jsonb,p_order integer,p_background text default 'white')
returns void language plpgsql security definer set search_path=public as $$
declare pid uuid;
begin
 select id into pid from public.cms_pages where slug=p_slug;
 if pid is null then return; end if;
 insert into public.cms_sections(page_id,section_key,label,content,display_order,section_type,background)
 values(pid,p_key,p_label,p_content,p_order,p_type,p_background)
 on conflict(page_id,section_key) do update set
   label=excluded.label,
   section_type=excluded.section_type,
   background=excluded.background,
   content=case when public.cms_sections.content='{}'::jsonb then excluded.content else public.cms_sections.content end,
   display_order=excluded.display_order;
end $$;

-- HOME
select public.seed_cms_section('home','hero','Hero','hero',jsonb_build_object(
 'eyebrow','EMUNAHH-INVEST LIMITED','heading','Financial Solutions Designed for Your Next Chapter.','highlightWord','Next Chapter.',
 'description','Practical financial solutions for students, individuals and businesses—structured around real goals, clear terms and responsible finance.',
 'primaryCta','Explore our solutions','secondaryCta','Start an enquiry','imageUrl',''),1,'navy');
select public.seed_cms_section('home','trust','Trust strip','trust',jsonb_build_object('items',jsonb_build_array('Transparent terms','Structured solutions','Human support','Nigeria-focused')),2,'mint');
select public.seed_cms_section('home','intro','About Emunahh-Invest','split',jsonb_build_object(
 'eyebrow','WHO WE ARE','heading','Finance should create progress—not confusion.','description','Emunahh-Invest Limited provides structured financial and investment solutions for people and businesses navigating important next steps.',
 'points',jsonb_build_array('Clear documentation and repayment terms','Practical funding built around genuine needs','Professional support from enquiry to completion'),'imageUrl',''),3,'white');
select public.seed_cms_section('home','solutions','Our solutions','cards',jsonb_build_object(
 'eyebrow','WHAT WE DO','heading','Solutions built around real financial goals','description','Choose a pathway that matches the outcome you are working toward.',
 'items',jsonb_build_array(
  jsonb_build_object('title','Student Loans / Education Financing','description','Structured tuition support for eligible students and sponsors.','cta','Learn more','href','/student-loans'),
  jsonb_build_object('title','Investment Services','description','Disciplined investment opportunities designed around defined horizons and objectives.','cta','Explore investments','href','/investments'),
  jsonb_build_object('title','Business Financing','description','Working-capital support for verified enterprises and commercial operators.','cta','Explore business finance','href','/business-financing'),
  jsonb_build_object('title','Personal Finance','description','Practical liquidity solutions for eligible professionals.','cta','Explore personal finance','href','/personal-finance')
 )),4,'soft');
select public.seed_cms_section('home','process','How it works','steps',jsonb_build_object('eyebrow','A SIMPLE PROCESS','heading','From enquiry to a clear next step','steps',jsonb_build_array(
 jsonb_build_object('number','01','title','Tell us what you need','description','Submit an enquiry with the basic information required for your chosen solution.'),
 jsonb_build_object('number','02','title','We review the request','description','Our team reviews the information and contacts you if clarification is required.'),
 jsonb_build_object('number','03','title','Agree the structure','description','Eligible requests proceed to clear terms, documentation and next-step guidance.'),
 jsonb_build_object('number','04','title','Move forward','description','Once approved and documented, the agreed solution is executed.'
 ))),5,'white');
select public.seed_cms_section('home','why','Why Emunahh-Invest','features',jsonb_build_object('eyebrow','WHY US','heading','Professional finance with a human point of view','items',jsonb_build_array(
 jsonb_build_object('title','Clarity first','description','Information is presented in practical, understandable terms.'),
 jsonb_build_object('title','Responsible structure','description','Solutions are designed around the purpose of the funding or investment.'),
 jsonb_build_object('title','Responsive support','description','You can reach a real team throughout the process.'),
 jsonb_build_object('title','Built for Nigeria','description','Our solutions are designed around the Nigerian operating environment.')
)),6,'mint');
select public.seed_cms_section('home','faq','Frequently asked questions','faq',jsonb_build_object('items',jsonb_build_array(
 jsonb_build_object('question','How do I start an enquiry?','answer','Use the application or contact form and select the solution you are interested in.'),
 jsonb_build_object('question','Do you support student tuition payments?','answer','Yes. Eligible education-financing requests can be structured around tuition and related approved education costs.'),
 jsonb_build_object('question','Can businesses apply for financing?','answer','Yes. Business-financing requests are assessed using the information required for the relevant facility.'),
 jsonb_build_object('question','Can I speak with your team before applying?','answer','Yes. Use the contact page or WhatsApp desk to begin a conversation.')
)),7,'white');
select public.seed_cms_section('home','cta','Start your next step','cta',jsonb_build_object('heading','Have a financial goal in mind?','description','Tell us what you are working toward and let our team guide you to the appropriate next step.','buttonText','Start an enquiry','href','/contact'),8,'navy');

-- Inner service pages: every section is editable through the same editor.
select public.seed_cms_section('student-loans','hero','Page hero','hero',jsonb_build_object('eyebrow','EDUCATION FINANCING','heading','Keep your education moving forward.','description','Structured tuition financing for eligible students, sponsors and professional learners.','primaryCta','Apply / enquire','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('student-loans','overview','Overview','split',jsonb_build_object('eyebrow','STUDENT FINANCING','heading','A practical way to manage approved education costs','description','Education expenses can arrive at the wrong time. Our structured approach is designed to help eligible applicants plan tuition-related funding with clear documentation and repayment expectations.','points',jsonb_build_array('Tuition-focused funding','Clear documentation','Structured repayment','Human support'),'imageUrl',''),2,'white');
select public.seed_cms_section('student-loans','benefits','Key features','features',jsonb_build_object('eyebrow','WHAT YOU GET','heading','Built around the education journey','items',jsonb_build_array(jsonb_build_object('title','Institution-focused','description','Funding can be structured around approved institutional tuition obligations.'),jsonb_build_object('title','Clear terms','description','Repayment expectations are documented before execution.'),jsonb_build_object('title','Responsive review','description','Our team works through the information needed for assessment.'))),3,'soft');
select public.seed_cms_section('student-loans','process','Application process','steps',jsonb_build_object('eyebrow','HOW IT WORKS','heading','A clear four-step journey','steps',jsonb_build_array(jsonb_build_object('number','01','title','Submit','description','Provide the required application information.'),jsonb_build_object('number','02','title','Review','description','Our team reviews eligibility and supporting information.'),jsonb_build_object('number','03','title','Document','description','Eligible requests proceed to agreed documentation.'),jsonb_build_object('number','04','title','Execute','description','Approved tuition support is executed according to the agreed structure.'))),4,'white');
select public.seed_cms_section('student-loans','cta','Student financing CTA','cta',jsonb_build_object('heading','Ready to discuss your education funding?','description','Start an enquiry and our team will guide you through the next step.','buttonText','Start an enquiry','href','/apply'),5,'navy');

select public.seed_cms_section('investments','hero','Page hero','hero',jsonb_build_object('eyebrow','INVESTMENT SERVICES','heading','Grow capital with structure and purpose.','description','Investment solutions designed around defined goals, time horizons and disciplined decision-making.','primaryCta','Discuss an investment','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('investments','overview','Investment approach','split',jsonb_build_object('eyebrow','OUR APPROACH','heading','A disciplined approach to deploying capital','description','We focus on clarity of purpose, documented terms and an investment structure that matches the client’s objectives and horizon.','points',jsonb_build_array('Goal-aligned structures','Defined tenures','Documented terms','Ongoing communication'),'imageUrl',''),2,'white');
select public.seed_cms_section('investments','features','Investment features','features',jsonb_build_object('eyebrow','KEY FEATURES','heading','What to expect','items',jsonb_build_array(jsonb_build_object('title','Defined objectives','description','Start with the outcome and timeframe you are targeting.'),jsonb_build_object('title','Structured documentation','description','Key terms and obligations are clearly documented.'),jsonb_build_object('title','Professional communication','description','Receive practical updates and support throughout the relationship.'))),3,'soft');
select public.seed_cms_section('investments','cta','Investment CTA','cta',jsonb_build_object('heading','Let us discuss your investment objective.','description','Tell us your goals and timeframe so we can explain the relevant options.','buttonText','Start an enquiry','href','/contact'),4,'navy');

select public.seed_cms_section('business-financing','hero','Page hero','hero',jsonb_build_object('eyebrow','BUSINESS FINANCING','heading','Working capital for businesses ready to move.','description','Structured financing for eligible enterprises seeking practical support for inventory, operations and growth.','primaryCta','Apply / enquire','secondaryCta','Talk to us','imageUrl',''),1,'navy');
select public.seed_cms_section('business-financing','overview','Business financing','split',jsonb_build_object('eyebrow','BUSINESS FINANCE','heading','Funding designed around commercial reality','description','We look at the information relevant to the facility and the operating profile of the business rather than relying on a one-size-fits-all process.','points',jsonb_build_array('Working-capital needs','Inventory and supply cycles','Verified business information','Clear repayment structure'),'imageUrl',''),2,'white');
select public.seed_cms_section('business-financing','features','Business features','features',jsonb_build_object('eyebrow','WHAT WE SUPPORT','heading','Practical commercial use cases','items',jsonb_build_array(jsonb_build_object('title','Inventory restocking','description','Support eligible inventory and supply-cycle requirements.'),jsonb_build_object('title','Operational liquidity','description','Structure working-capital support for qualifying businesses.'),jsonb_build_object('title','Growth initiatives','description','Discuss financing needs connected to measurable business activity.'))),3,'soft');
select public.seed_cms_section('business-financing','cta','Business CTA','cta',jsonb_build_object('heading','Have a business funding need?','description','Share the basics of your business and the funding objective.','buttonText','Start an enquiry','href','/apply'),4,'navy');

select public.seed_cms_section('personal-finance','hero','Page hero','hero',jsonb_build_object('eyebrow','PERSONAL FINANCE','heading','Practical liquidity for important moments.','description','Personal finance solutions for eligible professionals who need a structured way to manage a genuine financial commitment.','primaryCta','Start an enquiry','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('personal-finance','overview','Personal finance overview','split',jsonb_build_object('eyebrow','PERSONAL FINANCE','heading','Clear support without unnecessary complexity','description','We help eligible applicants explore structured personal-finance options with clear documentation and repayment expectations.','points',jsonb_build_array('Purpose-led requests','Transparent terms','Structured repayment','Human review'),'imageUrl',''),2,'white');
select public.seed_cms_section('personal-finance','features','Personal finance features','features',jsonb_build_object('eyebrow','KEY FEATURES','heading','Designed for real-life commitments','items',jsonb_build_array(jsonb_build_object('title','Professional applicants','description','Solutions for qualifying professionals with verifiable income.'),jsonb_build_object('title','Plain terms','description','Understand the repayment structure before proceeding.'),jsonb_build_object('title','Human review','description','Your request is considered in context, not only by an automated score.'))),3,'soft');
select public.seed_cms_section('personal-finance','cta','Personal finance CTA','cta',jsonb_build_object('heading','Discuss your financial requirement with us.','description','Start with a short enquiry and our team will explain the next step.','buttonText','Start an enquiry','href','/apply'),4,'navy');

select public.seed_cms_section('other-services','hero','Page hero','hero',jsonb_build_object('eyebrow','OTHER SERVICES','heading','More ways to work with Emunahh-Invest.','description','Explore additional financial and advisory support available through our team.','primaryCta','Contact us','secondaryCta','Start an enquiry','imageUrl',''),1,'navy');
select public.seed_cms_section('other-services','overview','Other services','cards',jsonb_build_object('eyebrow','ADDITIONAL SUPPORT','heading','Flexible support for your financial goals','description','Talk to us about the requirement and we will direct you to the appropriate service path.','items',jsonb_build_array(jsonb_build_object('title','Financial Advisory','description','Discuss a financial requirement and understand the available route.','cta','Contact us','href','/contact'),jsonb_build_object('title','General Enquiries','description','Questions about our services, eligibility or documentation.','cta','Ask a question','href','/contact'),jsonb_build_object('title','Partnerships','description','Business and institutional partnership discussions.','cta','Discuss a partnership','href','/contact'))),2,'white');
select public.seed_cms_section('other-services','cta','Other services CTA','cta',jsonb_build_object('heading','Not sure which service fits?','description','Tell us what you are trying to achieve and we will point you in the right direction.','buttonText','Contact us','href','/contact'),3,'navy');

-- ABOUT
select public.seed_cms_section('about','hero','About hero','hero',jsonb_build_object('eyebrow','ABOUT EMUNAHH-INVEST','heading','A professional financial partner built around clarity and trust.','description','We provide structured financial and investment solutions from our Lagos base, with a focus on transparent communication and responsible execution.','primaryCta','Explore solutions','secondaryCta','Contact us','imageUrl',''),1,'navy');
select public.seed_cms_section('about','story','Our story','split',jsonb_build_object('eyebrow','OUR STORY','heading','Built to make financial conversations clearer','description','Emunahh-Invest Limited was established to provide practical financial solutions in an environment where people and businesses need clarity, speed and professional guidance.','points',jsonb_build_array('Lagos-based Nigerian company','Human-led support','Purpose-driven solutions','Professional documentation'),'imageUrl',''),2,'white');
select public.seed_cms_section('about','values','Our values','features',jsonb_build_object('eyebrow','OUR VALUES','heading','The standards behind our work','items',jsonb_build_array(jsonb_build_object('title','Integrity','description','We communicate honestly and document important terms clearly.'),jsonb_build_object('title','Professionalism','description','We approach every engagement with structure and accountability.'),jsonb_build_object('title','Accessibility','description','We make it easier to understand what is required and what happens next.'),jsonb_build_object('title','Customer focus','description','We build relationships around real goals and long-term outcomes.'))),3,'mint');
select public.seed_cms_section('about','mission','Mission & vision','cards',jsonb_build_object('items',jsonb_build_array(jsonb_build_object('title','Mission','description','To deliver transparent, dependable financial solutions that support education, personal stability and commercial progress.'),jsonb_build_object('title','Vision','description','To be recognized as a trusted Nigerian private finance house distinguished by responsible solutions and professional service.'))),4,'white');
select public.seed_cms_section('about','cta','About CTA','cta',jsonb_build_object('heading','Let us help you take the next step.','description','Explore our services or start a conversation with our team.','buttonText','Explore services','href','/'),5,'navy');

-- CONTACT / LEGAL / APPLICATION supporting editable content.
select public.seed_cms_section('contact','hero','Contact hero','hero',jsonb_build_object('eyebrow','CONTACT','heading','Let’s talk about your next financial step.','description','Reach our Lagos team by phone, email, WhatsApp or the enquiry form.','primaryCta','Send an enquiry','secondaryCta','WhatsApp us','imageUrl',''),1,'navy');
select public.seed_cms_section('contact','details','Contact details','contact',jsonb_build_object('heading','Emunahh-Invest Limited','description','33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.','phone','+234 802 319 0807','email','contact@emunahhinvest.com','hours','Monday – Friday: 8:30 AM – 5:00 PM (WAT)'),2,'white');
select public.seed_cms_section('contact','cta','Contact CTA','cta',jsonb_build_object('heading','Prefer to start online?','description','Send a short enquiry and our team will respond using the details you provide.','buttonText','Open enquiry form','href','/apply'),3,'mint');

select public.seed_cms_section('privacy','hero','Privacy header','hero',jsonb_build_object('eyebrow','LEGAL','heading','Privacy Policy','description','How Emunahh-Invest handles information submitted through this website.','primaryCta','Contact us','secondaryCta','','imageUrl',''),1,'navy');
select public.seed_cms_section('privacy','body','Privacy policy','legal',jsonb_build_object('sections',jsonb_build_array(jsonb_build_object('title','Information we collect','body','We may collect information you voluntarily provide through application, enquiry and contact forms.'),jsonb_build_object('title','How we use information','body','Information is used to respond to requests, assess submitted enquiries and provide relevant services.'),jsonb_build_object('title','Data security','body','We apply reasonable technical and organisational safeguards to protect information handled through the service.'),jsonb_build_object('title','Contact','body','For privacy questions, contact the company using the details published on the Contact page.'))),2,'white');
select public.seed_cms_section('terms','hero','Terms header','hero',jsonb_build_object('eyebrow','LEGAL','heading','Terms of Service','description','General terms governing use of this website and submission of enquiries.','primaryCta','Contact us','secondaryCta','','imageUrl',''),1,'navy');
select public.seed_cms_section('terms','body','Terms of service','legal',jsonb_build_object('sections',jsonb_build_array(jsonb_build_object('title','Website use','body','This website provides general information and enquiry facilities. Information shown is not a substitute for a formal offer or contractual document.'),jsonb_build_object('title','Applications','body','Submitting an application does not by itself create an obligation to approve or provide funding.'),jsonb_build_object('title','Accuracy','body','Applicants are responsible for providing complete and accurate information.'),jsonb_build_object('title','Contact','body','Questions about these terms can be directed to the company through the Contact page.'))),2,'white');

-- Publish only registered pages; leave application/blog as their functional specialist views.
update public.cms_pages set status='published' where slug in ('home','about','student-loans','investments','business-financing','personal-finance','other-services','contact','privacy','terms');

drop function if exists public.seed_cms_section(text,text,text,text,jsonb,integer,text);
