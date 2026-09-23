import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, CheckCircle2, Clock, Landmark, MessageSquare, ArrowUpRight, School, FileText, ShieldAlert } from 'lucide-react';
import { ServiceType } from '../types';

interface StudentLoansPageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const StudentLoansPage: React.FC<StudentLoansPageProps> = ({ onOpenApply }) => {
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [tenureMonths, setTenureMonths] = useState<number>(6);

  const estimatedMonthly = Math.round((loanAmount / tenureMonths) * 1.05);

  const eligibleInstitutions = [
    { title: 'Federal Universities', desc: 'UNILAG, UI, OAU, UNN, ABU, FUTA, UNILORIN & other federal tertiary campuses.' },
    { title: 'State Tertiary Institutions', desc: 'LASU, EKSU, OOU, KWASU, and accredited state universities and polytechnics.' },
    { title: 'Accredited Private Universities', desc: 'Covenant, Babcock, Bowen, Landmark, Pan-Atlantic, and licensed private institutions.' },
    { title: 'Professional Examinations', desc: 'Nigerian Law School, ICAN, ACCA, CIBN, CITN, and medical board certifications.' },
  ];

  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      {/* Page Header */}
      <section className="bg-[#00174D] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Student Loans</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
              Student Loans & Education Financing
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              We ensure tuition deadlines never compromise academic potential. 
              Emunahh-Invest provides direct-to-institution tuition funding for Nigerian 
              undergraduates, postgraduates, and professional candidates.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenApply('student_loan')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-all shadow-sm"
              >
                <span>Apply for Student Loan</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#00A859]" />
              </button>

              <a
                href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Student%20Loan%20requirements"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Desk (+234 817 917 1456)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Direct Remittance Principle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-lg border border-[#1E242B]/10 shadow-xs">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs text-[#00A859] font-semibold uppercase tracking-wider">
                The Emunahh Protocol
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#002B99]">
                Direct Institutional Tuition Remittance
              </h2>
              <p className="text-sm sm:text-base text-[#1E242B]/75 leading-relaxed font-light">
                To protect students, parents, and sponsors, all approved tuition funds are paid directly 
                into the designated bank account of the educational institution against an official school invoice 
                or Remita schedule. This ensures 100% academic compliance and avoids exam-hall exclusions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#1E242B]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Eliminates diversion of tuition funds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Immediate institution payment receipt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Predictable monthly sponsor amortizations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Guaranteed uninterrupted exams</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#00174D] text-white p-6 sm:p-8 rounded-lg space-y-4">
              <div className="text-xs text-[#00E676] uppercase tracking-wider font-semibold">
                Quick Document Checklist
              </div>
              <ul className="space-y-3 text-xs text-white/80">
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                  <span>Official Admission Letter or Current Semester Course Registration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                  <span>School-issued Invoice, Remita Retrieval Reference (RRR), or Fee Breakdown</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                  <span>Valid Student National Identification (NIN, Student ID Card)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
                  <span>Guarantor/Sponsor Identification & Verifiable Proof of Income</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Eligible Programs Bento Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#002B99]">
                Programs & Institutions Covered
              </h2>
              <p className="text-xs sm:text-sm text-[#1E242B]/70">
                Financing tailored to the entire Nigerian educational spectrum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eligibleInstitutions.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-[#1E242B]/10 space-y-2 shadow-xs">
                  <School className="w-6 h-6 text-[#00A859] mb-3" />
                  <h3 className="text-base font-semibold text-[#002B99]">{item.title}</h3>
                  <p className="text-xs text-[#1E242B]/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Planning Calculator */}
          <div className="rounded-lg bg-white border border-[#1E242B]/10 p-6 sm:p-10 shadow-xs">
            <div className="max-w-2xl mb-8 space-y-2">
              <div className="text-xs text-[#00A859] font-semibold uppercase tracking-wider">
                Planning Simulator
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-[#002B99]">
                Simulate Your Semester Repayment Schedule
              </h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70">
                Adjust tuition amount and tenure to view illustrative monthly milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-[#1E242B] mb-2">
                    <span>Required Tuition Amount (₦)</span>
                    <span className="text-sm font-bold text-[#002B99] tabular-nums">
                      ₦{loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={2500000}
                    step={25000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-[#1E242B]/10 rounded-lg appearance-none cursor-pointer accent-[#00A859]"
                  />
                  <div className="flex justify-between text-[11px] text-[#1E242B]/50 mt-1">
                    <span>₦100,000</span>
                    <span>₦1,250,000</span>
                    <span>₦2,500,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-[#1E242B] mb-2">
                    <span>Repayment Horizon</span>
                    <span className="text-sm font-bold text-[#002B99]">{tenureMonths} Months</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 9, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenureMonths(m)}
                        className={`py-2 text-xs font-semibold rounded border transition-colors ${
                          tenureMonths === m
                            ? 'bg-[#002B99] text-white border-[#002B99]'
                            : 'bg-[#FBFBF9] text-[#1E242B]/80 border-[#1E242B]/15 hover:border-[#1E242B]/30'
                        }`}
                      >
                        {m} Mo.
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#00174D] text-white p-6 rounded-lg space-y-4">
                <div className="text-xs text-[#00E676] font-semibold uppercase">Estimated Monthly Installment</div>
                <div className="text-3xl font-display font-bold text-white tabular-nums">
                  ₦{estimatedMonthly.toLocaleString()}
                  <span className="text-xs font-normal text-white/70 block mt-1 font-sans">
                    per month for {tenureMonths} months
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed border-t border-white/10 pt-3">
                  *Illustrative schedule for family financial planning. Final figures confirmed upon receipt of verified school invoice.
                </p>
                <button
                  onClick={() => onOpenApply('student_loan')}
                  className="w-full py-3 text-xs font-bold text-[#00174D] bg-white hover:bg-[#F5F5F0] rounded transition-colors"
                >
                  Start This Application
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
