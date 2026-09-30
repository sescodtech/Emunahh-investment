import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, FileText, Clock } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ServiceType } from '../types';
import { submitApplication, trackApplication } from '../lib/publicApi';
import { useContent } from '../context/ContentContext';

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { settings } = useContent();
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

  useEffect(() => {
    const requested = searchParams.get('service');
    const mapping: Record<string, ServiceType> = {
      'education-financing': 'student_loan',
      'investment-services': 'investment',
      'business-financing': 'business_financing',
      'personal-finance': 'personal_finance',
      'travel-financing': 'other_services',
    };
    if (requested && mapping[requested]) setService(mapping[requested]);
  }, [searchParams]);

  const whatsappNumber = String(settings?.whatsapp || '').replace(/\D/g, '');

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await submitApplication({ service, ...formData });
      setReceipt(data);
    } catch (err) {
      setTrackingError(err instanceof Error ? err.message : 'Unable to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRef.trim()) return;
    setIsTracking(true); setTrackingError(''); setTrackingResult(null);
    try {
      const data = await trackApplication(trackRef);
      if (data) setTrackingResult(data);
      else setTrackingError('Reference not found in database.');
    } catch (err) {
      setTrackingError(err instanceof Error ? err.message : 'Unable to connect to advisory verification system.');
    } finally { setIsTracking(false); }
  };

  const serviceOptions = [
    { id: 'student_loan' as ServiceType, label: 'Education Financing', subtitle: 'Education and tuition-related needs' },
    { id: 'investment' as ServiceType, label: 'Investment Services', subtitle: 'Objective, horizon and investment discussions' },
    { id: 'business_financing' as ServiceType, label: 'Business Financing', subtitle: 'Working capital and commercial requirements' },
    { id: 'personal_finance' as ServiceType, label: 'Personal Finance', subtitle: 'Structured personal financial requirements' },
    { id: 'other_services' as ServiceType, label: 'Travel / General Enquiry', subtitle: 'Travel financing and other service requests' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#e3fff2] border-b border-[#0d0a64]/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-[#e7020b] font-bold tracking-widest uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Intake Portal</span>
              <span>/</span>
              <span>Online Application</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0a64] tracking-[-0.03em] leading-tight">
              Client Enquiry & Application
            </h1>
            <p className="text-sm sm:text-base text-[#17202A]/80 leading-relaxed font-normal">
              Start a service enquiry, provide the initial information required for review, or track an existing application reference.
            </p>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'apply'
                    ? 'bg-[#0d0a64] text-white shadow-sm'
                    : 'bg-white text-[#17202A] border border-[#0d0a64]/15 hover:border-[#e7020b]'
                }`}
              >
                Start New Application
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'track'
                    ? 'bg-[#0d0a64] text-white shadow-sm'
                    : 'bg-white text-[#17202A] border border-[#0d0a64]/15 hover:border-[#e7020b]'
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
              <div className="bg-white rounded-xl border border-[#0d0a64]/15 p-8 sm:p-12 text-center space-y-6 shadow-md">
                <div className="w-14 h-14 rounded-full bg-[#e7020b]/10 text-[#e7020b] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#e7020b] uppercase tracking-widest">
                    Application Recorded Successfully
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d0a64] mt-1">
                    Reference Code: <span className="font-mono text-[#e7020b]">{receipt.reference}</span>
                  </h2>
                </div>

                <div className="max-w-md mx-auto bg-[#e3fff2] p-5 rounded-xl border border-[#0d0a64]/10 text-left text-xs space-y-2.5 text-[#17202A]">
                  <div className="flex justify-between border-b border-[#0d0a64]/8 pb-2">
                    <span className="text-[#17202A]/60">Applicant:</span>
                    <span className="font-bold text-[#0d0a64]">{receipt.record.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#0d0a64]/8 pb-2">
                    <span className="text-[#17202A]/60">Facility Requested:</span>
                    <span className="font-bold text-[#0d0a64]">{receipt.record.service.replace(/_/g, ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#0d0a64]/8 pb-2">
                    <span className="text-[#17202A]/60">Amount Proposed:</span>
                    <span className="font-bold text-[#0d0a64]">{receipt.record.amount || 'To be determined'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#17202A]/60">Review Status:</span>
                    <span className="font-bold text-[#e7020b] bg-[#e7020b]/10 px-2 py-0.5 rounded">
                      {receipt.record.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#17202A]/75 max-w-md mx-auto leading-relaxed font-normal">
                  Your application has been recorded for review. Keep your reference code and use it whenever you contact our team about the next steps or supporting information.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `Hello Emunahh-Invest, I just submitted application ${receipt.reference} for ${receipt.record.fullName}. Please advise on verification documents.`
                    )}` : '/contact'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] rounded-md shadow-sm transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                    <span>Continue on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setReceipt(null);
                      setFormData({ fullName: '', phone: '', email: '', amount: '', institutionOrBusiness: '', details: '' });
                    }}
                    className="px-5 py-3 text-xs font-bold text-[#0d0a64] border border-[#0d0a64]/20 rounded-md hover:bg-[#e3fff2] cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-8">
                
                {/* Visual Application Journey Step Indicator */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-[#0d0a64]/10 pb-6">
                  {[
                    { num: '01', title: 'SERVICE', desc: 'Select Facility' },
                    { num: '02', title: 'DETAILS', desc: 'Applicant Info' },
                    { num: '03', title: 'REQUEST', desc: 'Amount & Entity' },
                    { num: '04', title: 'SUBMISSION', desc: 'Review & Verify' },
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 rounded-md bg-[#e3fff2] border border-[#0d0a64]/8">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#e7020b]">{step.num}</span>
                        <span className="text-[11px] font-bold text-[#0d0a64] tracking-wider">{step.title}</span>
                      </div>
                      <span className="text-[10px] text-[#17202A]/60 block mt-0.5">{step.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Step 01: Service Selection */}
                <div className="bg-white rounded-xl border border-[#0d0a64]/12 p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0d0a64] text-white">01</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#0d0a64]">
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
                            ? 'bg-[#0d0a64] text-white border-[#0d0a64] shadow-sm'
                            : 'bg-[#e3fff2] text-[#17202A] border-[#0d0a64]/10 hover:border-[#e7020b]'
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
                <div className="bg-white rounded-xl border border-[#0d0a64]/12 p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0d0a64] text-white">02</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#0d0a64]">
                      Applicant Identification & Contact
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0d0a64] mb-1">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Babatunde Emmanuel Adeleke"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0d0a64] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Country code and phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0d0a64] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="babatunde@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
                    />
                  </div>
                </div>

                {/* Step 03: Request Parameters */}
                <div className="bg-white rounded-xl border border-[#0d0a64]/12 p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0d0a64] text-white">03</span>
                    <h2 className="text-base sm:text-lg font-bold text-[#0d0a64]">
                      Facility Parameters & Institution
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0d0a64] mb-1">
                        Indicative Amount / Range
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10,000 or preferred range"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0d0a64] mb-1">
                        {service === 'student_loan' ? 'Institution / Education Provider' : service === 'business_financing' ? 'Business / Organisation' : service === 'other_services' ? 'Travel Purpose / Destination' : 'Relevant Organisation (Optional)'}
                      </label>
                      <input
                        type="text"
                        placeholder={service === 'student_loan' ? 'Name of institution or education provider' : service === 'business_financing' ? 'Business or organisation name' : service === 'other_services' ? 'Brief travel purpose or destination' : 'Optional supporting organisation'}
                        value={formData.institutionOrBusiness}
                        onChange={(e) => setFormData({ ...formData, institutionOrBusiness: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0d0a64] mb-1">
                      Deadlines & Specific Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add any relevant deadline, purpose, context or supporting details that will help us understand the request..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b] resize-none"
                    />
                  </div>
                </div>

                {/* Step 04: Submission */}
                <div className="bg-[#e3fff2] rounded-xl border border-[#0d0a64]/12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-[#17202A]/70">
                    <ShieldCheck className="w-5 h-5 text-[#e7020b] shrink-0" />
                    <span>Information submitted through this form is handled for enquiry and application review purposes.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-xs font-bold text-white bg-[#0d0a64] hover:bg-[#e7020b] active:scale-[0.98] rounded-md shadow-sm transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isSubmitting ? 'Registering Intake...' : 'Submit Official Intake Form'}
                  </button>
                </div>

              </form>
            )
          ) : (
            /* Tracking Tab */
            <div className="bg-white rounded-xl border border-[#0d0a64]/12 p-6 sm:p-10 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0d0a64]">
                  Track Existing Application File
                </h2>
                <p className="text-xs sm:text-sm text-[#17202A]/75 mt-1">
                  Enter your official Emunahh Reference ID (e.g. <code className="font-mono text-[#e7020b] font-bold">EMU-100201</code>) to retrieve status.
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. EMU-100201"
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs font-mono uppercase rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
                />
                <button
                  type="submit"
                  disabled={isTracking}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0d0a64] hover:bg-[#e7020b] rounded-md disabled:opacity-50 transition-colors cursor-pointer"
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
                <div className="p-6 rounded-xl bg-[#e3fff2] border border-[#0d0a64]/12 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#0d0a64]/10 pb-3">
                    <div>
                      <div className="text-[11px] text-[#17202A]/60">Reference File</div>
                      <div className="font-mono text-base font-bold text-[#0d0a64]">{trackingResult.reference}</div>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold rounded-md bg-[#e7020b]/15 text-[#e7020b]">
                      {trackingResult.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#17202A]/60 block">Applicant:</span>
                      <span className="font-bold text-[#0d0a64]">{trackingResult.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[#17202A]/60 block">Facility:</span>
                      <span className="font-bold text-[#0d0a64]">{trackingResult.service.replace(/_/g, ' ').toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-[#17202A]/60 block">Institution / Business:</span>
                      <span className="text-[#0d0a64]">{trackingResult.institutionOrBusiness || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[#17202A]/60 block">Registered Date:</span>
                      <span className="text-[#0d0a64]">{new Date(trackingResult.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#0d0a64]/10 flex items-center justify-between">
                    <span className="text-[11px] text-[#17202A]/60">Review channel: Client services team</span>
                    <a
                      href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hello Emunahh-Invest, I am inquiring about application file ${trackingResult.reference}.`
                      )}` : '/contact'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#e7020b] hover:underline"
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
