import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, TrendingUp, Building2, Wallet, Check } from 'lucide-react';
import { ServiceType } from '../types';
import studentImage from '../assets/images/student_education_loan_1790141403913.jpg';

interface ServicesSectionProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="solutions" className="py-16 lg:py-24 bg-white border-b border-[#071A2B]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with crisp hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#071A2B]/8">
          <div className="max-w-2xl space-y-2.5">
            <div className="text-[11px] font-bold text-[#087A5A] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-[-0.03em] leading-tight">
              Financial solutions built around real goals.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#17202A]/75 leading-relaxed font-normal">
            Every facility is underwritten with transparent repayment structures, formal legal clarity, 
            and practical responsiveness to Nigerian economic conditions.
          </p>
        </div>

        {/* Asymmetrical Editorial Layout: Featured Student Loan (7 cols) + 3 Structured Supporting (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* FEATURED SERVICE: Student Loans / Education Financing */}
          <div className="lg:col-span-7 bg-[#F8F7F3] border border-[#071A2B]/12 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#087A5A]/40 transition-all duration-300">
            <div className="space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#087A5A]/10 text-[#087A5A] text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#087A5A]" />
                  <span>Featured Solution</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#071A2B]/40">01</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B] tracking-tight">
                  Student Loans & Education Financing
                </h3>
                <p className="text-sm text-[#17202A]/80 leading-relaxed font-normal">
                  Structured tuition financing that ensures academic pursuits proceed without disruption. 
                  Tuition is paid directly to accredited universities, examination boards, and professional bodies across Nigeria.
                </p>
              </div>

              {/* Real African Student Image Asset with Controlled Natural Height */}
              <div className="relative rounded-md overflow-hidden border border-[#071A2B]/10 h-44 sm:h-52 bg-white">
                <img
                  src={studentImage}
                  alt="Nigerian university scholar studying successfully with Emunahh-Invest loan"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#071A2B]/90 via-[#071A2B]/60 to-transparent text-white text-[11px] font-medium">
                  Direct Institutional Remittance · Federal, State & Private Campuses
                </div>
              </div>

              {/* Clear Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#17202A] font-medium">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                  <span>Direct tuition payment to institution</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                  <span>Predictable monthly sponsor amortizations</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                  <span>Accredited federal, state & private campuses</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                  <span>Law School, ICAN & postgraduate programs</span>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="pt-5 mt-5 border-t border-[#071A2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Link
                to="/student-loans"
                className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors group"
              >
                <span>View Full Student Loan Structure</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] rounded-md transition-colors shadow-2xs"
              >
                Apply for Loan
              </Link>
            </div>
          </div>

          {/* SUPPORTING SERVICES (5 cols): 3 Balanced Cards without excessive empty space */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Supporting 1: Investment Services */}
            <div className="bg-[#F8F7F3] border border-[#071A2B]/12 rounded-lg p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-[#087A5A]/40 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[#071A2B] text-white flex items-center justify-center transition-transform group-hover:scale-105">
                    <TrendingUp className="w-4 h-4 text-[#C6A15B]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#071A2B]/40">02</span>
                </div>

                <h3 className="text-lg font-bold text-[#071A2B] tracking-tight group-hover:text-[#087A5A] transition-colors">
                  Investment Services
                </h3>
                <p className="text-xs text-[#17202A]/80 leading-relaxed">
                  Disciplined wealth management anchored in capital preservation for corporate treasuries, 
                  working professionals, and diaspora investors seeking reliable domestic deployment.
                </p>

                <div className="space-y-1 pt-1 text-xs text-[#17202A]/85 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-[#087A5A] font-bold">✓</span>
                    <span>Principal protection mandate on real assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#087A5A] font-bold">✓</span>
                    <span>Legally formalized placement covenants</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#071A2B]/8">
                <Link
                  to="/investments"
                  className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors group/link"
                >
                  <span>Explore Investment Placements</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Supporting 2: Business Financing */}
            <div className="bg-[#F8F7F3] border border-[#071A2B]/12 rounded-lg p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-[#087A5A]/40 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[#087A5A] text-white flex items-center justify-center transition-transform group-hover:scale-105">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#071A2B]/40">03</span>
                </div>

                <h3 className="text-lg font-bold text-[#071A2B] tracking-tight group-hover:text-[#087A5A] transition-colors">
                  Business Financing
                </h3>
                <p className="text-xs text-[#17202A]/80 leading-relaxed">
                  Commercial credit underwritten on verifiable bank statement turnover and inventory flow 
                  rather than impossible collateral barriers for Nigerian enterprises.
                </p>

                <div className="space-y-1 pt-1 text-xs text-[#17202A]/85 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-[#087A5A] font-bold">✓</span>
                    <span>Merchant inventory restocking & trade flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#087A5A] font-bold">✓</span>
                    <span>Operational working capital facilities</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#071A2B]/8">
                <Link
                  to="/business-financing"
                  className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors group/link"
                >
                  <span>Business Credit Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Supporting 3: Personal Financial Solutions */}
            <div className="bg-[#F8F7F3] border border-[#071A2B]/12 rounded-lg p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-[#087A5A]/40 transition-all duration-300 group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-md bg-[#071A2B]/10 text-[#071A2B] flex items-center justify-center transition-transform group-hover:scale-105">
                    <Wallet className="w-4 h-4 text-[#087A5A]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#071A2B]/40">04</span>
                </div>

                <h3 className="text-lg font-bold text-[#071A2B] tracking-tight group-hover:text-[#087A5A] transition-colors">
                  Personal Financial Solutions
                </h3>
                <p className="text-xs text-[#17202A]/80 leading-relaxed">
                  Salary-backed liquidity lines engineered for verified professionals to meet milestone commitments 
                  with transparent monthly schedules.
                </p>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#071A2B]/8">
                <Link
                  to="/personal-finance"
                  className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors group/link"
                >
                  <span>Personal Finance Options</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
