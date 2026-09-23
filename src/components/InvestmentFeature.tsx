import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Clock, FileCheck2, Ban } from 'lucide-react';
import { ServiceType } from '../types';
import investmentMeetingImage from '../assets/images/african_investment_meeting_1790151240660.jpg';

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
    <section id="investments" className="py-20 lg:py-28 bg-[#F8F7F3] border-b border-[#071A2B]/10 scroll-mt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="text-[11px] font-bold text-[#087A5A] uppercase tracking-[0.2em]">
              WEALTH & CAPITAL PRESERVATION
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-[-0.03em] leading-tight">
            GROW WITH PURPOSE.
          </h2>

          <p className="text-base sm:text-lg text-[#17202A]/80 leading-relaxed font-normal">
            Emunahh-Invest provides structured wealth solutions designed around client financial goals. 
            We partner with corporate treasuries, Nigerian professionals, and diaspora families 
            to protect and grow capital through disciplined real-economy asset allocation.
          </p>
        </div>

        {/* Boardroom Image & Principles Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          
          {/* Boardroom Editorial Photography with Controlled Radius (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border-2 border-[#071A2B] bg-[#071A2B] shadow-lg">
              <img
                src={investmentMeetingImage}
                alt="Executive wealth consultation in Lagos boardroom with Emunahh-Invest"
                className="w-full h-[400px] sm:h-[460px] object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/80 to-transparent text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C6A15B]">
                      Capital Advisory
                    </div>
                    <div className="text-sm font-bold text-white">
                      Corporate Treasuries · Working Professionals · Diaspora
                    </div>
                  </div>
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
                  className="p-5 rounded-lg bg-white border border-[#071A2B]/12 hover:border-[#087A5A]/50 transition-all space-y-2.5 shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-md bg-[#071A2B] text-[#C6A15B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#071A2B] tracking-tight">{item.title}</h3>
                  <p className="text-xs text-[#17202A]/75 leading-relaxed font-normal">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Panel in Brand Styling */}
        <div className="p-7 sm:p-9 rounded-lg bg-white border border-[#071A2B]/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[11px] text-[#087A5A] font-bold uppercase tracking-wider">
              Bespoke Portfolio Structuring
            </div>
            <div className="text-lg sm:text-xl font-bold text-[#071A2B] tracking-tight">
              Ready to deploy capital with verified institutional oversight?
            </div>
            <div className="text-xs text-[#17202A]/60">
              Corporate Treasuries · High-Earning Professionals · Diaspora Nigerians
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/investments"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] rounded-md transition-colors shadow-xs"
            >
              Explore Investment Services
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-bold text-[#087A5A] bg-white hover:bg-gray-50 border border-[#087A5A] rounded-md transition-colors"
            >
              Book In-Person Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
