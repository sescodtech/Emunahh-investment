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
        'Applicants must be currently enrolled or formally admitted into an accredited Nigerian university, polytechnic, college of education, or recognized professional certification body (such as ICAN, ACCA, or Law School). Key requirements include a valid admission letter or enrollment proof, official school fee invoice, valid student ID or NIN, and a verifiable co-sponsor or guarantor with stable income.',
    },
    {
      category: 'student',
      question: 'Are education loan funds disbursed directly to the student or the school?',
      answer:
        'To guarantee institutional compliance and prevent disruption of academic studies, tuition funds are disbursed directly into the verified designated bank account of the educational institution. In circumstances where departmental or course material support is included, verified secondary disbursement protocols are applied.',
    },
    {
      category: 'student',
      question: 'Can a parent, guardian, or working professional apply on behalf of a student?',
      answer:
        'Yes. In fact, parents, guardians, or working family sponsors frequently act as primary co-applicants or guarantors. We structure the repayment plan to fit the sponsor’s regular salary or commercial cash-flow cycle.',
    },
    {
      category: 'general',
      question: 'How long does the assessment and disbursement process take?',
      answer:
        'Once complete documentation (admission verification, fee schedule, and guarantor details) is submitted, our review committee typically completes assessment within 48 to 72 business hours. For urgent academic registration deadlines, our advisory desk offers expedited processing.',
    },
    {
      category: 'investment',
      question: 'How does Emunahh-Invest manage and safeguard investment funds?',
      answer:
        'Emunahh-Invest adheres to a strict capital-preservation-first philosophy. We do not participate in speculative digital assets or unverified high-yield schemes. Every investment facility is formalized with a legally binding written agreement specifying tenure, agreed parameters, and transparent review schedules.',
    },
    {
      category: 'business',
      question: 'What documentation is required to qualify for SME Business Financing?',
      answer:
        'Registered Nigerian businesses (sole proprietorships, partnerships, or limited liability companies) must submit proof of business registration (CAC), 6 to 12 months of active corporate bank statements showing commercial turnover, and valid identification of the business principals.',
    },
    {
      category: 'general',
      question: 'Can I visit your physical office in Lagos for an in-person meeting?',
      answer:
        'Absolutely. We welcome clients to our headquarters at 33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Agege/Abule Egba, Lagos, Nigeria. Our offices are open Monday through Friday, from 8:30 AM to 5:00 PM.',
    },
    {
      category: 'general',
      question: 'Are there any hidden fees or unannounced deductions?',
      answer:
        'None whatsoever. One of our foundational principles is radical transparency. Every repayment amount, schedule milestone, and advisory fee is clearly detailed in your loan schedule before commitment. We never make surprise deductions.',
    },
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#1E242B]/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#0E765E] font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0B1528] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#1E242B]/70 max-w-xl mx-auto font-light">
            Everything you need to know about our student loans, investment services, and commercial facilities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#0B1528] text-white border-[#0B1528]'
                : 'bg-white text-[#1E242B]/70 border-[#1E242B]/10 hover:border-[#1E242B]/30'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory('student')}
            className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
              activeCategory === 'student'
                ? 'bg-[#0B1528] text-white border-[#0B1528]'
                : 'bg-white text-[#1E242B]/70 border-[#1E242B]/10 hover:border-[#1E242B]/30'
            }`}
          >
            Student Loans
          </button>
          <button
            onClick={() => setActiveCategory('investment')}
            className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
              activeCategory === 'investment'
                ? 'bg-[#0B1528] text-white border-[#0B1528]'
                : 'bg-white text-[#1E242B]/70 border-[#1E242B]/10 hover:border-[#1E242B]/30'
            }`}
          >
            Investments
          </button>
          <button
            onClick={() => setActiveCategory('business')}
            className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
              activeCategory === 'business'
                ? 'bg-[#0B1528] text-white border-[#0B1528]'
                : 'bg-white text-[#1E242B]/70 border-[#1E242B]/10 hover:border-[#1E242B]/30'
            }`}
          >
            Business Financing
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-[#1E242B]/10 bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E765E]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0B1528] leading-snug">
                    {faq.question}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#1E242B]/5 flex items-center justify-center text-[#1E242B]/70 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#1E242B]/75 leading-relaxed border-t border-[#1E242B]/5 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions footer */}
        <div className="mt-12 text-center text-xs text-[#1E242B]/70">
          <span>Have an unanswered question? </span>
          <a
            href="https://wa.me/2348179171456"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0E765E] font-semibold hover:underline"
          >
            Speak directly with our advisory desk on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
