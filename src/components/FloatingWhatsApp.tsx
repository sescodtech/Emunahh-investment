import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  GraduationCap, 
  TrendingUp, 
  Briefcase, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Keep badge active for attention
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const departmentOptions = [
    {
      id: 'student_loans',
      icon: GraduationCap,
      label: 'Student Loans & Tuition',
      desc: 'Tuition remittance & university fee financing',
      text: 'Hello Emunahh-Invest, I would like to inquire about Student Loan Tuition Remittance.',
    },
    {
      id: 'investments',
      icon: TrendingUp,
      label: 'Wealth & Fixed Placements',
      desc: 'Capital preservation & wealth advisory',
      text: 'Hello Emunahh-Invest, I would like to inquire about Fixed Placements and Wealth Advisory.',
    },
    {
      id: 'commercial',
      icon: Briefcase,
      label: 'Commercial & SME Credit',
      desc: 'Working capital & inventory restocking',
      text: 'Hello Emunahh-Invest, I would like to apply for a Commercial SME Credit Facility.',
    },
    {
      id: 'general',
      icon: HelpCircle,
      label: 'General Inquiries & Support',
      desc: 'Speak with a Lagos relationship manager',
      text: 'Hello Emunahh-Invest, I would like to speak with an Advisory Manager regarding your services.',
    },
  ];

  const handleOpenDepartment = (text: string) => {
    const url = `https://wa.me/2348023190807?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* POPUP ADVISORY CARD */}
      {isOpen && (
        <div 
          className="mb-3 w-[320px] sm:w-[360px] bg-white rounded-xl shadow-2xl border border-[#071A2B]/15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-[#17202A]"
          role="dialog"
          aria-label="Official WhatsApp Advisory Desk"
        >
          {/* Executive Header in Brand Deep Navy */}
          <div className="bg-[#071A2B] p-4 sm:p-5 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              {/* WhatsApp Emblem */}
              <div className="relative w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center shadow-md shrink-0">
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#071A2B]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight text-white">Emunahh-Invest Desk</h3>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#087A5A]/30 text-[#C6A15B] border border-[#C6A15B]/30">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span>Official</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Lagos Advisory Desk</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/75 mt-2.5 leading-relaxed">
              Direct connection with our Lagos advisory and loan verification officers. Select your inquiry below:
            </p>
          </div>

          {/* Department Selection Items */}
          <div className="p-3 sm:p-4 space-y-2 max-h-[280px] overflow-y-auto bg-gray-50/60">
            {departmentOptions.map((dept) => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => handleOpenDepartment(dept.text)}
                  className="w-full text-left p-2.5 sm:p-3 rounded-lg bg-white border border-[#071A2B]/10 hover:border-[#087A5A]/50 hover:bg-[#F8F7F3] transition-all flex items-start gap-2.5 group cursor-pointer shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-md bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center shrink-0 group-hover:bg-[#071A2B] group-hover:text-white transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#071A2B] group-hover:text-[#087A5A] flex items-center justify-between">
                      <span>{dept.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#087A5A] transition-colors" />
                    </div>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {dept.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs">
            <div className="text-[10px] text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>Desk: Mon–Fri, 8:30am–5pm</span>
            </div>

            <a
              href="https://wa.me/2348023190807?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#087A5A] font-bold text-xs hover:underline"
            >
              <span>Direct Chat</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

      {/* SHARP, SMART FLOATING TRIGGER BUTTON */}
      <div className="relative group">
        
        {/* Subtle Tooltip for Visitors (Hidden when open) */}
        {!isOpen && showNotificationBadge && (
          <div className="hidden sm:flex items-center gap-2 absolute right-full mr-3 bottom-1/2 translate-y-1/2 px-3 py-1.5 rounded-md bg-[#071A2B] text-white text-xs font-medium whitespace-nowrap shadow-lg border border-white/10 pointer-events-none transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A] animate-pulse" />
            <span>Chat with Lagos Advisory Desk</span>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#071A2B] rotate-45" />
          </div>
        )}

        {/* Trigger Button: Pill on desktop / branded circle on mobile */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotificationBadge(false);
          }}
          className={`relative flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl focus:outline-hidden active:scale-95 ${
            isOpen
              ? 'bg-[#071A2B] text-white border border-[#C6A15B]/50'
              : 'bg-white text-[#071A2B] border border-[#071A2B]/15 hover:border-[#087A5A]/50'
          }`}
          aria-expanded={isOpen}
          aria-label="Toggle WhatsApp Advisory Desk"
        >
          {/* WhatsApp Crisp Vector Emblem */}
          <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
            <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-white" />
          </div>

          {/* Desktop Executive Label */}
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className={`text-xs font-bold leading-tight ${isOpen ? 'text-white' : 'text-[#071A2B]'}`}>
              {isOpen ? 'Close Advisory' : 'WhatsApp Advisory'}
            </span>
            <span className="text-[10px] text-[#087A5A] font-semibold flex items-center gap-1 leading-tight mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A] animate-pulse" />
              <span>Lagos Desk · Online</span>
            </span>
          </div>

          {/* Chevron Indicator */}
          <div className="hidden sm:block text-gray-400">
            {isOpen ? (
              <X className="w-3.5 h-3.5 text-white" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#087A5A] transition-transform group-hover:translate-y-0.5" />
            )}
          </div>

          {/* Mobile Active Pulse Badge */}
          <span className="sm:hidden absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
        </button>

      </div>

    </div>
  );
};
