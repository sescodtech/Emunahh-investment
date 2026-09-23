import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Scale, FileText, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { ServiceType } from '../types';

interface InvestmentsPageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const InvestmentsPage: React.FC<InvestmentsPageProps> = ({ onOpenApply }) => {
  const portfolios = [
    {
      title: 'Fixed Capital Placement',
      term: '6 – 24 Months Horizon',
      desc: 'Structured asset-backed capital contracts designed for disciplined individuals and corporate treasuries prioritizing principal protection.',
    },
    {
      title: 'Diaspora Wealth Advisory',
      term: 'Bespoke Tenure',
      desc: 'Transparent, ground-verified Nigerian capital deployment for non-resident Nigerians seeking secure, real-economy financial structuring.',
    },
    {
      title: 'Institutional Liquidity Desks',
      term: 'Custom Schedules',
      desc: 'Tailored treasury management and short-term surplus management for registered associations, schools, and corporate institutions.',
    },
  ];

  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      {/* Header */}
      <section className="bg-[#00174D] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Investment Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
              Investment Services & Wealth Management
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Disciplined, asset-backed wealth management anchored in capital preservation. 
              We partner with Nigerian professionals, family offices, and institutions to structure 
              dependable capital growth free from speculative volatility.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenApply('investment')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-all shadow-sm"
              >
                <span>Schedule Wealth Consultation</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#00A859]" />
              </button>

              <a
                href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20would%20like%20to%20discuss%20Investment%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Wealth Desk (+234 817 917 1456)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Philosophy & Portfolios */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#00A859]" />
              </div>
              <h3 className="text-lg font-semibold text-[#002B99]">Capital Preservation First</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                Our primary mandate is protecting principal. We avoid speculative unhedged instruments, 
                anchoring capital exclusively in real-economy commercial financing and verified credit assets.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#00A859]" />
              </div>
              <h3 className="text-lg font-semibold text-[#002B99]">Formal Written Contracts</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                Every investment engagement is formalized with signed legal documentation 
                outlining tenure, maturity dates, agreed schedules, and dispute resolution mechanisms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#00A859]" />
              </div>
              <h3 className="text-lg font-semibold text-[#002B99]">Physical Accountability</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                Unlike faceless web applications, our advisors meet with you in person at our Lagos 
                headquarters (33 Crossway Plaza Beside UBA) for complete transparency.
              </p>
            </div>
          </div>

          {/* Solutions Bento Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#002B99]">
                Structured Wealth Frameworks
              </h2>
              <p className="text-xs sm:text-sm text-[#1E242B]/70">
                Customized for your time horizon and liquidity objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolios.map((p, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg border border-[#1E242B]/10 flex flex-col justify-between shadow-xs">
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-[#00A859] uppercase tracking-wider">{p.term}</div>
                    <h3 className="text-xl font-semibold text-[#002B99]">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">{p.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#1E242B]/10">
                    <button
                      onClick={() => onOpenApply('investment')}
                      className="text-xs font-semibold text-[#002B99] hover:text-[#00A859] flex items-center gap-1"
                    >
                      <span>Inquire About This Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Consult Strip */}
          <div className="p-8 sm:p-12 rounded-lg bg-[#00174D] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs text-[#00E676] font-semibold uppercase tracking-wider">
                Private Advisory Session
              </div>
              <h3 className="text-2xl font-display font-medium text-white">
                Book a Confidential Consultation with an Emunahh Wealth Strategist
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                Discuss your capital horizons at our New Oko Oba, Lagos headquarters or request a virtual briefing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+2348179171456"
                className="px-5 py-3 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-colors text-center"
              >
                Call Hotline (+234 817 917 1456)
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
