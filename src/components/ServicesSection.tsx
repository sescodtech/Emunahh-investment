import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesSectionProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenApply }) => {
  const services = [
    {
      id: 'student_loan' as ServiceType,
      path: '/student-loans',
      title: 'Student Loans / Education Financing',
      desc: 'Structured financing for university tuition, postgraduate studies, ICAN, and Nigerian Law School. Payments are remitted directly to accredited institutions to ensure uninterrupted academic progress.',
      points: [
        'Direct tuition payment to institutions',
        'Structured monthly sponsor repayments',
        'Undergraduate, postgraduate & professional exams',
      ],
      linkText: 'View Education Financing',
    },
    {
      id: 'investment' as ServiceType,
      path: '/investments',
      title: 'Investment Services',
      desc: 'Disciplined wealth management and structured fixed placements anchored in capital preservation for corporate treasuries, Nigerian professionals, and diaspora clients.',
      points: [
        'Capital preservation mandate',
        'Legally executed contracts',
        'Targeted 6 to 24-month horizon placements',
      ],
      linkText: 'View Investment Solutions',
    },
    {
      id: 'business_financing' as ServiceType,
      path: '/business-financing',
      title: 'Business Financing',
      desc: 'Commercial credit and revolving working capital underwritten on active bank ledger velocity and inventory turnover to power growing retail, distribution, and contracting enterprises.',
      points: [
        'Merchant inventory restocking',
        'Working capital revolving facilities',
        'Commercial asset and equipment financing',
      ],
      linkText: 'View Business Financing',
    },
    {
      id: 'personal_finance' as ServiceType,
      path: '/personal-finance',
      title: 'Personal Financial Solutions',
      desc: 'Transparent, structured personal financing designed to help verified Nigerian salary earners and households manage planned family commitments and emergency expenses with dignity.',
      points: [
        'Salary-backed liquidity lines',
        'Predictable, clear payment milestones',
        'Zero predatory compounding penalties',
      ],
      linkText: 'View Personal Solutions',
    },
    {
      id: 'other_services' as ServiceType,
      path: '/other-services',
      title: 'Other Financial Services',
      desc: 'Specialized financial advisory, project feasibility assessments, educational trust setups, and commercial debt restructuring led by experienced Lagos financial analysts.',
      points: [
        'Commercial feasibility studies',
        'Debt restructuring & mediation',
        'Educational trust frameworks',
      ],
      linkText: 'View Advisory Services',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-24 bg-gray-50/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-bold text-[#00A859] uppercase tracking-wider">
            Our Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#00174D] tracking-tight">
            Financial & Investment Solutions
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            We provide structured, dependable financial services designed around transparency, 
            clear terms, and practical support for individuals, families, and businesses.
          </p>
        </div>

        {/* Clean Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#002B99]/40 transition-all duration-200"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#00174D] tracking-tight">
                  {svc.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {svc.desc}
                </p>

                <div className="pt-3 border-t border-gray-100 space-y-2">
                  {svc.points.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="text-[#00A859] font-bold">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to={svc.path}
                  className="text-xs font-bold text-[#002B99] hover:text-[#00A859] inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>{svc.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/apply"
                  className="text-xs font-semibold px-3 py-1.5 rounded bg-gray-100 hover:bg-[#002B99] hover:text-white text-gray-700 transition-colors"
                >
                  Apply
                </Link>
              </div>
            </div>
          ))}

          {/* 6th Card: Lagos Advisory & Consultation */}
          <div className="bg-[#00174D] text-white rounded-xl p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="text-xs font-bold text-[#00E676] uppercase tracking-wider">
                Corporate Office
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Visit Our Lagos Office
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                Our advisors are available to meet with you in person to structure tailored financing 
                or investment solutions for your personal or commercial goals.
              </p>
              
              <div className="p-4 rounded-lg bg-white/10 text-xs text-white/90 space-y-1">
                <div className="font-semibold text-white">33, Crossway Plaza, Beside UBA</div>
                <div className="text-white/70">3/5 Charity Road, New Oko Oba, Lagos</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/contact"
                className="text-xs font-bold text-white hover:text-[#00E676] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View Contact & Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
