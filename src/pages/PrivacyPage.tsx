import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, EyeOff, Database, CheckCircle2, Phone, MessageSquare } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F8F7F3] border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#087A5A] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Legal & Governance</span>
              <span>/</span>
              <span>Privacy Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
              Privacy Policy & Data Protection
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              How Emunahh-Invest Limited collects, verifies, and safeguards the personal and financial data 
              of Nigerian students, sponsors, investors, and business clients.
            </p>
            <div className="text-xs text-gray-500 pt-1">
              Compliant with the Nigeria Data Protection Act (NDPA) and NDPR Guidelines
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Privacy Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-2.5 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
              <Lock className="w-6 h-6 text-[#087A5A]" />
              <h3 className="text-sm font-bold text-[#071A2B]">Strict Confidentiality</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We never sell, monetize, or disclose your financial records, bank statements, or identification to third-party marketers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-2.5 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
              <Database className="w-6 h-6 text-[#087A5A]" />
              <h3 className="text-sm font-bold text-[#071A2B]">Underwriting Security</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Submitted documents are utilized exclusively by our credit verification committee to evaluate tuition and credit facilities.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-2.5 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
              <EyeOff className="w-6 h-6 text-[#087A5A]" />
              <h3 className="text-sm font-bold text-[#071A2B]">Zero Public Harassment</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We do not access or contact your phone address book, social contacts, or employers outside agreed guarantorship channels.
              </p>
            </div>
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-10 text-gray-700 text-sm leading-relaxed">
            
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#071A2B]">1. Information We Collect</h2>
              <p>
                To provide responsible financing, tuition disbursements, and wealth management, Emunahh-Invest Limited collects:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                <li>
                  <strong>Personal Identification:</strong> Full legal name, date of birth, National Identity Number (NIN), 
                  Bank Verification Number (BVN), physical residence address, telephone number, and email.
                </li>
                <li>
                  <strong>Academic Credentials (for Student Loans):</strong> Admission letters, matriculation number, 
                  course of study, semester fee invoices, Remita RRR codes, and institution bank accounts.
                </li>
                <li>
                  <strong>Financial & Commercial Records:</strong> Bank statements, proof of lawful earnings, 
                  CAC certificates, tax records, and commercial inventory details.
                </li>
              </ul>
            </div>

            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#071A2B]">2. How Your Data Is Used</h2>
              <p>Your information is used strictly to:</p>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                <li>Verify matriculation status with Nigerian tertiary institutions and professional boards.</li>
                <li>Conduct lawful credit underwriting and sponsor affordability assessment.</li>
                <li>Directly disburse approved tuition fees to designated university bank accounts.</li>
                <li>Execute binding legal contracts and provide quarterly wealth advisory reports.</li>
                <li>Fulfill Nigerian statutory reporting obligations regarding anti-money laundering.</li>
              </ul>
            </div>

            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#071A2B]">3. Data Retention & Protection</h2>
              <p>
                All electronic and physical documents are protected by encrypted storage and strict access controls. 
                Only authorized compliance officers and relationship managers at our Lagos headquarters have access to applicant dossiers. 
                Data is retained only as long as required by Nigerian financial regulatory statutes.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#071A2B]">4. Inquiries & Data Privacy Officer</h2>
              <p>
                If you have questions about your personal data or wish to exercise your rights under the Nigeria Data Protection Act, 
                please contact:
              </p>
              <div className="p-5 rounded-xl bg-[#F8F7F3] border border-gray-200 space-y-2 text-xs">
                <div><strong>Data Protection Officer, Emunahh-Invest Limited</strong></div>
                <div>Office: 33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba, Lagos, Nigeria.</div>
                <div>Helpline: 0802 319 0807 / 0817 917 1456</div>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/terms"
              className="text-xs font-bold text-[#087A5A] hover:underline"
            >
              ← Review Terms of Service
            </Link>

            <Link
              to="/"
              className="px-5 py-2.5 text-xs font-bold text-[#071A2B] bg-[#F8F7F3] border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Return to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
