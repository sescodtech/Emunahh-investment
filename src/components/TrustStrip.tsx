import React from 'react';
import { GraduationCap, TrendingUp, Building2, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrustStrip: React.FC = () => {
  const categories = [
    {
      icon: GraduationCap,
      label: 'STUDENT FINANCING',
      desc: 'Financial support designed around eligible education-related needs.',
      link: '/student-loans',
    },
    {
      icon: TrendingUp,
      label: 'INVESTMENT SOLUTIONS',
      desc: 'Solutions designed around customer financial goals.',
      link: '/investments',
    },
    {
      icon: Building2,
      label: 'BUSINESS FINANCE',
      desc: 'Financial support for eligible business needs.',
      link: '/business-financing',
    },
    {
      icon: Wallet,
      label: 'PERSONAL FINANCE',
      desc: 'Solutions designed around individual financial needs.',
      link: '/personal-finance',
    },
  ];

  return (
    <section className="bg-white border-b border-[#071A2B]/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#071A2B]/8">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`${index > 0 ? 'md:pl-6 lg:pl-8' : ''} pt-6 md:pt-0 flex flex-col justify-between group`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center transition-colors group-hover:bg-[#071A2B] group-hover:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-[#071A2B] tracking-[0.14em] uppercase">
                      {item.label}
                    </span>
                  </div>
                  
                  <p className="text-xs text-[#17202A]/80 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3">
                  <Link
                    to={item.link}
                    className="text-[11px] font-bold text-[#087A5A] hover:text-[#04513E] inline-flex items-center gap-1 group-hover:underline"
                  >
                    <span>Learn more</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
