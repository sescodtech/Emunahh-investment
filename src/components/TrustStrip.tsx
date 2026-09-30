import React from 'react';
import { GraduationCap, TrendingUp, Building2, Wallet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrustStrip: React.FC = () => {
  const categories = [
    {
      icon: GraduationCap,
      label: 'STUDENT FINANCING',
      desc: 'Financial support designed around eligible education-related needs and tuition remittance.',
      link: '/services/education-financing',
    },
    {
      icon: TrendingUp,
      label: 'INVESTMENT SOLUTIONS',
      desc: 'Structured capital solutions designed around customer financial goals and wealth preservation.',
      link: '/services/investment-services',
    },
    {
      icon: Building2,
      label: 'BUSINESS FINANCE',
      desc: 'Revolving and term financial support designed for eligible commercial and SME growth.',
      link: '/services/business-financing',
    },
    {
      icon: Wallet,
      label: 'PERSONAL FINANCE',
      desc: 'Transparent salary-linked facilities designed around verified individual financial needs.',
      link: '/services/personal-finance',
    },
  ];

  return (
    <section className="bg-white border-b border-[#0d0a64]/10 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className="group relative flex flex-col justify-between p-5 rounded-xl bg-[#e3fff2]/70 hover:bg-white border border-[#0d0a64]/8 hover:border-[#e7020b]/35 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-md bg-white border border-[#0d0a64]/10 text-[#e7020b] flex items-center justify-center transition-all duration-200 group-hover:bg-[#0d0a64] group-hover:text-white group-hover:scale-105 shadow-sm">
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#0d0a64]/40 group-hover:text-[#e7020b] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#0d0a64] tracking-[0.12em] uppercase mb-1.5 group-hover:text-[#e7020b] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-[#17202A]/75 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#0d0a64]/6 flex items-center justify-between text-[11px] font-bold text-[#e7020b] group-hover:text-[#a3140a]">
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
