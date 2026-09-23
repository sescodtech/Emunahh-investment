import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Clock, School, ShieldCheck } from 'lucide-react';
import { ServiceType } from '../types';

interface StudentLoanFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const StudentLoanFeature: React.FC<StudentLoanFeatureProps> = ({ onOpenApply }) => {
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [tenureMonths, setTenureMonths] = useState<number>(6);

  const estimatedMonthly = Math.round((loanAmount / tenureMonths) * 1.05);

  const eligiblePrograms = [
    { title: 'Federal & State Universities', desc: 'UNILAG, UI, OAU, LASU, UNN, ABU, FUTA, and all accredited public universities.' },
    { title: 'Accredited Private Universities', desc: 'Covenant, Babcock, Bowen, Landmark, Pan-Atlantic, and licensed private institutions.' },
    { title: 'Professional Qualifications', desc: 'Nigerian Law School, ICAN, ACCA, CIBN, CITN, and medical board licensing.' },
    { title: 'Postgraduate & Higher Degrees', desc: 'Masters, PGD, and executive education programs across Nigeria.' },
  ];

  const requiredDocs = [
    'Official Admission Letter or current semester course verification form',
    'School fee schedule / official institutional Remita or invoice',
    'Valid student identification (National Identity Card / NIN)',
    'Verified co-sponsor / guarantor identification & proof of income',
  ];

  return (
    <section id="student-loans" className="py-20 lg:py-28 bg-white border-y border-[#1E242B]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="text-xs text-[#00A859] font-bold tracking-wider uppercase">
            Specialized Education Financing · Direct School Remittance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#002B99] tracking-tight leading-tight">
            Academic Dreams Should Never Pause for Tuition Deadlines
          </h2>
          <p className="text-base sm:text-lg text-[#1E242B]/75 leading-relaxed font-light">
            Emunahh-Invest provides structured student loans that remit tuition directly to accredited institutions, 
            allowing students to focus on academic excellence while families manage repayments with predictable dignity.
          </p>
        </div>

        {/* Feature Grid: Photo & Institutional Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Visual Asset & Verification Seal */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#1E242B]/15 shadow-xl bg-[#001033]">
              <img
                src="/src/assets/images/nigerian_graduate_success_1790142702336.jpg"
                alt="Nigerian student graduating successfully with family support"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001033]/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded border border-white/20 p-4 text-[#002B99] shadow-lg">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#00A859] mb-1">
                  <span>Guaranteed Academic Clearance</span>
                  <span className="text-[#002B99]">100% Institution Payment</span>
                </div>
                <div className="text-xs text-[#1E242B]/85 font-medium">
                  Tuition remitted directly to UNILAG, LASU, Covenant, Law School, and accredited bodies.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Educational Scope & Checklist */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-medium text-[#002B99]">
                Covering Nigeria’s Leading Academic Programs
              </h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
                From undergraduate degrees to the Nigerian Law School and professional accounting boards, 
                our educational facilities eliminate the panic of imminent registration cutoff dates.
              </p>
            </div>

            {/* Programs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eligiblePrograms.map((p, idx) => (
                <div key={idx} className="p-4 rounded border border-[#1E242B]/10 bg-[#FBFBF9] space-y-1">
                  <div className="text-xs font-bold text-[#002B99]">{p.title}</div>
                  <div className="text-[11px] text-[#1E242B]/65 leading-relaxed font-light">{p.desc}</div>
                </div>
              ))}
            </div>

            {/* Document Checklist */}
            <div className="p-5 rounded bg-[#001033] text-white space-y-3">
              <div className="text-xs font-bold text-[#00E676] uppercase tracking-wider">
                Document Checklist for Expedited Review
              </div>
              <ul className="space-y-2 text-xs text-white/85">
                {requiredDocs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#00E676] font-bold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/student-loans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001f6e] rounded shadow-xs transition-colors"
              >
                <span>Visit Student Loans Page</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>

              <a
                href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Student%20Loan%20requirements"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp: +234 817 917 1456</span>
              </a>
            </div>

          </div>

        </div>

        {/* Repayment Simulator */}
        <div className="rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="text-xs text-[#00A859] font-bold uppercase tracking-wider">
              Transparent Planning Simulator
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-medium text-[#002B99]">
              Estimate Your Semester Installment Schedule
            </h3>
            <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-light">
              We structure repayments around family salary and business cycles, ensuring predictable monthly milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#002B99] mb-2">
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
                  className="w-full h-2 bg-[#1E242B]/10 rounded-lg appearance-none cursor-pointer accent-[#00A859]"
                />
                <div className="flex justify-between text-[11px] text-[#1E242B]/50 mt-1">
                  <span>₦100,000</span>
                  <span>₦1,000,000</span>
                  <span>₦2,000,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#002B99] mb-2">
                  <span>Repayment Tenure</span>
                  <span className="text-sm font-bold">{tenureMonths} Months</span>
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
                          : 'bg-white text-[#1E242B]/80 border-[#1E242B]/15 hover:border-[#1E242B]/30'
                      }`}
                    >
                      {m} Mo.
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#001033] text-white p-6 rounded-lg space-y-4">
              <div className="text-xs text-[#00E676] font-bold uppercase tracking-wider">
                Estimated Monthly Installment
              </div>
              <div className="text-3xl font-display font-bold text-white tabular-nums">
                ₦{estimatedMonthly.toLocaleString()}
                <span className="text-xs font-normal text-white/70 block mt-1 font-sans">
                  per month over {tenureMonths} months
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed border-t border-white/10 pt-3">
                *Illustrative schedule for family financial planning. Final terms confirmed upon receipt of verified school fee invoice.
              </p>
              <Link
                to="/apply"
                className="w-full inline-block text-center py-3 text-xs font-bold text-[#001033] bg-white hover:bg-[#F5F5F0] rounded transition-colors"
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
