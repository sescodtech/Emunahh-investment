import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { applicationJourneys, applicationServiceSlugs, type ApplicationServiceSlug } from '../config/applicationArchitecture';
import { submitContact } from '../lib/publicApi';

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] outline-none transition placeholder:text-slate-400 focus:border-[#0d0a64] focus:ring-4 focus:ring-[#0d0a64]/5';

export const CMSContactPage: React.FC = () => {
  const { settings } = useContent();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    countryRegion: '',
    service: 'education-financing' as ApplicationServiceSlug,
    message: '',
    consent: false,
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!form.consent) {
      setError('Please accept the privacy notice before sending your enquiry.');
      return;
    }
    if (form.phone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid phone number including country code.');
      return;
    }

    setSending(true);
    try {
      await submitContact({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
        message: `[Country/Region: ${form.countryRegion.trim()}] ${form.message.trim()}`,
        consent: form.consent,
      });
      setDone(true);
    } catch (errorValue) {
      setError(errorValue instanceof Error ? errorValue.message : 'Unable to send your enquiry right now.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[#fbfbfc]">
        <div className="ei-container py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="ei-eyebrow">Contact</div>
            <h1 className="mt-5 text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.02] text-[#080642]">A clear route to the right conversation.</h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-600">Use the enquiry form for general questions, or start a structured service intake when you are ready to provide the information needed for an initial review.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#fbfbfc] py-16 lg:py-20">
        <div className="ei-container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <div className="ei-eyebrow">Client services</div>
            <h2 className="mt-5 text-[clamp(2.1rem,4vw,3.6rem)] text-[#080642]">Start with a clear conversation.</h2>
            <p className="mt-5 ei-copy">Use this form for general questions or early-stage service enquiries. For a structured financing or investment intake, use the dedicated application journey.</p>

            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {settings.companyEmail && <ContactLine icon={Mail} label="Email" value={settings.companyEmail} href={`mailto:${settings.companyEmail}`} />}
              {settings.phone && <ContactLine icon={Phone} label="Telephone" value={settings.phone} href={`tel:${settings.phone.replace(/\s/g, '')}`} />}
              {settings.whatsapp && <ContactLine icon={MessageSquare} label="WhatsApp" value="Message client services" href={`https://wa.me/${String(settings.whatsapp).replace(/\D/g, '')}`} external />}
            </div>

            <div className="mt-7 flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0d0a64]" />
              <p className="text-[12px] leading-6 text-slate-600">Do not send passwords, card details, security codes or unnecessary sensitive documents through a public enquiry form.</p>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(13,10,100,0.06)] sm:p-8 lg:p-10">
            {done ? (
              <div className="py-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f2f2f8] text-[#0d0a64]"><CheckCircle2 className="h-6 w-6" /></div>
                <h3 className="mt-5 text-[26px] font-[750] text-[#080642]">Enquiry received</h3>
                <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-slate-600">Thank you. Our team will review your message and respond using the contact details provided.</p>
                <button type="button" onClick={() => { setDone(false); setForm({ name: '', phone: '', email: '', countryRegion: '', service: 'education-financing', message: '', consent: false }); }} className="ei-btn-secondary mt-7 px-5 py-3">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <div className="text-[11px] font-[750] uppercase tracking-[0.16em] text-slate-500">General enquiry</div>
                  <h3 className="mt-2 text-[26px] font-[750] text-[#080642]">Tell us what you need.</h3>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} autoComplete="name" />
                  <Input label="Country / region" required value={form.countryRegion} onChange={(value) => setForm({ ...form, countryRegion: value })} autoComplete="country-name" />
                  <Input label="Email address" required type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} autoComplete="email" />
                  <Input label="Phone number" required type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} autoComplete="tel" placeholder="Include country code" />
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[12px] font-[700] text-[#0d0a64]">Service area *</span>
                    <select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value as ApplicationServiceSlug })} className={inputClass}>
                      {applicationServiceSlugs.map((slug) => <option key={slug} value={slug}>{applicationJourneys[slug].label}</option>)}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[12px] font-[700] text-[#0d0a64]">Message *</span>
                  <textarea required rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className={`${inputClass} resize-y`} placeholder="Briefly explain your question or requirement." />
                </label>

                <label className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4">
                  <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-1 h-4 w-4 accent-[#0d0a64]" />
                  <span className="text-[12px] leading-6 text-slate-600">I consent to the use of the information submitted for responding to this enquiry and related follow-up, in line with the Privacy Policy.</span>
                </label>

                {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>}

                <div className="flex justify-end border-t border-slate-200 pt-5">
                  <button disabled={sending} className="ei-btn-primary px-6 py-3 disabled:opacity-50">
                    {sending ? 'Sending…' : 'Send enquiry'} {!sending && <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const Input: React.FC<{ label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string; placeholder?: string; autoComplete?: string }> = ({ label, value, onChange, required, type = 'text', placeholder, autoComplete }) => (
  <label className="block">
    <span className="mb-2 block text-[12px] font-[700] text-[#0d0a64]">{label}{required ? ' *' : ''}</span>
    <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} placeholder={placeholder} autoComplete={autoComplete} />
  </label>
);

const ContactLine: React.FC<{ icon: React.ElementType; label: string; value: string; href: string; external?: boolean }> = ({ icon: Icon, label, value, href, external }) => (
  <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="grid grid-cols-[34px_1fr_auto] items-center gap-3 py-5 text-[#0d0a64] transition hover:text-[#d91c23]">
    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f2f2f8]"><Icon className="h-4 w-4" /></span>
    <span><span className="block text-[11px] font-[750] uppercase tracking-[0.13em] text-slate-400">{label}</span><span className="mt-1 block text-[13px] font-[700]">{value}</span></span>
    <ArrowRight className="h-4 w-4" />
  </a>
);
