import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, FileSearch, ArrowUpRight, MessageSquare, Layers } from 'lucide-react';
import { ServiceType } from '../types';

interface OtherServicesPageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const OtherServicesPage: React.FC<OtherServicesPageProps> = ({ onOpenApply }) => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#F8F7F3] border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#087A5A] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Other Financial Services</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
              Other Financial Services & Advisory
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Specialized financial advisory, debt structuring, educational trust frameworks, 
              and commercial feasibility assessments delivered by experienced Nigerian financial analysts.
            </p>

            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => onOpenApply('other_services')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <span>Request Advisory Brief</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#C6A15B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Financial%20Advisory%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-lg transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Advisory Desk (0802 319 0807)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
              <FileSearch className="w-6 h-6 text-[#087A5A]" />
              <h3 className="text-base font-bold text-[#071A2B]">Commercial Feasibility Studies</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Independent evaluation of trade viability, project cash-flows, and market risks for enterprise expansions.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
              <Layers className="w-6 h-6 text-[#087A5A]" />
              <h3 className="text-base font-bold text-[#071A2B]">Educational Trust Frameworks</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Structuring dedicated multi-year educational escrow arrangements for parents planning tertiary funding.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
              <Compass className="w-6 h-6 text-[#087A5A]" />
              <h3 className="text-base font-bold text-[#071A2B]">Debt Mediation & Restructuring</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Professional advisory on renegotiating unsupportable commercial obligations into manageable amortization lines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
