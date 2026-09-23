import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Phone, MapPin } from 'lucide-react';
import { ServiceType } from '../types';

interface FinalCTAProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenApply }) => {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        <div className="bg-[#002B99] text-white rounded-2xl p-8 sm:p-14 text-center space-y-6 shadow-md relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white font-bold tracking-[0.14em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00A859]" />
            <span>EMUNAHH-INVEST LIMITED</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Fund Your Education or Accelerate Your Enterprise?
          </h2>

          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto font-normal leading-relaxed">
            Submit your financing application online or consult directly with our investment specialists in Lagos. 
            Prompt evaluations, transparent terms, and dependable capital execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-[#002B99] bg-white hover:bg-gray-100 rounded-lg transition-all shadow-xs group whitespace-nowrap"
            >
              <span>Apply Online Now</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#002B99] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/student-loans"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-all shadow-xs whitespace-nowrap"
            >
              <span>Student Loans Hub</span>
            </Link>

            <a
              href="https://wa.me/2348023190807?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20inquire%20about%20financing."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-white border border-white/30 hover:bg-white/10 rounded-lg transition-all whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-[#00A859]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/75">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00A859]" />
              <span>33, Crossway Plaza, New Oko Oba, Lagos</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#00A859]" />
              <span>0802 319 0807</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
