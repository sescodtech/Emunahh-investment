import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, School, ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { ServiceType } from '../types';
import graduateImage from '../assets/images/nigerian_graduate_success_1790142702336.jpg';

interface StudentLoanFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const StudentLoanFeature: React.FC<StudentLoanFeatureProps> = ({ onOpenApply }) => {
  const verifiedCoverage = [
    { title: 'Federal & State Universities', desc: 'UNILAG, UI, OAU, LASU, UNN, ABU, FUTA, and all accredited public tertiary institutions.' },
    { title: 'Accredited Private Universities', desc: 'Covenant, Babcock, Bowen, Landmark, Pan-Atlantic, and licensed private institutions.' },
    { title: 'Professional Qualifications', desc: 'Nigerian Law School, ICAN, ACCA, CIBN, CITN, and medical board licensing.' },
    { title: 'Postgraduate & Executive Education', desc: 'Masters degrees, PGDs, and professional certifications across Nigeria.' },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Online Intake & School Invoice',
      desc: 'Submit admission confirmation or course registration alongside the official university fee invoice or Remita schedule.',
    },
    {
      step: '02',
      title: 'Sponsor & Document Verification',
      desc: 'Our credit desk verifies student matriculation details and confirms the co-sponsor’s verifiable cash flow.',
    },
    {
      step: '03',
      title: 'Execution of Repayment Schedule',
      desc: 'A straightforward, legally binding contract is executed with clear, predictable monthly milestone dates.',
    },
    {
      step: '04',
      title: 'Direct Institutional Remittance',
      desc: 'Tuition is paid straight to the accredited institution bank account, securing uninterrupted classroom and exam matriculation.',
    },
  ];

  return (
    <section id="student-loans" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
            Education Financing & Human Capital
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
            Academic Aspirations Should Never Pause for Tuition Deadlines
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Emunahh-Invest provides structured student loans that remit tuition directly to accredited institutions, 
            allowing scholars to focus on excellence while sponsors manage repayments with predictable dignity.
          </p>
        </div>

        {/* Split Grid: Editorial African Graduation Image & Verified Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left Column: Editorial African Graduation Image (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
              <img
                src={graduateImage}
                alt="Nigerian student graduating successfully with family support"
                className="w-full h-[400px] sm:h-[450px] object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Institutions & Document Protocol (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-[#00174D] tracking-tight">
                Covering Nigeria’s Accredited Institutions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                From undergraduate degrees to the Nigerian Law School and chartered accounting exams, 
                our educational facilities eliminate the crisis of sudden semester deadlines.
              </p>
            </div>

            {/* Institutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {verifiedCoverage.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white space-y-1 shadow-2xs">
                  <div className="text-xs font-bold text-[#002B99]">{item.title}</div>
                  <div className="text-[11px] text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Document Protocol Checklist */}
            <div className="p-5 rounded-xl bg-white border border-[#002B99]/20 space-y-2.5">
              <div className="text-xs font-bold text-[#002B99] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#00A859]" />
                <span>Standard Review Documentation</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Official Admission Letter or active student course registration form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Official university fee schedule / institutional invoice (Remita RRR)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Valid National Identity Card / NIN of student and sponsor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A859] font-bold">✓</span>
                  <span>Verified co-sponsor bank statements & proof of lawful income</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <Link
                to="/student-loans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors shadow-xs"
              >
                <span>Read Student Loans Guide</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>

              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-bold text-[#00A859] bg-white hover:bg-gray-50 border border-[#00A859] rounded-lg transition-colors"
              >
                <span>Start Loan Application</span>
              </Link>
            </div>
          </div>

        </div>

        {/* 4-Step Structured Process (Replaces interactive calculator) */}
        <div className="rounded-xl bg-white border border-gray-200 p-7 sm:p-9 shadow-xs">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
              Clear 4-Step Process
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#00174D] tracking-tight">
              How Student Loan Facilities Are Disbursed
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Structured transparently from initial application to institutional settlement within 48 to 72 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="space-y-2 relative">
                <div className="w-8 h-8 rounded-lg bg-[#002B99] text-white flex items-center justify-center text-xs font-bold font-mono">
                  {step.step}
                </div>
                <h4 className="text-sm font-bold text-[#00174D] pt-1">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
