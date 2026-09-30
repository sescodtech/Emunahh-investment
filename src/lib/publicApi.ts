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

export function makeReference(prefix = 'EMU') {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(-2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `${prefix}-${stamp}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

function primaryEntity(serviceSlug: ApplicationServiceSlug, answers: Record<string, string>) {
  if (serviceSlug === 'education-financing') return answers.institution_name || null;
  if (serviceSlug === 'business-financing') return answers.business_name || null;
  if (serviceSlug === 'travel-financing') return answers.destination || null;
  return null;
}

export async function submitApplication(input: SmartApplicationInput) {
  if (!input.privacyConsent || !input.accuracyConfirmed) {
    throw new Error('Please confirm the privacy notice and information declaration before submitting.');
  }

  const reference = makeReference('EMU');
  const cleanEmail = input.email.trim();
  const cleanPhone = input.phone.trim();

  const { data: serviceRecord } = await supabase
    .from('services')
    .select('id,slug')
    .eq('slug', input.serviceSlug)
    .eq('is_published', true)
    .maybeSingle();

  const amount = input.amount.trim()
    ? `${input.currency === 'OTHER' ? 'Currency not specified' : input.currency} ${input.amount.trim()}`
    : null;

  const details = {
    schema_version: 'phase5-v1',
    service_slug: input.serviceSlug,
    service_label: input.serviceLabel,
    country_region: input.countryRegion.trim(),
    preferred_contact: input.preferredContact,
    currency: input.currency,
    requested_amount: input.amount.trim() || null,
    answers: input.answers,
    additional_notes: input.additionalNotes.trim() || null,
    privacy_consent: true,
    accuracy_confirmed: true,
    submitted_from: 'public_web_phase5',
  };

  const { data, error } = await supabase
    .from('applications')
    .insert({
      reference,
      application_type: applicationType(input.serviceSlug),
      full_name: input.fullName.trim(),
      email: cleanEmail || null,
      phone: cleanPhone,
      amount,
      service_id: serviceRecord?.id || null,
      institution_or_business: primaryEntity(input.serviceSlug, input.answers),
      details,
      consent_at: new Date().toISOString(),
      source: 'public_web_phase5',
    })
    .select()
    .single();

  if (error) throw error;
  return { success: true, reference, record: data, serviceLabel: input.serviceLabel };
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
  if (input.consent === false) throw new Error('Please accept the privacy notice before sending your enquiry.');
  const reference = makeReference('MSG');
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      reference,
      name: input.name.trim(),
      email: input.email?.trim() || null,
      phone: input.phone.trim(),
      service: input.service || null,
      message: input.message.trim(),
      consent_at: new Date().toISOString(),
      source: 'public_web_phase5',
    })
    .select('reference')
    .single();
  if (error) throw error;
  return data;
}
