import { supabase } from './supabase';
import type { ApplicationServiceSlug } from '../config/applicationArchitecture';

export interface SmartApplicationInput {
  serviceSlug: ApplicationServiceSlug;
  serviceLabel: string;
  fullName: string;
  email: string;
  phone: string;
  countryRegion: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  currency: string;
  currencyDetail?: string;
  amount: string;
  answers: Record<string, string>;
  additionalNotes: string;
  privacyConsent: boolean;
  accuracyConfirmed: boolean;
}

export function applicationType(serviceSlug: ApplicationServiceSlug) {
  if (serviceSlug === 'education-financing') return 'student_financing';
  if (serviceSlug === 'investment-services') return 'investment';
  if (serviceSlug === 'business-financing') return 'business_financing';
  if (serviceSlug === 'personal-finance') return 'personal_finance';
  return 'general_enquiry';
}


async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function createDocumentUploadToken() {
  return `${crypto.randomUUID()}${crypto.randomUUID()}`.replaceAll('-', '');
}

export function makeReference(prefix = 'EMU') {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(-2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `${prefix}-${stamp}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

async function serverReference(prefix: string) {
  const { data, error } = await supabase.rpc('new_reference', { prefix });
  if (!error && typeof data === 'string' && data.trim()) return data.trim();
  return makeReference(prefix);
}

function primaryEntity(serviceSlug: ApplicationServiceSlug, answers: Record<string, string>) {
  if (serviceSlug === 'education-financing') return answers.institution_name || null;
  if (serviceSlug === 'business-financing') return answers.business_name || null;
  if (serviceSlug === 'travel-financing') return answers.destination || null;
  if (serviceSlug === 'personal-finance') return answers.employer_or_business || null;
  return null;
}

function cleanAnswers(answers: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(answers)
      .map(([key, value]) => [key, String(value || '').trim()])
      .filter(([, value]) => value.length > 0),
  );
}

async function requestSubmissionNotification(kind: 'application' | 'contact', id: string) {
  try {
    const { error } = await supabase.functions.invoke('notify-new-submission', {
      body: { kind, id },
    });
    if (error && import.meta.env.DEV) console.warn('Submission notification was not delivered:', error.message);
  } catch (error) {
    if (import.meta.env.DEV) console.warn('Submission notification was not delivered:', error);
  }
}

export async function submitApplication(input: SmartApplicationInput) {
  if (!input.privacyConsent || !input.accuracyConfirmed) {
    throw new Error('Please confirm the privacy notice and information declaration before submitting.');
  }
  if (input.fullName.trim().length < 2) throw new Error('Please enter your full name.');
  if (!/^\S+@\S+\.\S+$/.test(input.email.trim())) throw new Error('Please enter a valid email address.');
  if (input.phone.replace(/\D/g, '').length < 7) throw new Error('Please enter a valid phone number including country code.');

  const reference = await serverReference('EMU');
  const documentUploadToken = createDocumentUploadToken();
  const documentUploadTokenHash = await sha256Hex(documentUploadToken);
  const cleanEmail = input.email.trim();
  const cleanPhone = input.phone.trim();
  const answers = cleanAnswers(input.answers);
  const currencyLabel = input.currency === 'OTHER' ? input.currencyDetail?.trim() || 'Other currency' : input.currency;

  const { data: serviceRecord } = await supabase
    .from('services')
    .select('id,slug')
    .eq('slug', input.serviceSlug)
    .eq('is_published', true)
    .maybeSingle();

  const amount = input.amount.trim() ? `${currencyLabel} ${input.amount.trim()}` : null;

  const details = {
    schema_version: 'phase11-document-storage',
    service_slug: input.serviceSlug,
    service_label: input.serviceLabel,
    country_region: input.countryRegion.trim(),
    preferred_contact: input.preferredContact,
    currency: input.currency,
    currency_detail: input.currency === 'OTHER' ? input.currencyDetail?.trim() || null : null,
    requested_amount: input.amount.trim() || null,
    answers,
    additional_notes: input.additionalNotes.trim() || null,
    privacy_consent: true,
    accuracy_confirmed: true,
    submitted_from: 'public_web_phase10',
    document_upload_token_hash: documentUploadTokenHash,
    document_upload_token_issued_at: new Date().toISOString(),
  };

  // Public visitors are allowed to INSERT applications, but they are intentionally
  // not allowed to SELECT application rows. Generate the UUID client-side so we can
  // trigger the server-side notification without asking PostgREST to return the row.
  const applicationId = crypto.randomUUID();
  const { error } = await supabase
    .from('applications')
    .insert({
      id: applicationId,
      reference,
      application_type: applicationType(input.serviceSlug),
      full_name: input.fullName.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      amount,
      service_id: serviceRecord?.id || null,
      institution_or_business: primaryEntity(input.serviceSlug, answers),
      details,
      consent_at: new Date().toISOString(),
      source: 'public_web_phase10',
    });

  if (error) throw error;
  await requestSubmissionNotification('application', applicationId);
  return { success: true, reference, record: { id: applicationId, reference }, serviceLabel: input.serviceLabel, documentUploadToken };
}

export async function trackApplication(reference: string) {
  const { data, error } = await supabase.rpc('track_application', {
    lookup_reference: reference.trim().toUpperCase(),
  });
  if (error) throw error;
  return data;
}

export async function submitContact(input: {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  message: string;
  consent?: boolean;
}) {
  if (!input.consent) throw new Error('Please accept the privacy notice before sending your enquiry.');
  if (input.name.trim().length < 2) throw new Error('Please enter your name.');
  if (input.email?.trim() && !/^\S+@\S+\.\S+$/.test(input.email.trim())) throw new Error('Please enter a valid email address.');
  if (input.phone.replace(/\D/g, '').length < 7) throw new Error('Please enter a valid phone number including country code.');
  if (input.message.trim().length < 5) throw new Error('Please provide a little more detail.');

  const reference = await serverReference('MSG');
  const contactId = crypto.randomUUID();
  const { error } = await supabase
    .from('contact_messages')
    .insert({
      id: contactId,
      reference,
      name: input.name.trim(),
      email: input.email?.trim() || null,
      phone: input.phone.trim(),
      service: input.service || null,
      message: input.message.trim(),
      consent_at: new Date().toISOString(),
      source: 'public_web_phase10',
    });
  if (error) throw error;
  await requestSubmissionNotification('contact', contactId);
  return { id: contactId, reference };
}
