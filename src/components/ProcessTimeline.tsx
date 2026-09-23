import React from 'react';
import { ArrowUpRight, ClipboardList, SearchCheck, FileSignature, Landmark } from 'lucide-react';
import { ServiceType } from '../types';

interface ProcessTimelineProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenApply }) => {
  const steps = [
    {
      step: '01',
      icon: ClipboardList,
      title: 'Simple Application',
      subtitle: 'Online or In-Office',
      desc: 'Complete our streamlined online inquiry or visit our Lagos office. Select your service—Student Loan, Investment, or Business Financing—and state your requirements.',
    },
    {
      step: '02',
      icon: SearchCheck,
      title: 'Document Review',
      subtitle: 'Fast Verification',
      desc: 'Provide primary documentation (admission letter/fee invoice for students; corporate registration or turnover statements for businesses). We verify data respectfully.',
    },
    {
      step: '03',
      icon: FileSignature,
      title: 'Transparent Offer',
      subtitle: 'Zero Hidden Clauses',
      desc: 'Receive your formal written terms. We walk you through every figure, repayment milestone, and condition before you sign. No ambiguities or surprise charges.',
    },
    {
      step: '04',
      icon: Landmark,
      title: 'Disbursement & Care',
      subtitle: 'Prompt Execution',
      desc: 'Funds are disbursed directly to your school account or designated commercial account. We maintain continuous support throughout the duration of your facility.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#1E242B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs text-[#0E765E] font-semibold tracking-wider uppercase">
            <span>Structured Workflow</span>
            <span aria-hidden="true">·</span>
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#0B1528] tracking-tight leading-tight">
            Four Steps from Inquiry to Direct Funding
          </h2>
          <p className="text-base sm:text-lg text-[#1E242B]/75 leading-relaxed font-light">
            Our assessment process is structured to be quick, respectful, and crystal clear. 
            Here is what to expect from your very first interaction with Emunahh-Invest Limited.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white p-7 rounded-lg border border-[#1E242B]/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-display font-bold text-[#0E765E] tabular-nums">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded bg-[#0B1528] text-[#C5A869] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-[#0B1528] mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#0E765E] font-medium mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1E242B]/10 text-[11px] text-[#1E242B]/50">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenApply()}
            className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold text-white bg-[#0B1528] hover:bg-[#0E1B33] rounded transition-colors shadow-xs group"
          >
            <span>Begin Step 1: Start Your Application</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-[#C5A869] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
