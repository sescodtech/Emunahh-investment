import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'student' | 'investment' | 'business' | 'general';
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'student' | 'investment' | 'business'>('all');

  const faqs: FAQItem[] = [
    {
      category: 'student',
      question: 'What are the eligibility requirements for an Emunahh-Invest Student Loan?',
      answer:
        'Applicants must be currently enrolled or formally admitted into an accredited Nigerian university, polytechnic, college of education, or recognized professional certification body (such as ICAN, ACCA, or Nigerian Law School). Key requirements include a valid admission letter or enrollment proof, official school fee invoice, valid student ID or NIN, and a verifiable co-sponsor or guarantor with stable income.',
    },
    {
      category: 'student',
      question: 'Are education loan funds disbursed directly to the student or the school?',
      answer:
        'To guarantee institutional compliance and prevent disruption of academic studies, tuition funds are disbursed directly into the verified designated bank account of the educational institution. Departmental or course material support follows verified secondary disbursement protocols.',
    },
    {
      category: 'student',
      question: 'Can a parent, guardian, or working professional apply on behalf of a student?',
      answer:
        'Yes. Parents, guardians, or working family sponsors frequently act as primary applicants or guarantors. We structure the repayment plan to fit the sponsor’s regular salary or commercial cash-flow cycle.',
    },
    {
      category: 'general',
      question: 'How long does the assessment and disbursement process take?',
      answer:
        'Once complete documentation (admission verification, fee schedule, and guarantor details) is submitted, our review committee typically completes assessment within 48 to 72 business hours. Urgent matriculation deadlines receive priority review.',
    },
    {
      category: 'investment',
      question: 'How does Emunahh-Invest manage and safeguard investment funds?',
      answer:
        'Emunahh-Invest adheres to a strict capital-preservation mandate. We do not participate in speculative digital assets or unverified high-yield schemes. Every placement is formalized with an executed legal agreement specifying tenure, parameters, and transparent review schedules.',
    },
    {
      category: 'business',
      question: 'What documentation is required to qualify for SME Business Financing?',
      answer:
        'Registered Nigerian businesses (sole proprietorships, partnerships, or limited liability companies) must submit proof of registration (CAC), 6 to 12 months of active corporate bank statements showing commercial turnover, and valid identification of the business principals.',
    },
    {
      category: 'general',
      question: 'Can I visit your physical office in Lagos for an in-person meeting?',
      answer:
        'Yes. We welcome clients to our headquarters at 33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria. Our offices are open Monday through Friday, from 8:30 AM to 5:00 PM.',
    },
    {
      category: 'general',
      question: 'Are there any hidden fees or unannounced deductions?',
      answer:
        'None whatsoever. A foundational principle is radical transparency. Every repayment amount, schedule milestone, and administrative fee is clearly detailed before commitment.',
    },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 lg:py-22 bg-[#F8F7F3] border-b border-[#071A2B]/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] text-[#087A5A] font-bold tracking-[0.2em] uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2B] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#17202A]/75 max-w-xl mx-auto font-normal">
            Essential guidelines regarding our student loans, capital preservation investments, and commercial facilities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {(['all', 'student', 'investment', 'business'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-md border transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#071A2B] text-white border-[#071A2B]'
                  : 'bg-white text-[#17202A] border-[#071A2B]/15 hover:border-[#087A5A]'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat === 'student' ? 'Student Loans' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-lg border transition-all ${
                  isOpen
                    ? 'bg-white border-[#087A5A]/60 shadow-xs'
                    : 'bg-white border-[#071A2B]/10 hover:border-[#071A2B]/25'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#071A2B] tracking-tight">
                    {faq.question}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#087A5A] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-[#17202A]/80 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
