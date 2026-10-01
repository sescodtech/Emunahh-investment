import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Search } from 'lucide-react';
import fallbackImageImport from '../assets/images/investment_advisory_meeting.webp';
import {
  fetchBlogCategories,
  fetchPublishedPosts,
  formatInsightDate,
  getPostAuthor,
  getPostCategory,
  type BlogCategory,
  type BlogPost,
} from '../lib/blog';
import { PageLoader } from '../components/PageLoader';
import { usePageMetadata } from '../lib/pageMetadata';

const fallbackImage = typeof fallbackImageImport === 'string' ? fallbackImageImport : String((fallbackImageImport as any)?.src || '');

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  usePageMetadata({
    title: 'Insights | Emunahh-Invest',
    description:
      'General perspectives on financial planning, education financing, business funding and disciplined investment decision-making.',
  });

  useEffect(() => {
    let active = true;
    Promise.all([fetchPublishedPosts(), fetchBlogCategories()])
      .then(([postRows, categoryRows]) => {
        if (!active) return;
        setPosts(postRows);
        setCategories(categoryRows);
      })
      .catch((reason) => {
        if (!active) return;
        console.error(reason);
        setError('Insights are temporarily unavailable. Please try again shortly.');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((post) => {
      const category = getPostCategory(post);
      const categoryMatch = activeCategory === 'all' || category?.slug === activeCategory;
      const searchMatch =
        !q ||
        `${post.title} ${post.excerpt} ${(post.tags || []).join(' ')}`.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [posts, activeCategory, search]);

  const featured = filtered.find((post) => post.is_featured) || filtered[0] || null;
  const supporting = featured ? filtered.filter((post) => post.id !== featured.id) : filtered;

  if (loading) return <PageLoader label="Loading insights" />;

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-[#f6f7f9]">
        <div className="ei-container grid gap-10 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:py-24">
          <div>
            <div className="ei-eyebrow">Insights</div>
            <h1 className="mt-5 text-[clamp(2.65rem,6vw,5.2rem)] leading-[1] text-[#080642]">
              Perspective for clearer financial decisions.
            </h1>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-[17px] leading-8 text-slate-600">
              General educational perspectives on financing, business, personal financial planning and disciplined investment decision-making.
            </p>
            <p className="mt-5 border-t border-slate-300 pt-5 text-[12px] leading-6 text-slate-500">
              Insights are provided for general information only. They do not constitute a personalised recommendation, approval, offer or guarantee of outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="ei-container flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-[700] transition-colors ${
                activeCategory === 'all' ? 'bg-[#080642] text-white' : 'bg-[#f6f7f9] text-slate-600 hover:text-[#080642]'
              }`}
            >
              All insights
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-[700] transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-[#080642] text-white'
                    : 'bg-[#f6f7f9] text-slate-600 hover:text-[#080642]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">Search insights</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search insights"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-[13px] text-slate-700 outline-none transition focus:border-[#0d0a64]"
            />
          </label>
        </div>
      </section>

      {error && (
        <div className="ei-container py-8">
          <div className="border border-amber-200 bg-amber-50 px-5 py-4 text-[13px] text-amber-800">{error}</div>
        </div>
      )}

      {featured && (
        <section className="ei-section bg-white">
          <div className="ei-container">
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden border-y border-slate-300 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="relative min-h-[330px] overflow-hidden bg-slate-100 lg:min-h-[520px]">
                <img
                  src={featured.hero_image_url || fallbackImage}
                  alt={featured.hero_image_alt || featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(event) => {
                    if (!event.currentTarget.dataset.fallback) {
                      event.currentTarget.dataset.fallback = '1';
                      event.currentTarget.src = fallbackImage;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080642]/35 to-transparent" />
              </div>
              <div className="flex flex-col justify-center bg-[#080642] px-7 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-[750] uppercase tracking-[0.14em] text-white/55">
                  <span>{getPostCategory(featured)?.name || 'Insight'}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.reading_time_minutes} min read</span>
                </div>
                <h2 className="mt-7 text-[clamp(2rem,4vw,3.8rem)] leading-[1.06] text-white">{featured.title}</h2>
                <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/68">{featured.excerpt}</p>
                <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/16 pt-5">
                  <div className="text-[11px] text-white/50">
                    {formatInsightDate(featured.published_at)}
                    {getPostAuthor(featured)?.name ? ` · ${getPostAuthor(featured)?.name}` : ''}
                  </div>
                  <span className="inline-flex items-center gap-2 text-[12px] font-[700] text-white">
                    Read featured insight
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className={`${featured ? 'pb-24 lg:pb-32' : 'ei-section'} bg-white`}>
        <div className="ei-container">
          <div className="flex items-end justify-between gap-6 border-b border-slate-300 pb-5">
            <div>
              <div className="ei-eyebrow">Latest thinking</div>
              <h2 className="mt-4 text-[clamp(1.9rem,3.5vw,3rem)] text-[#080642]">Explore our latest insights.</h2>
            </div>
            <span className="hidden text-[12px] text-slate-400 sm:block">{filtered.length} article{filtered.length === 1 ? '' : 's'}</span>
          </div>

          {supporting.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {supporting.map((post) => {
                const category = getPostCategory(post);
                return (
                  <article
                    key={post.id}
                    className="group border-b border-slate-300 py-8 md:px-7 md:first:pl-0 lg:border-r lg:last:border-r-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0"
                  >
                    {post.hero_image_url && (
                      <Link to={`/blog/${post.slug}`} className="mb-6 block aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={post.hero_image_url}
                          alt={post.hero_image_alt || post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-[750] uppercase tracking-[0.14em] text-[#d91c23]">
                        {category?.name || 'Insight'}
                      </span>
                      <span className="text-[11px] text-slate-400">{post.reading_time_minutes} min</span>
                    </div>
                    <h3 className="mt-5 text-[21px] leading-7 text-[#080642] transition-colors group-hover:text-[#d91c23]">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-4 text-[13px] leading-6 text-slate-600">{post.excerpt}</p>
                    <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                      <span className="text-[11px] text-slate-400">{formatInsightDate(post.published_at)}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        aria-label={`Read ${post.title}`}
                        className="inline-flex items-center gap-1.5 text-[12px] font-[700] text-[#0d0a64] hover:text-[#d91c23]"
                      >
                        Read
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <BookOpen className="mx-auto h-7 w-7 text-slate-300" />
              <h3 className="mt-4 text-[18px] text-[#080642]">No insights match your search.</h3>
              <p className="mt-2 text-[13px] text-slate-500">Try another category or search term.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f6f7f9]">
        <div className="ei-container grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
          <div>
            <div className="text-[10px] font-[750] uppercase tracking-[0.15em] text-[#d91c23]">From insight to action</div>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.9rem,3.5vw,3.1rem)] text-[#080642]">
              Need to discuss a financial objective in context?
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-slate-600">
              Our published insights are general. If you want to discuss your own circumstances, start with a direct enquiry to our team.
            </p>
          </div>
          <Link to="/contact" className="ei-btn-primary min-w-[180px]">
            Contact our team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
