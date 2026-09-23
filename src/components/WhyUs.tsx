import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, School, ShieldAlert, BadgeCheck } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const differentiators = [
    {
      num: '01',
      icon: Building2,
      title: 'Physical Accountability in Lagos',
      tag: 'Walk-In Headquarters',
      desc: 'Unlike faceless fintech apps, Emunahh-Invest operates a fully staffed corporate office at 33, Crossway Plaza, Beside UBA, New Oko Oba, Lagos. Walk in and discuss terms with senior advisors in person.',
    },
    {
      num: '02',
      icon: School,
      title: 'Direct Institution Remittance',
      tag: 'Zero Fund Diversion',
      desc: 'Tuition and academic fees are paid straight to accredited university or examination accounts. This guarantees uninterrupted matriculation and protects sponsors from unintended fund diversion.',
    },
    {
      num: '03',
      icon: ShieldAlert,
      title: 'Zero Predatory Practices',
      tag: 'Radical Transparency',
      desc: 'No arbitrary compounding penalties, unexpected administration levies, or intrusive data scrapping. Every repayment milestone is formalized in plain Nigerian English in legally binding agreements.',
    },
    {
      num: '04',
      icon: BadgeCheck,
      title: 'Practical Commercial Underwriting',
      tag: 'Cash-Flow Grounded',
      desc: 'We underwrite SME credit on verified bank statement turnover, inventory velocity, and operational track records rather than requiring impossible landed property titles.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.15em]">
            Institutional Distinction
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A2B] tracking-tight leading-tight">
            Financial Services Engineered for Trust, Dignity, and Progress
          </h2>
          <p className="text-base sm:text-lg text-[#17202A]/75 leading-relaxed font-light">
            We bridge the gap between impersonal commercial banks and predatory digital lenders. 
            Emunahh-Invest provides the discipline of an established institution with the accessible speed of a dedicated partner.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#F8F7F3] border border-gray-200/90 hover:border-[#087A5A]/50 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
                    <span className="font-mono text-sm font-bold text-[#071A2B]">{item.num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#087A5A]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-[#071A2B] text-[#087A5A] flex items-center justify-center shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#071A2B] tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#17202A]/70 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200/70 text-xs font-semibold text-[#087A5A]">
                  Guaranteed by Legal Contract
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
