import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FileCheck2, Mail, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getCmsSection, containsLegacyRegionalMarketing } from '../lib/cmsContent';

type LegalSection = { title: string; body: string };

const privacyFallback: LegalSection[] = [
  { title: 'Information we collect', body: 'We may collect information you choose to provide through enquiry, application, contact and administrative forms, together with technical information reasonably required to operate and secure the website.' },
  { title: 'How information is used', body: 'Information may be used to respond to requests, assess submitted enquiries, administer services, communicate about a request, maintain records, improve service delivery and support security or legal obligations.' },
  { title: 'Sharing and service providers', body: 'Information may be processed by service providers that support website hosting, communications, document handling or other operational functions, subject to appropriate access controls and applicable obligations.' },
  { title: 'Data security', body: 'We use reasonable technical and organisational measures designed to reduce unauthorised access, loss, misuse or disclosure. No online system can guarantee absolute security.' },
  { title: 'Retention', body: 'Information is retained for as long as reasonably necessary for the purpose for which it was collected, operational requirements, dispute management, record-keeping or applicable legal obligations.' },
  { title: 'Your choices', body: 'You may contact us to ask a privacy question, request correction of inaccurate information or raise a concern about how information submitted through the website is handled, subject to applicable requirements.' },
];

const termsFallback: LegalSection[] = [
  { title: 'Website use', body: 'This website provides general information, service descriptions and enquiry facilities. Use of the website does not by itself create a client relationship, financing agreement, investment mandate or other contract.' },
  { title: 'Applications and enquiries', body: 'Submitting information does not guarantee eligibility, approval, availability, pricing or any other outcome. Additional information, verification, documentation and assessment may be required.' },
  { title: 'Information accuracy', body: 'You are responsible for ensuring that information you submit is complete and accurate. You should review important details before submitting an application or acting on financial instructions.' },
  { title: 'Intellectual property', body: 'Website content, branding, layouts and materials may be protected by intellectual-property rights. They should not be reproduced or represented as another party’s material without appropriate permission.' },
  { title: 'Third-party services', body: 'The website may rely on or link to third-party services. Their availability, security, content and terms are controlled by the relevant provider.' },
  { title: 'Changes', body: 'Website information and these terms may be updated from time to time. The version published on the website should be reviewed when using the service.' },
];

const cleanSections = (sections: any, fallback: LegalSection[]) => {
  if (!Array.isArray(sections)) return fallback;
  const result = sections
    .filter((section: any) => section?.title && section?.body)
    .map((section: any) => ({ title: String(section.title), body: String(section.body) }))
    .filter((section: LegalSection) => !containsLegacyRegionalMarketing(`${section.title} ${section.body}`));
  return result.length >= 3 ? result : fallback;
};

export const LegalDocumentPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const { settings, cmsPages, cmsSections } = useContent() as any;
  const isPrivacy = type === 'privacy';
  const slug = isPrivacy ? 'privacy' : 'terms';
  const cmsBody = getCmsSection(cmsPages, cmsSections, slug, 'body') ||
    getCmsSection(cmsPages, cmsSections, slug, 'legal-content') || {};
  const sections = cleanSections(cmsBody.sections, isPrivacy ? privacyFallback : termsFallback);
  const email = settings?.companyEmail || 'contact@emunahhinvest.com';

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container py-16 lg:py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-[12px] font-bold text-slate-500 hover:text-[#0d0a64]"><ArrowLeft className="h-4 w-4" /> Back to website</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><span className="ei-eyebrow">Legal</span><h1 className="mt-5 text-4xl text-[#0d0a64] sm:text-5xl">{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</h1><p className="mt-5 max-w-3xl text-[16px] leading-8 text-slate-600">{isPrivacy ? 'How information submitted through this website may be collected, used, protected and retained.' : 'General terms governing use of this website, service descriptions and online enquiries.'}</p></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">{isPrivacy ? <ShieldCheck className="h-5 w-5 text-[#d91c23]" /> : <FileCheck2 className="h-5 w-5 text-[#d91c23]" />}</div>
          </div>
        </div>
      </section>

      <section className="ei-section">
        <div className="ei-container grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">On this page</p>
            <nav className="mt-4 border-l border-slate-200">
              {sections.map((section, index) => (
                <a key={section.title} href={`#legal-${index}`} className="block border-l-2 border-transparent px-4 py-2 text-[12px] font-semibold leading-5 text-slate-500 hover:border-[#d91c23] hover:text-[#0d0a64]">{section.title}</a>
              ))}
            </nav>
          </aside>

          <div className="max-w-3xl">
            <div className="rounded-[14px] border border-slate-200 bg-[#f9fafb] p-5 text-[13px] leading-6 text-slate-600">
              This document provides general website information. Specific contractual, statutory or regulatory obligations may apply depending on the service and circumstances involved.
            </div>
            <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
              {sections.map((section, index) => (
                <section id={`legal-${index}`} key={section.title} className="scroll-mt-32 py-8">
                  <h2 className="text-2xl text-[#0d0a64]">{section.title}</h2>
                  <p className="mt-4 text-[15px] leading-8 text-slate-600">{section.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-[18px] bg-[#080642] p-7 text-white lg:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/42">Questions</p>
              <h2 className="mt-3 text-2xl text-white">Contact us about this document</h2>
              <p className="mt-3 text-[13px] leading-7 text-white/62">If you have a question about {isPrivacy ? 'privacy or information handling' : 'these website terms'}, contact the team through the published client-enquiries channel.</p>
              <a href={`mailto:${email}`} className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-white"><Mail className="h-4 w-4 text-[#ff6b70]" />{email}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between"><p className="text-[13px] text-slate-600">Also review our disclosures and security guidance.</p><div className="flex flex-wrap gap-4"><Link to="/disclosures" className="inline-flex items-center gap-2 text-[12px] font-bold text-[#0d0a64]">Disclosures <ArrowRight className="h-4 w-4 text-[#d91c23]" /></Link><Link to="/trust-security" className="inline-flex items-center gap-2 text-[12px] font-bold text-[#0d0a64]">Trust & security <ArrowRight className="h-4 w-4 text-[#d91c23]" /></Link></div></div>
      </section>
    </div>
  );
};
