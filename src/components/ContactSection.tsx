import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, ArrowUpRight, Clock } from 'lucide-react';
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
    }, 700);
  };

  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `Hello Emunahh-Invest Limited,\n\nMy Name: ${formData.name || 'Prospective Client'}\nPhone: ${formData.phone || 'N/A'}\nService: ${formData.service}\n\nMessage: ${formData.message || 'I would like to inquire about your financial services.'}`
    );
    return `https://wa.me/2348023190807?text=${text}`;
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
            Direct Communication & Advisory · Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
            Consult with Our Advisory Desk in Lagos
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Whether you have questions regarding student tuition loans, wealth investment structures, 
            or SME commercial funding, our team is accessible via phone, WhatsApp, or at our physical offices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Contact Cards & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Telephone & WhatsApp */}
            <div className="p-6 rounded-xl bg-white border-2 border-[#002B99]/20 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-[#002B99] uppercase tracking-wider">
                  Direct Telephone & WhatsApp
                </span>
                <span className="text-[10px] font-bold text-[#00A859] uppercase">Active Desk</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#00A859]/10 text-[#00A859] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Primary Helpline:</span>
                    <a
                      href="https://wa.me/2348023190807"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#00174D] hover:text-[#002B99] transition-colors tabular-nums"
                    >
                      0802 319 0807
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-[#002B99]/10 text-[#002B99] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Alternative Line:</span>
                    <a
                      href="tel:08179171456"
                      className="text-base font-bold text-[#00174D] hover:text-[#002B99] transition-colors tabular-nums"
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
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start Direct Chat on WhatsApp</span>
              </a>
            </div>

            {/* Physical Headquarters Address */}
            <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#002B99] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#00A859]" />
                <span>Physical Corporate Address</span>
              </div>
              <p className="text-sm font-semibold text-[#00174D] leading-relaxed">
                33, Crossway Plaza, Beside UBA, <br />
                Charity Road, New Oko Oba, <br />
                Agege / Abule Egba, Lagos, Nigeria.
              </p>
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#00A859]" />
                <span>Monday – Friday: 8:30 AM – 5:00 PM (WAT)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-7 sm:p-9 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#00A859]/10 text-[#00A859] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#00174D]">
                  Inquiry Received Successfully
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Emunahh-Invest Limited. An assigned investment or credit officer 
                  will review your message and contact you via telephone or WhatsApp.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
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
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#00174D]">
                    Send a Direct Inquiry
                  </h3>
                  <p className="text-xs text-gray-600">
                    Complete the fields below and an officer will respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#00174D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#00174D] mb-1">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0802 319 0807"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#00174D] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="babatunde@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#00174D] mb-1">
                      Service Category *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99] bg-white"
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
                  <label className="block text-xs font-bold text-[#00174D] mb-1">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your situation (e.g. university name, semester tuition amount, or business trade facility required)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors cursor-pointer"
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
                    className="text-xs font-bold text-[#00A859] hover:text-[#008f4c] flex items-center gap-1.5"
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
