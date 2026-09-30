import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';
import { companyNavigation, legalNavigation, solutionNavigation } from '../config/siteNavigation';

export const Footer: React.FC = () => {
  const { content, settings, cmsPages, cmsSections } = useContent() as any;
  const globalPage = cmsPages?.find((page: any) => page.slug === 'global');
  const globalFooter =
    cmsSections?.find(
      (section: any) => section.page_id === globalPage?.id && section.section_key === 'footer',
    )?.content || {};

  const footerStatement =
    globalFooter.statement ||
    content?.footer?.statement ||
    'Structured financial and investment solutions delivered with clarity, professional support and responsible execution.';
  const email = settings?.companyEmail || content?.contact?.email || 'contact@emunahhinvest.com';

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-white/8 bg-[#080642] text-white">
      <div className="ei-container py-14 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.35fr_0.9fr_0.9fr_0.9fr] lg:gap-10">
          <div className="max-w-md">
            <Link to="/" className="inline-flex rounded-md" aria-label="Emunahh-Invest Limited home">
              <Logo variant="dark" size="lg" logoUrl={settings?.logoUrl} />
            </Link>
            <p className="mt-5 max-w-sm text-[14px] leading-7 text-white/62">{footerStatement}</p>

            <div className="mt-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                Client enquiries
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-2 inline-flex items-center gap-2 text-[14px] font-[650] text-white transition-colors hover:text-white/70"
              >
                <Mail className="h-4 w-4 text-[#d91c23]" />
                {email}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/42">
              Solutions
            </h2>
            <ul className="mt-4 space-y-3">
              {solutionNavigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-[13px] font-[550] text-white/68 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/42">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {companyNavigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-[13px] font-[550] text-white/68 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/42">
              Get started
            </h2>
            <p className="mt-4 text-[13px] leading-6 text-white/58">
              Start with a short enquiry. We will guide you to the appropriate next step.
            </p>
            <Link
              to="/apply"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-[700] text-white transition-colors hover:text-white/70"
            >
              Start an enquiry
              <ArrowUpRight className="h-4 w-4 text-[#d91c23]" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 border-b border-white/10 py-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <p className="max-w-4xl text-[11px] leading-6 text-white/40">
            Information on this website is general in nature and does not constitute personalised financial advice or a binding offer. Services may be subject to eligibility, assessment, documentation and approval requirements. Where investment services are discussed, outcomes are not guaranteed and suitability should be considered before making a decision.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
            {legalNavigation.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[11px] font-[600] text-white/48 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[11px] text-white/36 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Emunahh-Invest Limited. All rights reserved.</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex w-fit items-center gap-2 font-[650] text-white/48 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
