import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import heroDefaultImage from '../assets/images/professional_advisory_hero.webp';
import graduateDefaultImage from '../assets/images/education_financing.webp';
import meetingDefaultImage from '../assets/images/investment_advisory_meeting.webp';

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
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImageUrl?: string;
  socialLinkedInUrl?: string;
  socialXUrl?: string;
}

const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'EMUNAHH-INVEST LIMITED',
    heading: 'Structured Finance for What Comes Next.',
    highlightWord: 'What Comes Next.',
    description: 'Professional financial and investment solutions for individuals, families, professionals and businesses, built around clear objectives, responsible structures and dependable support.',
    primaryCta: 'EXPLORE SERVICES',
    secondaryCta: 'START AN ENQUIRY',
    imageUrl: heroDefaultImage.src,
  },
  about: {
    title: 'ABOUT EMUNAHH-INVEST',
    headline: 'A professional financial partner built around clarity and trust.',
    intro: 'Emunahh-Invest Limited provides structured financial and investment solutions for clients navigating important personal, educational, commercial and investment decisions.',
    secondaryIntro: 'Our approach combines clear communication, responsible assessment, documented terms and practical support from enquiry through completion.',
    mission: 'To provide dependable financial solutions that help clients make progress with confidence.',
    vision: 'To be a trusted international-facing financial and investment company known for professional service, responsible structures and clear communication.',
    values: [
      { title: 'Clarity', desc: 'Important requirements, terms and next steps are explained clearly.' },
      { title: 'Professionalism', desc: 'Every engagement is handled with structure, care and accountability.' },
      { title: 'Responsibility', desc: 'Solutions are assessed around genuine needs, suitability and documented obligations.' },
      { title: 'Client Focus', desc: 'We build practical relationships around each client’s objectives and timeline.' },
    ],
  },
  investment: {
    heading: 'INVEST WITH PURPOSE.',
    tagline: 'Structured Investment Solutions',
    description: 'Investment opportunities and advisory support designed around defined objectives, time horizons and responsible decision-making.',
  },
  studentLoans: {
    heading: 'FUND THE NEXT STAGE OF YOUR EDUCATION.',
    tagline: 'Education Financing',
    description: 'Structured education financing for eligible students, families and sponsors, with clear documentation and repayment expectations.',
  },
  contact: {
    officeAddress: '',
    phone: '+234 802 319 0807',
    secondaryPhone: '+234 817 917 1456',
    email: 'contact@emunahhinvest.com',
    whatsapp: '0802 319 0807',
    hours: 'Monday – Friday: 8:30 AM – 5:00 PM (WAT)',
    socialTwitter: 'https://twitter.com/emunahhinvest',
    socialLinkedIn: 'https://linkedin.com/company/emunahh-invest',
  },
  footer: {
    statement: 'Emunahh-Invest Limited provides structured financial and investment solutions with professional service, clear communication and responsible execution.',
  },
};

const defaultServices: ServiceRecord[] = [
  { id:'srv-1', slug:'education-financing', title:'Education Financing', category:'featured', tagline:'Structured support for education costs', description:'Financing designed around eligible tuition and education-related obligations, with clear documentation and structured repayment.', bullets:['Education and tuition-related funding','Clear application and documentation process','Structured repayment expectations','Support from enquiry through completion'], imageUrl:graduateDefaultImage.src, isPublished:true, order:1 },
  { id:'srv-2', slug:'travel-financing', title:'Travel Financing', category:'supporting', tagline:'Funding for approved travel plans', description:'Structured financing for eligible travel-related expenses, subject to assessment, documentation and approval.', bullets:['Travel and trip-related expenses','Clear eligibility and documentation','Defined repayment structure','Professional application support'], imageUrl:meetingDefaultImage.src, isPublished:true, order:2 },
  { id:'srv-3', slug:'business-financing', title:'Business Financing', category:'supporting', tagline:'Working capital for growing businesses', description:'Practical financing for verified businesses and commercial operators that need support for working capital and growth.', bullets:['Working-capital support','Inventory and operating needs','Business cash-flow assessment','Structured repayment terms'], imageUrl:'', isPublished:true, order:3 },
  { id:'srv-4', slug:'personal-finance', title:'Personal Finance', category:'supporting', tagline:'Flexible funding for eligible individuals', description:'Responsible personal financing for eligible clients with clear terms, documentation and repayment expectations.', bullets:['Personal funding needs','Transparent terms','Defined repayment schedules','Human support throughout the process'], imageUrl:heroDefaultImage.src, isPublished:true, order:4 },
  { id:'srv-5', slug:'investment-services', title:'Investment Services', category:'supporting', tagline:'Structured investment and wealth solutions', description:'Investment solutions designed around objectives, time horizons, documented terms and responsible decision-making.', bullets:['Goal-aligned investment structures','Defined horizons and terms','Professional communication','Ongoing relationship support'], imageUrl:meetingDefaultImage.src, isPublished:true, order:5 },
];

const defaultSettings: SiteSettings = {
  companyName: 'Emunahh-Invest Limited',
  companyEmail: 'contact@emunahhinvest.com',
  phone: '+234 802 319 0807',
  secondaryPhone: '+234 817 917 1456',
  whatsapp: '0802 319 0807',
  officeAddress: '',
  websiteUrl: 'https://emunahhinvest.com',
  logoUrl: '',
  defaultSeoTitle: 'Emunahh-Invest Limited | Structured Financial & Investment Solutions',
  defaultSeoDescription: 'Structured financial and investment solutions with professional service, clear communication and responsible execution.',
  defaultOgImageUrl: '',
  socialLinkedInUrl: '',
  socialXUrl: '',
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
        supabase.from('site_settings').select('company_name,company_email,phone,secondary_phone,whatsapp,office_address,website_url,logo_url,default_seo_title,default_seo_description,default_og_image_url,social_linkedin_url,social_x_url').eq('id',1).maybeSingle(),
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
        setSettings(prev=>({...prev,companyName:s.company_name,companyEmail:s.company_email,phone:s.phone,secondaryPhone:s.secondary_phone,whatsapp:s.whatsapp,officeAddress:s.office_address,websiteUrl:s.website_url,logoUrl:s.logo_url||'',defaultSeoTitle:s.default_seo_title||prev.defaultSeoTitle,defaultSeoDescription:s.default_seo_description||prev.defaultSeoDescription,defaultOgImageUrl:s.default_og_image_url||'',socialLinkedInUrl:s.social_linkedin_url||'',socialXUrl:s.social_x_url||''}));
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
