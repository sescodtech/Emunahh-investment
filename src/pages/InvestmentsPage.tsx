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
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F8F7F3] border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#087A5A] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Investment Services</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
              Investment Services & Wealth Management
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Disciplined, asset-backed wealth management anchored in capital preservation. 
              We partner with Nigerian professionals, family offices, and institutions to structure 
              dependable capital growth free from speculative volatility.
            </p>

            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => onOpenApply('investment')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <span>Schedule Wealth Consultation</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#C6A15B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Investment%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-lg transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Wealth Desk (0802 319 0807)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Principles & Details */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolios.map((item, idx) => (
              <div key={idx} className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">{item.term}</div>
                  <h3 className="text-lg font-bold text-[#071A2B]">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                <button
                  onClick={() => onOpenApply('investment')}
                  className="pt-4 border-t border-gray-150 text-xs font-bold text-[#071A2B] hover:text-[#087A5A] flex items-center justify-between cursor-pointer w-full group"
                >
                  <span>Request Facility Term Sheet</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-10 rounded-xl border border-gray-200 shadow-xs">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs text-[#087A5A] font-bold uppercase tracking-wider">
                Governance & Risk Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071A2B]">
                Why Capital Preservation Precedes Return Expansion
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                In an unpredictable economic landscape, chasing unrealistic yield promises usually leads to 
                loss of principal. At Emunahh-Invest, capital is allocated into verified corporate credit, 
                collateralized real assets, and liquidity instruments with rigorous audit verification.
              </p>
              <div className="space-y-2 pt-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#087A5A]" />
                  <span>Enforceable formal legal agreements signed in Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#087A5A]" />
                  <span>Transparent tenure benchmarks and maturity disbursement dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#087A5A]" />
                  <span>Quarterly portfolio review statements for corporate treasuries</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#F8F7F3] border border-gray-200 p-7 rounded-xl space-y-4 shadow-2xs">
              <div className="text-xs text-[#071A2B] uppercase tracking-wider font-bold">
                Private Advisory Session
              </div>
              <div className="text-lg font-bold text-[#071A2B]">
                Consult Directly with Senior Wealth Advisors
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Meet in person at our Lagos office or arrange a confidential telephone or video conference 
                to discuss your capital deployment objectives and risk appetite.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:08023190807"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#C6A15B]" />
                  <span>Call 0802 319 0807</span>
                </a>
                <button
                  onClick={() => onOpenApply('investment')}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-[#087A5A] bg-white border border-[#087A5A] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Book In-Person Session</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
