import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, FileText, Scale, ShieldCheck, TrendingUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getCmsSection, safeMarketingText } from '../lib/cmsContent';

const disclosures = [
  {
    title: 'General information only',
    body: 'Content on this website is provided for general information and enquiry purposes. It should not be treated as personalised financial, legal, tax or investment advice.',
    icon: FileText,
  },
  {
    title: 'No automatic approval or offer',
    body: 'Submitting an enquiry or application does not create an obligation to provide financing, accept an investment instruction or enter into a contract. Services may be subject to assessment, documentation, eligibility and approval.',
    icon: Scale,
  },
  {
    title: 'Investment risk',
    body: 'Where investment services are discussed, values and outcomes can vary. Past performance, illustrations or examples should not be interpreted as a guarantee of future results.',
    icon: TrendingUp,
  },
  {
    title: 'Accuracy and availability',
    body: 'We aim to keep public information clear and current, but services, criteria, documentation requirements and availability may change. Formal documentation takes precedence over general website content.',
    icon: ShieldCheck,
  },
];

export const DisclosuresPage: React.FC = () => {
  const { cmsPages, cmsSections } = useContent() as any;
  const hero = getCmsSection(cmsPages, cmsSections, 'disclosures', 'hero') || {};
  const cmsItems = getCmsSection(cmsPages, cmsSections, 'disclosures', 'items') || {};
  const decision = getCmsSection(cmsPages, cmsSections, 'disclosures', 'decision') || {};
  const itemSource = Array.isArray(cmsItems.items) && cmsItems.items.length >= 3 ? cmsItems.items : disclosures;
  const displayItems = itemSource.map((item: any, index: number) => ({
    title: safeMarketingText(item.title, disclosures[index % disclosures.length].title),
    body: safeMarketingText(item.description || item.body, disclosures[index % disclosures.length].body),
    icon: disclosures[index % disclosures.length].icon,
  }));
  const paragraphs = Array.isArray(decision.paragraphs) && decision.paragraphs.length ? decision.paragraphs : [
    'Any formal facility, investment arrangement or other service relationship should be governed by the relevant approved documentation, not by a general website summary.',
    'Clients should review the applicable structure, costs, responsibilities, timing, risks and conditions and ask for clarification before proceeding.',
    'If information on this website conflicts with a formal document issued for a specific transaction or service, the formal document should be reviewed as the authoritative source for that engagement.',
  ];

  return (
  <div className="bg-white">
    <section className="border-b border-slate-200 bg-[#f6f7f9]">
      <div className="ei-container py-20 lg:py-24">
        <span className="ei-eyebrow">Important information</span>
        <h1 className="mt-6 max-w-4xl text-4xl text-[#0d0a64] sm:text-5xl">{safeMarketingText(hero.heading, 'Disclosures & important information')}</h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-8 text-slate-600">{safeMarketingText(hero.description, 'These disclosures explain how to interpret general information published on this website and the limits of an online enquiry or application.')}</p>
      </div>
    </section>

    <section className="ei-section">
      <div className="ei-container grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 md:grid-cols-2">
        {displayItems.map(({ title, body, icon: Icon }: any) => (
          <article key={title} className="bg-white p-7 lg:p-9">
            <Icon className="h-5 w-5 text-[#d91c23]" />
            <h2 className="mt-5 text-xl text-[#0d0a64]">{title}</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">{body}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="border-y border-slate-200 bg-[#080642] text-white">
      <div className="ei-container grid gap-10 py-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div><span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">Decision-making</span><h2 className="mt-4 text-3xl text-white">{safeMarketingText(decision.heading, 'Read the formal terms before committing.')}</h2></div>
        <div className="space-y-5 text-[14px] leading-7 text-white/66">
          {paragraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>

    <section className="ei-section">
      <div className="ei-container rounded-[18px] border border-slate-200 p-7 lg:flex lg:items-center lg:justify-between lg:p-10">
        <div className="max-w-2xl"><div className="flex items-center gap-3"><AlertCircle className="h-5 w-5 text-[#d91c23]" /><h2 className="text-2xl text-[#0d0a64]">Need clarification before proceeding?</h2></div><p className="mt-3 text-[14px] leading-7 text-slate-600">Contact the team or start an enquiry with enough context for us to direct you to the appropriate next step.</p></div>
        <div className="mt-6 flex flex-wrap gap-3 lg:mt-0"><Link to="/contact" className="ei-btn-secondary">Contact us</Link><Link to="/apply" className="ei-btn-primary">Start an enquiry <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  </div>
  );
};
