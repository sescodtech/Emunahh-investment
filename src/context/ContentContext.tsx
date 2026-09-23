import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import heroDefaultImage from '../assets/images/nigerian_businesswoman_hero_1790205199974.jpg';
import graduateDefaultImage from '../assets/images/nigerian_graduate_success_1790142702336.jpg';
import meetingDefaultImage from '../assets/images/african_investment_meeting_1790151240660.jpg';

export interface SiteContent {
  hero: {
    eyebrow: string;
    heading: string;
    highlightWord: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imageUrl: string;
  };
  about: {
    title: string;
    headline: string;
    intro: string;
    secondaryIntro: string;
    mission: string;
    vision: string;
    values: Array<{ title: string; desc: string }>;
  };
  investment: {
    heading: string;
    tagline: string;
    description: string;
  };
  studentLoans: {
    heading: string;
    tagline: string;
    description: string;
  };
  contact: {
    officeAddress: string;
    phone: string;
    secondaryPhone: string;
    email: string;
    whatsapp: string;
    hours: string;
    socialTwitter?: string;
    socialLinkedIn?: string;
  };
  footer: {
    statement: string;
  };
}

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  category: 'featured' | 'supporting';
  tagline: string;
  description: string;
  bullets: string[];
  imageUrl?: string;
  isPublished: boolean;
  order: number;
}

export interface SiteSettings {
  companyName: string;
  companyEmail: string;
  phone: string;
  secondaryPhone: string;
  whatsapp: string;
  officeAddress: string;
  websiteUrl: string;
}

const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'EMUNAHH-INVEST LIMITED',
    heading: 'Financial Solutions Designed for Your Next Chapter.',
    highlightWord: 'Next Chapter.',
    description: 'Practical financial solutions designed to support students, individuals and businesses in achieving meaningful financial goals.',
    primaryCta: 'EXPLORE OUR SOLUTIONS',
    secondaryCta: 'GET STARTED',
    imageUrl: heroDefaultImage,
  },
  about: {
    title: 'CORPORATE HERITAGE & DISCIPLINE',
    headline: 'An Established Financial Institution Founded on Integrity and Accessibility',
    intro: 'Emunahh-Invest Limited is a registered Nigerian financial and investment company headquartered in Lagos. Founded on the core conviction that finance should be clear, accountable, and accessible, we bridge critical funding gaps for students, disciplined professionals, and growing commercial enterprises.',
    secondaryIntro: 'Unlike speculative operations or predatory instant-app lenders, we provide human-centered, structured facilities with legally executed terms, direct institutional settlements, and transparent repayment schedules.',
    mission: 'To deliver transparent, dependable education financing and disciplined wealth solutions that accelerate academic excellence and commercial progress across Nigeria.',
    vision: 'To be recognized across Nigeria as the premier trusted private finance house, distinguished by transformative education loans and sound commercial support.',
    values: [
      { title: 'Transparency', desc: 'Every repayment schedule and contractual covenant is formalized in clear terms with zero hidden fees.' },
      { title: 'Professionalism', desc: 'Rigorous institutional underwriting standards and capital preservation disciplines across all portfolios.' },
      { title: 'Accessibility', desc: 'Direct-to-institution disbursements and responsive advisory support designed to serve real-world timelines.' },
      { title: 'Customer Focus', desc: 'Long-term partnership built around student academic matriculation, personal stability, and enterprise growth.' },
    ],
  },
  investment: {
    heading: 'GROW WITH PURPOSE.',
    tagline: 'Capital Preservation Mandate',
    description: 'Structured wealth allocation designed for corporate treasuries, Nigerian professionals, and diaspora investors seeking reliable home-country deployment without speculative volatility.',
  },
  studentLoans: {
    heading: 'YOUR EDUCATION IS AN INVESTMENT IN YOUR FUTURE.',
    tagline: 'Tuition Protection Facility',
    description: 'Direct institutional tuition remittance for accredited Nigerian universities, postgraduate programs, and professional exam bodies—ensuring studies continue without disruption.',
  },
  contact: {
    officeAddress: '33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.',
    phone: '+234 802 319 0807',
    secondaryPhone: '+234 817 917 1456',
    email: 'contact@emunahhinvest.com',
    whatsapp: '0802 319 0807',
    hours: 'Monday – Friday: 8:30 AM – 5:00 PM (WAT)',
    socialTwitter: 'https://twitter.com/emunahhinvest',
    socialLinkedIn: 'https://linkedin.com/company/emunahh-invest',
  },
  footer: {
    statement: 'Emunahh-Invest Limited is an incorporated financial and investment company in the Federal Republic of Nigeria, dedicated to ethical credit, student advancement, and sound asset deployment.',
  },
};

const defaultServices: ServiceRecord[] = [
  {
    id: 'srv-1',
    slug: 'student-loans',
    title: 'Student Loans / Education Financing',
    category: 'featured',
    tagline: 'Direct Tuition Support for Nigerian Scholars',
    description: 'Structured tuition financing remitted directly to accredited tertiary institutions, law schools, and professional exam bodies with predictable sponsor amortization.',
    bullets: [
      'Direct institutional tuition remittance to school bank accounts',
      'Predictable monthly sponsor amortizations with grace periods',
      'Coverage across accredited federal, state, and private universities',
      'Applicable for Nigerian Law School, ICAN, and postgraduate courses',
    ],
    imageUrl: graduateDefaultImage,
    isPublished: true,
    order: 1,
  },
  {
    id: 'srv-2',
    slug: 'investments',
    title: 'Investment Services',
    category: 'supporting',
    tagline: 'Capital Preservation & Wealth Advisory',
    description: 'Disciplined wealth placements anchored on real-economy productive assets, formalized legal contracts, and zero speculative crypto or forex exposure.',
    bullets: [
      'Principal protection mandate on productive commercial assets',
      'Goal-aligned tenures (6, 12, and 24-month horizon placements)',
      'Fully formalized legal contracts and regulatory governance',
    ],
    imageUrl: meetingDefaultImage,
    isPublished: true,
    order: 2,
  },
  {
    id: 'srv-3',
    slug: 'business-financing',
    title: 'Business Financing',
    category: 'supporting',
    tagline: 'Working Capital for Verified Enterprises',
    description: 'Commercial credit underwritten on verifiable bank statement turnover and inventory velocity rather than prohibitive property collateral.',
    bullets: [
      'Merchant inventory restocking and supply cycle financing',
      'Revolving operational working capital for established SMEs',
      'Practical underwriting based on verifiable commercial flow',
    ],
    isPublished: true,
    order: 3,
  },
  {
    id: 'srv-4',
    slug: 'personal-finance',
    title: 'Personal Financial Solutions',
    category: 'supporting',
    tagline: 'Salary-Backed Liquidity Lines',
    description: 'Transparent personal facilities engineered for verified corporate professionals to meet milestone commitments without compounding surprises.',
    bullets: [
      'Salary-backed liquidity lines for verified employees',
      'Transparent milestone repayment schedules in plain terms',
      'No invasive automated data scraping or arbitrary charges',
    ],
    isPublished: true,
    order: 4,
  },
];

const defaultSettings: SiteSettings = {
  companyName: 'Emunahh-Invest Limited',
  companyEmail: 'contact@emunahhinvest.com',
  phone: '+234 802 319 0807',
  secondaryPhone: '+234 817 917 1456',
  whatsapp: '0802 319 0807',
  officeAddress: '33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.',
  websiteUrl: 'https://emunahhinvest.com',
};

interface ContentContextType {
  content: SiteContent;
  services: ServiceRecord[];
  settings: SiteSettings;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  services: defaultServices,
  settings: defaultSettings,
  isLoading: false,
  refreshContent: async () => {},
});

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [services, setServices] = useState<ServiceRecord[]>(defaultServices);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDynamicData = async () => {
    try {
      setIsLoading(true);
      const [contentRes, servicesRes, settingsRes] = await Promise.allSettled([
        fetch('/api/content'),
        fetch('/api/services'),
        fetch('/api/settings'),
      ]);

      if (contentRes.status === 'fulfilled' && contentRes.value.ok) {
        const data = await contentRes.value.json();
        if (data.content) {
          setContent((prev) => ({
            ...prev,
            ...data.content,
            hero: {
              ...prev.hero,
              ...data.content.hero,
              // Fallback to bundled image if imageUrl is empty or invalid
              imageUrl: data.content.hero?.imageUrl || heroDefaultImage,
            },
          }));
        }
      }

      if (servicesRes.status === 'fulfilled' && servicesRes.value.ok) {
        const data = await servicesRes.value.json();
        if (data.services && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      }

      if (settingsRes.status === 'fulfilled' && settingsRes.value.ok) {
        const data = await settingsRes.value.json();
        if (data) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      }
    } catch (err) {
      console.warn('Using bundled default content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicData();
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        services,
        settings,
        isLoading,
        refreshContent: fetchDynamicData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
