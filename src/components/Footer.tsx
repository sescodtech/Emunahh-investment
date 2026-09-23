import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { ServiceType } from '../types';

interface FooterProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#00174D] text-white/80 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Full Corporate Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <Logo variant="dark" size="lg" />
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-normal">
              Emunahh-Invest Limited is a registered Nigerian financial and investment company. 
              We provide dependable student loans, disciplined wealth solutions, and commercial 
              business financing in Lagos, Nigeria.
            </p>

            {/* Complete Physical Address & Landmark */}
            <div className="space-y-3 pt-2 text-xs text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-white block">Corporate Headquarters:</span>
                  33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                  New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                </div>
              </div>

              {/* Exact Phone Numbers */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-[11px] font-bold text-[#00E676] uppercase tracking-wider">
                  Direct Telephone Desk
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#00A859]" />
                  <span className="text-white/60">Phone / WhatsApp:</span>
                  <a
                    href="https://wa.me/2348023190807"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#00E676] transition-colors tabular-nums"
                  >
                    0802 319 0807
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <Phone className="w-3.5 h-3.5 text-white/60" />
                  <span className="text-white/60">Alternative Desk:</span>
                  <a
                    href="tel:08179171456"
                    className="font-bold text-white hover:text-[#00E676] transition-colors tabular-nums"
                  >
                    0817 917 1456
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Core Financial Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Core Services
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/student-loans" className="hover:text-white transition-colors">
                  Student Loans / Education Financing
                </Link>
              </li>
              <li>
                <Link to="/investments" className="hover:text-white transition-colors">
                  Investment Services & Wealth Management
                </Link>
              </li>
              <li>
                <Link to="/business-financing" className="hover:text-white transition-colors">
                  Business Financing & Commercial Credit
                </Link>
              </li>
              <li>
                <Link to="/personal-finance" className="hover:text-white transition-colors">
                  Personal Financial Solutions
                </Link>
              </li>
              <li>
                <Link to="/other-services" className="hover:text-white transition-colors">
                  Other Financial Services & Advisory
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-[#00E676] font-semibold transition-colors block pt-1">
                  Online Application Portal →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate & Media Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Emunahh-Invest
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Financial Insights & News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Headquarters & Hours
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & In-Person Walk-In (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Working Hours
            </div>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00A859] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Mon – Fri:</span>
                  8:30 AM – 5:00 PM
                </div>
              </div>
              <div className="pt-2">
                <span className="text-white block font-medium">Weekends & Public Holidays:</span>
                Closed for in-person advisory (digital intake open)
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Governance & Legal Statement */}
        <div className="pt-8 pb-6 border-b border-white/10 space-y-3 text-[11px] text-white/50 leading-relaxed">
          <div className="flex items-center gap-1.5 text-white/80 font-semibold uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-4 h-4 text-[#00A859]" />
            <span>Institutional Governance & Disclosures</span>
          </div>
          <p>
            Emunahh-Invest Limited is an incorporated private limited liability financial and investment enterprise 
            duly registered under the laws of the Federal Republic of Nigeria. We are committed to ethical credit, 
            capital protection, and transparent institutional transactions. All student loans and enterprise credit facilities 
            are subject to identity verification, underwriting approval, and execution of formal contract terms. 
            We do not operate speculative cryptocurrency schemes, pyramid structures, or unauthorized deposit schemes.
          </p>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Emunahh-Invest Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#00A859]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
