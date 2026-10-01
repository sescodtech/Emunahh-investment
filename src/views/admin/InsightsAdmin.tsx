import React, { useEffect, useMemo, useState } from 'react';
import { Archive, Image as ImageIcon, Plus, RefreshCw, Search, Star, Trash2, Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { validateUpload } from '../../security/runtime';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toLocalInput = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const emptyPost = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  category_id: '',
  author_id: '',
  hero_image_url: '',
  hero_image_alt: '',
  status: 'draft',
  is_featured: false,
  tags: [],
  reading_time_minutes: 5,
  seo_title: '',
  seo_description: '',
  canonical_url: '',
  og_image_url: '',
  published_at: '',
};

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(13,10,100,.05)] ${className}`}>{children}</div>;
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'soft' | 'danger';
  disabled?: boolean;
}) {
  const styles = {
    primary: 'bg-[#e7020b] text-white',
    soft: 'bg-slate-100 text-slate-700',
    danger: 'bg-red-600 text-white',
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl px-3.5 py-2 text-xs font-bold transition disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#e7020b]"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#e7020b]"
        />
      )}
    </label>
  );
}

function Modal({ title, close, children, wide = false }: { title: string; close: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className={`max-h-[94vh] w-full overflow-auto rounded-2xl bg-white shadow-2xl ${wide ? 'max-w-5xl' : 'max-w-2xl'}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
          <h2 className="font-extrabold text-[#0d0a64]">{title}</h2>
          <button type="button" onClick={close} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

const statusClass = (status: string) => {
  if (status === 'published') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (status === 'scheduled') return 'bg-blue-50 text-blue-700 border-blue-200';
  if (status === 'archived') return 'bg-slate-100 text-slate-500 border-slate-200';
  return 'bg-amber-50 text-amber-700 border-amber-200';
};

export function InsightsAdmin({ notify }: { notify: (message: string) => void }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [edit, setEdit] = useState<any>(null);
  const [taxonomy, setTaxonomy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const [{ data: postRows, error: postError }, { data: categoryRows }, { data: authorRows }] = await Promise.all([
      supabase
        .from('blog_posts')
        .select('*, blog_categories(name,slug), blog_authors(name,slug)')
        .order('created_at', { ascending: false }),
      supabase.from('blog_categories').select('*').order('display_order').order('name'),
      supabase.from('blog_authors').select('*').order('name'),
    ]);
    if (postError) notify(postError.message);
    setPosts(postRows || []);
    setCategories(categoryRows || []);
    setAuthors(authorRows || []);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const statusMatch = status === 'all' || post.status === status;
      const searchMatch = !q || `${post.title} ${post.slug} ${post.excerpt}`.toLowerCase().includes(q);
      return statusMatch && searchMatch;
    });
  }, [posts, query, status]);

  const openNew = () => {
    setEdit({
      ...emptyPost,
      category_id: categories[0]?.id || '',
      author_id: authors[0]?.id || '',
    });
  };

  const openEdit = (post: any) => {
    setEdit({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : [],
      category_id: post.category_id || '',
      author_id: post.author_id || '',
      published_at: toLocalInput(post.published_at),
    });
  };

  const save = async () => {
    if (!edit?.title?.trim()) return notify('Article title is required.');
    if (!edit?.slug?.trim()) return notify('Article slug is required.');
    if (!edit?.excerpt?.trim()) return notify('Article excerpt is required.');
    if (!edit?.body?.trim()) return notify('Article body is required.');
    setSaving(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      const publishDate =
        edit.status === 'published'
          ? edit.published_at
            ? new Date(edit.published_at).toISOString()
            : new Date().toISOString()
          : edit.status === 'scheduled' && edit.published_at
            ? new Date(edit.published_at).toISOString()
            : edit.published_at
              ? new Date(edit.published_at).toISOString()
              : null;

      const payload: any = {
        slug: slugify(edit.slug),
        title: edit.title.trim(),
        excerpt: edit.excerpt.trim(),
        body: edit.body.trim(),
        category_id: edit.category_id || null,
        author_id: edit.author_id || null,
        hero_image_url: edit.hero_image_url?.trim() || null,
        hero_image_alt: edit.hero_image_alt?.trim() || null,
        status: edit.status,
        is_featured: !!edit.is_featured,
        tags: Array.isArray(edit.tags) ? edit.tags : [],
        reading_time_minutes: Math.max(1, Number(edit.reading_time_minutes || 5)),
        seo_title: edit.seo_title?.trim() || null,
        seo_description: edit.seo_description?.trim() || null,
        canonical_url: edit.canonical_url?.trim() || null,
        og_image_url: edit.og_image_url?.trim() || null,
        published_at: publishDate,
        updated_by: user?.id || null,
      };

      let result;
      if (edit.id) {
        result = await supabase.from('blog_posts').update(payload).eq('id', edit.id);
      } else {
        result = await supabase.from('blog_posts').insert({ ...payload, created_by: user?.id || null });
      }
      if (result.error) throw result.error;
      notify(edit.id ? 'Article updated' : 'Article created');
      setEdit(null);
      await load();
    } catch (reason) {
      notify(reason instanceof Error ? reason.message : 'Could not save article');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (post: any) => {
    if (!confirm(`Archive “${post.title}”?`)) return;
    const user = (await supabase.auth.getUser()).data.user;
    const { error } = await supabase
      .from('blog_posts')
      .update({ status: 'archived', is_featured: false, updated_by: user?.id || null })
      .eq('id', post.id);
    if (error) notify(error.message);
    else {
      notify('Article archived');
      load();
    }
  };

  const uploadImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const validation = validateUpload(file);
      if (validation) return notify(validation);
      const cloud = String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
      const preset = String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim();
      if (!cloud || !preset) return notify('Cloudinary upload variables are not configured.');
      setUploading(true);
      try {
        const form = new FormData();
        form.append('file', file);
        form.append('upload_preset', preset);
        form.append('folder', 'emunahh-invest/insights');
        const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`, {
          method: 'POST',
          body: form,
        });
        if (!response.ok) throw new Error('Cloudinary upload failed.');
        const data = await response.json();
        setEdit((current: any) => ({ ...current, hero_image_url: data.secure_url, og_image_url: current.og_image_url || data.secure_url }));
        notify('Article image uploaded');
      } catch (reason) {
        notify(reason instanceof Error ? reason.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#0d0a64]">Insights & Thought Leadership</h2>
          <p className="mt-1 text-xs text-slate-500">Create, review, publish and archive public editorial content without changing React code.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="soft" onClick={() => setTaxonomy(true)}>Categories & authors</Button>
          <Button onClick={openNew}><Plus className="mr-1 inline h-3.5 w-3.5" />New article</Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, slug or excerpt…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#e7020b]"
          />
        </div>
        <div className="flex gap-2 overflow-auto">
          {['all', 'draft', 'scheduled', 'published', 'archived'].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setStatus(item)}
              className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase ${status === item ? 'bg-[#0d0a64] text-white' : 'border border-slate-200 bg-white text-slate-500'}`}
            >
              {item}
            </button>
          ))}
          <Button variant="soft" onClick={load}><RefreshCw className="mr-1 inline h-3.5 w-3.5" />Refresh</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {['Article', 'Category', 'Status', 'Publication', 'Read time', ''].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {post.hero_image_url ? <img src={post.hero_image_url} className="h-full w-full object-cover" alt="" /> : <div className="grid h-full w-full place-items-center"><ImageIcon className="h-4 w-4 text-slate-300" /></div>}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0d0a64]">
                          <span>{post.title}</span>
                          {post.is_featured && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                        </div>
                        <div className="mt-1 text-[10px] text-slate-400">/blog/{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs">{post.blog_categories?.name || '—'}</td>
                  <td className="px-4 py-4"><span className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${statusClass(post.status)}`}>{post.status}</span></td>
                  <td className="px-4 py-4 text-[10px] text-slate-500">{post.published_at ? new Date(post.published_at).toLocaleString('en-GB') : 'Not scheduled'}</td>
                  <td className="px-4 py-4 text-xs">{post.reading_time_minutes} min</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="soft" onClick={() => openEdit(post)}>Edit</Button>
                      <button type="button" onClick={() => remove(post)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Archive article"><Archive className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={6} className="p-10 text-center text-xs text-slate-400">No articles found.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>

      {edit && (
        <Modal title={edit.id ? 'Edit insight' : 'Create insight'} close={() => setEdit(null)} wide>
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <Field
                label="Article title"
                value={edit.title || ''}
                onChange={(value) =>
                  setEdit((current: any) => ({
                    ...current,
                    title: value,
                    slug: current.id || current.slug ? current.slug : slugify(value),
                  }))
                }
              />
              <Field label="URL slug" value={edit.slug || ''} onChange={(value) => setEdit({ ...edit, slug: slugify(value) })} />
              <Field label="Excerpt" value={edit.excerpt || ''} onChange={(value) => setEdit({ ...edit, excerpt: value })} textarea rows={4} />
              <Field
                label="Article body"
                value={edit.body || ''}
                onChange={(value) => setEdit({ ...edit, body: value })}
                textarea
                rows={18}
                placeholder={'Use blank lines between paragraphs. Use ## Heading for section headings and - Item for bullet lists.'}
              />
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[10px] leading-5 text-slate-500">
                Formatting: use <b>## Heading</b> for section headings, <b>### Subheading</b> for smaller headings and lines beginning with <b>- </b> for bullet lists. Ordinary paragraphs need no markup.
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="SEO title" value={edit.seo_title || ''} onChange={(value) => setEdit({ ...edit, seo_title: value })} />
                <Field label="Canonical URL" value={edit.canonical_url || ''} onChange={(value) => setEdit({ ...edit, canonical_url: value })} />
                <div className="md:col-span-2"><Field label="SEO description" value={edit.seo_description || ''} onChange={(value) => setEdit({ ...edit, seo_description: value })} textarea rows={3} /></div>
                <Field label="Open Graph image URL" value={edit.og_image_url || ''} onChange={(value) => setEdit({ ...edit, og_image_url: value })} />
              </div>
            </div>

            <aside className="space-y-4">
              <Card className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Publishing</div>
                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</span>
                    <select value={edit.status || 'draft'} onChange={(event) => setEdit({ ...edit, status: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Publication date/time</span>
                    <input type="datetime-local" value={edit.published_at || ''} onChange={(event) => setEdit({ ...edit, published_at: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" />
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <input type="checkbox" checked={!!edit.is_featured} onChange={(event) => setEdit({ ...edit, is_featured: event.target.checked })} />
                    Feature this insight
                  </label>
                </div>
              </Card>

              <Card className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Classification</div>
                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</span>
                    <select value={edit.category_id || ''} onChange={(event) => setEdit({ ...edit, category_id: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
                      <option value="">—</option>
                      {categories.filter((item) => item.is_active).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Author</span>
                    <select value={edit.author_id || ''} onChange={(event) => setEdit({ ...edit, author_id: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs">
                      <option value="">—</option>
                      {authors.filter((item) => item.is_active).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                  </label>
                  <Field label="Tags (comma separated)" value={(edit.tags || []).join(', ')} onChange={(value) => setEdit({ ...edit, tags: value.split(',').map((item) => item.trim()).filter(Boolean) })} />
                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Read time (minutes)</span>
                    <input type="number" min="1" max="120" value={edit.reading_time_minutes || 5} onChange={(event) => setEdit({ ...edit, reading_time_minutes: Number(event.target.value) })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs" />
                  </label>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hero image</div>
                  <button type="button" onClick={uploadImage} disabled={uploading} className="text-[10px] font-bold text-[#e7020b] disabled:opacity-50"><Upload className="mr-1 inline h-3.5 w-3.5" />{uploading ? 'Uploading…' : 'Upload'}</button>
                </div>
                {edit.hero_image_url && <img src={edit.hero_image_url} alt="" className="mt-3 aspect-[16/9] w-full rounded-xl object-cover" />}
                <div className="mt-4 space-y-3">
                  <Field label="Image URL" value={edit.hero_image_url || ''} onChange={(value) => setEdit({ ...edit, hero_image_url: value })} />
                  <Field label="Image alt text" value={edit.hero_image_alt || ''} onChange={(value) => setEdit({ ...edit, hero_image_alt: value })} />
                </div>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="soft" onClick={() => setEdit(null)}>Cancel</Button>
                <Button disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save article'}</Button>
              </div>
            </aside>
          </div>
        </Modal>
      )}

      {taxonomy && (
        <TaxonomyModal categories={categories} authors={authors} close={() => setTaxonomy(false)} reload={load} notify={notify} />
      )}
    </div>
  );
}

function TaxonomyModal({ categories, authors, close, reload, notify }: { categories: any[]; authors: any[]; close: () => void; reload: () => Promise<void>; notify: (message: string) => void }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [authorBio, setAuthorBio] = useState('');

  const addCategory = async () => {
    if (!categoryName.trim()) return;
    const { error } = await supabase.from('blog_categories').insert({
      name: categoryName.trim(),
      slug: slugify(categoryName),
      description: categoryDescription.trim() || null,
      display_order: categories.length + 1,
      is_active: true,
    });
    if (error) notify(error.message);
    else {
      setCategoryName('');
      setCategoryDescription('');
      notify('Category created');
      reload();
    }
  };

  const addAuthor = async () => {
    if (!authorName.trim()) return;
    const { error } = await supabase.from('blog_authors').insert({
      name: authorName.trim(),
      slug: slugify(authorName),
      role_title: authorTitle.trim() || null,
      bio: authorBio.trim() || null,
      is_active: true,
    });
    if (error) notify(error.message);
    else {
      setAuthorName('');
      setAuthorTitle('');
      setAuthorBio('');
      notify('Author created');
      reload();
    }
  };

  const toggleCategory = async (row: any) => {
    const { error } = await supabase.from('blog_categories').update({ is_active: !row.is_active }).eq('id', row.id);
    if (error) notify(error.message); else reload();
  };
  const toggleAuthor = async (row: any) => {
    const { error } = await supabase.from('blog_authors').update({ is_active: !row.is_active }).eq('id', row.id);
    if (error) notify(error.message); else reload();
  };

  return (
    <Modal title="Insights categories & authors" close={close} wide>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-extrabold text-[#0d0a64]">Categories</h3>
          <div className="mt-4 space-y-3">
            <Field label="Category name" value={categoryName} onChange={setCategoryName} />
            <Field label="Description" value={categoryDescription} onChange={setCategoryDescription} textarea rows={3} />
            <div className="flex justify-end"><Button onClick={addCategory}><Plus className="mr-1 inline h-3.5 w-3.5" />Add category</Button></div>
          </div>
          <div className="mt-6 divide-y rounded-xl border border-slate-200">
            {categories.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-3 p-3">
                <div><div className="text-xs font-bold">{row.name}</div><div className="text-[10px] text-slate-400">{row.slug}</div></div>
                <button type="button" onClick={() => toggleCategory(row)} className={`text-[10px] font-bold ${row.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>{row.is_active ? 'ACTIVE' : 'INACTIVE'}</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-extrabold text-[#0d0a64]">Authors</h3>
          <div className="mt-4 space-y-3">
            <Field label="Author name" value={authorName} onChange={setAuthorName} />
            <Field label="Role / desk" value={authorTitle} onChange={setAuthorTitle} />
            <Field label="Short bio" value={authorBio} onChange={setAuthorBio} textarea rows={4} />
            <div className="flex justify-end"><Button onClick={addAuthor}><Plus className="mr-1 inline h-3.5 w-3.5" />Add author</Button></div>
          </div>
          <div className="mt-6 divide-y rounded-xl border border-slate-200">
            {authors.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-3 p-3">
                <div><div className="text-xs font-bold">{row.name}</div><div className="text-[10px] text-slate-400">{row.role_title || row.slug}</div></div>
                <button type="button" onClick={() => toggleAuthor(row)} className={`text-[10px] font-bold ${row.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>{row.is_active ? 'ACTIVE' : 'INACTIVE'}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
