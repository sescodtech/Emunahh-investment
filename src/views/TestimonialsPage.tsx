import React, { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { fetchTestimonials, type Testimonial } from '../lib/socialProof';
import { useContent } from '../context/ContentContext';

const Stars = ({ value }: { value?: number | null }) => value ? <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>{Array.from({length:5},(_,i)=><Star key={i} className={`h-4 w-4 ${i<value?'fill-[#d91c23] text-[#d91c23]':'text-slate-200'}`}/>)}</div> : null;

export const TestimonialsPage: React.FC = () => {
  const { cmsPages, cmsSections } = useContent() as any;
  const page = cmsPages?.find((item:any)=>item.slug==='testimonials');
  const hero = (cmsSections||[]).find((item:any)=>item.page_id===page?.id&&item.section_key==='hero'&&item.is_enabled!==false)?.content || {};
  const [rows, setRows] = useState<Testimonial[]>([]);
  useEffect(() => { fetchTestimonials().then(setRows).catch(() => setRows([])); }, []);
  return <div className="bg-[#f7f8fa]">
    <section className="bg-white border-b border-slate-200">
      <div className="ei-container py-20 sm:py-24">
        <div className="ei-eyebrow text-[#d91c23]">{hero.eyebrow || 'CLIENT EXPERIENCES'}</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0d0a64] sm:text-5xl">{hero.heading || 'What clients say about working with us.'}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{hero.description || 'Published testimonials are shared with client approval and reflect individual experiences.'} They do not guarantee future outcomes.</p>
      </div>
    </section>
    <section className="ei-section"><div className="ei-container">
      {rows.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{rows.map((row)=><article key={row.id} className="flex min-h-[300px] flex-col border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(13,10,100,.04)]">
        <div className="flex items-start justify-between gap-4"><Quote className="h-8 w-8 text-[#d91c23]"/><Stars value={row.rating}/></div>
        <blockquote className="mt-6 flex-1 text-[15px] leading-7 text-slate-700">“{row.review}”</blockquote>
        <div className="mt-7 border-t border-slate-100 pt-5 flex items-center gap-3">
          {row.image_url ? <img src={row.image_url} alt={`${row.customer_name} testimonial`} className="h-12 w-12 rounded-full object-cover" loading="lazy"/> : <div className="grid h-12 w-12 place-items-center rounded-full bg-[#eef0ff] text-sm font-extrabold text-[#0d0a64]">{row.customer_name.slice(0,1)}</div>}
          <div><div className="text-sm font-extrabold text-[#0d0a64]">{row.customer_name}</div><div className="text-[11px] text-slate-400">{[row.customer_role,row.company,row.service_label].filter(Boolean).join(' · ')}</div></div>
        </div>
      </article>)}</div> : <div className="py-24 text-center text-sm text-slate-400">Approved client testimonials will appear here.</div>}
      <p className="mx-auto mt-10 max-w-3xl text-center text-[11px] leading-6 text-slate-400">Testimonials describe individual client experiences and should not be interpreted as a promise of approval, performance, investment outcome or service result.</p>
    </div></section>
  </div>;
};
