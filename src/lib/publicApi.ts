import { supabase } from './supabase';

export function applicationType(service:string){
 if(service==='student_loan') return 'student_financing';
 if(service==='investment') return 'investment';
 if(service==='business_financing' || service==='business') return 'business_financing';
 if(service==='personal_finance' || service==='personal') return 'personal_finance';
 return 'general_enquiry';
}
export function makeReference(prefix='EMU'){
 const d=new Date(); const stamp=`${String(d.getFullYear()).slice(-2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
 return `${prefix}-${stamp}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;
}
export async function submitApplication(input:any){
 const reference=makeReference('EMU');
 const {data,error}=await supabase.from('applications').insert({
  reference, application_type:applicationType(input.service), full_name:input.fullName.trim(), email:input.email||null,
  phone:input.phone.trim(), amount:input.amount||null, institution_or_business:input.institutionOrBusiness||null,
  details:{service:input.service,details:input.details||''}
 }).select().single();
 if(error) throw error;
 return {success:true,reference,record:data};
}
export async function trackApplication(reference:string){
 const {data,error}=await supabase.rpc('track_application',{lookup_reference:reference.trim().toUpperCase()});
 if(error) throw error;
 return data;
}
export async function submitContact(input:any){
 const reference=makeReference('MSG');
 const {data,error}=await supabase.from('contact_messages').insert({
  reference,name:input.name.trim(),email:input.email||null,phone:input.phone.trim(),
  service:input.service||null,message:input.message.trim()
 }).select('reference').single();
 if(error) throw error;
 return data;
}
