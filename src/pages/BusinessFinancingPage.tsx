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
              <span>Business Financing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
              Business Financing & SME Commercial Credit
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Capital that understands the speed and rhythm of Nigerian enterprise. 
              We finance retail merchants, contractors, and registered SMEs with practical 
              cash-flow-based underwriting.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenApply('business_financing')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-all shadow-sm"
              >
                <span>Apply for Business Financing</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#00A859]" />
              </button>

              <a
                href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Business%20Financing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Business Desk (+234 817 917 1456)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-lg border border-[#1E242B]/10 space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00A859]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002B99]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Underwriting Approach */}
          <div className="bg-[#00174D] text-white p-8 sm:p-12 rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs text-[#00E676] font-semibold uppercase tracking-wider">
                Underwriting Philosophy
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                Underwritten on Commercial Flow, Not Impossible Collateral
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Traditional commercial banks often demand immovable physical property collateral that locks out 
                vibrant, profitable trading companies. At Emunahh-Invest, we evaluate verifiable bank statement 
                velocity, inventory turnover rates, and verifiable purchase contracts.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-lg space-y-3 text-xs text-white/85">
              <div className="font-semibold text-white text-sm">Key Qualification Documents:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>CAC Business Registration Certificate (BN or RC)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>6 to 12 Months Active Corporate Bank Statements</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Valid Government ID of Business Proprietor / Directors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                <span>Verifiable Business Location & Utility Bill</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
