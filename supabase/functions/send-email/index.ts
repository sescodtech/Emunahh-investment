import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);

  try {
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const { data: { user } } = await sb.auth.getUser(token);
    if (!user) return json({ error: 'Unauthorized.' }, 401);

    const { data: allowed, error: permissionError } = await sb.rpc('user_has_permission', {
      target_user: user.id,
      permission_key: 'emails.view',
    });
    if (permissionError || !allowed) return json({ error: 'Email permission required.' }, 403);

    const body = await req.json();
    const to = String(body?.to || '').trim();
    const subject = String(body?.subject || '').trim();
    const html = String(body?.html || '');
    if (!/^\S+@\S+\.\S+$/.test(to)) throw new Error('A valid recipient email is required.');
    if (!subject || subject.length > 240) throw new Error('A valid subject is required.');
    if (!html || html.length > 200000) throw new Error('A valid message is required.');

    const { data: settings } = await sb.from('site_settings').select('*').eq('id', 1).single();
    const api = Deno.env.get('RESEND_API_KEY');
    if (!api) throw new Error('RESEND_API_KEY is not configured.');
    const fromAddress = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
    const senderName = settings?.email_sender_name || settings?.company_name || 'Emunahh-Invest';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${api}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${senderName} <${fromAddress}>`,
        to: [to],
        reply_to: settings?.reply_to_email || settings?.company_email || undefined,
        subject,
        html,
      }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result?.message || 'Email provider rejected the message.');

    await sb.from('email_logs').insert({
      application_id: body.application_id || null,
      recipient: to,
      subject,
      status: 'SENT',
      provider_id: result.id || null,
      sent_by: user.id,
      entity_type: body.application_id ? 'application' : body.entity_type || 'manual',
      entity_id: body.application_id || body.entity_id || null,
      metadata: { manual: true },
    });
    await sb.from('audit_logs').insert({
      actor_id: user.id,
      action: 'EMAIL_SENT',
      entity_type: body.application_id ? 'application' : body.entity_type || 'email',
      entity_id: body.application_id || body.entity_id || null,
      metadata: { recipient: to, subject },
    });

    return json({ success: true, id: result.id });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Email failed.' }, 400);
  }
});
