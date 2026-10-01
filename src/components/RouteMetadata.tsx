import React, { useEffect, useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { usePageMetadata } from '../lib/pageMetadata';

const routeToCmsSlug = (pathname: string) => {
  if (pathname === '/') return 'home';
  if (pathname === '/services') return 'services';
  if (pathname === '/about') return 'about';
  if (pathname === '/blog') return 'blog';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/apply') return 'apply';
  if (pathname === '/trust-security') return 'trust-security';
  if (pathname === '/disclosures') return 'disclosures';
  if (pathname === '/terms') return 'terms';
  if (pathname === '/privacy') return 'privacy';
  return null;
};

const fallbackMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Emunahh-Invest Limited | Structured Financial & Investment Solutions',
    description: 'Structured financial and investment solutions for individuals, families, professionals and businesses, with clear communication and responsible execution.',
  },
  services: {
    title: 'Financial Solutions | Emunahh-Invest Limited',
    description: 'Explore Education Financing, Travel Financing, Business Financing, Personal Finance and Investment Services from Emunahh-Invest Limited.',
  },
  about: {
    title: 'About Emunahh-Invest Limited',
    description: 'Learn about Emunahh-Invest Limited, our operating approach, service standards and commitment to clear, responsible financial relationships.',
  },
  blog: {
    title: 'Insights | Emunahh-Invest Limited',
    description: 'Read practical insights on financing, investment perspectives, business finance and responsible financial decision-making.',
  },
  contact: {
    title: 'Contact | Emunahh-Invest Limited',
    description: 'Contact Emunahh-Invest Limited to discuss a financial requirement, service enquiry or application.',
  },
  apply: {
    title: 'Start an Enquiry | Emunahh-Invest Limited',
    description: 'Start a structured enquiry for Education Financing, Travel Financing, Business Financing, Personal Finance or Investment Services.',
  },
  'trust-security': {
    title: 'Trust & Security | Emunahh-Invest Limited',
    description: 'Security guidance for communicating with Emunahh-Invest Limited and protecting personal and financial information.',
  },
  disclosures: {
    title: 'Disclosures & Important Information | Emunahh-Invest Limited',
    description: 'Important information about website content, financial enquiries, service availability, risk and formal documentation.',
  },
  terms: {
    title: 'Terms of Service | Emunahh-Invest Limited',
    description: 'Terms governing use of the Emunahh-Invest Limited website and submission of enquiries and applications.',
  },
  privacy: {
    title: 'Privacy Policy | Emunahh-Invest Limited',
    description: 'How Emunahh-Invest Limited handles information submitted through this website and related service interactions.',
  },
};

export const RouteMetadata: React.FC = () => {
  const { pathname } = useLocation();
  const { cmsPages, services, settings } = useContent();

  const serviceMatch = matchPath('/services/:slug', pathname);
  const articleMatch = matchPath('/blog/:slug', pathname);
  const cmsSlug = routeToCmsSlug(pathname);
  const cmsPage = cmsSlug ? cmsPages.find((page: any) => page.slug === cmsSlug) : null;
  const service = serviceMatch ? services.find((item) => item.slug === serviceMatch.params.slug) : null;

  const baseUrl = String(settings.websiteUrl || 'https://emunahhinvest.com').replace(/\/$/, '');

  const metadata = useMemo(() => {
    if (articleMatch) return null; // article pages manage their own metadata.

    if (pathname.startsWith('/documents/')) {
      return {
        title: 'Secure Document Upload | Emunahh-Invest Limited',
        description: 'Secure supporting-document upload for an existing Emunahh-Invest application.',
        canonical: `${baseUrl}${pathname}`,
        image: null,
        robots: 'noindex,nofollow,noarchive',
      };
    }

    if (service) {
      return {
        title: `${service.title} | Emunahh-Invest Limited`,
        description: service.description,
        canonical: `${baseUrl}/services/${service.slug}`,
        image: service.imageUrl || null,
        robots: 'index,follow',
      };
    }

    const fallback = cmsSlug ? fallbackMeta[cmsSlug] : null;
    if (cmsSlug && (cmsPage || fallback)) {
      return {
        title: cmsPage?.seo_title || fallback?.title || 'Emunahh-Invest Limited',
        description: cmsPage?.seo_description || fallback?.description || '',
        canonical: cmsPage?.canonical_url || `${baseUrl}${pathname === '/' ? '' : pathname}`,
        image: cmsPage?.og_image_url || null,
        robots: cmsPage?.robots || 'index,follow',
      };
    }

    return {
      title: settings.defaultSeoTitle || 'Emunahh-Invest Limited',
      description: settings.defaultSeoDescription || 'Structured financial and investment solutions with professional service, clear communication and responsible execution.',
      canonical: `${baseUrl}${pathname}`,
      image: settings.defaultOgImageUrl || null,
      robots: pathname.startsWith('/admin') ? 'noindex,nofollow' : 'index,follow',
    };
  }, [articleMatch, baseUrl, cmsPage, cmsSlug, pathname, service, settings.defaultSeoTitle, settings.defaultSeoDescription, settings.defaultOgImageUrl]);

  usePageMetadata(metadata || { title: document.title || 'Emunahh-Invest Limited' });

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const existing = document.getElementById('emunahh-org-schema');
    const node = existing || document.createElement('script');
    node.id = 'emunahh-org-schema';
    node.setAttribute('type', 'application/ld+json');
    node.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: settings.companyName || 'Emunahh-Invest Limited',
      url: baseUrl,
      email: settings.companyEmail || undefined,
      telephone: settings.phone || undefined,
      logo: settings.logoUrl || undefined,
      sameAs: [settings.socialLinkedInUrl, settings.socialXUrl].filter(Boolean),
    });
    if (!existing) document.head.appendChild(node);
  }, [baseUrl, pathname, settings.companyEmail, settings.companyName, settings.logoUrl, settings.phone, settings.socialLinkedInUrl, settings.socialXUrl]);

  return null;
};
