import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, FileCheck2, Ban } from 'lucide-react';
import { ServiceType } from '../types';
import investmentMeetingImage from '../assets/images/african_investment_meeting_1790151240660.webp';

interface InvestmentFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const InvestmentFeature: React.FC<InvestmentFeatureProps> = ({ onOpenApply }) => {
  const principles = [
    {
      icon: ShieldCheck,
      title: 'Capital Preservation Mandate',
      desc: 'Our foremost discipline is safeguarding underlying principal through verified real-economy asset allocation before seeking yield expansion.',
    },
    {
      icon: Clock,
      title: 'Goal-Aligned Tenures',
      desc: 'Structured 6, 12, and 24-month horizon placements aligned with corporate treasury timelines and family milestones.',
    },
    {
      icon: FileCheck2,
      title: 'Legally Formalized Contracts',
      desc: 'Every allocation is backed by executed legal documentation specifying tenure maturity dates and regulatory governance.',
    },
    {
      icon: Ban,
      title: 'Zero Speculative Volatility',
      desc: 'Strictly zero exposure to speculative forex, cryptocurrencies, or unauthorized derivatives. Capital funds tangible domestic commercial flow.',
    },
  ];

  return (
    <section id="investments" className="py-16 lg:py-22 bg-[#e3fff2] border-b border-[#0d0a64]/10 scroll-mt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3.5 mb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#e3fff2]" />
            <span className="text-[11px] font-bold text-[#e7020b] uppercase tracking-[0.2em]">
              WEALTH & CAPITAL PRESERVATION
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0a64] tracking-[-0.03em] leading-tight">
            GROW WITH PURPOSE.
          </h2>

          <p className="text-sm sm:text-base text-[#17202A]/80 leading-relaxed font-normal">
            Emunahh-Invest provides structured wealth solutions designed around client financial goals. 
            We partner with corporate treasuries, Nigerian professionals, and diaspora families 
            to protect and grow capital through disciplined real-economy asset allocation.
          </p>
        </div>

        {/* Boardroom Image & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Boardroom Editorial Photography with Controlled Radius (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border-2 border-[#0d0a64] bg-[#0d0a64] shadow-lg">
              <img
                src={investmentMeetingImage}
                alt="Executive wealth consultation in Lagos boardroom with Emunahh-Invest"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#0d0a64] via-[#0d0a64]/85 to-transparent text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e3fff2]">
                      Capital Advisory
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      Corporate Treasuries · Working Professionals · Diaspora
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-[#0d0a64]/12 hover:border-[#e7020b]/40 transition-all duration-200 space-y-2 shadow-sm hover:shadow-xs group"
                >
                  <div className="w-8 h-8 rounded-md bg-[#0d0a64] text-[#e3fff2] flex items-center justify-center transition-transform group-hover:scale-105">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0d0a64] tracking-tight group-hover:text-[#e7020b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#17202A]/75 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Panel in Brand Styling */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#0d0a64]/12 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[11px] text-[#e7020b] font-bold uppercase tracking-wider">
              Bespoke Portfolio Structuring
            </div>
            <div className="text-base sm:text-lg font-bold text-[#0d0a64] tracking-tight">
              Ready to deploy capital with verified institutional oversight?
            </div>
            <div className="text-xs text-[#17202A]/60">
              Corporate Treasuries · High-Earning Professionals · Diaspora Nigerians
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/investments"
              className="w-full sm:w-auto text-center px-5 py-2.5 text-xs font-bold text-white bg-[#0d0a64] hover:bg-[#e7020b] rounded-md transition-colors shadow-sm cursor-pointer"
            >
              Explore Investment Services
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-5 py-2.5 text-xs font-bold text-[#e7020b] bg-white hover:bg-gray-50 border border-[#e7020b] rounded-md transition-colors cursor-pointer"
            >
              Book Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
