import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesSection } from '../components/ServicesSection';
import { StudentLoanFeature } from '../components/StudentLoanFeature';
import { InvestmentFeature } from '../components/InvestmentFeature';
import { BusinessFeature } from '../components/BusinessFeature';
import { WhyUs } from '../components/WhyUs';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { BlogSection } from '../components/BlogSection';
import { AboutSection } from '../components/AboutSection';
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
      <Hero onOpenApply={onOpenApply} />
      <TrustStrip />
      <ServicesSection onOpenApply={onOpenApply} />
      <StudentLoanFeature onOpenApply={onOpenApply} />
      <InvestmentFeature onOpenApply={onOpenApply} />
      <BusinessFeature onOpenApply={onOpenApply} />
      <WhyUs />
      <ProcessTimeline onOpenApply={onOpenApply} />
      <BlogSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <FinalCTA onOpenApply={onOpenApply} />
    </>
  );
};
