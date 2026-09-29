import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { ServicesSection } from '../components/ServicesSection';
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

      {/* 4. About Emunahh-Invest */}
      <AboutSection />

      {/* 5. Why Emunahh */
      <WhyUs />

      {/* 6. FAQs */
      <FAQSection />

      {/* 7. Contact */
      <ContactSection />

      {/* 8. Final call to action */
      <FinalCTA onOpenApply={onOpenApply} />
    </>
  );
};
