import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, TrendingUp, Building2, Wallet, FileSpreadsheet } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesSectionProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="solutions" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-gray-100">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
              Comprehensive Financial Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
              Structured Solutions for Individuals, Scholars & Enterprises
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-600 leading-relaxed font-normal">
            Every facility is underwritten with transparent repayment structures, rigorous legal clarity, 
            and practical responsiveness to Nigerian economic conditions.
          </p>
        </div>

        {/* Professional Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Flagship Student Loans / Education Financing (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#002B99]/20 hover:border-[#002B99] rounded-xl p-7 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00A859]/10 text-[#00A859] text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#00A859]" />
                  <span>Flagship Solution</span>
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">01</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#00174D] tracking-tight">
                  Student Loans & Education Financing
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Structured tuition financing that ensures academic pursuits proceed without disruption. 
                  Designed for undergraduates, postgraduates, and professional examination candidates across Nigeria.
                </p>
              </div>

              {/* Specific Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Direct-to-institution tuition remittance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Predictable monthly sponsor amortizations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Accredited federal, state & private campuses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Nigerian Law School, ICAN & professional exams</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                to="/student-loans"
                className="inline-flex items-center text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
              >
                <span>View Full Student Loan Structure & Checklist</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
              
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors shadow-xs"
              >
                Apply for Loan
              </Link>
            </div>
          </div>

          {/* Card 2: Investment Services & Wealth Management (Spans 5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#00A859]/20 hover:border-[#00A859] rounded-xl p-7 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#002B99]/10 text-[#002B99] text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-[#002B99]" />
                  <span>Capital Preservation</span>
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">02</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#00174D] tracking-tight">
                  Investment Services
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Disciplined wealth management anchored in capital preservation for corporate treasuries, 
                  working professionals, and diaspora investors seeking reliable home-country deployment.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Principal protection mandate on real assets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Legally formalized placement contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Zero speculative crypto or forex exposure</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
              <Link
                to="/investments"
                className="inline-flex items-center text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
              >
                <span>Explore Investment Options</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 3: Business Financing & SME Credit (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-md bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#002B99]" />
                </div>
                <span className="text-xs font-mono font-bold text-gray-400">03</span>
              </div>
              <h3 className="text-lg font-bold text-[#00174D]">
                Business Financing
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Commercial credit underwritten on verifiable bank statement turnover and inventory flow rather than impossible collateral barriers.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-700 space-y-1">
                <div>• Merchant inventory restocking</div>
                <div>• Revolving operational working capital</div>
                <div>• Commercial asset financing</div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-gray-100">
              <Link
                to="/business-financing"
                className="inline-flex items-center text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
              >
                <span>Business Credit Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 4: Personal Financial Solutions (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-md bg-[#00A859]/10 text-[#00A859] flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#00A859]" />
                </div>
                <span className="text-xs font-mono font-bold text-gray-400">04</span>
              </div>
              <h3 className="text-lg font-bold text-[#00174D]">
                Personal Financial Solutions
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Salary-backed liquidity lines engineered for verified professionals to meet milestone commitments with transparent schedules.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-700 space-y-1">
                <div>• Salary-backed personal facilities</div>
                <div>• Family milestone liquidity lines</div>
                <div>• Clear milestone repayment schedules</div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-gray-100">
              <Link
                to="/personal-finance"
                className="inline-flex items-center text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
              >
                <span>Personal Finance Options</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Card 5: Other Financial Services & Advisory (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-md bg-[#002B99]/10 text-[#002B99] flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-[#002B99]" />
                </div>
                <span className="text-xs font-mono font-bold text-gray-400">05</span>
              </div>
              <h3 className="text-lg font-bold text-[#00174D]">
                Other Financial Services
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Strategic financial modeling, project feasibility studies, debt restructuring, and educational trust frameworks.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-700 space-y-1">
                <div>• Commercial feasibility modeling</div>
                <div>• Educational trust structures</div>
                <div>• Debt mediation & advisory</div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-gray-100">
              <Link
                to="/other-services"
                className="inline-flex items-center text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
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
