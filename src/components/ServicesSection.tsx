import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, TrendingUp, Building2, Wallet, FileSpreadsheet, Check } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesSectionProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="solutions" className="py-20 lg:py-28 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-gray-100">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.15em]">
              Comprehensive Financial Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#071A2B] tracking-tight leading-tight">
              Structured Solutions for Individuals, Scholars & Enterprises
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#17202A]/70 leading-relaxed font-normal">
            Every facility is underwritten with transparent repayment structures, rigorous legal clarity, 
            and practical responsiveness to Nigerian economic cycles.
          </p>
        </div>

        {/* Asymmetrical Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Flagship Student Loans / Education Financing (Spans 7 cols - Hero Card) */}
          <div className="lg:col-span-7 bg-[#F8F7F3] border border-gray-200/90 rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#087A5A]/50 transition-all duration-300">
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#087A5A]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#087A5A]/10 text-[#04513E] text-xs font-bold tracking-wide uppercase">
                  <GraduationCap className="w-4 h-4 text-[#087A5A]" />
                  <span>Flagship Solution</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#071A2B]/40">01</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#071A2B] tracking-tight">
                  Student Loans & Education Financing
                </h3>
                <p className="text-sm sm:text-base text-[#17202A]/75 leading-relaxed font-normal">
                  Direct-to-institution tuition financing that ensures academic pursuits never pause for sudden funding gaps. 
                  Tuition is remitted straight to universities, polytechnics, ICAN, and the Nigerian Law School.
                </p>
              </div>

              {/* Specific Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-[#17202A]/85 font-medium">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>100% Direct institutional tuition remittance</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#17202A]/85 font-medium">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Predictable monthly sponsor amortizations</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#17202A]/85 font-medium">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Accredited public & private universities</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#17202A]/85 font-medium">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>ICAN, Nigerian Law School & Medical Boards</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <Link
                to="/student-loans"
                className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors"
              >
                <span>View Full Student Loan Structure & Checklist</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
              
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] rounded transition-colors shadow-xs"
              >
                Apply for Loan
              </Link>
            </div>
          </div>

          {/* Card 2: Investment Services & Wealth Management (Spans 5 cols) */}
          <div className="lg:col-span-5 bg-[#071A2B] text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between border border-white/10 hover:border-[#087A5A]/50 transition-all duration-300 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[#C6A15B] text-xs font-bold tracking-wide uppercase">
                  <TrendingUp className="w-4 h-4 text-[#087A5A]" />
                  <span>Capital Preservation</span>
                </span>
                <span className="text-xs font-mono font-bold text-white/30">02</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Investment Services
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  Disciplined, asset-backed wealth management anchored in capital preservation for corporate treasuries, 
                  working professionals, and diaspora investors seeking reliable home-country deployment.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-white/85">
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Principal protection mandate on real assets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Legally binding, executed placement contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Zero speculative crypto or forex exposure</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/investments"
                className="inline-flex items-center text-xs font-bold text-white hover:text-[#C6A15B] transition-colors"
              >
                <span>Explore Wealth Options</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 3: Business Financing & SME Credit (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Building2 className="w-6 h-6 text-[#087A5A]" />
                <span className="text-xs font-mono font-bold text-gray-300">03</span>
              </div>
              <h3 className="text-lg font-bold text-[#071A2B]">
                Business Financing
              </h3>
              <p className="text-xs text-[#17202A]/70 leading-relaxed">
                Commercial credit underwritten on verifiable bank statement velocity and inventory turnover—not impossible landed collateral.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-[#17202A]/80 space-y-1">
                <div>• Merchant inventory restocking</div>
                <div>• Revolving operational working capital</div>
                <div>• Commercial asset financing</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                to="/business-financing"
                className="inline-flex items-center text-xs font-bold text-[#071A2B] hover:text-[#087A5A] transition-colors"
              >
                <span>Business Credit Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 4: Personal Financial Solutions (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Wallet className="w-6 h-6 text-[#087A5A]" />
                <span className="text-xs font-mono font-bold text-gray-300">04</span>
              </div>
              <h3 className="text-lg font-bold text-[#071A2B]">
                Personal Financial Solutions
              </h3>
              <p className="text-xs text-[#17202A]/70 leading-relaxed">
                Salary-backed liquidity lines engineered for verified professionals to meet milestone commitments without predatory compounding charges.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-[#17202A]/80 space-y-1">
                <div>• Salary-backed personal facilities</div>
                <div>• Emergency family medical credit</div>
                <div>• Clear milestone repayment schedules</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                to="/personal-finance"
                className="inline-flex items-center text-xs font-bold text-[#071A2B] hover:text-[#087A5A] transition-colors"
              >
                <span>Personal Finance Options</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 5: Other Financial Services & Advisory (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FileSpreadsheet className="w-6 h-6 text-[#087A5A]" />
                <span className="text-xs font-mono font-bold text-gray-300">05</span>
              </div>
              <h3 className="text-lg font-bold text-[#071A2B]">
                Other Financial Services
              </h3>
              <p className="text-xs text-[#17202A]/70 leading-relaxed">
                Strategic financial modeling, project feasibility studies, debt restructuring, and educational trust frameworks.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-[#17202A]/80 space-y-1">
                <div>• Commercial feasibility modeling</div>
                <div>• Educational trust structures</div>
                <div>• Debt mediation & restructuring</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <Link
                to="/other-services"
                className="inline-flex items-center text-xs font-bold text-[#071A2B] hover:text-[#087A5A] transition-colors"
              >
                <span>Advisory Services</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
