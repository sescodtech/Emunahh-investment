import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ArrowUpRight, School, FileText, CalendarCheck, ShieldCheck } from 'lucide-react';
import { ServiceType } from '../types';

interface StudentLoansPageProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const StudentLoansPage: React.FC<StudentLoansPageProps> = ({ onOpenApply }) => {
  const eligibleInstitutions = [
    { title: 'Federal Universities', desc: 'UNILAG, UI, OAU, UNN, ABU, FUTA, UNILORIN & other federal tertiary campuses.' },
    { title: 'State Tertiary Institutions', desc: 'LASU, EKSU, OOU, KWASU, and accredited state universities and polytechnics.' },
    { title: 'Accredited Private Universities', desc: 'Covenant, Babcock, Bowen, Landmark, Pan-Atlantic, and licensed private institutions.' },
    { title: 'Professional Examinations', desc: 'Nigerian Law School, ICAN, ACCA, CIBN, CITN, and medical board certifications.' },
  ];

  const repaymentOptions = [
    {
      tenure: '3 Months (Single Semester Sprint)',
      ideal: 'Best for short semester exam clearances and urgent course registration.',
      structure: 'Three equal monthly installments aligned with sponsor salary cycle.',
    },
    {
      tenure: '6 Months (Standard Academic Semester)',
      ideal: 'Most popular option for university undergraduate and polytechnic semesters.',
      structure: 'Six predictable monthly installments to distribute tuition smoothly.',
    },
    {
      tenure: '9 Months (Full Academic Session Bridge)',
      ideal: 'Designed for intensive diploma programs, postgraduate diplomas, or Bar Finals.',
      structure: 'Nine structured monthly installments with fixed repayment schedule.',
    },
    {
      tenure: '12 Months (Annual Session Spread)',
      ideal: 'Full-year comprehensive academic tuition spread over 12 calendar months.',
      structure: 'Twelve equal monthly milestone payments for total family budget predictability.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Student Loans</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00174D] tracking-tight leading-tight">
              Student Loans & Education Financing
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              We ensure tuition deadlines never compromise academic potential. 
              Emunahh-Invest provides direct-to-institution tuition funding for Nigerian 
              undergraduates, postgraduates, and professional candidates.
            </p>

            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => onOpenApply('student_loan')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <span>Apply for Student Loan</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </button>

              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh,%20I%20am%20inquiring%20about%20Student%20Loan%20requirements"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Desk (0802 319 0807)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          
          {/* Direct Remittance Principle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-10 rounded-xl border border-gray-200 shadow-xs">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs text-[#00A859] font-bold uppercase tracking-wider">
                The Emunahh Principle
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00174D]">
                Direct Institutional Tuition Remittance
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                To protect students, parents, and sponsors, all approved tuition funds are paid directly 
                into the designated bank account of the educational institution against an official school invoice 
                or Remita schedule. This ensures full academic compliance and avoids exam-hall exclusions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-700">
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
                  <span>Guaranteed uninterrupted academic term</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border-2 border-[#002B99]/20 p-6 sm:p-8 rounded-xl space-y-4">
              <div className="text-xs text-[#002B99] uppercase tracking-wider font-bold">
                Quick Document Checklist
              </div>
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                  <span>Official Admission Letter or Current Semester Course Registration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                  <span>School-issued Invoice, Remita Retrieval Reference (RRR), or Fee Breakdown</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                  <span>Valid Student National Identification (NIN, Student ID Card)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                  <span>Guarantor/Sponsor Identification & Verifiable Proof of Income</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Eligible Programs Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00174D]">
                Programs & Institutions Covered
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Financing tailored to the entire Nigerian educational spectrum.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {eligibleInstitutions.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 space-y-2 shadow-2xs">
                  <School className="w-6 h-6 text-[#00A859] mb-2" />
                  <h3 className="text-sm font-bold text-[#00174D]">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Repayment Horizons (Clean, structured guide instead of calculator) */}
          <div className="rounded-xl bg-white border border-gray-200 p-7 sm:p-10 shadow-xs">
            <div className="max-w-2xl mb-8 space-y-2">
              <div className="text-xs text-[#00A859] font-bold uppercase tracking-wider">
                Repayment Horizons
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#00174D]">
                Structured Semester Repayment Options
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Choose a tenure that aligns with family cash flows and sponsor income cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {repaymentOptions.map((opt, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-gray-200 bg-white space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#002B99]/10 text-[#002B99] flex items-center justify-center text-xs font-bold font-mono">
                      0{idx + 1}
                    </div>
                    <h4 className="text-sm font-bold text-[#00174D]">
                      {opt.tenure}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {opt.ideal}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                    {opt.structure}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500">
                Final repayment milestones are formalized in legally binding agreements upon invoice verification.
              </div>
              <button
                onClick={() => onOpenApply('student_loan')}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors cursor-pointer"
              >
                Apply for Student Loan Facility
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
