import React, { useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  LineChart,
  Plane,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../components/PageLoader';
import { useContent, type ServiceRecord } from '../context/ContentContext';
import { canonicalServiceSlugs, serviceArchitectures } from '../config/serviceArchitecture';

const serviceIcons: Record<string, React.ElementType> = {
  'education-financing': GraduationCap,
  'travel-financing': Plane,
  'business-financing': BriefcaseBusiness,
  'personal-finance': UserRound,
  'investment-services': LineChart,
};

const legacyTextPattern = /\b(nigeria|nigerian|lagos|cac|nin|naira)\b|₦|guaranteed returns?|principal protection|asset-backed/i;
const safeText = (value: unknown, fallback: string) => {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  const text = value.trim();
  return legacyTextPattern.test(text) ? fallback : text;
};

export const ServicesPage: React.FC = () => {
  const { services, isLoading } = useContent();

  const canonicalServices = useMemo(() => {
    const bySlug = new Map((services || []).map((service: ServiceRecord) => [service.slug, service]));
    return canonicalServiceSlugs.map((slug, index) => {
      const architecture = serviceArchitectures[slug];
      const record = bySlug.get(slug);
      return {
        slug,
        index: index + 1,
        title: safeText(record?.title, architecture.eyebrow),
        tagline: safeText(record?.tagline, architecture.tagline),
        description: safeText(record?.description, architecture.description),
        bullets: Array.isArray(record?.bullets) && record.bullets.length
          ? record.bullets
              .map((item) => safeText(item, ''))
              .filter(Boolean)
              .slice(0, 4)
          : architecture.supportAreas.map((item) => item.title),
      };
    });
  }, [services]);

  if (isLoading && !services.length) return <PageLoader label="Loading services" />;

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#080642] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[38%] border-l border-white/10 bg-white/[0.035] lg:block" aria-hidden="true" />
        <div className="ei-container relative grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:py-28">
          <div className="max-w-4xl">
            <div className="ei-eyebrow text-[#ff6b70]">Our solutions</div>
            <h1 className="mt-6 text-[clamp(3rem,6vw,5.8rem)] leading-[0.99] text-white">
              Different financial objectives. One professional standard.
            </h1>
            <p className="mt-7 max-w-3xl text-[17px] leading-8 text-white/68 sm:text-[18px]">
              Explore structured financing and investment services designed around a defined objective, clear information and a documented next step.
            </p>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <div className="border-t border-white/25 pt-5">
              <p className="text-[12px] leading-6 text-white/55">
                Every enquiry is considered in context. Availability, eligibility and final terms depend on the specific service, applicant profile and documentation provided.
              </p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-[13px] font-[700] text-white hover:text-white/70">
                Not sure where to start?
                <ArrowRight className="h-4 w-4 text-[#ff6b70]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ei-section bg-white">
        <div className="ei-container">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="ei-eyebrow">Service catalogue</div>
              <h2 className="mt-5 max-w-xl text-[clamp(2.2rem,4vw,3.7rem)] text-[#080642]">
                Start with the outcome you are trying to achieve.
              </h2>
            </div>
            <p className="ei-copy max-w-2xl lg:justify-self-end">
              Each service has its own eligibility considerations, information requirements and assessment process. Select a service to understand the structure before you begin an enquiry.
            </p>
          </div>

          <div className="mt-16 border-t border-slate-300">
            {canonicalServices.map((service) => {
              const Icon = serviceIcons[service.slug] || LineChart;
              return (
                <article key={service.slug} id={service.slug} className="group border-b border-slate-300 py-8 sm:py-10 lg:py-12">
                  <div className="grid gap-8 lg:grid-cols-[88px_1fr_0.85fr_auto] lg:items-start">
                    <div className="flex items-center gap-4 lg:block">
                      <div className="text-[12px] font-[750] tracking-[0.12em] text-[#d91c23]">0{service.index}</div>
                      <div className="mt-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#fbfbfc] text-[#0d0a64] lg:mt-7">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="max-w-2xl">
                      <h3 className="text-[clamp(1.75rem,3vw,2.65rem)] text-[#080642] transition-colors group-hover:text-[#0d0a64]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[14px] font-[680] leading-6 text-[#0d0a64]">{service.tagline}</p>
                      <p className="mt-4 max-w-xl text-[14px] leading-7 text-slate-600">{service.description}</p>
                    </div>

                    <div className="space-y-3 lg:pt-1">
                      {service.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-2.5 text-[12px] font-[600] leading-5 text-slate-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d91c23]" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
                      <Link to={`/services/${service.slug}`} className="ei-btn-secondary whitespace-nowrap px-4 py-3">
                        Explore service
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <Link to={`/apply?service=${encodeURIComponent(service.slug)}`} className="inline-flex min-h-11 items-center justify-center gap-2 px-2 text-[12px] font-[700] text-[#0d0a64] hover:text-[#d91c23]">
                        Start enquiry
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container grid gap-12 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:py-20">
          <div>
            <div className="ei-eyebrow">Choosing a service</div>
            <h2 className="mt-5 max-w-xl text-[clamp(2.1rem,3.8vw,3.4rem)] text-[#080642]">
              You do not need to diagnose the solution before speaking with us.
            </h2>
          </div>
          <div className="grid border-t border-slate-300 md:grid-cols-3">
            {[
              ['01', 'Define the objective', 'Start with the financial outcome, commitment or opportunity you are trying to address.'],
              ['02', 'Share the context', 'Provide the information that helps us understand the applicant, timeframe and relevant constraints.'],
              ['03', 'Get directed appropriately', 'We can explain the relevant service path and what information is required next.'],
            ].map(([number, title, description]) => (
              <div key={number} className="border-b border-slate-300 py-7 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <div className="text-[12px] font-[750] tracking-[0.12em] text-[#d91c23]">{number}</div>
                <h3 className="mt-6 text-[17px] text-[#080642]">{title}</h3>
                <p className="mt-3 text-[13px] leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-[#ff6b70]">Client enquiries</div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.15rem,4vw,3.7rem)] text-white">
              Tell us what you are trying to achieve. We will help identify the right starting point.
            </h2>
            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/65">
              A short initial enquiry is enough to begin. More detailed information can be requested as the relevant service path becomes clear.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link to="/apply" className="ei-btn-primary px-5 py-3.5">
              Start an enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-[13px] font-[700] text-white transition-colors hover:bg-white/10">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
