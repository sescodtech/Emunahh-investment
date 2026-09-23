import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ServiceType } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'student_loan' as ServiceType,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `Hello Emunahh-Invest Limited,\n\nName: ${formData.name || 'Prospective Client'}\nPhone: ${formData.phone || 'N/A'}\nService: ${formData.service}\n\nMessage: ${formData.message || 'I would like to inquire about your financial services.'}`
    );
    return `https://wa.me/2348023190807?text=${text}`;
  };

  return (
    <section id="contact" className="py-16 lg:py-22 bg-white border-b border-[#071A2B]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-[11px] font-bold text-[#087A5A] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#087A5A]" />
            <span>DIRECT ADVISORY & CONSULTATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2B] tracking-[-0.03em] leading-tight">
            Consult with Our Advisory Desk in Lagos
          </h2>
          <p className="text-sm sm:text-base text-[#17202A]/75 leading-relaxed font-normal">
            Whether you have questions regarding student tuition loans, wealth investment structures, 
            or SME commercial funding, our team is accessible via phone, WhatsApp, or at our physical headquarters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Cards & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Telephone & WhatsApp */}
            <div className="p-6 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/12 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#071A2B]/8">
                <span className="text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                  Direct Telephone & WhatsApp
                </span>
                <span className="text-[10px] font-bold text-[#087A5A] uppercase">Active Desk</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#17202A]/60 block">Primary Helpline:</span>
                    <a
                      href="https://wa.me/2348023190807"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-[#071A2B] hover:text-[#087A5A] transition-colors tabular-nums"
                    >
                      0802 319 0807
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#071A2B]/8">
                  <div className="w-8 h-8 rounded-md bg-[#071A2B]/10 text-[#071A2B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#17202A]/60 block">Alternative Line:</span>
                    <a
                      href="tel:08179171456"
                      className="text-sm sm:text-base font-bold text-[#071A2B] hover:text-[#087A5A] transition-colors tabular-nums"
                    >
                      0817 917 1456
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh-Invest%20Limited,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] rounded-md transition-all shadow-2xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                <span>Start Direct Chat on WhatsApp</span>
              </a>
            </div>

            {/* Physical Headquarters Address */}
            <div className="p-6 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/12 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#087A5A]" />
                <span>Physical Corporate Address</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#071A2B] leading-relaxed">
                33, Crossway Plaza, Beside UBA, <br />
                Charity Road, New Oko Oba, <br />
                Agege / Abule Egba, Lagos, Nigeria.
              </p>
              <div className="pt-2 border-t border-[#071A2B]/8 text-xs text-[#17202A]/70 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#087A5A]" />
                <span>Monday – Friday: 8:30 AM – 5:00 PM (WAT)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-[#071A2B]/12 p-6 sm:p-8 shadow-2xs">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#071A2B]">
                  Inquiry Received Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#17202A]/75 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Emunahh-Invest Limited. An assigned investment or credit officer 
                  will review your message and contact you via telephone or WhatsApp.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] rounded-md transition-all shadow-2xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                    <span>Send via WhatsApp for Instant Response</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        service: 'student_loan',
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-[#17202A]/70 hover:text-[#071A2B] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#071A2B]">
                    Send a Direct Inquiry
                  </h3>
                  <p className="text-xs text-[#17202A]/70">
                    Complete the fields below and an officer will respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#071A2B]/15 text-xs focus:outline-hidden focus:border-[#087A5A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0802 319 0807"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#071A2B]/15 text-xs focus:outline-hidden focus:border-[#087A5A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="babatunde@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#071A2B]/15 text-xs focus:outline-hidden focus:border-[#087A5A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">
                      Service Category *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#071A2B]/15 text-xs focus:outline-hidden focus:border-[#087A5A] bg-white cursor-pointer"
                    >
                      <option value="student_loan">Student Loans / Tuition Financing</option>
                      <option value="investment">Investment Services & Wealth Management</option>
                      <option value="business">Business Financing & SME Working Capital</option>
                      <option value="personal">Personal Financial Solutions</option>
                      <option value="other">Other Financial Services & Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071A2B] mb-1">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your situation (e.g. university name, semester tuition amount, or business trade facility required)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#071A2B]/15 text-xs focus:outline-hidden focus:border-[#087A5A] resize-none"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] active:scale-[0.98] rounded-md transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Official Inquiry</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#087A5A] hover:text-[#04513E] flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Or forward details directly via WhatsApp →</span>
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
