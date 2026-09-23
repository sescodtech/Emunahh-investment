import React from 'react';
import { ShieldCheck, Award, Users, Clock } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const values = [
    {
      num: '01',
      title: 'Transparency',
      subtitle: 'Zero Hidden Penalties',
      desc: 'All repayment milestone dates, interest structures, and administrative criteria are formalized upfront in plain Nigerian English without compounding surprises or predatory catches.',
    },
    {
      num: '02',
      title: 'Professionalism',
      subtitle: 'Institutional Underwriting',
      desc: 'Our credit and investment mandates follow rigorous governance standards, verified real-economy balance sheets, and formal legal contracts that protect both client and institution.',
    },
    {
      num: '03',
      title: 'Accessibility',
      subtitle: 'Walk-In Lagos Desk & Fast Intake',
      desc: 'We operate an active corporate desk at 33, Crossway Plaza, New Oko Oba, Lagos. Real human advisors review loan invoices and investment structures with prompt turnaround.',
    },
    {
      num: '04',
      title: 'Customer Focus',
      subtitle: 'Real Milestones Over Arbitrary Quotas',
      desc: 'Whether disbursing tuition directly to a university bursary or engineering cash-flow credit for an enterprise, our solutions are shaped around real individual and business outcomes.',
    },
  ];

  return (
    <section className="py-16 lg:py-22 bg-[#071A2B] text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Editorial Decorative Watermark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="max-w-3xl space-y-3.5 mb-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="text-[11px] font-bold text-[#C6A15B] uppercase tracking-[0.2em]">
              WHY EMUNAHH-INVEST
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
            FINANCIAL DECISIONS DESERVE CLARITY.
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            We bridge the gap between impersonal commercial banks and predatory digital apps. 
            Emunahh-Invest provides the discipline of an established institution with the accessible speed of a dedicated partner.
          </p>
        </div>

        {/* Editorial Spaced Flow: Typography & Lines rather than excessive boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {values.map((item, idx) => (
            <div
              key={idx}
              className={`${idx > 0 ? 'md:pl-8 lg:pl-10' : ''} pt-8 md:pt-0 space-y-4 group`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl font-bold text-[#087A5A] group-hover:text-[#C6A15B] transition-colors">
                  {item.num}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  Principle {idx + 1}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <div className="text-[11px] font-semibold text-[#C6A15B] uppercase tracking-wider">
                  {item.subtitle}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                {item.desc}
              </p>

              <div className="pt-2">
                <div className="h-0.5 w-10 bg-[#087A5A] group-hover:w-16 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
