import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileCheck2,
  GraduationCap,
  LineChart,
  Plane,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { useContent, type ServiceRecord } from '../context/ContentContext';
import { serviceArchitectures } from '../config/serviceArchitecture';
import educationImageImport from '../assets/images/education_financing.webp';
import businessImageImport from '../assets/images/business_financing.webp';
import personalImageImport from '../assets/images/professional_advisory_hero.webp';
import investmentImageImport from '../assets/images/investment_advisory_meeting.webp';
import travelImageImport from '../assets/images/financial_growth.webp';

const assetUrl = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'src' in value) return String((value as { src: string }).src);
  return '';
};

const servicePresentation: Record<string, { icon: React.ElementType; image: string; number: string }> = {
  'education-financing': { icon: GraduationCap, image: assetUrl(educationImageImport), number: '01' },
  'travel-financing': { icon: Plane, image: assetUrl(travelImageImport), number: '02' },
  'business-financing': { icon: BriefcaseBusiness, image: assetUrl(businessImageImport), number: '03' },
  'personal-finance': { icon: UserRound, image: assetUrl(personalImageImport), number: '04' },
  'investment-services': { icon: LineChart, image: assetUrl(investmentImageImport), number: '05' },
};

const blockedLegacyLanguage = /\b(nigeria|nigerian|lagos|cac|nin|naira)\b|₦|guaranteed returns?|principal protection|asset-backed|48\s*(?:to|–|-)\s*72\s*hours?/i;

const safeText = (value: unknown, fallback: string) => {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  const text = value.trim();
  return blockedLegacyLanguage.test(text) ? fallback : text;
};

const safeList = (value: unknown, fallback: string[]) => {
  if (!Array.isArray(value)) return fallback;
  const clean = value
    .map((item) => safeText(typeof item === 'string' ? item : item?.value, ''))
    .filter(Boolean);
  return clean.length ? clean : fallback;
};

export const ServiceDetailPage: React.FC = () => {
  const { slug = '' } = useParams();
  const { services, cmsPages, cmsSections, isLoading } = useContent() as any;
  const [imageFailed, setImageFailed] = useState(false);

  const architecture = serviceArchitectures[slug];
  const presentation = servicePresentation[slug];

  const service = useMemo(
    () => (services || []).find((item: ServiceRecord) => item.slug === slug),
    [services, slug],
  );

  const cmsPage = useMemo(() => {
    if (!architecture) return null;
    return (cmsPages || []).find(
      (item: any) => item.slug === slug || item.slug === architecture.legacyCmsSlug,
    );
  }, [architecture, cmsPages, slug]);

  const sections = useMemo(
    () =>
      (cmsSections || [])
        .filter((section: any) => section.page_id === cmsPage?.id && section.is_enabled !== false)
        .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)),
    [cmsPage?.id, cmsSections],
  );

  if (!architecture || !presentation) return <Navigate to="/services" replace />;
  if (isLoading && !service) return <PageLoader label="Loading service" />;

  const hero = sections.find((section: any) => section.section_key === 'hero')?.content || {};
  const overview = sections.find((section: any) => section.section_key === 'overview')?.content || {};
  const features = sections.find(
    (section: any) => ['features', 'benefits'].includes(section.section_key),
  )?.content || {};

  const title = safeText(service?.title, architecture.eyebrow);
  const heading = safeText(hero.heading, architecture.title);
  const tagline = safeText(service?.tagline, architecture.tagline);
  const description = safeText(service?.description || hero.description, architecture.description);
  const bullets = safeList(service?.bullets, architecture.requirements.slice(0, 4));
  const overviewHeading = safeText(overview.heading, `Designed around a clear ${title.toLowerCase()} objective.`);
  const overviewDescription = safeText(overview.description, architecture.description);
  const overviewPoints = safeList(overview.points, bullets);

  const featureItems = Array.isArray(features.items)
    ? features.items
        .map((item: any, index: number) => ({
          title: safeText(item?.title, architecture.supportAreas[index]?.title || ''),
          description: safeText(item?.description, architecture.supportAreas[index]?.description || ''),
        }))
        .filter((item: any) => item.title && item.description)
    : [];
  const supportAreas = featureItems.length >= 3 ? featureItems.slice(0, 4) : architecture.supportAreas;

  const imageCandidate = !imageFailed && typeof service?.imageUrl === 'string' && service.imageUrl.trim()
    ? service.imageUrl.trim()
    : presentation.image;
  const Icon = presentation.icon;

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container grid min-h-[600px] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex items-center py-16 pr-0 sm:py-20 lg:py-24 lg:pr-16 xl:pr-20">
            <div className="max-w-[670px]">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] font-[650] text-slate-500">
                <Link to="/" className="transition-colors hover:text-[#0d0a64]">Home</Link>
                <span aria-hidden="true">/</span>
                <Link to="/services" className="transition-colors hover:text-[#0d0a64]">Services</Link>
                <span aria-hidden="true">/</span>
                <span className="text-[#0d0a64]">{title}</span>
              </nav>

              <div className="mt-10 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0d0a64] shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="ei-eyebrow">{safeText(hero.eyebrow, architecture.eyebrow)}</div>
              </div>

              <h1 className="mt-6 text-[clamp(2.7rem,5.7vw,5.15rem)] leading-[1.01] text-[#080642]">
                {heading}
              </h1>
              <p className="mt-6 max-w-[620px] text-[17px] font-[650] leading-7 text-[#0d0a64] sm:text-[18px]">
                {tagline}
              </p>
              <p className="mt-4 max-w-[620px] text-[16px] leading-8 text-slate-600">
                {description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to={`/apply?service=${encodeURIComponent(slug)}`} className="ei-btn-primary px-5 py-3.5">
                  Start an enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="ei-btn-secondary px-5 py-3.5">
                  Speak with our team
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-7 max-w-[620px] text-[11px] leading-5 text-slate-500">
                All enquiries remain subject to eligibility, assessment, documentation and approval where applicable.
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-[#080642] lg:min-h-full">
            <img
              src={imageCandidate}
              alt={`${title} service`}
              className="absolute inset-0 h-full w-full object-cover opacity-[0.78]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080642] via-[#080642]/35 to-transparent" />
            <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7 text-white sm:p-10 lg:min-h-full lg:p-12">
              <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-white/55">At a glance</div>
              <div className="mt-5 space-y-4">
                {bullets.slice(0, 4).map((item: string) => (
                  <div key={item} className="flex gap-3 border-t border-white/20 pt-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6b70]" />
                    <span className="text-[13px] font-[600] leading-6 text-white/88">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ei-section bg-white">
        <div className="ei-container grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <div className="ei-eyebrow">Who it is for</div>
            <h2 className="mt-5 text-[clamp(2.15rem,4vw,3.55rem)] text-[#080642]">A service designed around context, not assumptions.</h2>
            <p className="mt-6 ei-copy">
              The right structure depends on the objective, the applicant profile and the quality of the information available for review.
            </p>
          </div>
          <div className="border-t border-slate-300">
            {architecture.audience.map((item, index) => (
              <div key={item} className="grid gap-3 border-b border-slate-300 py-6 sm:grid-cols-[54px_1fr] sm:items-start">
                <span className="text-[12px] font-[750] tracking-[0.12em] text-[#d91c23]">0{index + 1}</span>
                <p className="text-[16px] font-[620] leading-7 text-[#0d0a64]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="ei-eyebrow">What it can support</div>
              <h2 className="mt-5 max-w-xl text-[clamp(2.2rem,4vw,3.6rem)] text-[#080642]">{overviewHeading}</h2>
            </div>
            <p className="ei-copy max-w-2xl lg:justify-self-end">{overviewDescription}</p>
          </div>

          <div className="mt-14 grid border-t border-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {supportAreas.map((item, index) => (
              <article key={item.title} className="border-b border-slate-300 py-8 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:last:pr-0">
                <div className="text-[12px] font-[750] tracking-[0.12em] text-[#d91c23]">0{index + 1}</div>
                <h3 className="mt-8 text-[18px] text-[#080642]">{item.title}</h3>
                <p className="mt-4 text-[13px] leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6">
            {overviewPoints.slice(0, 4).map((point: string) => (
              <span key={point} className="inline-flex items-center gap-2 text-[12px] font-[650] text-slate-600">
                <Check className="h-3.5 w-3.5 text-[#d91c23]" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="ei-section bg-white">
        <div className="ei-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="ei-eyebrow">How it works</div>
              <h2 className="mt-5 max-w-xl text-[clamp(2.2rem,4vw,3.6rem)] text-[#080642]">A clear process from enquiry to documented next step.</h2>
            </div>
            <p className="ei-copy max-w-2xl lg:justify-self-end">
              The process is intentionally structured so you understand what is required, what is being assessed and what happens next.
            </p>
          </div>

          <div className="mt-14 grid border-t border-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {architecture.process.map((step) => (
              <article key={step.number} className="border-b border-slate-300 py-8 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:last:pr-0">
                <div className="text-[12px] font-[750] tracking-[0.12em] text-[#d91c23]">{step.number}</div>
                <h3 className="mt-8 text-[18px] text-[#080642]">{step.title}</h3>
                <p className="mt-4 text-[13px] leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <div className="ei-eyebrow text-[#ff6b70]">Before you proceed</div>
            <h2 className="mt-5 max-w-xl text-[clamp(2.2rem,4vw,3.65rem)] text-white">Good financial decisions begin with complete information.</h2>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/65">
              We avoid promising an outcome before the relevant information has been reviewed. The final structure should be understood before any commitment is made.
            </p>
          </div>
          <div className="grid gap-0 border-t border-white/20 sm:grid-cols-3 sm:border-l sm:border-t-0">
            {architecture.considerations.map((item, index) => {
              const icons = [CircleAlert, ShieldCheck, FileCheck2];
              const ConsiderationIcon = icons[index] || CircleAlert;
              return (
                <div key={item} className="border-b border-white/20 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0">
                  <ConsiderationIcon className="h-5 w-5 text-[#ff6b70]" />
                  <p className="mt-5 text-[13px] font-[600] leading-6 text-white/82">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ei-section bg-white">
        <div className="ei-container grid gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
          <div>
            <div className="ei-eyebrow">What we may need</div>
            <h2 className="mt-5 text-[clamp(2.15rem,4vw,3.45rem)] text-[#080642]">Prepare the information that helps us understand the request.</h2>
            <p className="mt-6 ei-copy">The exact documentation depends on the service and applicant profile. We will tell you what is required before a full assessment is completed.</p>
            <div className="mt-8 inline-flex items-center gap-2 text-[12px] font-[650] text-slate-500">
              <Clock3 className="h-4 w-4 text-[#d91c23]" />
              Requirements can vary by application.
            </div>
          </div>
          <div className="border-t border-slate-300">
            {architecture.requirements.map((item, index) => (
              <div key={item} className="grid gap-3 border-b border-slate-300 py-5 sm:grid-cols-[54px_1fr]">
                <span className="text-[12px] font-[750] text-[#d91c23]">0{index + 1}</span>
                <span className="text-[14px] font-[600] leading-6 text-[#0d0a64]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container grid gap-12 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:py-20">
          <div>
            <div className="ei-eyebrow">Frequently asked questions</div>
            <h2 className="mt-5 text-[clamp(2rem,3.7vw,3.2rem)] text-[#080642]">Questions clients often ask before starting.</h2>
          </div>
          <div className="border-t border-slate-300">
            {architecture.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-slate-300 py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[15px] font-[680] text-[#0d0a64] marker:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-6 pr-10 text-[13px] leading-6 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="ei-container">
          <div className="border border-slate-200 bg-[#fbfbfc] p-6 sm:p-8 lg:flex lg:items-start lg:justify-between lg:gap-12">
            <div className="flex max-w-4xl gap-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#d91c23]" />
              <div>
                <div className="text-[11px] font-[750] uppercase tracking-[0.14em] text-[#0d0a64]">Important information</div>
                <p className="mt-2 text-[12px] leading-6 text-slate-600">{architecture.disclosure}</p>
              </div>
            </div>
            <Link to="/terms" className="mt-5 inline-flex shrink-0 items-center gap-2 text-[12px] font-[700] text-[#0d0a64] hover:text-[#d91c23] lg:mt-0">
              Read website terms
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-[#ff6b70]">Start a conversation</div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.1rem,4vw,3.65rem)] text-white">Discuss your {title.toLowerCase()} objective with our team.</h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/65">Start with a short enquiry. We will use the information you provide to guide you toward the appropriate next step.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link to={`/apply?service=${encodeURIComponent(slug)}`} className="ei-btn-primary px-5 py-3.5">
              Start an enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-[13px] font-[700] text-white transition-colors hover:bg-white/10">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
