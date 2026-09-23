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
    <section id="investments" className="py-20 lg:py-28 bg-[#071A2B] text-white border-b border-white/10 scroll-mt-16 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#087A5A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-bold text-[#C6A15B] uppercase tracking-[0.15em]">
            Institutional Wealth & Private Capital
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Wealth Growth Built on Prudence, Security, and Legal Certainty
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
            We partner with corporate treasuries, high-earning Nigerian professionals, and diaspora families 
            to protect and grow capital through disciplined real-economy asset allocation.
          </p>
        </div>

        {/* Boardroom Image & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Boardroom Editorial Photography (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#04513E]/30">
              <img
                src="/src/assets/images/african_investment_meeting_1790151240660.jpg"
                alt="Executive wealth consultation in Lagos boardroom with Emunahh-Invest"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-80 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-[#071A2B]/95 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 text-white shadow-xl">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#C6A15B] mb-1">
                  <span>Executive Wealth Desk</span>
                  <span className="text-[#087A5A]">Direct Partner Access</span>
                </div>
                <div className="text-xs text-white/80 font-light leading-relaxed">
                  Confidential, face-to-face portfolio consultations held at our New Oko Oba corporate office in Lagos.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#087A5A]/50 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#087A5A]/20 text-[#087A5A] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Client Profiles Bar */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-[#C6A15B] font-bold uppercase tracking-wider">
              Bespoke Portfolio Structuring
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              Ready to deploy capital with verified institutional oversight?
            </div>
            <div className="text-xs text-white/60">
              Corporate Treasuries · Working Professionals · Diaspora Nigerians
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/investments"
              className="px-6 py-3 text-xs font-bold text-[#071A2B] bg-white hover:bg-gray-100 rounded-lg transition-colors shadow-xs"
            >
              Explore Investment Services
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-lg transition-colors"
            >
              Book In-Person Briefing
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
