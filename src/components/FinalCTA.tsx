import React from 'react';
import { ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { ServiceType } from '../types';

interface FinalCTAProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenApply }) => {
  return (
    <section className="bg-[#0B1528] text-white py-20 lg:py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0E765E]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 text-xs text-[#C5A869] font-medium tracking-wider uppercase">
          <span>EMUNAHH-INVEST LIMITED</span>
          <span aria-hidden="true">·</span>
          <span>YOUR FINANCIAL PROGRESS PARTNER</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight leading-tight max-w-3xl mx-auto text-balance">
          Ready to Fund Your Education or Accelerate Your Enterprise?
        </h2>

        <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto font-light leading-relaxed">
          Begin your application online or speak directly with our advisory specialists in Lagos. 
          Clear documentation, prompt decisions, and dependable capital support.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenApply('student_loan')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold text-[#0B1528] bg-white hover:bg-[#F5F5F0] rounded transition-all duration-150 shadow-sm group whitespace-nowrap"
          >
            <span>Apply for Student Loan</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-[#0E765E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => onOpenApply('investment')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-medium text-white/90 hover:text-white border border-white/20 hover:border-white/40 bg-white/5 rounded transition-all duration-150 whitespace-nowrap"
          >
            <span>Inquire on Investment Services</span>
          </button>

          <a
            href="https://wa.me/2348179171456"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium text-[#0E765E] bg-[#0E765E]/15 hover:bg-[#0E765E]/25 rounded transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Office Contact Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0E765E]" />
            <span>Head Office: 33, Crossway Plaza, New Oko Oba, Lagos</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
            <span className="tabular-nums">+234 817 917 1456 / +234 814 112 8119</span>
          </div>
        </div>

      </div>
    </section>
  );
};
