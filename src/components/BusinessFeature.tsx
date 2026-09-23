import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { ServiceType } from '../types';

interface BusinessFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const BusinessFeature: React.FC<BusinessFeatureProps> = ({ onOpenApply }) => {
  const businessProducts = [
    {
      title: 'Merchant Inventory Restocking',
      desc: 'Rapid liquidity to purchase fast-moving trade inventory in bulk ahead of seasonal high-demand windows.',
    },
    {
      title: 'Working Capital Revolving Lines',
      desc: 'Cover operational overhead, commercial receivables delays, and urgent vendor payments without liquidity stalls.',
    },
    {
      title: 'Commercial Asset Financing',
      desc: 'Acquire essential commercial delivery vehicles, heavy power generation plants, or production machinery.',
    },
    {
      title: 'Contract & PO Execution',
      desc: 'Short-term bridge capital to execute verified corporate purchase orders and government service supplies.',
    },
  ];

  return (
    <section id="business-financing" className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#1E242B]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Details & Underwriting Checklist (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs text-[#00A859] font-bold tracking-wider uppercase">
                Commercial Enterprise & SME Credit
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#002B99] tracking-tight leading-tight">
                Capital Underwritten on Commercial Velocity, Not Impossible Collateral
              </h2>
              <p className="text-base sm:text-lg text-[#1E242B]/75 leading-relaxed font-light">
                Traditional commercial banks lock out thriving Nigerian trading companies by demanding 
                immovable property collateral. At Emunahh-Invest, we evaluate verifiable bank statement velocity 
                and inventory turnover.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessProducts.map((bp, idx) => (
                <div key={idx} className="bg-white p-5 rounded border border-[#1E242B]/10 space-y-1.5 shadow-xs">
                  <div className="text-sm font-bold text-[#002B99]">{bp.title}</div>
                  <p className="text-xs text-[#1E242B]/70 leading-relaxed font-light">{bp.desc}</p>
                </div>
              ))}
            </div>

            {/* Underwriting Checklist Box */}
            <div className="p-5 rounded bg-[#001033] text-white space-y-3">
              <div className="text-xs font-bold text-[#00E676] uppercase tracking-wider">
                Key Qualification Criteria
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/85">
                <div className="flex items-center gap-2">
                  <span className="text-[#00E676] font-bold">✓</span>
                  <span>Registered CAC Company / Enterprise</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00E676] font-bold">✓</span>
                  <span>6 to 12 Months Active Bank Statements</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00E676] font-bold">✓</span>
                  <span>Verifiable Business Premises in Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00E676] font-bold">✓</span>
                  <span>Valid National Identity of Directors</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/business-financing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001f6e] rounded shadow-xs transition-colors"
              >
                <span>Explore Business Financing Hub</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>

              <a
                href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Business%20Financing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp: +234 817 917 1456</span>
              </a>
            </div>
          </div>

          {/* Right Column: Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#1E242B]/15 shadow-xl bg-[#001033]">
              <img
                src="/src/assets/images/lagos_commercial_enterprise_1790142716551.jpg"
                alt="Nigerian business enterprise owners in Lagos"
                className="w-full h-[440px] sm:h-[480px] object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#001033]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded border border-white/20 p-4 text-[#002B99] shadow-lg">
                <div className="text-[11px] font-bold text-[#00A859] uppercase tracking-wider">
                  SME Working Capital & Asset Credit
                </div>
                <div className="text-xs font-medium text-[#1E242B]/85 mt-1">
                  Empowering retail, distribution, and contracting enterprises across Lagos State.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
