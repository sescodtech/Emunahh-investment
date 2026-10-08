import React, { useEffect, useMemo, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { fetchGallery, fetchGalleryCategories, type GalleryCategory, type GalleryItem } from '../lib/socialProof';
import { useContent } from '../context/ContentContext';

export const GalleryPage: React.FC = () => {
  const { cmsPages, cmsSections } = useContent() as any;
  const page = cmsPages?.find((item:any)=>item.slug==='gallery');
  const hero = (cmsSections||[]).find((item:any)=>item.page_id===page?.id&&item.section_key==='hero'&&item.is_enabled!==false)?.content || {};
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    Promise.all([fetchGallery(), fetchGalleryCategories()])
      .then(([gallery, cats]) => { setItems(gallery); setCategories(cats); })
      .catch(() => { setItems([]); setCategories([]); });
  }, []);

  const visible = useMemo(() => filter === 'all' ? items : items.filter((item) => item.gallery_categories?.slug === filter), [items, filter]);

  return <div className="bg-white">
    <section className="border-b border-slate-200 bg-[#080642] text-white">
      <div className="ei-container py-20 sm:py-24">
        <div className="ei-eyebrow text-white/60">{hero.eyebrow || 'GALLERY'}</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{hero.heading || 'A closer look at our engagements and activities.'}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">{hero.description || 'Selected moments from our professional engagements, company activities and client-facing work.'}</p>
      </div>
    </section>

    <section className="ei-section">
      <div className="ei-container">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-5">
          <button onClick={() => setFilter('all')} className={`rounded-full px-4 py-2 text-xs font-bold ${filter==='all'?'bg-[#0d0a64] text-white':'bg-slate-100 text-slate-600'}`}>All</button>
          {categories.map((category) => <button key={category.id} onClick={() => setFilter(category.slug)} className={`rounded-full px-4 py-2 text-xs font-bold ${filter===category.slug?'bg-[#0d0a64] text-white':'bg-slate-100 text-slate-600'}`}>{category.name}</button>)}
        </div>

        {visible.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => <button key={item.id} onClick={() => setSelected(item)} className={`group overflow-hidden border border-slate-200 bg-white text-left ${index===0&&item.is_featured?'sm:col-span-2 lg:col-span-2':''}`}>
            <div className={`${index===0&&item.is_featured?'aspect-[16/8]':'aspect-[4/3]'} overflow-hidden bg-slate-100`}>
              <img src={item.image_url} alt={item.alt_text || item.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
            </div>
            <div className="p-5">
              <div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d91c23]">{item.gallery_categories?.name || 'Gallery'}</div>
              <h2 className="mt-2 text-base font-extrabold text-[#0d0a64]">{item.title}</h2>
              {item.caption && <p className="mt-2 text-xs leading-6 text-slate-500">{item.caption}</p>}
            </div>
          </button>)}
        </div> : <div className="py-20 text-center text-slate-400"><Camera className="mx-auto h-8 w-8"/><p className="mt-3 text-sm">Gallery updates will appear here.</p></div>}
      </div>
    </section>

    {selected && <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/90 p-4" role="dialog" aria-modal="true" aria-label={selected.title}>
      <button onClick={() => setSelected(null)} aria-label="Close image" className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white"><X className="h-5 w-5"/></button>
      <div className="max-h-[92vh] w-full max-w-6xl overflow-auto bg-white">
        <img src={selected.image_url} alt={selected.alt_text || selected.title} className="max-h-[75vh] w-full object-contain bg-black" />
        <div className="p-5 sm:p-6"><h2 className="text-xl font-extrabold text-[#0d0a64]">{selected.title}</h2>{selected.caption&&<p className="mt-2 text-sm leading-7 text-slate-600">{selected.caption}</p>}</div>
      </div>
    </div>}
  </div>;
};
