import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ServiceType } from '../types';

interface BusinessFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const BusinessFeature: React.FC<BusinessFeatureProps> = ({ onOpenApply }) => {
  const products = [
    {
      title: 'Merchant Inventory Restocking',
      desc: 'Rapid liquidity to acquire fast-moving trade goods in bulk ahead of seasonal high-demand periods.',
    },
    {
      title: 'Revolving Working Capital',
      desc: 'Bridge commercial receivable lags and vendor obligations to keep operational velocity continuous.',
    },
    {
      title: 'Commercial Asset Financing',
      desc: 'Acquire essential commercial delivery vans, heavy generators, or manufacturing machinery.',
    },
    {
      title: 'Purchase Order & Contract Bridge',
      desc: 'Short-term execution capital for verified supply contracts and corporate procurement orders.',
    },
  ];

  return (
    <section id="business-financing" className="py-20 lg:py-28 bg-[#F8F7F3] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Commercial Velocity Narrative & Products (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.15em]">
                Commercial Enterprise & SME Credit
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A2B] tracking-tight leading-tight">
                Capital Underwritten on Commercial Velocity, Not Impossible Collateral
              </h2>
              <p className="text-base text-[#17202A]/75 leading-relaxed font-light">
                Traditional commercial banks often lock out thriving Nigerian trading companies by demanding 
                immovable property collateral. At Emunahh-Invest, we evaluate verifiable bank ledger velocity 
                and inventory turnover.
              </p>
            </div>

            {/* 4 Commercial Facilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white border border-gray-200 space-y-1.5 shadow-2xs">
                  <h3 className="text-sm font-bold text-[#071A2B]">{p.title}</h3>
                  <p className="text-xs text-[#17202A]/70 leading-relaxed font-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Underwriting Checklist Box */}
            <div className="p-6 rounded-xl bg-[#071A2B] text-white space-y-3 shadow-xs">
              <div className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
                SME Qualification Criteria
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85">
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Registered CAC Enterprise / Company</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>6 to 12 Months Active Bank Statements</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Verifiable Business Location in Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Valid National Identity of Principals</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <Link
                to="/business-financing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded transition-colors shadow-xs"
              >
                <span>Explore Business Credit Hub</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>

              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-[#071A2B] bg-white hover:bg-gray-50 border border-gray-200 rounded transition-colors"
              >
                <span>Apply for Commercial Facility</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Commercial Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
              <img
                src="/src/assets/images/lagos_commercial_enterprise_1790142716551.jpg"
                alt="Nigerian business enterprise founders in Lagos"
                className="w-full h-[460px] sm:h-[500px] object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/40 shadow-lg text-[#071A2B]">
                <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider mb-1">
                  Commercial Enterprise Desk
                </div>
                <div className="text-xs text-[#17202A]/80 font-normal leading-relaxed">
                  Backing retail, wholesale distributors, and service contractors across Lagos State.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
