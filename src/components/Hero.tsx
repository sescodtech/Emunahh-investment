import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, CheckCircle2 } from 'lucide-react';
import { ServiceType } from '../types';

interface HeroProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="relative bg-white text-[#1E293B] py-14 lg:py-20 border-b border-gray-200 overflow-hidden">
      {/* Subtle background tone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Eyebrow, Headline, Supporting Text & CTAs (6 columns) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Small Eyebrow in Brand Blue & Green */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#002B99]/5 border border-[#002B99]/15 text-xs font-bold tracking-[0.14em] text-[#002B99] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00A859]" aria-hidden="true" />
              <span>EMUNAHH-INVEST LIMITED</span>
            </div>

            {/* Large Professional Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00174D] tracking-tight leading-[1.16]">
              Building Financial Possibilities.{' '}
              <span className="text-[#00A859] block sm:inline font-bold">
                Funding Your Next Chapter.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-xl">
              We provide accessible financial solutions designed to help students, 
              individuals and businesses take meaningful steps toward their goals.
            </p>

            {/* CTA Buttons with Brand Colors */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-all shadow-xs group"
              >
                <span>Explore Our Solutions</span>
                <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5 text-[#00A859]" />
              </a>

              <Link
                to="/student-loans"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-all shadow-xs group"
              >
                <span>Apply for Student Loan</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Key Assurance Indicators */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                <span>Transparent Repayment Terms</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#002B99]" />
                <span>Capital Preservation Mandate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                <span>Structured Commercial Credit</span>
              </span>
            </div>

          </div>

          {/* RIGHT: High-Quality Editorial Image without any removed overlay card (6 columns) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Clean Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200/90 bg-gray-50 shadow-lg">
                <img
                  src="/src/assets/images/nigerian_professional_hero_1790151218863.jpg"
                  alt="Confident Nigerian student and young professional empowered by Emunahh-Invest"
                  className="w-full h-[440px] sm:h-[480px] object-cover object-top"
                />
              </div>

              {/* Decorative Subtle Corner Accent in Brand Blue & Green */}
              <div className="hidden sm:block absolute -bottom-2.5 -right-2.5 w-10 h-10 border-b-2 border-r-2 border-[#00A859] rounded-br-lg pointer-events-none" />
              <div className="hidden sm:block absolute -top-2.5 -left-2.5 w-10 h-10 border-t-2 border-l-2 border-[#002B99] rounded-tl-lg pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
