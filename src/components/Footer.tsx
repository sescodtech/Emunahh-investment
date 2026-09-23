import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';
import { ServiceType } from '../types';

interface FooterProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply }) => {
  const { content } = useContent();
  const contact = content.contact;
  const footerData = content.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071A2B] text-white/80 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Full Address (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-block">
              <Logo variant="dark" size="lg" />
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-normal">
              {footerData.statement}
            </p>

            {/* Complete Approved Office Address */}
            <div className="space-y-3 pt-2 text-xs text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-white block">Corporate Headquarters:</span>
                  {contact.officeAddress}
                </div>
              </div>

              {/* Direct Telephone Desk */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2 max-w-sm">
                <div className="text-[10px] font-bold text-[#C6A15B] uppercase tracking-wider">
                  Approved Telephone & Advisory Desk
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#087A5A]" />
                  <span className="text-white/60">Phone / WhatsApp:</span>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#087A5A] transition-colors tabular-nums"
                  >
                    {contact.whatsapp}
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <Phone className="w-3.5 h-3.5 text-white/60" />
                  <span className="text-white/60">Alternative Desk:</span>
                  <a
                    href={`tel:${contact.secondaryPhone.replace(/[^0-9+]/g, '')}`}
                    className="font-bold text-white hover:text-[#087A5A] transition-colors tabular-nums"
                  >
                    {contact.secondaryPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Company (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Emunahh-Invest
                </Link>
              </li>
              <li>
                <a href="/#solutions" className="hover:text-white transition-colors">
                  Solutions Overview
                </a>
              </li>
              <li>
                <Link to="/student-loans" className="hover:text-white transition-colors">
                  Student Loans
                </Link>
              </li>
              <li>
                <Link to="/investments" className="hover:text-white transition-colors">
                  Investments
                </Link>
              </li>
              <li>
                <Link to="/business-financing" className="hover:text-white transition-colors">
                  Business Financing
                </Link>
              </li>
              <li>
                <Link to="/personal-finance" className="hover:text-white transition-colors">
                  Personal Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
              Resources
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/#faqs" className="hover:text-white transition-colors">
                  FAQs & Verification
                </a>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Financial Insights
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-[#087A5A] font-semibold transition-colors">
                  Online Intake Portal
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

          {/* Column 4: Contact & Hours (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-[#C6A15B] uppercase tracking-wider">
              Advisory Hours
            </div>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#087A5A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Mon – Fri:</span>
                  8:30 AM – 5:00 PM (WAT)
                </div>
              </div>
              <div className="pt-2 text-white/60">
                <span className="text-white block font-medium">Weekends & Holidays:</span>
                Digital intake open 24/7
              </div>
              <div className="pt-3">
                <Link
                  to="/admin/login"
                  className="text-[11px] font-semibold text-white/40 hover:text-white transition-colors inline-block"
                >
                  Admin Portal →
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Governance & Legal Statement */}
        <div className="pt-8 pb-6 border-b border-white/10 space-y-2.5 text-[11px] text-white/50 leading-relaxed">
          <div className="flex items-center gap-1.5 text-white/80 font-semibold uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-4 h-4 text-[#087A5A]" />
            <span>Institutional Governance & Disclosures</span>
          </div>
          <p>
            Emunahh-Invest Limited is an incorporated private limited liability financial and investment company 
            duly registered under the laws of the Federal Republic of Nigeria. All student loans and enterprise facilities 
            are subject to institutional verification, underwriting approval, and execution of formal contract terms. 
            We strictly do not operate speculative cryptocurrency schemes, unauthorized deposits, or payday lending apps.
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
              <ArrowUp className="w-3.5 h-3.5 text-[#087A5A]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
