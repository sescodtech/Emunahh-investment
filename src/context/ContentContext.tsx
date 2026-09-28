import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import heroDefaultImage from '../assets/images/nigerian_businesswoman_hero_1790205199974.webp';
import graduateDefaultImage from '../assets/images/nigerian_graduate_success_1790142702336.webp';
import meetingDefaultImage from '../assets/images/african_investment_meeting_1790151240660.webp';

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
  logoUrl?: string;
}

const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'EMUNAHH-INVEST LIMITED',
    heading: 'Financial Solutions Designed for Your Next Chapter.',
    highlightWord: 'Next Chapter.',
    description: 'Practical financial solutions designed to support students, individuals and businesses in achieving meaningful financial goals.',
    primaryCta: 'EXPLORE OUR SOLUTIONS',
    secondaryCta: 'GET STARTED',
    imageUrl: heroDefaultImage.src,
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
    imageUrl: graduateDefaultImage.src,
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
    imageUrl: meetingDefaultImage.src,
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
  logoUrl: '',
};

interface ContentContextType {
  content: SiteContent;
  services: ServiceRecord[];
  settings: SiteSettings;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  cmsPages: any[];
  cmsSections: any[];
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  services: defaultServices,
  settings: defaultSettings,
  isLoading: false,
  refreshContent: async () => {},
  cmsPages: [],
  cmsSections: [],
});

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [services, setServices] = useState<ServiceRecord[]>(defaultServices);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cmsPages, setCmsPages] = useState<any[]>([]);
  const [cmsSections, setCmsSections] = useState<any[]>([]);

  const fetchDynamicData = async () => {
    try {
      setIsLoading(true);
      const [contentRes, servicesRes, settingsRes, pagesRes, sectionsRes] = await Promise.all([
        supabase.from('site_content').select('content').eq('id',1).maybeSingle(),
        supabase.from('services').select('id,slug,title,category,tagline,description,bullets,image_url,is_published,display_order').eq('is_published',true).order('display_order'),
        supabase.from('site_settings').select('company_name,company_email,phone,secondary_phone,whatsapp,office_address,website_url,logo_url').eq('id',1).maybeSingle(),
        supabase.from('cms_pages').select('*').eq('status','published').order('title'),
        supabase.from('cms_sections').select('*').eq('is_enabled',true).order('display_order'),
      ]);
      if (!contentRes.error && contentRes.data?.content) {
        const data:any = contentRes.data.content;
        setContent(prev => ({...prev,...data,hero:{...prev.hero,...data.hero,imageUrl:data.hero?.imageUrl||heroDefaultImage.src}}));
      }
      if (!servicesRes.error && servicesRes.data?.length) {
        setServices(servicesRes.data.map((s:any)=>({...s,imageUrl:s.image_url,isPublished:s.is_published,order:s.display_order})));
      }
      if (!pagesRes?.error) setCmsPages(pagesRes?.data || []);
      if (!sectionsRes?.error) setCmsSections(sectionsRes?.data || []);
      if (!settingsRes.error && settingsRes.data) {
        const s:any=settingsRes.data;
        setSettings(prev=>({...prev,companyName:s.company_name,companyEmail:s.company_email,phone:s.phone,secondaryPhone:s.secondary_phone,whatsapp:s.whatsapp,officeAddress:s.office_address,websiteUrl:s.website_url,logoUrl:s.logo_url||''}));
      }
    } catch (err) { console.warn('Using bundled default content:', err); }
    finally { setIsLoading(false); }
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
        cmsPages,
        cmsSections,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
