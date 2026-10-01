import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Compass,
  GraduationCap,
  Landmark,
  LineChart,
  Plane,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent, type ServiceRecord } from '../context/ContentContext';
import { PageLoader } from '../components/PageLoader';
import { fetchPublishedPosts, getPostCategory, type BlogPost } from '../lib/blog';
import professionalImageImport from '../assets/images/professional_advisory_hero.webp';
import meetingImageImport from '../assets/images/investment_advisory_meeting.webp';

const assetUrl = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'src' in value) return String((value as { src: string }).src);
  return '';
};

const professionalImage = assetUrl(professionalImageImport);
const meetingImage = assetUrl(meetingImageImport);

type CMSSection = {
  id: string;
  page_id: string;
  section_key: string;
  content?: Record<string, any> | null;
  is_enabled?: boolean;
  display_order?: number;
};

const serviceMeta: Record<string, { icon: React.ElementType; href: string; label: string }> = {
  'education-financing': { icon: GraduationCap, href: '/services/education-financing', label: 'Education Financing' },
  'travel-financing': { icon: Plane, href: '/services/travel-financing', label: 'Travel Financing' },
  'business-financing': { icon: BriefcaseBusiness, href: '/services/business-financing', label: 'Business Financing' },
  'personal-finance': { icon: UserRound, href: '/services/personal-finance', label: 'Personal Finance' },
  'investment-services': { icon: LineChart, href: '/services/investment-services', label: 'Investment Services' },
};

const defaultHero = {
  eyebrow: 'EMUNAHH-INVEST LIMITED',
  heading: 'Financial solutions shaped around meaningful progress.',
  description:
    'Structured financial and investment solutions for individuals, professionals and businesses, delivered with clear communication, considered assessment and dependable support.',
  primaryCta: 'Explore our solutions',
  primaryHref: '/services',
  secondaryCta: 'Speak with our team',
  secondaryHref: '/contact',
};

const defaultTrust = [
  'Clear documentation',
  'Structured solutions',
  'Professional support',
  'Responsible execution',
];

const defaultApproach = {
  eyebrow: 'OUR APPROACH',
  heading: 'Financial decisions deserve clarity, discipline and human judgement.',
  description:
    'We begin with the objective, understand the context, explain the structure clearly and maintain professional communication throughout the relationship.',
  points: [
    'Purpose-led assessment',
    'Clear terms and documentation',
    'Appropriate next-step guidance',
    'Ongoing professional communication',
  ],
};

const defaultProcess = [
  { number: '01', title: 'Start the conversation', description: 'Tell us the outcome you are working toward and select the relevant solution.' },
  { number: '02', title: 'Understand the context', description: 'We review the information provided and identify what is needed for an informed assessment.' },
  { number: '03', title: 'Structure the next step', description: 'Where appropriate, we explain the relevant requirements, documentation and proposed pathway.' },
  { number: '04', title: 'Proceed with clarity', description: 'Approved engagements move forward under documented terms and a clearly communicated process.' },
];

const defaultInsights = [
  {
    category: 'Financial planning',
    title: 'How to prepare for a structured financial conversation',
    description: 'A practical view of the information that helps turn an initial enquiry into a clearer next step.',
  },
  {
    category: 'Business',
    title: 'Working-capital decisions: what to consider before seeking finance',
    description: 'Questions businesses can ask before choosing the amount, purpose and structure of external financing.',
  },
  {
    category: 'Investing',
    title: 'Matching an investment decision to objective, horizon and liquidity needs',
    description: 'Why investment conversations should begin with purpose and constraints rather than headline returns.',
  },
];

const sanitizeText = (value: unknown, fallback: string) => {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  const text = value.trim();
  if (/nigeria|nigerian/i.test(text)) return fallback;
  return text;
};

const getSection = (sections: CMSSection[], key: string) =>
  sections.find((section) => section.section_key === key)?.content || {};

const getImage = (contentImage: unknown, fallback: string) => {
  const candidate = typeof contentImage === 'string' ? contentImage.trim() : '';
  return candidate || fallback;
};

const ServiceIcon = ({ slug }: { slug: string }) => {
  const Icon = serviceMeta[slug]?.icon || Landmark;
  return <Icon className="h-5 w-5" aria-hidden="true" />;
};

export const InstitutionalHomePage: React.FC = () => {
  const { cmsPages, cmsSections, services, isLoading } = useContent() as any;
  const [publishedInsights, setPublishedInsights] = useState<BlogPost[]>([]);

  useEffect(() => {
    let active = true;
    fetchPublishedPosts(3)
      .then((rows) => active && setPublishedInsights(rows))
      .catch(() => { /* Phase 7 migration may not be installed yet; CMS fallbacks remain available. */ });
    return () => { active = false; };
  }, []);

  const page = useMemo(() => cmsPages?.find((item: any) => item.slug === 'home'), [cmsPages]);
  const sections: CMSSection[] = useMemo(
    () =>
      (cmsSections || [])
        .filter((section: CMSSection) => section.page_id === page?.id && section.is_enabled !== false)
        .sort((a: CMSSection, b: CMSSection) => (a.display_order || 0) - (b.display_order || 0)),
    [cmsSections, page?.id],
  );

  const hero = getSection(sections, 'hero');
  const trust = getSection(sections, 'trust');
  const intro = getSection(sections, 'intro');
  const process = getSection(sections, 'process');
  const why = getSection(sections, 'why');
  const cta = getSection(sections, 'cta');
  const insights = getSection(sections, 'insights');

  const canonicalServices = useMemo(() => {
    const bySlug = new Map<string, ServiceRecord>((services || []).map((service: ServiceRecord) => [service.slug, service]));
    return Object.keys(serviceMeta).map((slug) => {
      const record = bySlug.get(slug);
      return {
        slug,
        title: sanitizeText(record?.title, serviceMeta[slug].label),
        tagline: sanitizeText(record?.tagline, 'Structured support aligned to a defined objective'),
        description: sanitizeText(
          record?.description,
          'A professionally structured service designed around clear requirements, documentation and next steps.',
        ),
        href: serviceMeta[slug].href,
      };
    });
  }, [services]);

  const heroImage = getImage(hero.imageUrl, professionalImage);
  const approachImage = getImage(intro.imageUrl, meetingImage);

  const trustItems = Array.isArray(trust.items)
    ? trust.items.map((item: any, index: number) =>
        sanitizeText(typeof item === 'string' ? item : item?.value, defaultTrust[index] || defaultTrust[0]),
      ).slice(0, 4)
    : defaultTrust;

  const processSteps = Array.isArray(process.steps) && process.steps.length
    ? process.steps.slice(0, 4).map((item: any, index: number) => ({
        number: item.number || `0${index + 1}`,
        title: sanitizeText(item.title, defaultProcess[index]?.title || 'Next step'),
        description: sanitizeText(item.description, defaultProcess[index]?.description || ''),
      }))
    : defaultProcess;

  const whyItems = Array.isArray(why.items) && why.items.length
    ? why.items
        .map((item: any) => ({
          title: sanitizeText(item.title, ''),
          description: sanitizeText(item.description, ''),
        }))
        .filter((item: any) => item.title && item.description)
        .slice(0, 4)
    : [];

  const approachPoints = Array.isArray(intro.points)
    ? intro.points.map((point: any) => sanitizeText(typeof point === 'string' ? point : point?.value, '')).filter(Boolean).slice(0, 4)
    : defaultApproach.points;

  const editorialInsights = publishedInsights.length
    ? publishedInsights.slice(0, 3).map((item) => ({
        category: getPostCategory(item)?.name || 'Insight',
        title: item.title,
        description: item.excerpt,
        href: `/blog/${item.slug}`,
      }))
    : Array.isArray(insights.items) && insights.items.length
      ? insights.items.slice(0, 3).map((item: any, index: number) => ({
          category: sanitizeText(item.category, defaultInsights[index]?.category || 'Insight'),
          title: sanitizeText(item.title, defaultInsights[index]?.title || 'Financial insight'),
          description: sanitizeText(item.description, defaultInsights[index]?.description || ''),
          href: '/blog',
        }))
      : defaultInsights.map((item) => ({ ...item, href: '/blog' }));

  if (isLoading && !page) return <PageLoader label="Loading homepage" />;

  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#fbfbfc]">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[#080642] lg:block" aria-hidden="true" />
        <div className="ei-container relative grid min-h-[690px] items-stretch lg:grid-cols-[1.04fr_0.96fr]">
          <div className="flex items-center py-20 pr-0 sm:py-24 lg:py-28 lg:pr-16 xl:pr-20">
            <div className="max-w-[650px]">
              <div className="ei-eyebrow">{sanitizeText(hero.eyebrow, defaultHero.eyebrow)}</div>
              <h1 className="mt-6 max-w-[720px] text-[clamp(2.75rem,6vw,5.55rem)] font-[760] leading-[0.99] text-[#080642]">
                {sanitizeText(hero.heading, defaultHero.heading)}
              </h1>
              <p className="mt-7 max-w-[620px] text-[17px] leading-8 text-slate-600 sm:text-[18px]">
                {sanitizeText(hero.description, defaultHero.description)}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to={hero.primaryHref || defaultHero.primaryHref} className="ei-btn-primary px-5 py-3.5">
                  {sanitizeText(hero.primaryCta, defaultHero.primaryCta)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={hero.secondaryHref || defaultHero.secondaryHref}
                  className="inline-flex min-h-12 items-center gap-2 px-1 text-[14px] font-[700] text-[#0d0a64] transition-colors hover:text-[#d91c23]"
                >
                  {sanitizeText(hero.secondaryCta, defaultHero.secondaryCta)}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-12 flex max-w-[590px] items-start gap-3 border-t border-slate-200 pt-6 text-[12px] leading-6 text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d91c23]" />
                <span>
                  Enquiries are reviewed according to the relevant service requirements. Submitting an enquiry does not itself constitute approval or a binding offer.
                </span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
            <img
              src={heroImage}
              alt="Professional financial advisory conversation"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(event) => {
                const image = event.currentTarget;
                if (!image.dataset.fallback) {
                  image.dataset.fallback = '1';
                  image.src = professionalImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080642]/75 via-[#080642]/18 to-transparent lg:bg-gradient-to-r lg:from-[#080642]/25 lg:via-transparent lg:to-[#080642]/25" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8 lg:p-10">
              <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-white/55">A considered approach</p>
              <p className="mt-2 max-w-md text-[20px] font-[650] leading-8 sm:text-[23px]">
                Start with the objective. Structure the path. Communicate every step clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white" aria-label="Service principles">
        <div className="ei-container grid grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">
          {(trustItems.length ? trustItems : defaultTrust).map((item: string) => (
            <div key={item} className="flex min-h-[92px] items-center gap-3 px-4 py-5 first:pl-0 sm:px-6 sm:first:pl-0">
              <Check className="h-4 w-4 shrink-0 text-[#d91c23]" />
              <span className="text-[12px] font-[700] leading-5 text-[#263247]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ei-section bg-[#f6f7f9]">
        <div className="ei-container grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="ei-eyebrow">Our solutions</div>
            <h2 className="mt-5 max-w-md text-[clamp(2.2rem,4vw,3.8rem)] text-[#080642]">
              Different objectives. One disciplined standard of service.
            </h2>
            <p className="ei-copy mt-6 max-w-lg">
              Explore the solution that best reflects what you are trying to achieve. Each path has its own assessment, information and documentation requirements.
            </p>
            <Link to="/services" className="mt-7 inline-flex items-center gap-2 text-[13px] font-[750] text-[#0d0a64] hover:text-[#d91c23]">
              View all solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-slate-300">
            {canonicalServices.map((service, index) => (
              <Link
                key={service.slug}
                id={service.slug}
                to={service.href}
                className="group grid gap-5 border-b border-slate-300 py-7 transition-colors hover:bg-white sm:grid-cols-[56px_0.9fr_1.15fr_auto] sm:items-center sm:px-5 lg:py-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-[#0d0a64] transition-colors group-hover:border-[#0d0a64]">
                  <ServiceIcon slug={service.slug} />
                </div>
                <div>
                  <div className="text-[10px] font-[700] uppercase tracking-[0.14em] text-slate-400">0{index + 1}</div>
                  <h3 className="mt-1 text-[18px] text-[#080642] sm:text-[20px]">{service.title}</h3>
                </div>
                <p className="text-[13px] leading-6 text-slate-600">{service.description}</p>
                <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d91c23]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid lg:grid-cols-2">
          <div className="relative min-h-[430px] overflow-hidden lg:min-h-[650px]">
            <img
              src={approachImage}
              alt="Professional consultation and financial planning discussion"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                const image = event.currentTarget;
                if (!image.dataset.fallback) {
                  image.dataset.fallback = '1';
                  image.src = meetingImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-[#080642]/30" />
          </div>
          <div className="flex items-center py-16 lg:px-16 lg:py-24 xl:px-20">
            <div className="max-w-xl px-0">
              <div className="ei-eyebrow text-[#ff6b70]">{sanitizeText(intro.eyebrow, defaultApproach.eyebrow)}</div>
              <h2 className="mt-5 text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[1.05] text-white">
                {sanitizeText(intro.heading, defaultApproach.heading)}
              </h2>
              <p className="mt-7 text-[16px] leading-8 text-white/68">
                {sanitizeText(intro.description, defaultApproach.description)}
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {(approachPoints.length ? approachPoints : defaultApproach.points).map((point: string) => (
                  <div key={point} className="border-t border-white/18 pt-4">
                    <span className="text-[13px] font-[650] leading-6 text-white/88">{point}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="mt-9 inline-flex items-center gap-2 text-[13px] font-[700] text-white hover:text-white/70">
                Learn about Emunahh-Invest
                <ArrowRight className="h-4 w-4 text-[#ff6b70]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ei-section bg-white">
        <div className="ei-container">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="ei-eyebrow">How we work</div>
              <h2 className="mt-5 max-w-xl text-[clamp(2.2rem,4vw,3.65rem)] text-[#080642]">
                A clear path from first conversation to next step.
              </h2>
            </div>
            <p className="ei-copy max-w-2xl lg:justify-self-end">
              Our process is designed to keep the client informed while ensuring each request receives the context, review and documentation appropriate to the service.
            </p>
          </div>

          <div className="mt-14 grid border-t border-slate-300 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step: any, index: number) => (
              <article key={`${step.number}-${step.title}`} className="border-b border-slate-300 py-8 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:last:pr-0">
                <div className="text-[12px] font-[750] tracking-[0.12em] text-[#d91c23]">{step.number || `0${index + 1}`}</div>
                <h3 className="mt-8 max-w-[220px] text-[19px] text-[#080642]">{step.title}</h3>
                <p className="mt-4 max-w-[250px] text-[13px] leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container grid gap-10 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-20">
          <div>
            <div className="ei-eyebrow">Why Emunahh-Invest</div>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,3.8vw,3.35rem)] text-[#080642]">
              Professional service built around the quality of the decision.
            </h2>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {(whyItems.length
              ? whyItems
              : [
                  { title: 'Clarity first', description: 'Requirements, responsibilities and next steps are explained in practical language.' },
                  { title: 'Responsible structure', description: 'The proposed path should reflect the purpose, context and obligations of the engagement.' },
                  { title: 'Professional communication', description: 'Clients should know what is happening, what is required and what comes next.' },
                  { title: 'Relationship-led support', description: 'Important financial conversations benefit from accessible human guidance.' },
                ]
            ).map((item: any) => (
              <div key={item.title} className="border-t border-slate-300 pt-5">
                <h3 className="text-[16px] text-[#080642]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ei-section bg-white">
        <div className="ei-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="ei-eyebrow">Insights</div>
              <h2 className="mt-5 max-w-2xl text-[clamp(2.15rem,4vw,3.55rem)] text-[#080642]">
                Perspective for better financial conversations.
              </h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-[13px] font-[700] text-[#0d0a64] hover:text-[#d91c23]">
              View all insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid border-t border-slate-300 md:grid-cols-3">
            {editorialInsights.map((item: any, index: number) => (
              <Link
                key={item.title}
                to={item.href || '/blog'}
                className="group border-b border-slate-300 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-[750] uppercase tracking-[0.14em] text-[#d91c23]">{item.category}</span>
                  <span className="text-[11px] text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-[20px] leading-7 text-[#080642] transition-colors group-hover:text-[#d91c23]">{item.title}</h3>
                <p className="mt-4 text-[13px] leading-6 text-slate-600">{item.description}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[12px] font-[700] text-[#0d0a64]">
                  Read insight
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-white/45">Start a conversation</div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.15rem,4.2vw,4rem)] leading-[1.06] text-white">
              {sanitizeText(cta.heading, 'Tell us what you are working toward.')}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/62">
              {sanitizeText(
                cta.description,
                'Begin with a short enquiry and our team will guide you toward the most appropriate next step for the objective you describe.',
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/apply" className="ei-btn-primary min-w-[190px]">
              Start an enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[46px] min-w-[190px] items-center justify-center gap-2 rounded-lg border border-white/22 px-5 text-[13px] font-[700] text-white transition-colors hover:bg-white/8"
            >
              Contact our team
              <Compass className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
