import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesSection } from '../components/ServicesSection';
import { StudentLoanFeature } from '../components/StudentLoanFeature';
import { InvestmentFeature } from '../components/InvestmentFeature';
import { AboutSection } from '../components/AboutSection';
import { WhyUs } from '../components/WhyUs';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { FinalCTA } from '../components/FinalCTA';
import { ServiceType } from '../types';

interface HomePageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenApply }) => {
  return (
    <>
      {/* 1. Hero: Warm Off-White Editorial Composition with Subtle Particles */}
      <Hero onOpenApply={onOpenApply} />

      {/* 2. Hero Information Strip / Direct Category Routing */}
      <TrustStrip />

      {/* 3. Services: Clean Balanced Cards & Featured Education Financing */}
      <ServicesSection onOpenApply={onOpenApply} />

      {/* 4. Student Loans: Deep Navy Feature with 4-Step Process */}
      <StudentLoanFeature onOpenApply={onOpenApply} />

      {/* 5. Investment: Warm Ivory Wealth & Capital Preservation */}
      <InvestmentFeature onOpenApply={onOpenApply} />

      {/* 6. About Emunahh-Invest: Editorial Layout */}
      <AboutSection />

      {/* 7. Why Emunahh: Deep Navy Clarity & Core Principles */}
      <WhyUs />

      {/* 8. FAQs & Institutional Governance */}
      <FAQSection />

      {/* 9. Lagos Walk-In & Advisory Contact Desk */}
      <ContactSection />

      {/* 10. Final Call to Action: Emerald & Navy */}
      <FinalCTA onOpenApply={onOpenApply} />
    </>
  );
};
