import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Calendar, ArrowUpRight, MessageSquare } from 'lucide-react';
import { ServiceType } from '../types';

interface PersonalFinancePageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const PersonalFinancePage: React.FC<PersonalFinancePageProps> = ({ onOpenApply }) => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-white border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Personal Finance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00174D] tracking-tight leading-tight">
              Personal Financial Solutions
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Structured financial solutions designed to help working Nigerian professionals and families 
              navigate life milestones, emergency expenditures, and planned investments with dignity and clarity.
            </p>

            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => onOpenApply('personal_finance')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <span>Apply for Personal Solution</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </button>

              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Personal%20Financial%20Solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Desk (0802 319 0807)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs">
              <Calendar className="w-6 h-6 text-[#00A859]" />
              <h3 className="text-base font-bold text-[#00174D]">Salary-Backed Liquidity</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Cash-flow smoothing facilities tied to predictable monthly compensation schedules for verified employees.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs">
              <HeartHandshake className="w-6 h-6 text-[#002B99]" />
              <h3 className="text-base font-bold text-[#00174D]">Family Milestone Support</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Funding for urgent medical procedures, relocation, or significant family transitions with structured payback terms.
              </p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-[#00A859]" />
              <h3 className="text-base font-bold text-[#00174D]">Transparent Terms</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                Fixed monthly installments with absolute legal clarity. No hidden compounding charges or unauthorized debits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
