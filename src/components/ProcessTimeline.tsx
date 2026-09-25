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
    <section className="py-16 lg:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.14em]">
            Structured Workflow · How It Works
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
            Four Steps from Inquiry to Direct Funding
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Our assessment process is structured to be quick, respectful, and crystal clear. 
            Here is what to expect from your very first interaction with Emunahh-Invest Limited.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl bg-white border border-gray-200 hover:border-[#087A5A]/50 hover:shadow-xs transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-150">
                  <span className="font-mono text-sm font-bold text-[#087A5A]">{item.step}</span>
                  <span className="text-[10px] font-bold text-[#C6A15B] uppercase tracking-wider">{item.subtitle}</span>
                </div>

                <div className="w-10 h-10 rounded-lg bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center transition-colors group-hover:bg-[#087A5A] group-hover:text-white">
                  <Icon className="w-5 h-5 text-[#087A5A] group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-base font-bold text-[#071A2B]">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => onOpenApply()}
            className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-colors shadow-xs cursor-pointer group"
          >
            <span>Begin Your Application</span>
            <ArrowUpRight className="w-4 h-4 text-[#C6A15B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
