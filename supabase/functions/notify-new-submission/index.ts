import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const sb = createClient(supabaseUrl, serviceKey);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const esc = (value: unknown) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

async function sendResend(payload: { from: string; to: string; replyTo?: string | null; subject: string; html: string }) {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from,
      to: [payload.to],
      reply_to: payload.replyTo || undefined,
      subject: payload.subject,
      html: payload.html,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Email provider rejected the message.');
  return result;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  let kind: 'application' | 'contact';
  let id: string;
  try {
    const body = await req.json();
    kind = body?.kind;
    id = body?.id;
    if (!['application', 'contact'].includes(kind) || !id) throw new Error('A valid submission kind and id are required.');
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Invalid request.' }, 400);
  }

  const table = kind === 'application' ? 'applications' : 'contact_messages';
  const select = kind === 'application'
    ? 'id,reference,full_name,email,phone,application_type,details,created_at,notification_sent_at'
    : 'id,reference,name,email,phone,service,message,created_at,notification_sent_at';

  const { data: submission, error: fetchError } = await sb.from(table).select(select).eq('id', id).maybeSingle();
  if (fetchError || !submission) return json({ error: 'Submission not found.' }, 404);

  const createdAt = new Date(submission.created_at).getTime();
  if (!Number.isFinite(createdAt) || Date.now() - createdAt > 60 * 60 * 1000) {
    return json({ error: 'Notification window has expired.' }, 400);
  }
  if (submission.notification_sent_at) return json({ success: true, duplicate: true });

  const { data: claimed, error: claimError } = await sb.rpc('claim_submission_notification', {
    kind,
    target_id: id,
  });
  if (claimError) return json({ error: claimError.message }, 400);
  if (!claimed) return json({ success: true, duplicate: true });

  try {
    const { data: settings, error: settingsError } = await sb.from('site_settings').select('*').eq('id', 1).single();
    if (settingsError) throw settingsError;

    const notificationEmail = settings?.notification_email || settings?.company_email;
    if (!notificationEmail) throw new Error('Company notification email is not configured.');

    const fromAddress = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
    const senderName = settings?.email_sender_name || settings?.company_name || 'Emunahh-Invest';
    const from = `${senderName} <${fromAddress}>`;
    const replyTo = settings?.reply_to_email || settings?.company_email || null;

    const personName = kind === 'application' ? submission.full_name : submission.name;
    const serviceLabel = kind === 'application'
      ? submission.details?.service_label || submission.application_type || 'Client enquiry'
      : submission.service || 'General enquiry';
    const companySubject = kind === 'application'
      ? `New ${serviceLabel} enquiry — ${submission.reference}`
      : `New contact enquiry — ${submission.reference}`;

    const companyHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
        <h2 style="color:#080642;margin-bottom:8px">New ${kind === 'application' ? 'client application' : 'contact enquiry'}</h2>
        <p>A new submission has been received through the Emunahh-Invest website.</p>
        <table style="border-collapse:collapse;width:100%;max-width:640px">
          <tr><td style="padding:8px 0;color:#64748b">Reference</td><td style="padding:8px 0;font-weight:700">${esc(submission.reference)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Name</td><td style="padding:8px 0">${esc(personName)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0">${esc(submission.email || '—')}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0">${esc(submission.phone || '—')}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Service</td><td style="padding:8px 0">${esc(serviceLabel)}</td></tr>
        </table>
        <p style="margin-top:18px">Open the management dashboard to review the full submission and continue the workflow.</p>
      </div>`;

    const companyResult = await sendResend({
      from,
      to: notificationEmail,
      replyTo: submission.email || replyTo,
      subject: companySubject,
      html: companyHtml,
    });

    await sb.from('email_logs').insert({
      application_id: kind === 'application' ? id : null,
      recipient: notificationEmail,
      subject: companySubject,
      status: 'SENT',
      provider_id: companyResult?.id || null,
      entity_type: kind,
      entity_id: id,
      metadata: { automated: true, notification: 'new_submission' },
    });

    if (submission.email) {
      const receiptSubject = kind === 'application' ? 'We received your Emunahh-Invest enquiry' : 'We received your message';
      const receiptHtml = `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#172033;max-width:640px">
          <h2 style="color:#080642">Thank you, ${esc(personName)}.</h2>
          <p>We have received your ${kind === 'application' ? `${esc(serviceLabel)} enquiry` : 'message'}.</p>
          <p>Your reference is <strong>${esc(submission.reference)}</strong>. Please keep it for future correspondence.</p>
          <p>Our team will review the information supplied and contact you if a next step or additional information is required.</p>
          <p style="font-size:12px;color:#64748b;margin-top:24px">This acknowledgement confirms receipt only. It is not an approval, offer, investment recommendation, guarantee or contractual commitment.</p>
        </div>`;
      try {
        const receiptResult = await sendResend({ from, to: submission.email, replyTo, subject: receiptSubject, html: receiptHtml });
        await sb.from('email_logs').insert({
          application_id: kind === 'application' ? id : null,
          recipient: submission.email,
          subject: receiptSubject,
          status: 'SENT',
          provider_id: receiptResult?.id || null,
          entity_type: kind,
          entity_id: id,
          metadata: { automated: true, notification: 'submission_receipt' },
        });
      } catch (receiptError) {
        await sb.from('email_logs').insert({
          application_id: kind === 'application' ? id : null,
          recipient: submission.email,
          subject: receiptSubject,
          status: 'FAILED',
          error_message: receiptError instanceof Error ? receiptError.message : 'Receipt email failed',
          entity_type: kind,
          entity_id: id,
          metadata: { automated: true, notification: 'submission_receipt' },
        });
      }
    }

    await sb.from('audit_logs').insert({
      actor_id: null,
      action: 'PUBLIC_SUBMISSION_NOTIFICATION_SENT',
      entity_type: kind,
      entity_id: id,
      metadata: { reference: submission.reference, service: serviceLabel },
    });

    return json({ success: true });
  } catch (error) {
    await sb.from(table).update({ notification_sent_at: null }).eq('id', id);
    await sb.from('email_logs').insert({
      application_id: kind === 'application' ? id : null,
      recipient: 'company_notification',
      subject: 'New submission notification',
      status: 'FAILED',
      error_message: error instanceof Error ? error.message : 'Notification failed',
      entity_type: kind,
      entity_id: id,
      metadata: { automated: true, notification: 'new_submission' },
    });
    return json({ error: error instanceof Error ? error.message : 'Notification failed.' }, 500);
  }
});
