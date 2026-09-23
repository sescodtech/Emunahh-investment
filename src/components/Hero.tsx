import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, CheckCircle2 } from 'lucide-react';
import { ServiceType } from '../types';

interface HeroProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  return (
    <section className="relative bg-[#071A2B] text-white py-16 lg:py-24 overflow-hidden border-b border-white/10">
      {/* Subtle Financial Vector Grid / Atmospheric Accents */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Emerald Ambient Glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#087A5A]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 right-10 w-96 h-96 bg-[#04513E]/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Eyebrow, Headline, Supporting Text & CTAs (6 columns) */}
          <div className="lg:col-span-6 space-y-7 z-10">
            
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-bold tracking-[0.14em] text-[#C6A15B] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A]" aria-hidden="true" />
              <span>EMUNAHH-INVEST LIMITED</span>
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
              Building Financial Possibilities. <br />
              <span className="text-[#087A5A] font-serif italic font-normal">
                Funding Your Next Chapter.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-xl">
              We provide accessible financial solutions designed to help students, 
              individuals and businesses take meaningful steps toward their goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded transition-all shadow-sm group"
              >
                <span>Explore Our Solutions</span>
                <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5 text-[#C6A15B]" />
              </a>

              <Link
                to="/student-loans"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-[#071A2B] bg-white hover:bg-[#F8F7F3] rounded transition-all shadow-sm group"
              >
                <span>Apply for Student Loan</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#087A5A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Subtle Trust Indicators */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#087A5A]" />
                <span>Direct Tertiary Tuition Remittance</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#087A5A]" />
                <span>Capital Preservation Mandate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#087A5A]" />
                <span>Commercial Flow Underwriting</span>
              </span>
            </div>

          </div>

          {/* RIGHT: Large Integrated Editorial Image (6 columns) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Backing Frame & Accent Shadow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#087A5A]/30 to-transparent rounded-2xl blur-lg pointer-events-none" />
              
              {/* Main Image Container */}
              <div className="relative rounded-xl overflow-hidden border border-white/15 bg-[#04513E]/20 shadow-2xl">
                <img
                  src="/src/assets/images/nigerian_professional_hero_1790151218863.jpg"
                  alt="Confident Nigerian student and young professional empowered by Emunahh-Invest"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top filter brightness-[0.98] contrast-[1.03]"
                />

                {/* Subtle Image Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Floating Information Element */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#071A2B]/95 backdrop-blur-md border border-white/15 rounded-lg p-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs pb-1 mb-1 border-b border-white/10">
                    <span className="text-[#C6A15B] font-bold uppercase tracking-wider text-[11px]">
                      Verified Academic Progress
                    </span>
                    <span className="text-[#087A5A] font-semibold text-[11px]">
                      100% Institution Payment
                    </span>
                  </div>
                  <p className="text-xs text-white/90 font-light leading-relaxed">
                    Tuition is paid directly to accredited universities, polytechnics, ICAN, and the Nigerian Law School.
                  </p>
                </div>
              </div>

              {/* Decorative Geometric Gold Notch */}
              <div className="hidden sm:block absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#C6A15B]/70 rounded-br pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
