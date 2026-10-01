import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, FileUp, LockKeyhole, ShieldCheck, Upload } from 'lucide-react';
import { applicationJourneys, type ApplicationServiceSlug } from '../config/applicationArchitecture';
import { getDocumentUploadSession, uploadApplicationDocument, type DocumentUploadSession } from '../lib/documents';

const box='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6';

export const DocumentUploadPage:React.FC=()=>{
 const {applicationId=''}=useParams<{applicationId:string}>();
 const [params]=useSearchParams();
 const token=params.get('token')||'';
 const [session,setSession]=useState<DocumentUploadSession|null>(null);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState<string>('');
 const [notice,setNotice]=useState('');
 const load=async()=>{setLoading(true);setError('');try{setSession(await getDocumentUploadSession(applicationId,token))}catch(e){setError(e instanceof Error?e.message:'Unable to open the secure document session.')}finally{setLoading(false)}};
 useEffect(()=>{load()},[applicationId,token]);
 const slug=(session?.service_slug||'personal-finance') as ApplicationServiceSlug;
 const journey=applicationJourneys[slug]||applicationJourneys['personal-finance'];
 const uploaded=useMemo(()=>new Map((session?.documents||[]).map(d=>[d.document_type,d])),[session]);
 const accept=session?.config.allowed_extensions.split(',').map(x=>`.${x.trim()}`).join(',')||'.pdf,.jpg,.jpeg,.png,.webp';
 const upload=async(type:string,file?:File)=>{if(!file)return;setBusy(type);setNotice('');try{await uploadApplicationDocument({applicationId,token,documentType:type,file});setNotice('Document received successfully.');await load()}catch(e){setNotice(e instanceof Error?e.message:'Upload failed.')}finally{setBusy('')}};
 if(loading)return <section className="ei-section"><div className="ei-container max-w-3xl"><div className={box}>Loading secure document session…</div></div></section>;
 if(error||!session)return <section className="ei-section"><div className="ei-container max-w-3xl"><div className={`${box} border-red-200`}><AlertTriangle className="h-6 w-6 text-red-600"/><h1 className="mt-4 text-2xl font-bold text-[#080642]">Secure document link unavailable</h1><p className="mt-3 text-sm leading-7 text-slate-600">{error||'This link is not available.'}</p><Link to="/contact" className="ei-btn-secondary mt-6 inline-flex">Contact support</Link></div></div></section>;
 return <div className="bg-[#f7f8fb] min-h-[70vh]"><section className="ei-section"><div className="ei-container max-w-5xl">
  <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
   <div className={box}>
    <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#eef0ff] text-[#0d0a64]"><LockKeyhole className="h-5 w-5"/></div><div><div className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Secure supporting documents</div><h1 className="text-2xl font-extrabold text-[#080642]">{session.service_label}</h1></div></div>
    <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm"><span className="text-slate-500">Application reference</span><div className="mt-1 font-mono font-bold text-[#d91c23]">{session.reference}</div></div>
    {!session.config.enabled?<div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Online document uploads are currently switched off. Your application is still valid. The review team can contact you if documents are required.</div>:<>
     {session.config.test_mode&&<div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900"><strong>Test mode is active.</strong> The upload workflow can be tested, but file bytes are not retained externally until the administrator disables Test Mode and configures the selected storage provider.</div>}
     {notice&&<div role="status" className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{notice}</div>}
     <div className="mt-7 space-y-3">{journey.supportingDocuments.map(doc=>{const existing=uploaded.get(doc.key);return <div key={doc.key} className="rounded-xl border border-slate-200 p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><span className="font-bold text-[#0d0a64]">{doc.label}</span>{doc.required&&<span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase text-red-600">Usually required</span>}</div>{doc.help&&<p className="mt-1 text-xs leading-5 text-slate-500">{doc.help}</p>}{existing&&<div className="mt-2 flex items-center gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-4 w-4"/>{existing.filename}{existing.storage_status==='test'?' · test entry':''}</div>}</div><label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#0d0a64] hover:bg-slate-50"><Upload className="h-4 w-4"/>{busy===doc.key?'Uploading…':existing?'Replace / upload another':'Choose file'}<input disabled={!!busy} type="file" accept={accept} className="hidden" onChange={e=>upload(doc.key,e.target.files?.[0])}/></label></div></div>})}</div>
     <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-4"><div className="font-bold text-[#0d0a64]">Additional supporting document</div><p className="mt-1 text-xs text-slate-500">Use this only when another relevant document is specifically required.</p><label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold"><FileUp className="h-4 w-4"/>Upload additional file<input disabled={!!busy} type="file" accept={accept} className="hidden" onChange={e=>upload('additional_supporting',e.target.files?.[0])}/></label></div>
    </>}
   </div>
   <aside className="space-y-5">
    <div className={box}><ShieldCheck className="h-6 w-6 text-[#0d0a64]"/><h2 className="mt-4 text-lg font-extrabold text-[#080642]">Document safety</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><li>Only upload documents relevant to this application.</li><li>Do not include passwords, PINs, one-time codes or card security details.</li><li>Files are handled through the storage provider configured by authorised administrators.</li></ul></div>
    <div className={box}><div className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Upload rules</div><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-slate-500">Maximum file size</dt><dd className="font-bold text-[#0d0a64]">{session.config.max_size_mb} MB per file</dd></div><div><dt className="text-slate-500">Accepted formats</dt><dd className="font-bold uppercase text-[#0d0a64]">{session.config.allowed_extensions}</dd></div></dl></div>
    <Link to="/" className="ei-btn-secondary inline-flex w-full justify-center">Return to website</Link>
   </aside>
  </div>
 </div></section></div>
}
