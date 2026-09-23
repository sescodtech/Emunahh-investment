import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Phone, MapPin } from 'lucide-react';
import { ServiceType } from '../types';

interface FinalCTAProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenApply }) => {
  return (
    <section className="bg-[#071A2B] text-white py-20 lg:py-28 relative overflow-hidden border-t border-white/10">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#087A5A]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8 z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#C6A15B] font-bold tracking-[0.15em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" />
          <span>EMUNAHH-INVEST LIMITED</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Fund Your Education or Accelerate Your Enterprise?
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          Submit your financing application online or consult directly with our senior investment specialists in Lagos. 
          Prompt evaluations, transparent terms, and dependable capital execution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold text-[#071A2B] bg-white hover:bg-[#F8F7F3] rounded-lg transition-all shadow-sm group whitespace-nowrap"
          >
            <span>Apply Online Now</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#087A5A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            to="/student-loans"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-lg transition-all shadow-sm whitespace-nowrap"
          >
            <span>Student Loans Hub</span>
          </Link>

          <a
            href="https://wa.me/2348179171456?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20inquire%20about%20financing."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 bg-white/5 rounded-lg transition-all whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-[#087A5A]" />
            <span>WhatsApp Desk</span>
          </a>
        </div>

        {/* Corporate Office Tag */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#087A5A]" />
            <span>33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba, Lagos</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#087A5A]" />
            <span>Hotlines: +234 817 917 1456 · +234 814 112 8119</span>
          </span>
        </div>

      </div>
    </section>
  );
};
