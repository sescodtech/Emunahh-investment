import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Scale, CheckCircle2, Phone, MessageSquare, AlertCircle, Building2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Legal & Governance</span>
              <span>/</span>
              <span>Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00174D] tracking-tight leading-tight">
              Terms of Service & Institutional Disclosures
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Official operating conditions, credit agreements, educational remittance protocols, 
              and wealth advisory terms governing all transactions with Emunahh-Invest Limited.
            </p>
            <div className="text-xs text-gray-500 pt-1">
              Effective Date: January 1, 2026 · Registered in Lagos, Federal Republic of Nigeria
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Quick Summary Card */}
          <div className="p-6 sm:p-8 rounded-xl border-2 border-[#002B99]/20 bg-white shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#002B99] uppercase tracking-wider">
              <Scale className="w-5 h-5 text-[#00A859]" />
              <span>Core Operational Standards at a Glance</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs text-gray-700">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-[#00174D] block">Institutional Remittance:</span>
                <span>All approved educational funding is paid directly to accredited schools, universities, or licensing bodies.</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-[#00174D] block">Radical Transparency:</span>
                <span>No compounding hidden charges, unexpected penalties, or unagreed administrative levies.</span>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                <span className="font-bold text-[#00174D] block">Physical Legal Entity:</span>
                <span>Fully registered Nigerian enterprise operating from 33 Crossway Plaza, New Oko Oba, Lagos.</span>
              </div>
            </div>
          </div>

          {/* Detailed Legal Sections */}
          <div className="space-y-10 text-gray-700 text-sm leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">1</span>
                <span>Corporate Identity & Scope of Authority</span>
              </h2>
              <p>
                <strong>Emunahh-Invest Limited</strong> is a registered financial and investment company incorporated 
                under the laws of the Federal Republic of Nigeria, with corporate headquarters located at 
                <strong> 33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Lagos State</strong>.
              </p>
              <p>
                By accessing our website, completing an online or physical application form, or entering into 
                a financial agreement with Emunahh-Invest Limited, you agree to be lawfully bound by these Terms of Service. 
                If you do not agree to these terms, you must refrain from utilizing our portals and services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">2</span>
                <span>Student Loans & Tuition Remittance Protocols</span>
              </h2>
              <p>
                Our specialized education financing is designed to guarantee academic continuity. 
                All student loan applicants and their co-sponsors must observe the following conditions:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                <li>
                  <strong>Direct Remittance Mandate:</strong> Approved tuition capital is disbursed directly into 
                  the designated bank account or verified Remita payment portal of the accredited Nigerian tertiary institution 
                  or professional examination body (e.g., Nigerian Law School, ICAN, ACCA). Funds are not disbursed as unverified cash to applicants.
                </li>
                <li>
                  <strong>Documentation Accuracy:</strong> Applicants must present authentic, unaltered admission letters, 
                  course registration proof, and verified fee invoices issued by the institution.
                </li>
                <li>
                  <strong>Co-Sponsorship & Guarantorship:</strong> An eligible parent, guardian, or gainfully employed sponsor 
                  must co-sign the facility agreement and provide verifiable proof of income or banking history.
                </li>
                <li>
                  <strong>Repayment Horizons:</strong> Repayments are amortized on agreed milestone dates (3, 6, 9, or 12 months) 
                  stipulated in the final offer letter. Prompt settlement ensures eligibility for subsequent academic sessions.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">3</span>
                <span>Investment & Wealth Management Terms</span>
              </h2>
              <p>
                Emunahh-Invest Limited operates a disciplined, asset-backed wealth management desk. 
                Investors, corporate treasuries, and diaspora clients are subject to strict legal covenants:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                <li>
                  <strong>Capital Preservation Philosophy:</strong> Our portfolio allocation prioritizes principal security 
                  anchored in verified real-economy commercial credit, corporate trade receivables, and collateralized assets.
                </li>
                <li>
                  <strong>Written Facility Contracts:</strong> Each fixed placement is formalized through an executed agreement 
                  specifying the agreed maturity tenure, redemption schedule, and regulatory governance.
                </li>
                <li>
                  <strong>Zero Speculative Tolerance:</strong> Emunahh-Invest does not engage in crypto trading, foreign currency 
                  gambling, high-frequency speculation, or multi-level pyramid arrangements.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">4</span>
                <span>Commercial Credit & Business Financing</span>
              </h2>
              <p>
                SME credit, merchant inventory financing, and working capital lines are underwritten on commercial cash flow:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                <li>
                  <strong>Eligibility:</strong> Commercial applicants must provide valid Corporate Affairs Commission (CAC) 
                  registration, verifiable physical operating premises in Lagos, and 6 to 12 months corporate bank statements.
                </li>
                <li>
                  <strong>Purpose of Funds:</strong> Commercial facilities must be utilized exclusively for lawful trade, 
                  inventory restocking, contract execution, or operational asset acquisition.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">5</span>
                <span>KYC Verification & Anti-Money Laundering (AML)</span>
              </h2>
              <p>
                In compliance with Nigerian regulatory statutes and global financial integrity standards:
              </p>
              <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm">
                <li>
                  We require valid national identification (NIN, Voter's Card, or International Passport) and Bank Verification Number (BVN) 
                  matching submitted applicant details.
                </li>
                <li>
                  Any suspected identity theft, document forgery, or fraudulent activity will be immediately reported to appropriate 
                  Nigerian law enforcement and financial intelligence authorities.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">6</span>
                <span>Governing Law & Dispute Resolution</span>
              </h2>
              <p>
                These Terms of Service are governed by, and construed in accordance with, the laws of the Federal Republic of Nigeria. 
                Any legal action, claim, or proceeding arising out of or relating to these terms shall be instituted in the competent 
                courts situated within Lagos State, Nigeria.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#00174D] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#002B99]/10 text-[#002B99] text-xs flex items-center justify-center font-mono">7</span>
                <span>Contact the Legal & Governance Desk</span>
              </h2>
              <p>
                For official legal inquiries, contract clarification, or compliance questions, please contact our Lagos desk:
              </p>
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                <div><strong>Emunahh-Invest Limited</strong></div>
                <div>Address: 33, Crossway Plaza, Beside UBA, 3/5 Charity Road, New Oko Oba, Lagos, Nigeria.</div>
                <div>Direct Phone Lines: 0802 319 0807 / 0817 917 1456</div>
                <div>Desk Hours: Monday through Friday, 8:30 AM – 5:00 PM (WAT)</div>
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/privacy-policy"
              className="text-xs font-bold text-[#002B99] hover:underline"
            >
              ← Review Privacy Policy
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-5 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Return to Home
              </Link>
              <Link
                to="/apply"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors shadow-xs"
              >
                Go to Application Portal
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
