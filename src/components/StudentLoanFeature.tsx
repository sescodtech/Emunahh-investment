import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, School } from 'lucide-react';
import { ServiceType } from '../types';
import graduateImage from '../assets/images/nigerian_graduate_success_1790142702336.jpg';

interface StudentLoanFeatureProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const StudentLoanFeature: React.FC<StudentLoanFeatureProps> = ({ onOpenApply }) => {
  const steps = [
    {
      num: '01',
      title: 'ENQUIRY',
      desc: 'Submit your tertiary admission or invoice details for preliminary eligibility assessment.',
    },
    {
      num: '02',
      title: 'APPLICATION',
      desc: 'Provide verified academic registration and sponsor income documentation.',
    },
    {
      num: '03',
      title: 'REVIEW',
      desc: 'Underwriting verification of institutional invoice and sponsor repayment capacity.',
    },
    {
      num: '04',
      title: 'DECISION',
      desc: 'Formal contract execution followed by direct tuition remittance to the institution.',
    },
  ];

  const coverageList = [
    'Federal & State Universities across Nigeria',
    'Accredited Private Universities',
    'Nigerian Law School & Professional Exams (ICAN, ACCA)',
    'Postgraduate Masters & PGD Programs',
  ];

  return (
    <section id="student-loans" className="py-20 lg:py-28 bg-[#071A2B] text-white border-b border-white/10 scroll-mt-16 relative overflow-hidden">
      
      {/* Subtle Background Geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#087A5A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow and Headline */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />
            <span className="text-[11px] font-bold text-[#C6A15B] uppercase tracking-[0.2em]">
              EDUCATION FINANCING
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
            YOUR EDUCATION IS AN INVESTMENT IN YOUR FUTURE.
          </h2>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed font-normal">
            Emunahh-Invest provides structured student loans that remit tuition directly to accredited institutions, 
            allowing scholars to focus on academic excellence while sponsors manage repayments with predictable dignity.
          </p>
        </div>

        {/* Split Section: Authentic African Student Image & Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Authentic Nigerian Graduate Image with Navy Framing (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-white/15 bg-white/5 shadow-2xl">
              <img
                src={graduateImage}
                alt="Proud Nigerian graduate with family supported by Emunahh-Invest student loan"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/80 to-transparent">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#C6A15B]">Direct-to-Institution Remittance</span>
                  <span className="text-white/60">Zero Fund Diversion</span>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Scope & Requirements (6 cols) */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                Institutional Coverage
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Designed for Nigeria's Accredited Academic Institutions
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                Tuition financing covers recognized undergraduate programs, vocational professional institutions, 
                and postgraduate degrees across the federation.
              </p>
            </div>

            {/* Coverage Badges */}
            <div className="space-y-2.5">
              {coverageList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/90 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#087A5A] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Application CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-md transition-all shadow-md group"
              >
                <span>APPLY FOR STUDENT LOAN</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/student-loans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white/80 hover:text-white bg-transparent border border-white/20 hover:border-white/40 rounded-md transition-all"
              >
                <span>Review Full Guidelines</span>
              </Link>
            </div>

          </div>

        </div>

        {/* 4-Step Process Strip: Exactly as requested */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-[11px] font-bold text-[#C6A15B] uppercase tracking-[0.2em] mb-6">
            APPLICATION & DISBURSEMENT PROCESS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white/5 border border-white/10 relative space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-[#087A5A]">
                    {step.num}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                    Step {idx + 1}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">
                  {step.title}
                </h4>

                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 text-[11px] text-white/50 text-center sm:text-left">
            * All facilities subject to identity verification, institutional invoice validation, and sponsor underwriting approval.
          </div>
        </div>

      </div>
    </section>
  );
};
