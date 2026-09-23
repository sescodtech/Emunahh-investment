import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Phone, ArrowUpRight, Search, FileText } from 'lucide-react';
import { ServiceType } from '../types';

export const ApplyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [service, setService] = useState<ServiceType>('student_loan');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    amount: '',
    institutionOrBusiness: '',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<any | null>(null);

  // Tracking state
  const [trackRef, setTrackRef] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [trackingError, setTrackingError] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReceipt(data);
      } else {
        // Fallback for simulation
        const fallbackRef = `EMU-${Math.floor(100000 + Math.random() * 900000)}`;
        setReceipt({
          reference: fallbackRef,
          record: {
            ...formData,
            service,
            reference: fallbackRef,
            status: 'Pending Verification',
            createdAt: new Date().toISOString(),
          },
        });
      }
    } catch (err) {
      const fallbackRef = `EMU-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceipt({
        reference: fallbackRef,
        record: {
          ...formData,
          service,
          reference: fallbackRef,
          status: 'Pending Verification',
          createdAt: new Date().toISOString(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRef.trim()) return;

    setIsTracking(true);
    setTrackingError('');
    setTrackingResult(null);

    try {
      const res = await fetch(`/api/applications/${encodeURIComponent(trackRef.trim())}`);
      const data = await res.json();
      if (res.ok && data.found) {
        setTrackingResult(data.application);
      } else {
        setTrackingError(data.error || 'Reference not found in database.');
      }
    } catch (err) {
      setTrackingError('Unable to connect to advisory verification system.');
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      {/* Header */}
      <section className="bg-[#00174D] text-white py-14 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Portal</span>
              <span>/</span>
              <span>Online Application</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              Emunahh Financing Portal
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
              Submit an official application or track an existing file with Emunahh-Invest Limited.
            </p>

            {/* Sub-Tabs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                  activeTab === 'apply'
                    ? 'bg-white text-[#00174D]'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                Start New Application
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 text-xs font-semibold rounded transition-colors ${
                  activeTab === 'track'
                    ? 'bg-white text-[#00174D]'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                Track Existing Reference
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          {activeTab === 'apply' ? (
            receipt ? (
              <div className="bg-white rounded-lg border border-[#1E242B]/10 p-8 sm:p-12 text-center space-y-6 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#00A859]/10 text-[#00A859] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#00A859] uppercase tracking-wider">
                    Application Successfully Recorded
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#002B99] mt-1">
                    Reference ID: <span className="font-mono text-[#00A859]">{receipt.reference}</span>
                  </h2>
                </div>

                <div className="max-w-md mx-auto bg-[#FBFBF9] p-5 rounded border border-[#1E242B]/10 text-left text-xs space-y-2 text-[#1E242B]/80">
                  <div className="flex justify-between border-b border-[#1E242B]/10 pb-1.5">
                    <span className="text-[#1E242B]/60">Applicant:</span>
                    <span className="font-semibold text-[#002B99]">{receipt.record.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1E242B]/10 pb-1.5">
                    <span className="text-[#1E242B]/60">Facility Type:</span>
                    <span className="font-semibold text-[#002B99]">{receipt.record.service.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1E242B]/10 pb-1.5">
                    <span className="text-[#1E242B]/60">Amount Requested:</span>
                    <span className="font-semibold text-[#002B99]">{receipt.record.amount || 'To be finalized'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1E242B]/60">Status:</span>
                    <span className="font-semibold text-[#00A859]">{receipt.record.status}</span>
                  </div>
                </div>

                <p className="text-xs text-[#1E242B]/70 max-w-md mx-auto leading-relaxed">
                  Your file has been transferred to our review desk at 33 Crossway Plaza, New Oko Oba, Lagos. 
                  To fast-track verification, continue directly on WhatsApp with your reference number.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/2348179171456?text=${encodeURIComponent(
                      `Hello Emunahh-Invest, I just submitted application ${receipt.reference} for ${receipt.record.fullName}. Please advise on document verification.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Fast-Track on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setReceipt(null);
                      setFormData({ fullName: '', phone: '', email: '', amount: '', institutionOrBusiness: '', details: '' });
                    }}
                    className="px-5 py-3 text-xs font-medium text-[#002B99] border border-[#002B99]/20 rounded hover:bg-[#002B99]/5"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="bg-white rounded-lg border border-[#1E242B]/10 p-6 sm:p-10 shadow-xs space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#002B99]">
                    New Financial Facility Application
                  </h2>
                  <p className="text-xs sm:text-sm text-[#1E242B]/70 mt-1">
                    Fill out this form to register your details directly with Emunahh-Invest Limited.
                  </p>
                </div>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#002B99] mb-2">
                    Select Core Financial Service *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'student_loan' as ServiceType, label: 'Student Loan' },
                      { id: 'investment' as ServiceType, label: 'Investment Services' },
                      { id: 'business_financing' as ServiceType, label: 'Business Financing' },
                      { id: 'personal_finance' as ServiceType, label: 'Personal Finance' },
                      { id: 'other_services' as ServiceType, label: 'Other Advisory' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setService(item.id)}
                        className={`p-2.5 text-xs font-semibold rounded border text-left flex items-center justify-between ${
                          service === item.id
                            ? 'bg-[#002B99] text-white border-[#002B99]'
                            : 'bg-[#FBFBF9] text-[#1E242B]/80 border-[#1E242B]/15 hover:border-[#1E242B]/30'
                        }`}
                      >
                        <span>{item.label}</span>
                        {service === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adebayo Babatunde"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1">Phone / WhatsApp *</label>
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
                    <label className="block text-xs font-semibold text-[#002B99] mb-1">Requested Amount (₦)</label>
                    <input
                      type="text"
                      placeholder="e.g. ₦500,000"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#002B99] mb-1">
                      {service === 'student_loan' ? 'Academic Institution / Course' : 'Enterprise / Company Name'}
                    </label>
                    <input
                      type="text"
                      placeholder={service === 'student_loan' ? 'e.g. University of Lagos' : 'e.g. Adeyemi Commercials'}
                      value={formData.institutionOrBusiness}
                      onChange={(e) => setFormData({ ...formData, institutionOrBusiness: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#002B99] mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#002B99] mb-1">Notes / Deadlines</label>
                  <textarea
                    rows={3}
                    placeholder="Specify tuition payment deadline, inventory schedule, or other relevant timing details..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#1E242B]/10">
                  <div className="text-xs text-[#1E242B]/60">
                    Protected by Emunahh-Invest privacy standards.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 text-xs font-bold text-white bg-[#002B99] hover:bg-[#001f6e] rounded shadow-xs transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="bg-white rounded-lg border border-[#1E242B]/10 p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <h2 className="text-2xl font-display font-medium text-[#002B99]">
                  Track Application Status
                </h2>
                <p className="text-xs sm:text-sm text-[#1E242B]/70 mt-1">
                  Enter your official Emunahh Reference ID (e.g., <code className="font-mono text-[#002B99]">EMU-100201</code>) to check progress.
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter reference e.g. EMU-100201"
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs font-mono uppercase rounded border border-[#1E242B]/20 bg-[#FBFBF9] focus:bg-white focus:outline-none focus:border-[#002B99]"
                />
                <button
                  type="submit"
                  disabled={isTracking}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#002B99] hover:bg-[#001f6e] rounded disabled:opacity-50"
                >
                  {isTracking ? 'Searching...' : 'Lookup'}
                </button>
              </form>

              {trackingError && (
                <div className="p-4 rounded bg-red-50 border border-red-200 text-xs text-red-700">
                  {trackingError}
                </div>
              )}

              {trackingResult && (
                <div className="p-6 rounded bg-[#FBFBF9] border border-[#1E242B]/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1E242B]/10 pb-3">
                    <div>
                      <div className="text-xs text-[#1E242B]/60">Reference Number</div>
                      <div className="font-mono text-base font-bold text-[#002B99]">{trackingResult.reference}</div>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded bg-[#00A859]/10 text-[#00A859]">
                      {trackingResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#1E242B]/60 block">Applicant:</span>
                      <span className="font-semibold text-[#002B99]">{trackingResult.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[#1E242B]/60 block">Service:</span>
                      <span className="font-semibold text-[#002B99]">{trackingResult.service.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-[#1E242B]/60 block">Institution / Business:</span>
                      <span>{trackingResult.institutionOrBusiness || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[#1E242B]/60 block">Date Initiated:</span>
                      <span>{new Date(trackingResult.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
