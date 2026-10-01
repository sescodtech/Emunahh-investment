import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, LockKeyhole, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getCmsSection, safeMarketingText, safeStringList } from '../lib/cmsContent';

const protections = [
  'Use only the contact details and website addresses published through Emunahh-Invest’s official channels.',
  'Do not share passwords, PINs, one-time codes or full payment-card credentials with anyone.',
  'Treat unexpected requests to move money, change payment details or bypass normal documentation with caution.',
  'Review documents, payment instructions and recipient details carefully before acting.',
  'Report suspicious messages, impersonation attempts or unusual requests through the published contact channel.',
];

export const TrustSecurityPage: React.FC = () => {
  const { settings, cmsPages, cmsSections } = useContent() as any;
  const email = settings?.companyEmail || 'contact@emunahhinvest.com';
  const hero = getCmsSection(cmsPages, cmsSections, 'trust-security', 'hero') || {};
  const principles = getCmsSection(cmsPages, cmsSections, 'trust-security', 'principles') || {};
  const reporting = getCmsSection(cmsPages, cmsSections, 'trust-security', 'reporting') || {};
  const protectionItems = safeStringList(principles.items, protections);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[#080642] text-white">
        <div className="ei-container py-20 lg:py-28">
          <span className="ei-eyebrow text-[#ff6b70]">Trust & security</span>
          <h1 className="mt-6 max-w-4xl text-4xl text-white sm:text-5xl lg:text-[4.1rem]">{safeMarketingText(hero.heading, 'Protecting the integrity of every client interaction.')}</h1>
          <p className="mt-7 max-w-3xl text-[17px] leading-8 text-white/70">
            {safeMarketingText(hero.description, 'Financial decisions deserve careful verification. This page explains practical steps clients can take to reduce fraud, impersonation and information-security risk when dealing with us online.')}
          </p>
        </div>
      </section>

      <section className="ei-section">
        <div className="ei-container grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="ei-eyebrow">Verify before you act</span>
            <h2 className="mt-5 text-3xl text-[#0d0a64] sm:text-4xl">{safeMarketingText(principles.heading, 'Simple controls reduce avoidable risk')}</h2>
            <p className="ei-copy mt-5">{safeMarketingText(principles.description, 'Fraud often relies on urgency, impersonation or requests to bypass normal checks. Independent verification is one of the strongest protections.')}</p>
          </div>
          <div className="space-y-0 border-t border-slate-200">
            {protectionItems.map((item) => (
              <div key={item} className="flex gap-4 border-b border-slate-200 py-5">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#d91c23]" />
                <p className="text-[14px] leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container grid gap-6 py-16 md:grid-cols-3 lg:py-20">
          <article className="ei-card p-7">
            <UserCheck className="h-5 w-5 text-[#d91c23]" />
            <h2 className="mt-5 text-xl text-[#0d0a64]">Identity verification</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">If a message or instruction feels unusual, verify it independently using the contact details published on this website.</p>
          </article>
          <article className="ei-card p-7">
            <LockKeyhole className="h-5 w-5 text-[#d91c23]" />
            <h2 className="mt-5 text-xl text-[#0d0a64]">Protect confidential data</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">Share only the information necessary for the relevant process and avoid sending highly sensitive credentials through ordinary messaging channels.</p>
          </article>
          <article className="ei-card p-7">
            <ShieldCheck className="h-5 w-5 text-[#d91c23]" />
            <h2 className="mt-5 text-xl text-[#0d0a64]">Review financial instructions</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">Confirm recipient names, account information, amounts and supporting documentation before making a payment or transfer.</p>
          </article>
        </div>
      </section>

      <section className="ei-section">
        <div className="ei-container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="ei-eyebrow">Suspicious activity</span>
            <h2 className="mt-5 text-3xl text-[#0d0a64] sm:text-4xl">{safeMarketingText(reporting.heading, 'If something does not look right')}</h2>
            <p className="ei-copy mt-5">{safeMarketingText(reporting.description, 'Do not proceed merely because a message uses our name, logo or an employee’s name. Pause the transaction and verify the request independently.')}</p>
          </div>
          <div className="rounded-[18px] border border-[#f0c7c9] bg-[#fff7f7] p-7 lg:p-9">
            <div className="flex gap-4">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#d91c23]" />
              <div>
                <h3 className="text-lg text-[#0d0a64]">Report or verify an unusual request</h3>
                <p className="mt-3 text-[14px] leading-7 text-slate-600">Send the relevant details, screenshots or reference information to our published client-enquiries channel. Avoid forwarding passwords or security codes.</p>
                <a href={`mailto:${email}`} className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-[#0d0a64]">
                  <Mail className="h-4 w-4 text-[#d91c23]" />
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/42">Related information</p><h2 className="mt-3 text-2xl text-white">Understand the terms and disclosures that apply to website use.</h2></div>
          <div className="flex flex-wrap gap-3"><Link to="/disclosures" className="ei-btn-secondary border-white/20 bg-white text-[#0d0a64]">Read disclosures</Link><Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-bold text-white">Contact us <ArrowRight className="h-4 w-4 text-[#ff6b70]" /></Link></div>
        </div>
      </section>
    </div>
  );
};
