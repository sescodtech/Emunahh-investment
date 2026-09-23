import React from 'react';
import { School, ShieldCheck, MapPin, TrendingUp } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const pillars = [
    {
      icon: School,
      title: 'Direct Institutional Remittance',
      desc: 'Tuition paid straight to accredited university or examination accounts to eliminate diversion and secure matriculation.',
    },
    {
      icon: ShieldCheck,
      title: 'Formal Legal Certainty',
      desc: 'All agreements are executed with binding, straightforward legal terms—no hidden fees, unexpected charges, or predatory spikes.',
    },
    {
      icon: MapPin,
      title: 'Physical Lagos Headquarters',
      desc: 'Consult in person with senior advisors at 33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba, Lagos.',
    },
    {
      icon: TrendingUp,
      title: 'Capital Preservation Mandate',
      desc: 'Wealth portfolios and investment placements are underwritten strictly on verified real-economy productive assets.',
    },
  ];

  return (
    <section className="bg-[#F8F7F3] border-b border-gray-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/70">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`${index > 0 ? 'md:pl-8' : ''} pt-6 md:pt-0 space-y-2`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#071A2B] text-[#087A5A] flex items-center justify-center shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#071A2B] tracking-tight leading-snug pt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#17202A]/70 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
