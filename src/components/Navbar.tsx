import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';
import { primaryNavigation, solutionNavigation } from '../config/siteNavigation';

export const Navbar: React.FC = () => {
  const { settings, cmsPages, cmsSections } = useContent() as any;
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMobileMenuOpen]);

  const globalPage = cmsPages?.find((page: any) => page.slug === 'global');
  const headerSection = cmsSections?.find(
    (section: any) => section.page_id === globalPage?.id && section.section_key === 'header',
  );

  const configuredLinks = Array.isArray(headerSection?.content?.links)
    ? headerSection.content.links
    : [];

  const navLinks = useMemo(
    () =>
      primaryNavigation.map((item) => {
        const configured = configuredLinks.find((link: any) => link?.href === item.href);
        return { ...item, label: String(configured?.label || item.label) };
      }),
    [configuredLinks],
  );

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const email = settings?.companyEmail || 'contact@emunahhinvest.com';
  const ctaLabel = headerSection?.content?.ctaLabel || 'Start an enquiry';

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden border-b border-white/10 bg-[#080642] text-white/72 lg:block">
        <div className="ei-container flex h-9 items-center justify-between text-[11px] font-medium tracking-[0.02em]">
          <span>Structured financial solutions. Clear process. Professional support.</span>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>{email}</span>
          </a>
        </div>
      </div>

      <div
        className={`border-b bg-white/95 backdrop-blur-xl transition-all duration-200 ${
          isScrolled
            ? 'border-slate-200/90 shadow-[0_10px_30px_rgba(21,32,51,0.06)]'
            : 'border-slate-200/70'
        }`}
      >
        <div className="ei-container flex h-[72px] items-center justify-between gap-6 lg:h-[78px]">
          <Link
            to="/"
            className="shrink-0 rounded-md focus-visible:outline-none"
            aria-label="Emunahh-Invest Limited home"
          >
            <Logo variant="light" size="md" logoUrl={settings?.logoUrl} />
          </Link>

          <nav className="hidden h-full items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              if (link.href === '/services') {
                return (
                  <div key={link.href} className="group relative flex h-full items-center">
                    <Link
                      to={link.href}
                      className={`inline-flex h-full items-center gap-1.5 border-b-2 px-3 text-[13px] font-[650] transition-colors ${
                        active
                          ? 'border-[#d91c23] text-[#0d0a64]'
                          : 'border-transparent text-slate-600 hover:text-[#0d0a64]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    <div className="pointer-events-none invisible absolute left-1/2 top-[calc(100%-1px)] w-[650px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="overflow-hidden rounded-b-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(8,6,66,0.14)]">
                        <div className="grid grid-cols-[1.5fr_0.8fr]">
                          <div className="p-5">
                            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                              Financial solutions
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {solutionNavigation.map((solution) => (
                                <Link
                                  key={solution.label}
                                  to={solution.href}
                                  className="group/item rounded-xl p-3 transition-colors hover:bg-slate-50"
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-[13px] font-[700] text-[#0d0a64]">
                                      {solution.label}
                                    </span>
                                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover/item:text-[#d91c23]" />
                                  </div>
                                  <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                                    {solution.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between bg-[#080642] p-6 text-white">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/45">
                                Need guidance?
                              </div>
                              <p className="mt-3 text-lg font-[650] leading-7 text-white">
                                Start with your objective. We’ll guide you to the right service path.
                              </p>
                            </div>
                            <Link
                              to="/services"
                              className="mt-8 inline-flex items-center gap-2 text-[12px] font-[700] text-white transition-colors hover:text-white/75"
                            >
                              View all services
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`inline-flex h-full items-center border-b-2 px-3 text-[13px] font-[650] transition-colors ${
                    active
                      ? 'border-[#d91c23] text-[#0d0a64]'
                      : 'border-transparent text-slate-600 hover:text-[#0d0a64]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link to="/apply" className="ei-btn-primary hidden sm:inline-flex">
              <span>{ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0d0a64] transition-colors hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[73px] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
          <div className="ei-container py-6">
            <nav className="space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                if (link.href === '/services') {
                  return (
                    <div key={link.href} className="border-b border-slate-100 py-1">
                      <div className="flex items-center gap-2">
                        <Link
                          to="/services"
                          className={`flex-1 rounded-lg px-3 py-3 text-[15px] font-[650] ${
                            active ? 'text-[#0d0a64]' : 'text-slate-700'
                          }`}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen((open) => !open)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50"
                          aria-expanded={isMobileServicesOpen}
                          aria-label="Toggle service links"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      {isMobileServicesOpen && (
                        <div className="mb-2 ml-3 border-l border-slate-200 pl-3">
                          {solutionNavigation.map((solution) => (
                            <Link
                              key={solution.label}
                              to={solution.href}
                              className="block rounded-lg px-3 py-2.5 text-[13px] font-[600] text-slate-600 hover:bg-slate-50 hover:text-[#0d0a64]"
                            >
                              {solution.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block border-b border-slate-100 px-3 py-4 text-[15px] font-[650] ${
                      active ? 'text-[#0d0a64]' : 'text-slate-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-7 rounded-2xl bg-[#080642] p-5 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
                Client enquiries
              </p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Tell us what you are looking to achieve and our team will direct your enquiry appropriately.
              </p>
              <Link to="/apply" className="ei-btn-primary mt-5 w-full">
                <span>{ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${email}`}
                className="mt-4 flex items-center justify-center gap-2 text-[12px] font-[600] text-white/65 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                {email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
