import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ServiceType } from '../types';

interface HeroProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subhead & Professional CTAs (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#00174D] tracking-tight leading-[1.15]">
              Building Financial Possibilities. <br />
              <span className="text-[#00A859] font-serif italic">
                Funding Your Next Chapter.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl font-normal">
              Emunahh-Invest Limited provides dependable student education loans, 
              strategic investment services, and structured commercial financing for 
              students, families, and businesses across Nigeria.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001f6e] rounded shadow-sm transition-colors"
              >
                <span>Apply for Financing</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>

              <Link
                to="/student-loans"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-[#002B99] hover:text-[#001f6e] bg-[#002B99]/5 hover:bg-[#002B99]/10 rounded border border-[#002B99]/15 transition-colors"
              >
                <span>Student Loans</span>
              </Link>

              <Link
                to="/investments"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-gray-700 hover:text-[#002B99] border border-gray-200 hover:border-gray-300 rounded transition-colors"
              >
                <span>Investment Services</span>
              </Link>
            </div>

            {/* Quiet Corporate Proofpoints */}
            <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-6 text-gray-800">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#002B99]">Education</div>
                <div className="text-xs text-gray-500 mt-0.5">Student Tuition Financing</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#00A859]">Wealth</div>
                <div className="text-xs text-gray-500 mt-0.5">Structured Investments</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#002B99]">Commercial</div>
                <div className="text-xs text-gray-500 mt-0.5">SME Business Credit</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Professional Image Frame (5 columns) */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
              <img
                src="/src/assets/images/lagos_financial_hq_1790142688340.jpg"
                alt="Emunahh-Invest Limited Corporate Financial Building"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
