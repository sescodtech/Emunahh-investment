import React from 'react';
import { ShieldCheck, FileCheck2, Building2, UserCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustPoints = [
    {
      icon: FileCheck2,
      title: 'Direct Institutional Tuition Remittance',
      description: 'Tuition and academic fees are remitted straight to accredited institutions for safety and peace of mind.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Repayment Terms',
      description: 'No hidden charges or complex clauses. Every milestone schedule is formalized openly with you before commitment.',
    },
    {
      icon: Building2,
      title: 'Physical Lagos Headquarters',
      description: 'Consult directly with real financial advisors at 33, Crossway Plaza, Beside UBA, New Oko Oba, Lagos.',
    },
    {
      icon: UserCheck,
      title: 'Disciplined Growth Advisory',
      description: 'Objective investment guidance and structured working capital tailored to Nigerian economic realities.',
    },
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`pt-6 lg:pt-0 ${index > 0 ? 'lg:pl-6' : ''} flex flex-col justify-between`}
              >
                <div>
                  <div className="w-9 h-9 rounded bg-[#002B99]/10 flex items-center justify-center text-[#002B99] mb-3">
                    <Icon className="w-4 h-4 text-[#00A859]" />
                  </div>
                  <h2 className="text-sm font-bold text-[#00174D] mb-1.5 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
