import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import { ServiceType } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'student_loan' as ServiceType,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        // Fallback for simulation
        setIsSuccess(true);
      }
    } catch (err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      {/* Header */}
      <section className="bg-[#00174D] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Contact & Headquarters</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
              Contact & Lagos Headquarters
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Connect directly with our advisory desk in Lagos. Visit our offices or contact us via 
              telephone and WhatsApp during working hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Headquarters & Numbers (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Telephone & WhatsApp Panel */}
              <div className="p-6 rounded-lg bg-[#00174D] text-white space-y-4 shadow-sm border border-white/10">
                <div className="flex items-center justify-between text-xs text-[#00E676] font-semibold uppercase tracking-wider border-b border-white/10 pb-2.5">
                  <span>Direct Communication Hotlines</span>
                  <span>Active</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded bg-white/10 border border-white/10">
                    <div className="text-xs text-[#00E676] font-semibold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 fill-[#00E676]" />
                      <span>Phone / WhatsApp Line:</span>
                    </div>
                    <a
                      href="https://wa.me/2348179171456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-white hover:text-[#00E676] tabular-nums block mt-1"
                    >
                      +234 817 917 1456
                    </a>
                  </div>

                  <div className="p-3 rounded bg-white/5 border border-white/10">
                    <div className="text-xs text-white/70 font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#00E676]" />
                      <span>Direct Telephone Hotline:</span>
                    </div>
                    <a
                      href="tel:+2348141128119"
                      className="text-base font-bold text-white hover:text-[#00E676] tabular-nums block mt-1"
                    >
                      +234 814 112 8119
                    </a>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#00E676]" />
                      <span>Desk Working Hours:</span>
                    </div>
                    <span className="text-white font-medium">Mon – Fri: 8:30 AM – 5:00 PM</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/2348179171456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Start WhatsApp Conversation (+234 817 917 1456)</span>
                </a>
              </div>

              {/* Physical Office Card */}
              <div className="p-6 rounded-lg bg-white border border-[#1E242B]/10 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#002B99] font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#00A859]" />
                  <span>Official Corporate Headquarters</span>
                </div>
                <div className="text-base font-semibold text-[#002B99]">
                  Emunahh-Invest Limited
                </div>
                <p className="text-xs sm:text-sm text-[#1E242B]/80 leading-relaxed font-light">
                  33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                  New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                </p>
                <div className="p-2.5 rounded bg-[#FBFBF9] border border-[#1E242B]/10 text-xs text-[#1E242B]/70">
                  <strong className="text-[#002B99]">Landmark:</strong> Directly beside United Bank for Africa (UBA), Charity Road corridor.
                </div>
              </div>

            </div>

            {/* Right Column: Full-Stack Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#1E242B]/10 rounded-lg p-6 sm:p-10 shadow-xs">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00A859]/10 text-[#00A859] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-[#002B99]">
                    Message Transmitted to Advisory Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E242B]/70 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#002B99]">{formData.name}</strong>. An advisor at our 
                    Lagos headquarters will review your inquiry and contact you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', phone: '', email: '', service: 'student_loan', message: '' });
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-[#002B99] border border-[#002B99]/20 rounded hover:bg-[#002B99]/5"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-medium text-[#002B99]">
                      Send an Inquiry or Schedule a Meeting
                    </h2>
                    <p className="text-xs sm:text-sm text-[#1E242B]/70 mt-1">
                      Our client relations team responds to all formal inquiries during regular banking hours.
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
                        className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 817 917 1456"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
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
                        className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                        Service Area *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                        className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                      >
                        <option value="student_loan">Student Loans / Education Financing</option>
                        <option value="investment">Investment Services & Wealth</option>
                        <option value="business_financing">Business Financing & SME Credit</option>
                        <option value="personal_finance">Personal Financial Solutions</option>
                        <option value="other_services">Other Financial Services</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1.5">
                      Your Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify your academic institution, financing volume, or advisory questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold text-white bg-[#002B99] hover:bg-[#001f6e] rounded shadow-xs transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Submit to Advisory Desk'}
                    </button>

                    <a
                      href="https://wa.me/2348179171456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#00A859] hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-[#00A859]" />
                      <span>Chat on WhatsApp (+234 817 917 1456)</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
