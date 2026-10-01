import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileCheck2,
  Handshake,
  Layers3,
  ShieldCheck,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getCmsSection, safeMarketingText, safeStringList } from '../lib/cmsContent';

const standards = [
  {
    title: 'Clarity before commitment',
    description:
      'We aim to explain the relevant requirements, structure, responsibilities and next steps before a client proceeds.',
    icon: FileCheck2,
  },
  {
    title: 'Responsible assessment',
    description:
      'Requests are considered in context. Availability, eligibility and terms may depend on assessment and supporting information.',
    icon: ShieldCheck,
  },
  {
    title: 'Professional communication',
    description:
      'Clients should understand where a request stands, what information is required and what happens next.',
    icon: Handshake,
  },
  {
    title: 'Purpose-led solutions',
    description:
      'Our services are organised around defined client objectives rather than one generic financial product.',
    icon: Compass,
  },
];

const relationshipSteps = [
  'Understand the objective and relevant circumstances.',
  'Identify the appropriate service path and information required.',
  'Review the request and clarify any outstanding points.',
  'Document the next step, applicable terms and responsibilities clearly.',
];

export const InstitutionalAboutPage: React.FC = () => {
  const { content, cmsPages, cmsSections } = useContent() as any;
  const hero = getCmsSection(cmsPages, cmsSections, 'about', 'hero') || {};
  const story = getCmsSection(cmsPages, cmsSections, 'about', 'story') || {};
  const mission = getCmsSection(cmsPages, cmsSections, 'about', 'mission') || {};
  const values = getCmsSection(cmsPages, cmsSections, 'about', 'values') || {};
  const governance = getCmsSection(cmsPages, cmsSections, 'about', 'governance') || {};

  const heading = safeMarketingText(
    hero.heading,
    content?.about?.headline || 'A professional financial partner built around clarity and trust.',
  );
  const description = safeMarketingText(
    hero.description,
    content?.about?.intro ||
      'Emunahh-Invest Limited provides structured financial and investment solutions for clients navigating important personal, educational, commercial and investment decisions.',
  );
  const storyHeading = safeMarketingText(
    story.heading,
    'Financial relationships should be built on clarity, structure and accountability.',
  );
  const storyDescription = safeMarketingText(
    story.description,
    content?.about?.secondaryIntro ||
      'Our approach combines clear communication, responsible assessment, documented terms and practical support from enquiry through completion.',
  );
  const storyPoints = safeStringList(story.points, [
    'Clear documentation and expectations',
    'Professional support through each stage',
    'Purpose-led financial solutions',
    'Responsible assessment and decision-making',
  ]);


  const cmsStandards = Array.isArray(values.items)
    ? values.items
        .filter((item: any) => item?.title && item?.description)
        .map((item: any, index: number) => ({
          title: safeMarketingText(item.title, standards[index % standards.length].title),
          description: safeMarketingText(item.description, standards[index % standards.length].description),
          icon: standards[index % standards.length].icon,
        }))
    : [];
  const standardItems = cmsStandards.length >= 3 ? cmsStandards : standards;

  const governanceFallback = [
    { title: 'Documented process', description: 'Material requirements, decisions and next steps should be captured clearly enough to support consistent follow-through.' },
    { title: 'Access & accountability', description: 'Administrative access should be role-based, and sensitive operational changes should be attributable through controlled workflows and audit records.' },
    { title: 'Formal terms prevail', description: 'General website information supports discovery and enquiries; approved transaction or service documentation governs the specific engagement.' },
    { title: 'Security & escalation', description: 'Unusual requests, suspected impersonation and information-security concerns should be verified and escalated through published channels.' },
  ];
  const governanceItems = Array.isArray(governance.items) && governance.items.length >= 3
    ? governance.items.map((item: any, index: number) => ({
        title: safeMarketingText(item?.title, governanceFallback[index % governanceFallback.length].title),
        description: safeMarketingText(item?.description, governanceFallback[index % governanceFallback.length].description),
      }))
    : governanceFallback;

  const missionItems = Array.isArray(mission.items)
    ? mission.items.filter(
        (item: any) =>
          item?.title &&
          item?.description &&
          !/\b(nigeria|nigerian|lagos|west africa)\b/i.test(String(item.description)),
      )
    : [];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[#080642] text-white">
        <div className="ei-container grid gap-12 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:py-28">
          <div>
            <span className="ei-eyebrow text-[#ff6b70]">About Emunahh-Invest</span>
            <h1 className="mt-6 max-w-4xl text-4xl text-white sm:text-5xl lg:text-[4.25rem]">{heading}</h1>
            <p className="mt-7 max-w-3xl text-[17px] leading-8 text-white/70">{description}</p>
          </div>
          <div className="border-l border-white/15 pl-0 lg:pl-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">Our role</p>
            <p className="mt-4 text-[15px] leading-7 text-white/68">
              We help clients move from a financial objective to a more structured conversation about the appropriate service, information required and possible next steps.
            </p>
            <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold text-white">
              Explore our services
              <ArrowRight className="h-4 w-4 text-[#ff6b70]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="ei-section">
        <div className="ei-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="ei-eyebrow">Our approach</span>
            <h2 className="mt-5 text-3xl text-[#0d0a64] sm:text-4xl">{storyHeading}</h2>
          </div>
          <div>
            <p className="ei-copy">{storyDescription}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {storyPoints.map((point) => (
                <div key={point} className="flex gap-3 border-t border-slate-200 py-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d91c23]" />
                  <span className="text-[13px] font-semibold leading-6 text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="ei-eyebrow">Service standards</span>
            <h2 className="mt-5 text-3xl text-[#0d0a64] sm:text-4xl">What clients should expect from the relationship</h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 md:grid-cols-2">
            {standardItems.map(({ title, description, icon: Icon }: any) => (
              <article key={title} className="bg-white p-7 lg:p-9">
                <Icon className="h-5 w-5 text-[#d91c23]" />
                <h3 className="mt-5 text-xl text-[#0d0a64]">{title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ei-section">
        <div className="ei-container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="ei-eyebrow">How we work</span>
            <h2 className="mt-5 text-3xl text-[#0d0a64] sm:text-4xl">A structured path from enquiry to next step</h2>
            <p className="ei-copy mt-5">
              The exact process varies by service and client circumstances, but the relationship should remain clear, documented and proportionate to the request.
            </p>
          </div>
          <ol className="space-y-0 border-t border-slate-200">
            {relationshipSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[44px_1fr] gap-4 border-b border-slate-200 py-5">
                <span className="text-[12px] font-bold text-[#d91c23]">0{index + 1}</span>
                <span className="text-[14px] font-semibold leading-7 text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <span className="ei-eyebrow">Governance</span>
              <h2 className="mt-5 text-3xl text-[#0d0a64] sm:text-4xl">{safeMarketingText(governance.heading, 'Governance in the client journey')}</h2>
              <p className="ei-copy mt-5">{safeMarketingText(governance.description, 'Good governance is reflected in how information is handled, how decisions are documented and how responsibilities remain clear through the service lifecycle.')}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {governanceItems.map((item: any) => (
                <article key={item.title} className="bg-white p-6 lg:p-7">
                  <h3 className="text-[15px] font-bold text-[#0d0a64]">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">Mission & direction</span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">
              {safeMarketingText(
                missionItems[0]?.description,
                content?.about?.mission ||
                  'To provide dependable financial solutions that help clients make progress with confidence.',
              )}
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/62">
              {safeMarketingText(
                missionItems[1]?.description,
                content?.about?.vision ||
                  'To be a trusted international-facing financial and investment company known for professional service, responsible structures and clear communication.',
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/trust-security" className="ei-btn-secondary border-white/20 bg-white text-[#0d0a64]">
              Trust & security
            </Link>
            <Link to="/apply" className="ei-btn-primary">
              Start an enquiry
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="ei-container grid gap-8 py-12 sm:grid-cols-3">
          <div className="flex gap-4">
            <Layers3 className="mt-1 h-5 w-5 text-[#d91c23]" />
            <div><h3 className="text-[14px] font-bold text-[#0d0a64]">Multiple service pathways</h3><p className="mt-1 text-[12px] leading-6 text-slate-500">Education, travel, business, personal finance and investment services.</p></div>
          </div>
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 h-5 w-5 text-[#d91c23]" />
            <div><h3 className="text-[14px] font-bold text-[#0d0a64]">Responsible communication</h3><p className="mt-1 text-[12px] leading-6 text-slate-500">No guaranteed outcome is implied by submitting an enquiry or application.</p></div>
          </div>
          <div className="flex gap-4">
            <Handshake className="mt-1 h-5 w-5 text-[#d91c23]" />
            <div><h3 className="text-[14px] font-bold text-[#0d0a64]">Human support</h3><p className="mt-1 text-[12px] leading-6 text-slate-500">Clients can contact the team when clarification or additional guidance is required.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
};
