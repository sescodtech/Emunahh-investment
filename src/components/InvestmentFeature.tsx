import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield, Clock, FileCheck2, Ban } from 'lucide-react';
import { ServiceType } from '../types';

interface InvestmentFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const InvestmentFeature: React.FC<InvestmentFeatureProps> = ({ onOpenApply }) => {
  const principles = [
    {
      icon: Shield,
      title: 'Capital Preservation First',
      desc: 'In volatile economic cycles, safeguarding underlying principal is our foremost discipline before seeking yield expansion.',
    },
    {
      icon: Clock,
      title: 'Goal-Aligned Tenures',
      desc: 'Structured 6, 12, and 24-month horizon placements aligned with enterprise inventory cycles and family milestones.',
    },
    {
      icon: FileCheck2,
      title: 'Legally Formalized Contracts',
      desc: 'Every allocation is backed by executed legal contracts detailing maturity terms, payout dates, and regulatory governance.',
    },
    {
      icon: Ban,
      title: 'Zero Speculative Exposure',
      desc: 'We strictly reject unregulated crypto trading, forex speculation, or unhedged bets. Capital funds verified real-economy credit assets.',
    },
  ];

  return (
    <section id="investments" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
            Institutional Wealth & Private Capital
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
            Wealth Growth Built on Prudence, Security, and Legal Certainty
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            We partner with corporate treasuries, high-earning Nigerian professionals, and diaspora families 
            to protect and grow capital through disciplined real-economy asset allocation.
          </p>
        </div>

        {/* Boardroom Image & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          
          {/* Boardroom Editorial Photography (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
              <img
                src="/src/assets/images/african_investment_meeting_1790151240660.jpg"
                alt="Executive wealth consultation in Lagos boardroom with Emunahh-Invest"
                className="w-full h-[380px] sm:h-[440px] object-cover object-center"
              />
            </div>
          </div>

          {/* 4 Principles Grid (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-gray-200 hover:border-[#002B99]/40 hover:shadow-2xs transition-all space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00A859]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#00174D] tracking-tight">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Panel in Brand Styling */}
        <div className="p-7 sm:p-9 rounded-xl bg-white border-2 border-[#002B99]/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-[#00A859] font-bold uppercase tracking-wider">
              Bespoke Portfolio Structuring
            </div>
            <div className="text-lg sm:text-xl font-bold text-[#00174D] tracking-tight">
              Ready to deploy capital with verified institutional oversight?
            </div>
            <div className="text-xs text-gray-500">
              Corporate Treasuries · Working Professionals · Diaspora Nigerians
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/investments"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors shadow-xs"
            >
              Explore Investment Services
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-bold text-[#00A859] bg-white hover:bg-gray-50 border border-[#00A859] rounded-lg transition-colors"
            >
              Book In-Person Briefing
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
