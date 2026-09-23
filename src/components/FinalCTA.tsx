import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useContent } from '../context/ContentContext';
import { ServiceType } from '../types';

interface FinalCTAProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenApply }) => {
  const { content } = useContent();
  const contact = content.contact;

  return (
    <section className="bg-white py-16 lg:py-22 border-b border-[#071A2B]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#087A5A] text-white rounded-xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white font-bold tracking-[0.18em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B]" />
            <span>EMUNAHH-INVEST LIMITED</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Fund Your Education or Accelerate Your Enterprise?
          </h2>

          <p className="text-base text-white/90 max-w-xl mx-auto font-normal leading-relaxed">
            Submit your financing application online or consult directly with our investment specialists in Lagos. 
            Prompt evaluations, transparent terms, and dependable capital execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-[#071A2B] bg-white hover:bg-[#F8F7F3] rounded-md transition-all shadow-md group whitespace-nowrap"
            >
              <span>Apply Online Now</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#071A2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/student-loans"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-md transition-all shadow-md whitespace-nowrap"
            >
              <span>Student Loans Hub</span>
            </Link>

            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20inquire%20about%20financing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#04513E] hover:bg-[#071A2B] rounded-md transition-all shadow-md whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
              <span>Direct WhatsApp Desk</span>
            </a>
          </div>

          <div className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{contact.officeAddress}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{contact.phone}</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
