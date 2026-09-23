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
    <footer className="bg-[#071A2B] text-white/75 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Full Corporate Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block">
              <Logo variant="dark" size="lg" />
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-light">
              Emunahh-Invest Limited is a registered Nigerian financial and investment company. 
              We provide dependable student loans, disciplined wealth solutions, and commercial 
              business financing in Lagos, Nigeria.
            </p>

            {/* Complete Physical Address & Landmark */}
            <div className="space-y-3 pt-2 text-xs text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-white block">Corporate Headquarters:</span>
                  33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                  New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                </div>
              </div>

              {/* Exact Phone Numbers */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-[11px] font-bold text-[#C6A15B] uppercase tracking-wider">
                  Direct Telephone Desk
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#087A5A]" />
                  <span className="text-white/60">Phone / WhatsApp:</span>
                  <a
                    href="https://wa.me/2348179171456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#C6A15B] transition-colors tabular-nums"
                  >
                    +234 817 917 1456
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <Phone className="w-3.5 h-3.5 text-white/60" />
                  <span className="text-white/60">Alternative Desk:</span>
                  <a
                    href="tel:+2348141128119"
                    className="font-bold text-white hover:text-[#C6A15B] transition-colors tabular-nums"
                  >
                    +234 814 112 8119
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
                <Link to="/apply" className="hover:text-[#C6A15B] font-semibold transition-colors block pt-1">
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
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors text-[#087A5A] font-semibold">
                  Resources & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-white transition-colors">
                  Track Application
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Direct WhatsApp (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Working Hours
            </div>
            <div className="text-xs space-y-1 text-white/70">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#087A5A]" />
                <span className="font-semibold text-white">Mon – Fri</span>
              </div>
              <div className="text-white/80">8:30 AM – 5:00 PM (WAT)</div>
              <div className="pt-2 text-[11px] text-white/50">
                Closed on Saturdays, Sundays, & Statutory Public Holidays.
              </div>
            </div>

            <div className="pt-3">
              <a
                href="https://wa.me/2348179171456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Regulatory Disclosure */}
        <div className="py-6 border-b border-white/10 text-[11px] leading-relaxed text-white/50 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-white/70">
            <ShieldCheck className="w-3.5 h-3.5 text-[#087A5A]" />
            <span>Institutional Notice & Governance</span>
          </div>
          <p>
            Emunahh-Invest Limited is a registered Nigerian financial and investment company. All financing facilities, 
            including student loans, commercial credit, and personal solutions, are formalized through executed legal contracts 
            with clear milestone obligations. Tuition disbursements are remitted directly to accredited tertiary institutions 
            against verified institutional invoices to guarantee academic matriculation.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Emunahh-Invest Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://emunahhinvest.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              emunahhinvest.com
            </a>
            <span className="text-white/20">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
