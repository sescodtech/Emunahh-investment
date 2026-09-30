import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import {
  applicationJourneys,
  applicationServiceSlugs,
  currencyOptions,
  type ApplicationQuestion,
  type ApplicationServiceSlug,
} from '../config/applicationArchitecture';
import { submitApplication, trackApplication } from '../lib/publicApi';

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0d0a64] focus:ring-4 focus:ring-[#0d0a64]/5';

const labelClass = 'mb-2 block text-[12px] font-[700] text-[#0d0a64]';

const normaliseRequestedService = (value: string | null): ApplicationServiceSlug => {
  if (value && applicationServiceSlugs.includes(value as ApplicationServiceSlug)) {
    return value as ApplicationServiceSlug;
  }
  return 'education-financing';
};

const safeStatus = (status: unknown) => {
  if (typeof status !== 'string') return 'RECEIVED';
  return status.replace(/_/g, ' ');
};

const applicationTypeLabel = (type: unknown) => {
  const map: Record<string, string> = {
    student_financing: 'Education Financing',
    investment: 'Investment Services',
    business_financing: 'Business Financing',
    personal_finance: 'Personal Finance',
    general_enquiry: 'Travel / General Enquiry',
  };
  return typeof type === 'string' ? map[type] || 'Client Enquiry' : 'Client Enquiry';
};

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { settings } = useContent();
  const requestedService = normaliseRequestedService(searchParams.get('service'));

  const [mode, setMode] = useState<'apply' | 'track'>('apply');
  const [step, setStep] = useState(1);
  const [serviceSlug, setServiceSlug] = useState<ApplicationServiceSlug>(requestedService);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryRegion, setCountryRegion] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'whatsapp'>('email');
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [accuracyConfirmed, setAccuracyConfirmed] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<any | null>(null);

  const [trackRef, setTrackRef] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [trackingError, setTrackingError] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const next = normaliseRequestedService(searchParams.get('service'));
    setServiceSlug(next);
  }, [searchParams]);

  const journey = applicationJourneys[serviceSlug];
  const whatsappNumber = String(settings?.whatsapp || '').replace(/\D/g, '');

  const progress = useMemo(
    () => [
      { number: 1, label: 'Service' },
      { number: 2, label: 'Contact' },
      { number: 3, label: 'Requirement' },
      { number: 4, label: 'Review' },
    ],
    [],
  );

  const resetForService = (slug: ApplicationServiceSlug) => {
    setServiceSlug(slug);
    setAnswers({});
    setAmount('');
    setAdditionalNotes('');
    setFormError('');
  };

  const validateStep = (current: number) => {
    if (current === 1 && !serviceSlug) return 'Choose the service that best matches your enquiry.';

    if (current === 2) {
      if (fullName.trim().length < 2) return 'Enter your full name.';
      if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) return 'Enter a valid email address.';
      if (phone.replace(/\D/g, '').length < 7) return 'Enter a valid phone number including country code.';
      if (countryRegion.trim().length < 2) return 'Enter your country or region.';
    }

    if (current === 3) {
      const missing = journey.questions.find((question) => question.required && !String(answers[question.key] || '').trim());
      if (missing) return `${missing.label} is required.`;
    }

    if (current === 4) {
      if (!privacyConsent) return 'Please accept the privacy notice before submitting.';
      if (!accuracyConfirmed) return 'Please confirm that the information supplied is accurate.';
    }

    return '';
  };

  const goNext = () => {
    const error = validateStep(step);
    if (error) {
      setFormError(error);
      return;
    }
    setFormError('');
    setStep((value) => Math.min(4, value + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setFormError('');
    setStep((value) => Math.max(1, value - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const error = validateStep(4);
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    try {
      const data = await submitApplication({
        serviceSlug,
        serviceLabel: journey.label,
        fullName,
        email,
        phone,
        countryRegion,
        preferredContact,
        currency,
        amount,
        answers,
        additionalNotes,
        privacyConsent,
        accuracyConfirmed,
      });
      setReceipt(data);
    } catch (errorValue) {
      setFormError(errorValue instanceof Error ? errorValue.message : 'Unable to submit your enquiry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrack = async (event: React.FormEvent) => {
    event.preventDefault();
    const reference = trackRef.trim();
    if (!reference) return;

    setTrackingResult(null);
    setTrackingError('');
    setIsTracking(true);
    try {
      const result = await trackApplication(reference);
      if (!result) setTrackingError('We could not find an application with that reference.');
      else setTrackingResult(result);
    } catch (errorValue) {
      setTrackingError(errorValue instanceof Error ? errorValue.message : 'Unable to retrieve the application status.');
    } finally {
      setIsTracking(false);
    }
  };

  if (receipt) {
    return (
      <div className="bg-[#f7f8fb]">
        <section className="ei-section">
          <div className="ei-container max-w-4xl">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(13,10,100,0.08)]">
              <div className="bg-[#080642] px-6 py-10 text-white sm:px-10 lg:px-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="mt-6 text-[11px] font-[750] uppercase tracking-[0.18em] text-white/60">Enquiry received</div>
                <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">Your reference is {receipt.reference}</h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/72">
                  We have recorded your {receipt.serviceLabel} enquiry. Keep this reference for future status checks and correspondence.
                </p>
              </div>

              <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-10">
                <div>
                  <h2 className="text-[20px] font-[750] text-[#080642]">What happens next</h2>
                  <div className="mt-5 space-y-5">
                    {[
                      ['01', 'Initial review', 'Our team reviews the information supplied and checks whether further clarification is required.'],
                      ['02', 'Follow-up', 'Where appropriate, we contact you through your preferred contact method for the next stage.'],
                      ['03', 'Assessment', 'Any financing or investment engagement proceeds only after the relevant assessment, documentation and approvals.'],
                    ].map(([number, title, copy]) => (
                      <div key={number} className="grid grid-cols-[42px_1fr] gap-3 border-t border-slate-200 pt-5">
                        <span className="text-[11px] font-[800] tracking-[0.15em] text-[#d91c23]">{number}</span>
                        <div>
                          <div className="text-[14px] font-[750] text-[#0d0a64]">{title}</div>
                          <p className="mt-1 text-[13px] leading-6 text-slate-600">{copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="rounded-2xl border border-slate-200 bg-[#fbfbfc] p-6">
                  <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-slate-500">Reference summary</div>
                  <dl className="mt-5 space-y-4 text-[13px]">
                    <div><dt className="text-slate-500">Service</dt><dd className="mt-1 font-[700] text-[#0d0a64]">{receipt.serviceLabel}</dd></div>
                    <div><dt className="text-slate-500">Reference</dt><dd className="mt-1 font-mono font-[800] text-[#d91c23]">{receipt.reference}</dd></div>
                    <div><dt className="text-slate-500">Status</dt><dd className="mt-1 font-[700] text-[#0d0a64]">{safeStatus(receipt.record?.status || 'NEW')}</dd></div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackRef(receipt.reference);
                      setReceipt(null);
                      setMode('track');
                    }}
                    className="ei-btn-secondary mt-6 w-full justify-center py-3"
                  >
                    Track this reference
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container py-14 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] font-[650] text-slate-500">
            <Link to="/" className="hover:text-[#0d0a64]">Home</Link>
            <span>/</span>
            <span className="text-[#0d0a64]">Client enquiries</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="ei-eyebrow">Client intake</div>
              <h1 className="mt-5 text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.02] text-[#080642]">Start with the right information.</h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-600">
                Choose a service, share the initial information needed for review, or use your reference to check the current application status.
              </p>
            </div>

            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => { setMode('apply'); setTrackingError(''); }}
                className={`rounded-lg px-4 py-2.5 text-[12px] font-[750] transition ${mode === 'apply' ? 'bg-[#080642] text-white' : 'text-slate-600 hover:text-[#080642]'}`}
              >
                Start enquiry
              </button>
              <button
                type="button"
                onClick={() => { setMode('track'); setFormError(''); }}
                className={`rounded-lg px-4 py-2.5 text-[12px] font-[750] transition ${mode === 'track' ? 'bg-[#080642] text-white' : 'text-slate-600 hover:text-[#080642]'}`}
              >
                Track reference
              </button>
            </div>
          </div>
        </div>
      </section>

      {mode === 'apply' ? (
        <section className="ei-section bg-white">
          <div className="ei-container grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-14">
            <aside>
              <div className="sticky top-32">
                <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-slate-500">Application progress</div>
                <ol className="mt-5 space-y-1">
                  {progress.map((item) => {
                    const active = step === item.number;
                    const done = step > item.number;
                    return (
                      <li key={item.number}>
                        <button
                          type="button"
                          onClick={() => item.number < step && setStep(item.number)}
                          disabled={item.number > step}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${active ? 'bg-[#f2f2f8]' : ''}`}
                        >
                          <span className={`grid h-8 w-8 place-items-center rounded-full border text-[11px] font-[800] ${done ? 'border-[#0d0a64] bg-[#0d0a64] text-white' : active ? 'border-[#d91c23] text-[#d91c23]' : 'border-slate-200 text-slate-400'}`}>
                            {done ? <Check className="h-4 w-4" /> : item.number}
                          </span>
                          <span className={`text-[13px] font-[700] ${active || done ? 'text-[#0d0a64]' : 'text-slate-400'}`}>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-7 rounded-2xl border border-slate-200 bg-[#fbfbfc] p-4">
                  <ShieldCheck className="h-5 w-5 text-[#0d0a64]" />
                  <p className="mt-3 text-[12px] leading-5 text-slate-600">
                    Only provide information relevant to this initial enquiry. Supporting documents can be requested during review where appropriate.
                  </p>
                </div>
              </div>
            </aside>

            <div className="max-w-3xl">
              {formError && (
                <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                  {formError}
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="ei-eyebrow">Step 01</div>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] text-[#080642]">What would you like to discuss?</h2>
                  <p className="mt-4 ei-copy">Choose the service that most closely matches your objective. The questions in the next step will adapt automatically.</p>

                  <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
                    {applicationServiceSlugs.map((slug, index) => {
                      const item = applicationJourneys[slug];
                      const selected = serviceSlug === slug;
                      return (
                        <button
                          key={slug}
                          type="button"
                          onClick={() => resetForService(slug)}
                          className={`grid w-full gap-4 px-2 py-6 text-left transition sm:grid-cols-[48px_1fr_auto] sm:items-center ${selected ? 'bg-[#fbfbfc]' : 'hover:bg-[#fbfbfc]'}`}
                        >
                          <span className={`text-[11px] font-[800] tracking-[0.14em] ${selected ? 'text-[#d91c23]' : 'text-slate-400'}`}>0{index + 1}</span>
                          <span>
                            <span className="block text-[16px] font-[750] text-[#0d0a64]">{item.label}</span>
                            <span className="mt-1 block text-[13px] leading-6 text-slate-600">{item.shortDescription}</span>
                          </span>
                          <span className={`grid h-9 w-9 place-items-center rounded-full border ${selected ? 'border-[#0d0a64] bg-[#0d0a64] text-white' : 'border-slate-200 text-slate-400'}`}>
                            {selected ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="ei-eyebrow">Step 02</div>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] text-[#080642]">How should we contact you?</h2>
                  <p className="mt-4 ei-copy">Provide your primary contact details. Use an international phone format, including the country calling code.</p>

                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required><input className={fieldClass} value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" placeholder="Your full name" /></Field>
                    <Field label="Country / region" required><input className={fieldClass} value={countryRegion} onChange={(e) => setCountryRegion(e.target.value)} autoComplete="country-name" placeholder="Country or region" /></Field>
                    <Field label="Email address" required><input type="email" className={fieldClass} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="name@example.com" /></Field>
                    <Field label="Phone number" required><input type="tel" className={fieldClass} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+44 20 0000 0000" /></Field>
                    <div className="sm:col-span-2">
                      <Field label="Preferred contact method" required>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {(['email', 'phone', 'whatsapp'] as const).map((method) => (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setPreferredContact(method)}
                              className={`rounded-xl border px-4 py-3 text-[13px] font-[700] capitalize transition ${preferredContact === method ? 'border-[#0d0a64] bg-[#f2f2f8] text-[#0d0a64]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="ei-eyebrow">Step 03 · {journey.label}</div>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] text-[#080642]">Tell us about the requirement.</h2>
                  <p className="mt-4 ei-copy">The information below helps our team understand the context before any follow-up conversation.</p>

                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    <Field label={journey.amountLabel}>
                      <div className="grid grid-cols-[120px_1fr] gap-2">
                        <select className={fieldClass} value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="Currency">
                          {currencyOptions.map((code) => <option key={code} value={code}>{code}</option>)}
                        </select>
                        <input className={fieldClass} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount or range" />
                      </div>
                    </Field>

                    {journey.questions.map((question) => (
                      <DynamicQuestion key={question.key} question={question} value={answers[question.key] || ''} onChange={(value) => setAnswers((current) => ({ ...current, [question.key]: value }))} />
                    ))}

                    <div className="sm:col-span-2">
                      <Field label="Additional context">
                        <textarea className={`${fieldClass} min-h-[130px] resize-y`} value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder="Add any relevant timing, background or information that may help our review." />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="ei-eyebrow">Step 04</div>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] text-[#080642]">Review before submitting.</h2>
                  <p className="mt-4 ei-copy">Check the summary below. This is an initial enquiry and does not create an approval, offer, investment commitment or financing obligation.</p>

                  <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200">
                    <SummaryRow label="Service" value={journey.label} />
                    <SummaryRow label="Name" value={fullName} />
                    <SummaryRow label="Email" value={email} />
                    <SummaryRow label="Phone" value={phone} />
                    <SummaryRow label="Country / region" value={countryRegion} />
                    <SummaryRow label="Preferred contact" value={preferredContact} />
                    <SummaryRow label="Indicative amount" value={amount ? `${currency === 'OTHER' ? '' : currency + ' '}${amount}`.trim() : 'Not specified'} />
                  </div>

                  <div className="mt-7 space-y-4">
                    <Consent checked={privacyConsent} onChange={setPrivacyConsent}>
                      I have read the <Link className="font-[700] text-[#0d0a64] underline underline-offset-2" to="/privacy">Privacy Policy</Link> and consent to the use of the information submitted for enquiry, assessment and follow-up purposes.
                    </Consent>
                    <Consent checked={accuracyConfirmed} onChange={setAccuracyConfirmed}>
                      I confirm that the information provided is accurate to the best of my knowledge and understand that additional information or documentation may be required.
                    </Consent>
                  </div>

                  <div className="mt-7 rounded-2xl bg-[#f7f8fb] p-5">
                    <div className="flex gap-3">
                      <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0d0a64]" />
                      <p className="text-[12px] leading-6 text-slate-600">
                        Do not submit passwords, card details, authentication codes or other unnecessary sensitive information through this public form.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {step > 1 && (
                    <button type="button" onClick={goBack} className="ei-btn-secondary px-5 py-3">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                  )}
                </div>
                {step < 4 ? (
                  <button type="button" onClick={goNext} className="ei-btn-primary px-6 py-3">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button type="button" disabled={isSubmitting} onClick={handleSubmit} className="ei-btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50">
                    {isSubmitting ? 'Submitting…' : 'Submit enquiry'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="ei-section bg-white">
          <div className="ei-container max-w-4xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <div className="ei-eyebrow">Reference tracking</div>
                <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] text-[#080642]">Check the current status.</h2>
                <p className="mt-5 ei-copy">For privacy, public tracking displays only the reference, application category, status and relevant timestamps. Personal information is not exposed.</p>
                <div className="mt-7 flex gap-3 rounded-2xl bg-[#f7f8fb] p-5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0d0a64]" />
                  <p className="text-[12px] leading-6 text-slate-600">Need more detail? Contact the client-services team and quote the application reference.</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(13,10,100,0.06)] sm:p-8">
                <form onSubmit={handleTrack}>
                  <label className={labelClass} htmlFor="tracking-reference">Application reference</label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input id="tracking-reference" className={`${fieldClass} font-mono uppercase`} value={trackRef} onChange={(e) => setTrackRef(e.target.value)} placeholder="EMU-YYMMDD-XXXXXX" autoComplete="off" />
                    <button disabled={isTracking} className="ei-btn-primary shrink-0 justify-center px-5 py-3 disabled:opacity-50">
                      <Search className="h-4 w-4" /> {isTracking ? 'Checking…' : 'Check status'}
                    </button>
                  </div>
                </form>

                {trackingError && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{trackingError}</div>}

                {trackingResult && (
                  <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="bg-[#080642] p-5 text-white">
                      <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-white/55">Application status</div>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-[16px] font-[800]">{trackingResult.reference}</span>
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-[800]">{safeStatus(trackingResult.status)}</span>
                      </div>
                    </div>
                    <div className="divide-y divide-slate-200 bg-white">
                      <SummaryRow label="Category" value={applicationTypeLabel(trackingResult.application_type)} compact />
                      <SummaryRow label="Submitted" value={trackingResult.created_at ? new Date(trackingResult.created_at).toLocaleDateString() : '—'} compact />
                      <SummaryRow label="Last updated" value={trackingResult.updated_at ? new Date(trackingResult.updated_at).toLocaleDateString() : '—'} compact />
                    </div>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-5 text-[12px]">
                  <Link to="/contact" className="font-[750] text-[#0d0a64] hover:underline">Contact client services</Link>
                  {whatsappNumber && (
                    <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Emunahh-Invest, I would like an update on application ${trackRef || ''}.`)}`} target="_blank" rel="noopener noreferrer" className="font-[750] text-[#0d0a64] hover:underline">WhatsApp enquiry</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <label className="block">
    <span className={labelClass}>{label}{required ? ' *' : ''}</span>
    {children}
  </label>
);

const DynamicQuestion: React.FC<{ question: ApplicationQuestion; value: string; onChange: (value: string) => void }> = ({ question, value, onChange }) => {
  const wrapperClass = question.type === 'textarea' ? 'sm:col-span-2' : '';
  return (
    <div className={wrapperClass}>
      <Field label={question.label} required={question.required}>
        {question.type === 'select' ? (
          <select className={fieldClass} value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select an option</option>
            {(question.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        ) : question.type === 'textarea' ? (
          <textarea className={`${fieldClass} min-h-[130px] resize-y`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={question.placeholder} />
        ) : (
          <input type={question.type} className={fieldClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder={question.placeholder} />
        )}
        {question.help && <span className="mt-2 block text-[11px] leading-5 text-slate-500">{question.help}</span>}
      </Field>
    </div>
  );
};

const SummaryRow: React.FC<{ label: string; value: React.ReactNode; compact?: boolean }> = ({ label, value, compact }) => (
  <div className={`grid gap-1 border-b border-slate-200 last:border-b-0 sm:grid-cols-[170px_1fr] ${compact ? 'px-5 py-4' : 'px-5 py-4'}`}>
    <div className="text-[12px] text-slate-500">{label}</div>
    <div className="text-[13px] font-[700] capitalize text-[#0d0a64]">{value}</div>
  </div>
);

const Consent: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; children: React.ReactNode }> = ({ checked, onChange, children }) => (
  <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[#0d0a64]" />
    <span className="text-[12px] leading-6 text-slate-600">{children}</span>
  </label>
);
