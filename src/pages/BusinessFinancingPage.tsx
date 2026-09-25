import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Store, Truck, Coins, ArrowUpRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ServiceType } from '../types';

interface BusinessFinancingPageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const BusinessFinancingPage: React.FC<BusinessFinancingPageProps> = ({ onOpenApply }) => {
  const products = [
    {
      icon: Store,
      title: 'Merchant Inventory Restocking',
      desc: 'Rapid liquidity to purchase fast-moving commercial goods in bulk ahead of seasonal demand spikes or supplier discount windows.',
    },
    {
      icon: Coins,
      title: 'Working Capital Revolving Facility',
      desc: 'Smooth out operational overhead, payroll timelines, and receivables delays to keep commercial operations running without cash freezes.',
    },
    {
      icon: Truck,
      title: 'Commercial Asset Financing',
      desc: 'Acquire essential operational machinery, heavy power generators, delivery vans, or specialized processing equipment.',
    },
    {
      icon: Briefcase,
      title: 'Contract & Invoice Execution',
      desc: 'Bridge financing for verified supply orders, corporate purchase orders (POs), and service contracts with creditworthy counterparties.',
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
              <span>Business Financing</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
              Business Financing & SME Commercial Credit
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Capital that understands the speed and rhythm of Nigerian enterprise. 
              We finance retail merchants, contractors, and registered SMEs with practical 
              cash-flow-based underwriting.
            </p>

            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => onOpenApply('business_financing')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <span>Apply for Commercial Credit</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#C6A15B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Business%20Financing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-lg transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Commercial Desk (0802 319 0807)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#087A5A]" />
                    </div>
                    <h3 className="text-base font-bold text-[#071A2B]">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => onOpenApply('business_financing')}
                    className="pt-4 border-t border-gray-100 text-xs font-bold text-[#071A2B] hover:text-[#087A5A] flex items-center justify-between cursor-pointer w-full group"
                  >
                    <span>Request Details</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bg-[#F8F7F3] border border-gray-200 p-8 sm:p-10 rounded-xl space-y-6 shadow-xs">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs text-[#087A5A] font-bold uppercase tracking-wider">
                Fast-Track Commercial Eligibility
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#071A2B]">
                What Your Business Needs to Access Credit
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                We focus on your actual business performance rather than bureaucratic obstacles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-700">
              <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-1">
                <span className="font-bold text-[#071A2B] block">CAC Registration:</span>
                <span>Active Business Name or Limited Liability Company registration certificate.</span>
              </div>
              <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-1">
                <span className="font-bold text-[#071A2B] block">Turnover Records:</span>
                <span>6 to 12 months verified corporate or trading bank account statements.</span>
              </div>
              <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-1">
                <span className="font-bold text-[#071A2B] block">Physical Operation:</span>
                <span>Verifiable shop, warehouse, or office address located in Lagos State.</span>
              </div>
              <div className="p-4 rounded-lg bg-white border border-gray-200 space-y-1">
                <span className="font-bold text-[#071A2B] block">KYC Identification:</span>
                <span>Valid national identification (NIN, Voter's Card, or Passport) of proprietors.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Average approval turnaround: 48 to 72 hours following statement review.
              </span>
              <button
                onClick={() => onOpenApply('business_financing')}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-colors cursor-pointer"
              >
                Apply for SME Credit Now
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
