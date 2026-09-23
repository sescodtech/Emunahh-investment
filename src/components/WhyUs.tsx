import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const differentiators = [
    {
      number: '01',
      title: 'Physical Accountability in Lagos',
      tag: 'Walk-In Headquarters',
      desc: 'Unlike faceless fintech apps, Emunahh-Invest operates an established headquarters at 33, Crossway Plaza, Beside UBA, New Oko Oba, Lagos. Meet with a dedicated advisor face-to-face with complete legal accountability.',
    },
    {
      number: '02',
      title: 'Direct-to-Institution Disbursement',
      tag: 'Zero Fund Diversion',
      desc: 'Tuition and academic fees are remitted directly to your university, law school, or examination board. This guarantees uninterrupted matriculation and protects sponsors from accidental fund diversion.',
    },
    {
      number: '03',
      title: 'Zero Predatory Hidden Clauses',
      tag: 'Radical Transparency',
      desc: 'No arbitrary compounding interest, unexpected administration levies, or intrusive data scrapping. Every milestone payment is spelled out in plain Nigerian English in legally binding agreements.',
    },
    {
      number: '04',
      title: 'Commercial Flow Underwriting',
      tag: 'Practical SME Credit',
      desc: 'We assess real bank ledger turnover, inventory velocity, and verified supply contracts rather than demanding impossible landed property collateral from growing Lagos enterprises.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#1E242B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs text-[#00A859] font-bold tracking-wider uppercase">
            Institutional Distinction
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#002B99] tracking-tight leading-tight">
            Financial Services Engineered for Trust, Dignity, and Progress
          </h2>
          <p className="text-base sm:text-lg text-[#1E242B]/75 leading-relaxed font-light">
            We bridge the gap between bureaucratic commercial banks and aggressive predatory loan apps. 
            Emunahh-Invest delivers the security of a regulated institution with the responsiveness of a trusted local partner.
          </p>
        </div>

        {/* 4 Cards Grid with high-end editorial styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {differentiators.map((diff, idx) => (
            <div
              key={idx}
              className="p-8 rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 hover:border-[#002B99]/40 hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E242B]/10">
                  <span className="font-mono text-xl font-bold text-[#002B99]">{diff.number}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A859]">
                    {diff.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#002B99] leading-snug">
                  {diff.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                  {diff.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1E242B]/10">
                <span className="text-xs font-semibold text-[#00A859] flex items-center gap-1">
                  <span>Guaranteed by Contract</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#00174D] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-[#00E676] font-bold uppercase tracking-wider">
              Experience the Emunahh Standard
            </div>
            <div className="text-lg font-display text-white font-medium">
              Have questions about loan eligibility or investment suitability?
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/about"
              className="px-5 py-3 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-colors"
            >
              About Our Company
            </Link>
            <a
              href="https://wa.me/2348179171456"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-bold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
