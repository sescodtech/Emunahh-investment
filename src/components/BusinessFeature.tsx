import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ServiceType } from '../types';
import commercialEnterpriseImage from '../assets/images/lagos_commercial_enterprise_1790142716551.jpg';

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
    <section id="business-financing" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Commercial Velocity Narrative & Products (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.14em]">
                Commercial Enterprise & SME Credit
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
                Capital Underwritten on Commercial Velocity, Not Impossible Collateral
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-normal">
                Traditional commercial banks often lock out thriving Nigerian trading companies by demanding 
                immovable property collateral. At Emunahh-Invest, we evaluate verifiable bank ledger velocity 
                and inventory turnover.
              </p>
            </div>

            {/* 4 Commercial Facilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {products.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-gray-200 space-y-1 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
                  <h3 className="text-sm font-bold text-[#071A2B]">{p.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Underwriting Checklist Box */}
            <div className="p-5 rounded-xl bg-[#F8F7F3] border border-gray-200 space-y-2.5">
              <div className="text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                SME Qualification Criteria
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
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

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <Link
                to="/business-financing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-colors shadow-xs"
              >
                <span>Explore Business Credit Hub</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#C6A15B]" />
              </Link>

              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-[#087A5A] bg-white hover:bg-gray-50 border border-[#087A5A] rounded-lg transition-colors"
              >
                <span>Apply for Commercial Facility</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Commercial Photography (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
              <img
                src={commercialEnterpriseImage}
                alt="Nigerian business enterprise founders in Lagos"
                className="w-full h-[400px] sm:h-[450px] object-cover object-center"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
