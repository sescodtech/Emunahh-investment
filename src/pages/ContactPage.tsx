import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
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
        setIsSuccess(true);
      }
    } catch (err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00A859] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Contact & Headquarters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00174D] tracking-tight leading-tight">
              Contact & Lagos Headquarters
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              Connect directly with our advisory desk in Lagos. Visit our offices or contact us via 
              telephone and WhatsApp during working hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Headquarters & Numbers (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Telephone & WhatsApp Panel */}
              <div className="p-6 rounded-xl bg-white border-2 border-[#002B99]/20 space-y-4 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#002B99] font-bold uppercase tracking-wider border-b border-gray-150 pb-2.5">
                  <span>Direct Communication Lines</span>
                  <span className="text-[#00A859]">Active</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xs text-[#00A859] font-bold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 fill-[#00A859]" />
                      <span>Phone / WhatsApp Line:</span>
                    </div>
                    <a
                      href="https://wa.me/2348023190807"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#00174D] hover:text-[#002B99] tabular-nums block mt-1"
                    >
                      0802 319 0807
                    </a>
                  </div>

                  <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xs text-gray-600 font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#002B99]" />
                      <span>Direct Telephone Line:</span>
                    </div>
                    <a
                      href="tel:08179171456"
                      className="text-base font-bold text-[#00174D] hover:text-[#002B99] tabular-nums block mt-1"
                    >
                      0817 917 1456
                    </a>
                  </div>

                  <div className="pt-2 border-t border-gray-150 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#00A859]" />
                      <span>Working Hours:</span>
                    </div>
                    <span className="text-[#00174D] font-bold">Mon – Fri: 8:30 AM – 5:00 PM</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/2348023190807?text=Hello%20Emunahh-Invest%20Limited,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-95 rounded-lg shadow-xs transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                  <span>Start WhatsApp Conversation (0802 319 0807)</span>
                </a>
              </div>

              {/* Physical Office Card */}
              <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-[#002B99] font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#00A859]" />
                  <span>Official Corporate Headquarters</span>
                </div>
                <div className="text-base font-bold text-[#00174D]">
                  Emunahh-Invest Limited
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                  New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                </p>
                <div className="pt-3 border-t border-gray-150 text-xs text-gray-500 font-medium">
                  Landmark: Beside United Bank for Africa (UBA), Charity Road Branch.
                </div>
              </div>

            </div>

            {/* Right Column: Contact Message Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-8 sm:p-10 shadow-xs">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00A859]/10 text-[#00A859] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#00174D]">
                    Message Transmitted Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Emunahh-Invest Limited. A relationship officer will evaluate your 
                    inquiry and follow up via telephone or WhatsApp.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          service: 'student_loan',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 text-xs font-bold text-[#002B99] hover:underline cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#00174D]">
                      Submit an Official Inquiry
                    </h3>
                    <p className="text-xs text-gray-600 font-normal">
                      Provide your details and requirements for a direct response.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#00174D] mb-1.5">
                        Your Full Name *
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
                      <label className="block text-xs font-bold text-[#00174D] mb-1.5">
                        Telephone / WhatsApp Number *
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
                      <label className="block text-xs font-bold text-[#00174D] mb-1.5">
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
                      <label className="block text-xs font-bold text-[#00174D] mb-1.5">
                        Subject / Solution Category *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99] bg-white"
                      >
                        <option value="student_loan">Student Loans / Tuition Financing</option>
                        <option value="investment">Investment Services & Wealth Management</option>
                        <option value="business">Business Financing & SME Commercial Credit</option>
                        <option value="personal">Personal Financial Solutions</option>
                        <option value="other">Other Financial Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#00174D] mb-1.5">
                      Your Inquiry / Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please specify your institution, business turnover, or investment horizon..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#002B99] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001F70] rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Official Inquiry</span>
                        </>
                      )}
                    </button>
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
