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
    return `https://wa.me/2348179171456?text=${text}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-b border-[#1E242B]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <div className="flex items-center gap-2 text-xs text-[#00A859] font-semibold tracking-wider uppercase">
            <span>Direct Communication & Advisory</span>
            <span aria-hidden="true">·</span>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#002B99] tracking-tight leading-tight">
            Consult with Our Advisory Desk in Lagos
          </h2>
          <p className="text-base sm:text-lg text-[#1E242B]/75 leading-relaxed font-light">
            Whether you have questions regarding student tuition loans, wealth investment structures, 
            or SME commercial funding, our team is accessible via phone, WhatsApp, or at our physical offices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Cards & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Telephone & WhatsApp - Most Prominent */}
            <div className="p-6 rounded-lg bg-[#00174D] text-white space-y-5 shadow-sm border border-white/10">
              <div className="flex items-center justify-between text-xs text-[#00E676] font-medium border-b border-white/10 pb-3">
                <span className="uppercase tracking-wider font-semibold">Official Contact Numbers</span>
                <span>Active Advisory Desk</span>
              </div>

              <div className="space-y-4">
                {/* Phone / WhatsApp primary */}
                <div className="p-3.5 rounded bg-white/10 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold">
                    <MessageSquare className="w-3.5 h-3.5 fill-[#00E676]" />
                    <span>Phone / WhatsApp Line:</span>
                  </div>
                  <a
                    href="https://wa.me/2348179171456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-white hover:text-[#00E676] transition-colors tabular-nums block"
                  >
                    +234 817 917 1456
                  </a>
                  <div className="text-[11px] text-white/70">
                    Instant chat & calls during working hours
                  </div>
                </div>

                {/* Secondary Phone */}
                <div className="p-3.5 rounded bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-white/70 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-[#00E676]" />
                    <span>Phone Line 2:</span>
                  </div>
                  <a
                    href="tel:+2348141128119"
                    className="text-base font-bold text-white hover:text-[#00E676] transition-colors tabular-nums block"
                  >
                    +234 814 112 8119
                  </a>
                  <div className="text-[11px] text-white/60">
                    Direct phone consultation hotline
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00E676]" />
                    <span>Operating Hours:</span>
                  </div>
                  <span className="text-white font-medium">Mon – Fri: 8:30 AM – 5:00 PM</span>
                </div>
              </div>

              {/* Fast WhatsApp Action */}
              <div className="pt-1">
                <a
                  href="https://wa.me/2348179171456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Consultation (+234 817 917 1456)</span>
                </a>
              </div>
            </div>

            {/* Physical Address Card */}
            <div className="p-6 rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-[#002B99] font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#00A859]" />
                <span>Headquarters & Advisory Center</span>
              </div>
              <div className="text-base font-semibold text-[#002B99] leading-snug">
                Emunahh-Invest Limited
              </div>
              <p className="text-xs sm:text-sm text-[#1E242B]/80 leading-relaxed">
                33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
              </p>
              <div className="pt-2 text-xs text-[#1E242B]/70 flex items-center gap-1.5">
                <span className="font-semibold text-[#002B99]">Landmark:</span>
                <span>Directly beside United Bank for Africa (UBA), Charity Road</span>
              </div>
            </div>

            {/* Official Web Portal */}
            <div className="p-4 rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 flex items-center justify-between text-xs">
              <span className="text-[#1E242B]/60">Official Domain:</span>
              <a
                href="https://emunahhinvest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#002B99] hover:text-[#00A859] flex items-center gap-1"
              >
                <span>emunahhinvest.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FBFBF9] border border-[#1E242B]/10 rounded-lg p-6 sm:p-10 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#00A859]/10 text-[#00A859] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#002B99]">
                  Inquiry Received Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#1E242B]/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#002B99]">{formData.name}</strong>. An Emunahh-Invest advisor 
                  will review your inquiry regarding <span className="font-semibold">{formData.service.replace('_', ' ')}</span> and reach out to you promptly.
                </p>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Continue on WhatsApp Immediately</span>
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
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#1E242B]/70 hover:text-[#002B99] border border-[#1E242B]/15 rounded transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-[#002B99] mb-1">
                    Send a Message or Request Advisory
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E242B]/70">
                    Fill out this form and our client relations team will contact you within working hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeyemi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-white focus:outline-none focus:border-[#002B99] focus:ring-1 focus:ring-[#002B99]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 817 917 1456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-white focus:outline-none focus:border-[#002B99] focus:ring-1 focus:ring-[#002B99]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-white focus:outline-none focus:border-[#002B99] focus:ring-1 focus:ring-[#002B99]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                      Service of Interest *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-white focus:outline-none focus:border-[#002B99] focus:ring-1 focus:ring-[#002B99]"
                    >
                      <option value="student_loan">Student Loans / Education Financing</option>
                      <option value="investment">Investment Services</option>
                      <option value="business_financing">Business Financing & SME Credit</option>
                      <option value="personal_finance">Personal Financial Solutions</option>
                      <option value="other_services">Other Financial Services / Advisory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                    How Can We Assist You? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details on your university program, tuition deadlines, business financing requirements, or investment inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-white focus:outline-none focus:border-[#002B99] focus:ring-1 focus:ring-[#002B99]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold text-white bg-[#002B99] hover:bg-[#001f6e] rounded transition-colors disabled:opacity-50 shadow-xs"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-3.5 h-3.5 ml-2 text-[#00E676]" />
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#00A859] hover:text-[#008f4c] py-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-[#00A859]" />
                    <span>Or chat instantly on WhatsApp (+234 817 917 1456)</span>
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
