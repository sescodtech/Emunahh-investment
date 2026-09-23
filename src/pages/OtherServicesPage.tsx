import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, FileSearch, ArrowUpRight, MessageSquare, Layers } from 'lucide-react';
import { ServiceType } from '../types';

interface OtherServicesPageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const OtherServicesPage: React.FC<OtherServicesPageProps> = ({ onOpenApply }) => {
  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      <section className="bg-[#00174D] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Other Financial Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
              Other Financial Services & Advisory
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Specialized financial advisory, debt structuring, educational trust frameworks, 
              and commercial feasibility assessments delivered by experienced Nigerian financial analysts.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenApply('other_services')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-all shadow-sm"
              >
                <span>Request Advisory Brief</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#00A859]" />
              </button>

              <a
                href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Financial%20Advisory%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Advisory Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
              <FileSearch className="w-6 h-6 text-[#00A859]" />
              <h3 className="text-lg font-semibold text-[#002B99]">Commercial Feasibility Studies</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                In-depth financial modeling and viability analysis for new commercial projects, retail expansions, or institutional acquisitions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
              <Layers className="w-6 h-6 text-[#00A859]" />
              <h3 className="text-lg font-semibold text-[#002B99]">Debt Restructuring & Resolution</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                Professional mediation and refinancing to consolidate high-interest legacy bank debts into manageable, transparent payment tenures.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
              <Compass className="w-6 h-6 text-[#00A859]" />
              <h3 className="text-lg font-semibold text-[#002B99]">Educational Trust Advisory</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                Structuring dedicated educational escrow funds and sponsorship vehicles for extended families and diaspora benefactors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
