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
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  // Auto-prompt subtle indicator after 4 seconds to catch attention without being annoying
  useEffect(() => {
    const timer = setTimeout(() => {
      // Keep badge active
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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* POPUP ADVISORY CARD */}
      {isOpen && (
        <div 
          className="mb-3 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-[#1E293B]"
          role="dialog"
          aria-label="Official WhatsApp Advisory Desk"
        >
          {/* Executive Header in Brand Deep Navy */}
          <div className="bg-[#00174D] p-4 sm:p-5 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat window"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              {/* WhatsApp Emblem */}
              <div className="relative w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shadow-md shrink-0">
                <WhatsAppIcon className="w-6 h-6 fill-white" />
                {/* Active Indicator */}
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#00174D]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight text-white">Emunahh-Invest Desk</h3>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#00A859]/20 text-[#00A859] border border-[#00A859]/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Official</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Replies within 5 minutes</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/75 mt-3 leading-relaxed">
              Direct connection with our Lagos advisory and loan verification officers. Select your inquiry below:
            </p>
          </div>

          {/* Department Selection Items */}
          <div className="p-3 sm:p-4 space-y-2 max-h-[300px] overflow-y-auto bg-gray-50/50">
            {departmentOptions.map((dept) => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => handleOpenDepartment(dept.text)}
                  className="w-full text-left p-3 rounded-xl bg-white border border-gray-200/90 hover:border-[#002B99]/40 hover:bg-blue-50/30 transition-all flex items-start gap-3 group cursor-pointer shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#002B99]/5 text-[#002B99] flex items-center justify-center shrink-0 group-hover:bg-[#002B99] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#00174D] group-hover:text-[#002B99] flex items-center justify-between">
                      <span>{dept.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#002B99] transition-colors" />
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
          <div className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center justify-between text-xs">
            <div className="text-[11px] text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>Desk: Mon–Fri, 8:30am–5pm</span>
            </div>

            <a
              href="https://wa.me/2348023190807?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#00A859] font-bold text-xs hover:underline"
            >
              <span>Direct Chat (0802 319 0807)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

      {/* SHARP, SMART FLOATING TRIGGER BUTTON */}
      <div className="relative group">
        
        {/* Subtle Tooltip for First-Time Visitors (Hidden when open) */}
        {!isOpen && showNotificationBadge && (
          <div className="hidden sm:flex items-center gap-2 absolute right-full mr-3 bottom-1/2 translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#00174D] text-white text-xs font-medium whitespace-nowrap shadow-lg border border-white/10 pointer-events-none transition-opacity">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Chat with Lagos Advisory Desk</span>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#00174D] rotate-45" />
          </div>
        )}

        {/* The Trigger: An executive pill on desktop / crisp branded circle on mobile */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotificationBadge(false);
          }}
          className={`relative flex items-center gap-2.5 p-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-xl hover:shadow-2xl focus:outline-none focus:ring-3 focus:ring-[#002B99]/30 active:scale-95 ${
            isOpen
              ? 'bg-[#00174D] text-white border-2 border-white/20'
              : 'bg-white text-[#00174D] border border-gray-200/90 hover:border-[#002B99]/50'
          }`}
          aria-expanded={isOpen}
          aria-label="Toggle WhatsApp Advisory Desk"
        >
          {/* WhatsApp Crisp Vector Emblem */}
          <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <WhatsAppIcon className="w-5 h-5 fill-white" />
          </div>

          {/* Desktop Executive Label */}
          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className={`text-xs font-bold leading-tight ${isOpen ? 'text-white' : 'text-[#00174D]'}`}>
              {isOpen ? 'Close Advisory Menu' : 'WhatsApp Advisory'}
            </span>
            <span className="text-[10px] text-[#00A859] font-semibold flex items-center gap-1 leading-tight mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse" />
              <span>Lagos Desk · Online</span>
            </span>
          </div>

          {/* Dropdown Indicator / Close Icon */}
          <div className="hidden sm:block text-gray-400">
            {isOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#002B99] transition-transform group-hover:translate-y-0.5" />
            )}
          </div>

          {/* Mobile Active Pulse Badge */}
          <span className="sm:hidden absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
        </button>

      </div>

    </div>
  );
};
