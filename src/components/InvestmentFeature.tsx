import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { ServiceType } from '../types';

interface InvestmentFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const InvestmentFeature: React.FC<InvestmentFeatureProps> = ({ onOpenApply }) => {
  const investmentPrinciples = [
    {
      num: '01',
      title: 'Capital Preservation First',
      description:
        'In dynamic economic climates, safeguarding principal is the inviolable primary discipline before pursuing yield expansion.',
    },
    {
      num: '02',
      title: 'Goal-Aligned Tenures',
      description:
        'Custom 6, 12, and 24-month horizon placements structured around planned capital expenditures and liquidity reserves.',
    },
    {
      num: '03',
      title: 'Legally Formalized Contracts',
      description:
        'Every investment allocation is formalized with executed legal contracts detailing maturity, tenure, and dispute mechanisms.',
    },
    {
      num: '04',
      title: 'Zero Speculative Exposure',
      description:
        'We do not engage in crypto trading, forex speculation, or unhedged volatility. Capital is deployed into verified real-economy credit assets.',
    },
  ];

  const suitabilityProfiles = [
    {
      role: 'Corporate Treasuries & SMEs',
      focus: 'Surplus Liquidity Optimization',
      desc: 'Short-to-medium-term placement of enterprise cash-flow awaiting seasonal inventory restocking or operational deployment.',
    },
    {
      role: 'Working Professionals',
      focus: 'Disciplined Capital Accumulation',
      desc: 'Structured medium-term facilities designed to defend purchasing power against inflation with predictable milestone returns.',
    },
    {
      role: 'Diaspora Nigerians',
      focus: 'Verified Domestic Deployment',
      desc: 'Transparent, ground-verified Nigerian capital deployment backed by a physical corporate office in Lagos.',
    },
  ];

  return (
    <section id="investments" className="py-20 lg:py-28 bg-[#001033] text-white scroll-mt-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs text-[#00E676] font-bold tracking-wider uppercase">
            Asset-Backed Wealth Management
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Wealth Growth Anchored in Prudence and Legal Certainty
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
            We partner with corporate treasuries, high-earning professionals, and diaspora families to build 
            enduring wealth through disciplined real-economy asset allocation.
          </p>
        </div>

        {/* Principles Grid (Clean Typographic Index) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {investmentPrinciples.map((item) => (
            <div
              key={item.num}
              className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-3 hover:bg-white/10 transition-colors"
            >
              <span className="font-mono text-xl font-bold text-[#00E676]">{item.num}</span>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Investor Profiles */}
        <div className="border-t border-white/10 pt-16">
          <div className="max-w-2xl mb-10 space-y-2">
            <div className="text-xs text-[#00E676] font-bold uppercase tracking-wider">
              Client Alignments
            </div>
            <h3 className="text-2xl font-display font-medium text-white">
              Who We Serve Across Nigeria and the Diaspora
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {suitabilityProfiles.map((prof, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-2">
                <span className="text-xs font-bold text-[#00E676] uppercase tracking-wider">{prof.focus}</span>
                <div className="text-lg font-semibold text-white">{prof.role}</div>
                <p className="text-xs text-white/70 leading-relaxed font-light">{prof.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-lg bg-white/10 border border-white/15 gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-base font-semibold text-white">
                Schedule an In-Person Briefing with an Emunahh Wealth Advisor
              </div>
              <div className="text-xs text-white/70">
                Lagos Corporate Office: 33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba.
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/investments"
                className="px-5 py-3 text-xs font-bold text-[#001033] bg-white hover:bg-[#F5F5F0] rounded transition-colors"
              >
                Investment Hub
              </Link>
              <a
                href="https://wa.me/2348179171456"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs font-bold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-colors"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
