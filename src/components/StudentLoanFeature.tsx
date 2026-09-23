import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, School, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { ServiceType } from '../types';

interface StudentLoanFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const StudentLoanFeature: React.FC<StudentLoanFeatureProps> = ({ onOpenApply }) => {
  const [loanAmount, setLoanAmount] = useState<number>(450000);
  const [tenureMonths, setTenureMonths] = useState<number>(6);

  const estimatedMonthly = Math.round((loanAmount / tenureMonths) * 1.05);

  const verifiedCoverage = [
    { title: 'Federal & State Universities', desc: 'UNILAG, UI, OAU, LASU, UNN, ABU, FUTA, and all accredited public tertiary institutions.' },
    { title: 'Accredited Private Universities', desc: 'Covenant, Babcock, Bowen, Landmark, Pan-Atlantic, and licensed private institutions.' },
    { title: 'Professional Qualifications', desc: 'Nigerian Law School, ICAN, ACCA, CIBN, CITN, and medical board licensing.' },
    { title: 'Postgraduate & Executive Education', desc: 'Masters degrees, PGDs, and professional certifications across Nigeria.' },
  ];

  return (
    <section id="student-loans" className="py-20 lg:py-28 bg-[#F8F7F3] border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.15em]">
            Education Financing & Human Capital
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A2B] tracking-tight leading-tight">
            Academic Aspirations Should Never Pause for Tuition Deadlines
          </h2>
          <p className="text-base sm:text-lg text-[#17202A]/75 leading-relaxed font-light">
            Emunahh-Invest provides structured student loans that remit tuition directly to accredited institutions, 
            allowing scholars to focus on excellence while sponsors manage repayments with predictable dignity.
          </p>
        </div>

        {/* Split Grid: Large Editorial Image & Verified Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Editorial African Graduation Image (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-xl bg-white">
              <img
                src="/src/assets/images/nigerian_graduate_success_1790142702336.jpg"
                alt="Nigerian student graduating successfully with family support"
                className="w-full h-[460px] sm:h-[500px] object-cover object-center"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/90 via-transparent to-transparent pointer-events-none" />

              {/* Inset Credential Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/40 shadow-lg text-[#071A2B]">
                <div className="flex items-center justify-between text-xs font-bold text-[#087A5A] uppercase tracking-wider mb-1">
                  <span>Direct Remittance Protocol</span>
                  <span className="text-[#071A2B]">Zero Fund Diversion</span>
                </div>
                <div className="text-xs text-[#17202A]/80 font-normal leading-relaxed">
                  Tuition is remitted directly to the verified school bank account or Remita RRR invoice on behalf of the student.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Institutions & Document Protocol (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#071A2B] tracking-tight">
                Covering Nigeria’s Accredited Institutions
              </h3>
              <p className="text-sm text-[#17202A]/70 leading-relaxed font-light">
                From undergraduate degrees to the Nigerian Law School and chartered accounting exams, 
                our educational facilities eliminate the crisis of sudden semester deadlines.
              </p>
            </div>

            {/* Institutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verifiedCoverage.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white space-y-1 shadow-2xs">
                  <div className="text-xs font-bold text-[#071A2B]">{item.title}</div>
                  <div className="text-[11px] text-[#17202A]/70 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* 4-Step Document Protocol */}
            <div className="p-6 rounded-xl bg-[#071A2B] text-white space-y-3 shadow-sm">
              <div className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
                Document Protocol for 48-Hour Review
              </div>
              <ul className="space-y-2 text-xs text-white/85">
                <li className="flex items-start gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Official Admission Letter or active student course registration form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Official university fee schedule / institutional invoice (Remita RRR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Valid National Identity Card / NIN of student and sponsor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#087A5A] font-bold">✓</span>
                  <span>Verified co-sponsor bank statements & proof of lawful income</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <Link
                to="/student-loans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded transition-colors shadow-xs"
              >
                <span>Read Student Loans Guide</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>

              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-[#071A2B] bg-white hover:bg-gray-50 border border-gray-200 rounded transition-colors"
              >
                <span>Start Loan Application</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Interactive Semester Installment Planner */}
        <div className="rounded-2xl bg-white border border-gray-200/90 p-8 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.15em]">
              Transparent Planning Simulator
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#071A2B] tracking-tight">
              Estimate Your Semester Installment Schedule
            </h3>
            <p className="text-xs sm:text-sm text-[#17202A]/70 leading-relaxed font-light">
              We structure repayments around family salary and enterprise business cycles for predictable, stress-free clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#071A2B] mb-2">
                  <span>Tuition / School Fees Amount</span>
                  <span className="text-base font-bold tabular-nums">₦{loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={25000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#087A5A]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>₦100,000</span>
                  <span>₦1,000,000</span>
                  <span>₦2,000,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#071A2B] mb-2">
                  <span>Repayment Tenure</span>
                  <span className="text-sm font-bold text-[#087A5A]">{tenureMonths} Months</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 9, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenureMonths(m)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        tenureMonths === m
                          ? 'bg-[#071A2B] text-white border-[#071A2B]'
                          : 'bg-gray-50 text-[#17202A]/80 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#071A2B] text-white p-7 rounded-xl space-y-4 shadow-md">
              <div className="text-xs text-[#C6A15B] font-bold uppercase tracking-wider">
                Estimated Monthly Installment
              </div>
              <div className="text-3xl font-bold text-white tabular-nums tracking-tight">
                ₦{estimatedMonthly.toLocaleString()}
                <span className="text-xs font-normal text-white/70 block mt-1 font-sans">
                  per month over {tenureMonths} months
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed border-t border-white/10 pt-3">
                *Illustrative schedule for family financial planning. Final figures confirmed upon receipt of verified school fee invoice.
              </p>
              <Link
                to="/apply"
                className="w-full block text-center py-3 text-xs font-bold text-[#071A2B] bg-white hover:bg-gray-100 rounded-lg transition-colors shadow-xs"
              >
                Apply for this Facility
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
