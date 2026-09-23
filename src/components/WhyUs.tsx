import React from 'react';
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
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
            Institutional Distinction
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
            Financial Services Engineered for Trust, Dignity, and Progress
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            We bridge the gap between impersonal commercial banks and predatory digital lenders. 
            Emunahh-Invest provides the discipline of an established institution with the accessible speed of a dedicated partner.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl bg-white border border-gray-200 hover:border-[#002B99]/40 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="font-mono text-sm font-bold text-[#002B99]">{item.num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A859]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00A859]" />
                  </div>

                  <h3 className="text-base font-bold text-[#00174D] tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 text-xs font-semibold text-[#00A859]">
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
