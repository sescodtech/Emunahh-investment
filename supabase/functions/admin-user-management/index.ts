import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
const sb=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
Deno.serve(async req=>{
 if(req.method==='OPTIONS') return new Response('ok',{headers:corsHeaders});
 try{
  const token=(req.headers.get('Authorization')||'').replace('Bearer ','');
  const {data:{user}}=await sb.auth.getUser(token);
  if(!user) return new Response(JSON.stringify({error:'Unauthorized'}),{status:401,headers:{...corsHeaders,'Content-Type':'application/json'}});
  const {data:actor}=await sb.from('profiles').select('role,status').eq('id',user.id).single();
  if(actor?.status!=='active'||actor.role!=='super_admin') return new Response(JSON.stringify({error:'Super Admin access required.'}),{status:403,headers:{...corsHeaders,'Content-Type':'application/json'}});
  const body=await req.json();
  if(body.action==='invite'){
   if(!body.email) throw new Error('Email is required.');
   const {data,error}=await sb.auth.admin.inviteUserByEmail(body.email,{data:{full_name:body.name||''}});
   if(error) throw error;
   const role=body.role||'staff';
   const {data:r,error:re}=await sb.from('roles').select('id').eq('key',role).single(); if(re) throw re;
   await sb.from('profiles').upsert({id:data.user.id,full_name:body.name||'',role,status:'active',department_id:body.department_id||null},{onConflict:'id'});
   await sb.from('user_roles').upsert({user_id:data.user.id,role_id:r.id});
   return new Response(JSON.stringify({success:true,user_id:data.user.id}),{headers:{...corsHeaders,'Content-Type':'application/json'}});
  }
  throw new Error('Unsupported action');
 }catch(e){return new Response(JSON.stringify({error:e instanceof Error?e.message:'Request failed'}),{status:400,headers:{...corsHeaders,'Content-Type':'application/json'}})}
});