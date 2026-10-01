import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Share2 } from 'lucide-react';
import fallbackImageImport from '../assets/images/financial_growth.webp';
import {
  fetchPublishedPost,
  fetchRelatedPosts,
  formatInsightDate,
  getPostAuthor,
  getPostCategory,
  type BlogPost,
} from '../lib/blog';
import { PageLoader } from '../components/PageLoader';
import { usePageMetadata } from '../lib/pageMetadata';

const fallbackImage = typeof fallbackImageImport === 'string' ? fallbackImageImport : String((fallbackImageImport as any)?.src || '');

const renderBody = (body: string) => {
  const blocks = body
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith('### ')) {
      return (
        <h3 key={index} className="mt-9 text-[21px] leading-7 text-[#080642]">
          {block.slice(4)}
        </h3>
      );
    }
    if (block.startsWith('## ')) {
      return (
        <h2 key={index} className="mt-12 text-[clamp(1.7rem,3vw,2.45rem)] leading-tight text-[#080642]">
          {block.slice(3)}
        </h2>
      );
    }
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length && lines.every((line) => line.startsWith('- '))) {
      return (
        <ul key={index} className="my-7 space-y-3">
          {lines.map((line) => (
            <li key={line} className="flex gap-3 text-[16px] leading-8 text-slate-700">
              <Check className="mt-1.5 h-4 w-4 shrink-0 text-[#d91c23]" />
              <span>{line.slice(2)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="mt-6 whitespace-pre-line text-[16px] leading-8 text-slate-700 sm:text-[17px]">
        {block}
      </p>
    );
  });
};

export const BlogArticlePage: React.FC = () => {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    fetchPublishedPost(slug)
      .then(async (row) => {
        if (!active) return;
        if (!row) {
          setNotFound(true);
          setPost(null);
          return;
        }
        setPost(row);
        try {
          const relatedRows = await fetchRelatedPosts(row, 3);
          if (active) setRelated(relatedRows);
        } catch (reason) {
          console.error(reason);
        }
      })
      .catch((reason) => {
        console.error(reason);
        if (active) setNotFound(true);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  const metadata = useMemo(() => {
    if (!post) {
      return {
        title: 'Insight | Emunahh-Invest',
        description: 'General financial insights from Emunahh-Invest.',
      };
    }
    const canonical = post.canonical_url || (typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : undefined);
    return {
      title: post.seo_title || `${post.title} | Emunahh-Invest`,
      description: post.seo_description || post.excerpt,
      canonical,
      image: post.og_image_url || post.hero_image_url,
      ogType: 'article' as const,
    };
  }, [post]);

  usePageMetadata(metadata);

  useEffect(() => {
    if (!post) return;
    const author = getPostAuthor(post);
    const category = getPostCategory(post);
    const existing = document.getElementById('emunahh-article-schema');
    const node = existing || document.createElement('script');
    node.id = 'emunahh-article-schema';
    node.setAttribute('type', 'application/ld+json');
    node.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.seo_description || post.excerpt,
      image: post.og_image_url || post.hero_image_url || undefined,
      datePublished: post.published_at || undefined,
      dateModified: post.updated_at || post.published_at || undefined,
      articleSection: category?.name || undefined,
      author: author?.name ? { '@type': 'Person', name: author.name } : { '@type': 'Organization', name: 'Emunahh-Invest Editorial Team' },
      publisher: { '@type': 'Organization', name: 'Emunahh-Invest Limited' },
      mainEntityOfPage: post.canonical_url || window.location.href,
    });
    if (!existing) document.head.appendChild(node);
    return () => node.remove();
  }, [post]);

  if (loading) return <PageLoader label="Loading insight" />;

  if (notFound || !post) {
    return (
      <section className="ei-section bg-white">
        <div className="ei-container max-w-3xl text-center">
          <div className="ei-eyebrow">Insights</div>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.5rem)] text-[#080642]">This insight is not available.</h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-slate-600">
            The article may have been unpublished, archived or the address may be incorrect.
          </p>
          <Link to="/blog" className="ei-btn-primary mt-8">
            <ArrowLeft className="h-4 w-4" />
            Return to insights
          </Link>
        </div>
      </section>
    );
  }

  const category = getPostCategory(post);
  const author = getPostAuthor(post);

  const shareArticle = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
        return;
      } catch {
        // The user may have cancelled the native share sheet.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable in some browsers; the page remains usable.
    }
  };

  return (
    <article className="bg-white">
      <header className="border-b border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container max-w-[1100px] py-14 lg:py-20">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[12px] font-[700] text-slate-500 hover:text-[#0d0a64]">
            <ArrowLeft className="h-4 w-4" />
            All insights
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-[750] uppercase tracking-[0.14em] text-[#d91c23]">
            <span>{category?.name || 'Insight'}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{post.reading_time_minutes} min read</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{formatInsightDate(post.published_at)}</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.65rem,6vw,5.35rem)] leading-[1.01] text-[#080642]">{post.title}</h1>
          <p className="mt-7 max-w-3xl text-[17px] leading-8 text-slate-600 sm:text-[19px]">{post.excerpt}</p>
          <div className="mt-9 flex flex-col gap-4 border-t border-slate-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[12px] text-slate-500">
              {author?.name || 'Emunahh-Invest Editorial Team'}
              {author?.role_title ? ` · ${author.role_title}` : ''}
            </div>
            <button
              type="button"
              onClick={shareArticle}
              className="inline-flex items-center gap-2 text-[12px] font-[700] text-[#0d0a64] hover:text-[#d91c23]"
            >
              {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? 'Link copied' : 'Share article'}
            </button>
          </div>
        </div>
      </header>

      <div className="ei-container max-w-[1200px] py-10 lg:py-14">
        <div className="relative aspect-[16/7] min-h-[260px] overflow-hidden bg-slate-100">
          <img
            src={post.hero_image_url || fallbackImage}
            alt={post.hero_image_alt || post.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              if (!event.currentTarget.dataset.fallback) {
                event.currentTarget.dataset.fallback = '1';
                event.currentTarget.src = fallbackImage;
              }
            }}
          />
        </div>
      </div>

      <section className="pb-20 lg:pb-28">
        <div className="ei-container grid max-w-[1100px] gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          <div className="max-w-[760px]">
            <div className="border-l-2 border-[#d91c23] pl-5 text-[13px] leading-7 text-slate-500">
              This article provides general information only. It is not a personalised recommendation, approval, binding offer or guarantee of outcome. Formal terms and documentation take precedence where applicable.
            </div>
            <div className="mt-10">{renderBody(post.body)}</div>
          </div>

          <aside className="h-fit border-t border-slate-300 pt-5 lg:sticky lg:top-28">
            <div className="text-[10px] font-[750] uppercase tracking-[0.14em] text-slate-400">About the author</div>
            <div className="mt-5 flex items-center gap-3">
              {author?.avatar_url ? (
                <img src={author.avatar_url} alt={author.name || 'Article author'} className="h-12 w-12 rounded-full object-cover" loading="lazy" decoding="async" />
              ) : (
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#080642] text-[13px] font-[750] text-white">EI</div>
              )}
              <div>
                <div className="text-[13px] font-[700] text-[#080642]">{author?.name || 'Emunahh-Invest Editorial Team'}</div>
                {author?.role_title && <div className="mt-0.5 text-[11px] text-slate-400">{author.role_title}</div>}
              </div>
            </div>
            {author?.bio && <p className="mt-5 text-[12px] leading-6 text-slate-500">{author.bio}</p>}
            {!!post.tags?.length && (
              <div className="mt-7 border-t border-slate-200 pt-5">
                <div className="text-[10px] font-[750] uppercase tracking-[0.14em] text-slate-400">Topics</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f6f7f9] px-3 py-1.5 text-[10px] font-[650] text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {!!related.length && (
        <section className="border-t border-slate-200 bg-[#f6f7f9]">
          <div className="ei-container py-16 lg:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="ei-eyebrow">Related insights</div>
                <h2 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] text-[#080642]">Continue the conversation.</h2>
              </div>
              <Link to="/blog" className="hidden items-center gap-2 text-[12px] font-[700] text-[#0d0a64] hover:text-[#d91c23] sm:inline-flex">
                View all insights
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid border-t border-slate-300 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="group border-b border-slate-300 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <div className="text-[10px] font-[750] uppercase tracking-[0.14em] text-[#d91c23]">{getPostCategory(item)?.name || 'Insight'}</div>
                  <h3 className="mt-5 text-[19px] leading-7 text-[#080642] transition-colors group-hover:text-[#d91c23]">{item.title}</h3>
                  <p className="mt-3 text-[12px] leading-6 text-slate-500">{item.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-[700] text-[#0d0a64]">
                    Read insight
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#080642] text-white">
        <div className="ei-container grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
          <div>
            <div className="text-[10px] font-[750] uppercase tracking-[0.15em] text-white/45">Discuss your objective</div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.5rem)] text-white">General insight is only the starting point.</h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/62">If you want to discuss your own circumstances, use the enquiry process to provide the context our team needs.</p>
          </div>
          <Link to="/apply" className="ei-btn-primary min-w-[185px]">
            Start an enquiry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </article>
  );
};
