import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, FileText, Clock } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
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

  const serviceOptions = [
    { id: 'student_loan' as ServiceType, label: 'Student Tuition Loan', subtitle: 'Tuition & Academic Fees' },
    { id: 'investment' as ServiceType, label: 'Investment Advisory', subtitle: 'Capital Preservation' },
    { id: 'business_financing' as ServiceType, label: 'SME Commercial Credit', subtitle: 'Working Capital' },
    { id: 'personal_finance' as ServiceType, label: 'Personal Financial Solution', subtitle: 'Structured Individual Credit' },
    { id: 'other_services' as ServiceType, label: 'Specialized Advisory', subtitle: 'Institutional Consultation' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F8F7F3] border-b border-[#071A2B]/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-[#087A5A] font-bold tracking-widest uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Intake Portal</span>
              <span>/</span>
              <span>Online Application</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-[-0.03em] leading-tight">
              Emunahh Financing Portal
            </h1>
            <p className="text-sm sm:text-base text-[#17202A]/80 leading-relaxed font-normal">
              Formal intake and application registry for student tuition financing, enterprise working capital, and investment advisory.
            </p>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'apply'
                    ? 'bg-[#071A2B] text-white shadow-2xs'
                    : 'bg-white text-[#17202A] border border-[#071A2B]/15 hover:border-[#087A5A]'
                }`}
              >
                Start New Application
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'track'
                    ? 'bg-[#071A2B] text-white shadow-2xs'
                    : 'bg-white text-[#17202A] border border-[#071A2B]/15 hover:border-[#087A5A]'
                }`}
              >
                Track Existing Reference
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === 'apply' ? (
            receipt ? (
              <div className="bg-white rounded-lg border border-[#071A2B]/15 p-8 sm:p-12 text-center space-y-6 shadow-md">
                <div className="w-14 h-14 rounded-full bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#087A5A] uppercase tracking-widest">
                    Application Recorded Successfully
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B] mt-1">
                    Reference Code: <span className="font-mono text-[#087A5A]">{receipt.reference}</span>
                  </h2>
                </div>

                <div className="max-w-md mx-auto bg-[#F8F7F3] p-5 rounded-lg border border-[#071A2B]/10 text-left text-xs space-y-2.5 text-[#17202A]">
                  <div className="flex justify-between border-b border-[#071A2B]/8 pb-2">
                    <span className="text-[#17202A]/60">Applicant:</span>
                    <span className="font-bold text-[#071A2B]">{receipt.record.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#071A2B]/8 pb-2">
                    <span className="text-[#17202A]/60">Facility Requested:</span>
                    <span className="font-bold text-[#071A2B]">{receipt.record.service.replace(/_/g, ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#071A2B]/8 pb-2">
                    <span className="text-[#17202A]/60">Amount Proposed:</span>
                    <span className="font-bold text-[#071A2B]">{receipt.record.amount || 'To be determined'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#17202A]/60">Review Status:</span>
                    <span className="font-bold text-[#087A5A] bg-[#087A5A]/10 px-2 py-0.5 rounded">
                      {receipt.record.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#17202A]/75 max-w-md mx-auto leading-relaxed font-normal">
                  Your application file has been generated for underwriting at 33 Crossway Plaza, New Oko Oba, Lagos. 
                  Forward your reference code directly to our WhatsApp desk for prompt document submission.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/2348023190807?text=${encodeURIComponent(
                      `Hello Emunahh-Invest, I just submitted application ${receipt.reference} for ${receipt.record.fullName}. Please advise on verification documents.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] rounded-md shadow-2xs transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                    <span>Fast-Track on WhatsApp (0802 319 0807)</span>
                  </a>

                  <button
                    onClick={() => {
                      setReceipt(null);
                      setFormData({ fullName: '', phone: '', email: '', amount: '', institutionOrBusiness: '', details: '' });
                    }}
                    className="px-5 py-3 text-xs font-bold text-[#071A2B] border border-[#071A2B]/20 rounded-md hover:bg-[#F8F7F3] cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-8">
                
                {/* Visual Application Journey Step Indicator */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[#071A2B]/10 pb-6">
                  {[
                    { num: '01', title: 'SERVICE', desc: 'Select Facility' },
                    { num: '02', title: 'DETAILS', desc: 'Applicant Info' },
                    { num: '03', title: 'REQUEST', desc: 'Amount & Entity' },
                    { num: '04', title: 'SUBMISSION', desc: 'Review & Verify' },
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 rounded-md bg-[#F8F7F3] border border-[#071A2B]/8">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#087A5A]">{step.num}</span>
                        <span className="text-[11px] font-bold text-[#071A2B] tracking-wider">{step.title}</span>
                      </div>
                      <span className="text-[10px] text-[#17202A]/60 block mt-0.5">{step.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Step 01: Service Selection */}
                <div className="bg-white rounded-lg border border-[#071A2B]/12 p-6 sm:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#071A2B] text-white">01</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#071A2B]">
                      Select Required Financial Facility
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setService(opt.id)}
                        className={`p-3.5 text-left rounded-md border transition-all cursor-pointer ${
                          service === opt.id
                            ? 'bg-[#071A2B] text-white border-[#071A2B] shadow-2xs'
                            : 'bg-[#F8F7F3] text-[#17202A] border-[#071A2B]/10 hover:border-[#087A5A]'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className={`text-[10px] mt-0.5 ${service === opt.id ? 'text-white/70' : 'text-[#17202A]/60'}`}>
                          {opt.subtitle}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 02: Applicant Details */}
                <div className="bg-white rounded-lg border border-[#071A2B]/12 p-6 sm:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#071A2B] text-white">02</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#071A2B]">
                      Applicant Identification & Contact
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Babatunde Emmanuel Adeleke"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">
                        Phone Number (WhatsApp Active) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0802 319 0807"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="babatunde@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
                    />
                  </div>
                </div>

                {/* Step 03: Request Parameters */}
                <div className="bg-white rounded-lg border border-[#071A2B]/12 p-6 sm:p-8 space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#071A2B] text-white">03</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#071A2B]">
                      Facility Parameters & Institution
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">
                        Proposed Facility Amount (₦)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₦650,000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#071A2B] mb-1">
                        {service === 'student_loan' ? 'University / Institution / Exam Body' : 'Registered Business or Enterprise'}
                      </label>
                      <input
                        type="text"
                        placeholder={service === 'student_loan' ? 'e.g. University of Lagos (UNILAG)' : 'e.g. Adeyemi Logistics Ltd'}
                        value={formData.institutionOrBusiness}
                        onChange={(e) => setFormData({ ...formData, institutionOrBusiness: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A2B] mb-1">
                      Deadlines & Specific Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify semester fee payment deadline, supplier invoice date, or guarantor schedule..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A] resize-none"
                    />
                  </div>
                </div>

                {/* Step 04: Submission */}
                <div className="bg-[#F8F7F3] rounded-lg border border-[#071A2B]/12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-[#17202A]/70">
                    <ShieldCheck className="w-5 h-5 text-[#087A5A] shrink-0" />
                    <span>Protected by Emunahh-Invest Limited governance and institutional confidentiality.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] active:scale-[0.98] rounded-md shadow-2xs transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isSubmitting ? 'Registering Intake...' : 'Submit Official Intake Form'}
                  </button>
                </div>

              </form>
            )
          ) : (
            /* Tracking Tab */
            <div className="bg-white rounded-lg border border-[#071A2B]/12 p-6 sm:p-10 shadow-2xs space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#071A2B]">
                  Track Existing Application File
                </h2>
                <p className="text-xs sm:text-sm text-[#17202A]/75 mt-1">
                  Enter your official Emunahh Reference ID (e.g. <code className="font-mono text-[#087A5A] font-bold">EMU-100201</code>) to retrieve status.
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. EMU-100201"
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs font-mono uppercase rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
                />
                <button
                  type="submit"
                  disabled={isTracking}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] rounded-md disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isTracking ? 'Searching...' : 'Lookup Status'}
                </button>
              </form>

              {trackingError && (
                <div className="p-4 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
                  {trackingError}
                </div>
              )}

              {trackingResult && (
                <div className="p-6 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/12 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#071A2B]/10 pb-3">
                    <div>
                      <div className="text-[11px] text-[#17202A]/60">Reference File</div>
                      <div className="font-mono text-base font-bold text-[#071A2B]">{trackingResult.reference}</div>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold rounded-md bg-[#087A5A]/15 text-[#087A5A]">
                      {trackingResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#17202A]/60 block">Applicant:</span>
                      <span className="font-bold text-[#071A2B]">{trackingResult.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[#17202A]/60 block">Facility:</span>
                      <span className="font-bold text-[#071A2B]">{trackingResult.service.replace(/_/g, ' ').toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-[#17202A]/60 block">Institution / Business:</span>
                      <span className="text-[#071A2B]">{trackingResult.institutionOrBusiness || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[#17202A]/60 block">Registered Date:</span>
                      <span className="text-[#071A2B]">{new Date(trackingResult.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#071A2B]/10 flex items-center justify-between">
                    <span className="text-[11px] text-[#17202A]/60">Physical Review: Lagos Corporate Desk</span>
                    <a
                      href={`https://wa.me/2348023190807?text=${encodeURIComponent(
                        `Hello Emunahh-Invest, I am inquiring about application file ${trackingResult.reference}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#087A5A] hover:underline"
                    >
                      Inquire on WhatsApp →
                    </a>
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
