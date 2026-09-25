import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, ArrowUpRight, GraduationCap, Building2, TrendingUp } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ServiceType } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ServiceType;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'student_loan',
}) => {
  const [service, setService] = useState<ServiceType>(defaultService);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    amount: '',
    institutionOrBusiness: '',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appReference, setAppReference] = useState('');

  useEffect(() => {
    if (defaultService) {
      setService(defaultService);
    }
  }, [defaultService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `EMU-${Math.floor(100000 + Math.random() * 900000)}`;
    setAppReference(ref);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const getServiceLabel = (type: ServiceType) => {
    switch (type) {
      case 'student_loan':
        return 'Student Loan / Education Financing';
      case 'investment':
        return 'Investment & Wealth Management';
      case 'business_financing':
        return 'Business Financing & SME Credit';
      case 'personal_finance':
        return 'Personal Financial Solution';
      case 'other_services':
        return 'Specialized Financial Advisory';
    }
  };

  const getWhatsAppContinuationUrl = () => {
    const message = encodeURIComponent(
      `Hello Emunahh-Invest Limited,\n\nI have submitted an application via your official portal.\n\n*Reference:* ${appReference}\n*Service:* ${getServiceLabel(service)}\n*Applicant:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Amount Requested:* ${formData.amount || 'To discuss'}\n*Institution/Business:* ${formData.institutionOrBusiness || 'N/A'}\n\nPlease advise on the next verification steps.`
    );
    return `https://wa.me/2348023190807?text=${message}`;
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      amount: '',
      institutionOrBusiness: '',
      details: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#071A2B] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#087A5A] flex items-center justify-center text-white text-sm font-bold shadow-xs">
              E
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">EMUNAHH-INVEST LIMITED</div>
              <div className="text-[10px] text-gray-300">Official Financing & Advisory Application</div>
            </div>
          </div>

          <button
            onClick={handleReset}
            aria-label="Close dialog"
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 bg-white">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#087A5A] tracking-wider uppercase">
                  Application Initiated
                </span>
                <h3 className="text-2xl font-bold text-[#071A2B] mt-1">
                  Thank You, {formData.fullName}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F7F3] border border-gray-200 max-w-md mx-auto text-xs space-y-2 text-gray-700 text-left">
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500">Application Reference:</span>
                  <span className="font-mono font-bold text-[#087A5A]">{appReference}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500">Selected Solution:</span>
                  <span className="font-bold text-[#071A2B]">{getServiceLabel(service)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Review Center:</span>
                  <span className="text-[#071A2B]">33 Crossway Plaza, New Oko Oba, Lagos</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
                Your application details have been recorded. To accelerate document review and receive 
                immediate guidance from our Lagos advisory team, continue directly on WhatsApp.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppContinuationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] active:scale-95 rounded-lg transition-all shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                  <span>Fast-Track on WhatsApp (0802 319 0807)</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#071A2B]">
                  Submit Financing or Advisory Request
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Complete this preliminary form. An advisor will contact you to verify documentation.
                </p>
              </div>

              {/* Service Selection Tabs */}
              <div>
                <label className="block text-xs font-bold text-[#071A2B] mb-1.5">
                  Select Financial Service *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'student_loan' as ServiceType, label: 'Student Loan', icon: GraduationCap },
                    { id: 'investment' as ServiceType, label: 'Investment', icon: TrendingUp },
                    { id: 'business_financing' as ServiceType, label: 'Business Credit', icon: Building2 },
                    { id: 'personal_finance' as ServiceType, label: 'Personal Solution' },
                    { id: 'other_services' as ServiceType, label: 'Other Advisory' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setService(item.id)}
                      className={`p-2.5 text-xs font-bold rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        service === item.id
                          ? 'bg-[#071A2B] text-white border-[#071A2B]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {service === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#071A2B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First & Last Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#087A5A] focus:ring-1 focus:ring-[#087A5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071A2B] mb-1">
                    Phone Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0802 319 0807"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#087A5A] focus:ring-1 focus:ring-[#087A5A]"
                  />
                </div>
              </div>

              {/* Amount & Academic/Business name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#071A2B] mb-1">
                    {service === 'student_loan' ? 'Tuition Amount (₦)' : 'Requested Capital (₦)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₦400,000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#087A5A] focus:ring-1 focus:ring-[#087A5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071A2B] mb-1">
                    {service === 'student_loan'
                      ? 'Academic Institution'
                      : 'Business Name / Sector'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      service === 'student_loan'
                        ? 'e.g. UNILAG, LASU, ICAN'
                        : 'e.g. Adeyemi Commercials'
                    }
                    value={formData.institutionOrBusiness}
                    onChange={(e) =>
                      setFormData({ ...formData, institutionOrBusiness: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#087A5A] focus:ring-1 focus:ring-[#087A5A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071A2B] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#087A5A] focus:ring-1 focus:ring-[#087A5A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071A2B] mb-1">
                  Additional Notes or Timing Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Tuition payment deadline is next Friday; or business inventory order..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#087A5A] focus:ring-1 focus:ring-[#087A5A] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-150">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 text-[#C6A15B]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
