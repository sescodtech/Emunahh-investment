import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
const sb=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
Deno.serve(async req=>{
 if(req.method==='OPTIONS') return new Response('ok',{headers:corsHeaders});
 try{
  const token=(req.headers.get('Authorization')||'').replace('Bearer ','');
  const {data:{user}}=await sb.auth.getUser(token); if(!user) throw new Error('Unauthorized');
  const {data:p}=await sb.from('profiles').select('role,status').eq('id',user.id).single();
  if(!p||p.status!=='active') throw new Error('Active staff account required.');
  const body=await req.json(); if(!body.to||!body.subject||!body.html) throw new Error('Recipient, subject and message are required.');
  const {data:settings}=await sb.from('site_settings').select('*').eq('id',1).single();
  const api=Deno.env.get('RESEND_API_KEY'); if(!api) throw new Error('RESEND_API_KEY is not configured.');
  const from=Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
  const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${api}`,'Content-Type':'application/json'},body:JSON.stringify({from:`${settings?.email_sender_name||'Emunahh-Invest'} <${from}>`,to:[body.to],reply_to:settings?.reply_to_email||settings?.company_email,subject:body.subject,html:body.html})});
  const result=await res.json(); if(!res.ok) throw new Error(result?.message||'Email provider rejected the message.');
  await sb.from('email_logs').insert({application_id:body.application_id||null,recipient:body.to,subject:body.subject,status:'SENT',provider_id:result.id||null,sent_by:user.id});
  await sb.from('audit_logs').insert({actor_id:user.id,action:'EMAIL_SENT',entity_type:'application',entity_id:body.application_id||null,metadata:{recipient:body.to,subject:body.subject}});
  return new Response(JSON.stringify({success:true,id:result.id}),{headers:{...corsHeaders,'Content-Type':'application/json'}});
 }catch(e){return new Response(JSON.stringify({error:e instanceof Error?e.message:'Email failed'}),{status:400,headers:{...corsHeaders,'Content-Type':'application/json'}})}
});