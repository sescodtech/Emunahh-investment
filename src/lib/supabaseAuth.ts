import { supabase, supabaseConfigError } from './supabase';
export async function signIn(email:string,password:string){
 if (supabaseConfigError) throw new Error(supabaseConfigError);
 const {data,error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
 if(error) throw error;
 if(!data.user||!data.session) throw new Error('Authentication session was not created.');
 const {data:profile,error:pe}=await supabase.from('profiles').select('full_name, status, role').eq('id',data.user.id).single();
 if(pe || !profile) throw new Error('Authentication succeeded, but this account is not provisioned for the management portal. Run the admin bootstrap SQL for this Auth user.');
 if(profile.status!=='active') { await supabase.auth.signOut(); throw new Error('This account is disabled.'); }
 return {session:data.session,user:data.user,profile};
}
export async function restoreAdminSession(){
 if (supabaseConfigError) throw new Error(supabaseConfigError);
 const {data:{session}}=await supabase.auth.getSession(); if(!session) return null;
 const {data:profile}=await supabase.from('profiles').select('full_name,status,role').eq('id',session.user.id).maybeSingle();
 if(!profile || profile.status!=='active'){await supabase.auth.signOut(); return null;}
 if(!['super_admin','admin','editor','staff'].includes((profile as any).role || '')){await supabase.auth.signOut(); return null;}
 const {data:roles}=await supabase.from('user_roles').select('role:roles(key,name)').eq('user_id',session.user.id);
 return {session,user:session.user,profile,roles};
}
export async function signOut(){await supabase.auth.signOut();}
export async function sendPasswordReset(email:string){
 const {error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo:`${import.meta.env.VITE_SITE_URL || window.location.origin}/admin/login`});
 if(error) throw error;
}
export function isSupabaseConfigured(){return !supabaseConfigError;}
