import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, X, ArrowLeft, BookOpen } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface BlogPost {
  id: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  author: string;
  content: string[];
}

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 'student-loans-guide',
      category: 'Education Financing',
      readTime: '5 min read',
      date: 'September 2026',
      author: 'Emunahh Academic Desk',
      title: 'How to Approach Education Financing Responsibly',
      excerpt:
        'A practical guide to understanding education-financing applications, documentation and repayment expectations.',
      content: [
        'Education and professional development can require significant upfront funding at important moments. Registration deadlines, tuition schedules and examination fees can also arrive before a household has planned for the full cash requirement.',
        'A responsible education-financing process should begin with a clear understanding of the programme, institution, fee obligation, applicant or sponsor profile and the timing of the commitment. The appropriate structure depends on assessment, documentation and approval.',
        'Useful documentation can include admission or enrolment evidence, an official fee invoice, identification and information that helps demonstrate repayment capacity.',
        'When considering repayment, align the proposed schedule with realistic and documented income or sponsor cash-flow patterns rather than optimistic assumptions.',
      ],
    },
    {
      id: 'wealth-preservation-nigeria',
      category: 'Wealth & Investment',
      readTime: '6 min read',
      date: 'August 2026',
      author: 'Emunahh Advisory Desk',
      title: 'Capital Preservation: Building a Disciplined Investment Approach',
      excerpt:
        'Why disciplined investment planning matters and how clear objectives, time horizons and responsible structures can protect long-term capital decisions.',
      content: [
        'Managing capital in uncertain markets requires discipline, clear objectives and an understanding of risk. Decisions should not be based on promotional return claims without considering the underlying structure, liquidity and downside exposure.',
        'A disciplined investment process begins by defining the objective, time horizon, liquidity needs and risk tolerance, then reviewing the terms and underlying exposure of any opportunity before making a decision.',
        'Separating near-term liquidity needs from longer-term investment capital can help investors avoid committing funds that may be required unexpectedly and can support a more deliberate portfolio structure.',
        'Before committing capital, investors should understand who they are dealing with, what documentation governs the arrangement, how reporting works and what risks or restrictions may apply.',
      ],
    },
    {
      id: 'sme-working-capital',
      category: 'Business Growth',
      readTime: '4 min read',
      date: 'July 2026',
      author: 'Emunahh Commercial Credit',
      title: 'Working Capital vs. Asset Finance: Matching Funding to the Business Need',
      excerpt:
        'Understanding how to match financing structure with the business cash-flow cycle can reduce unnecessary strain and support more sustainable borrowing decisions.',
      content: [
        'Business owners and service operators frequently experience growth paradoxes: sales are surging, orders are booked, but cash is trapped in receivables or tied up in inventory replenishment.',
        'When evaluating financing, business operators should distinguish between short-cycle working-capital needs and longer-lived asset or expansion requirements. The financing term should be appropriate for the purpose and expected cash-generation period.',
        'Using a long-term facility for a short seasonal requirement can increase total financing cost, while relying on very short-term credit for a long-lived asset can pressure operating cash flow. Assessment should consider the purpose, timing and repayment capacity together.',
      ],
    },
    {
      id: 'sponsor-guarantor-guide',
      category: 'Education Financing',
      readTime: '4 min read',
      date: 'June 2026',
      author: 'Emunahh Credit Committee',
      title: 'Parent & Sponsor Guide: Structuring Education Loan Guarantees Responsibly',
      excerpt:
        'What sponsors and working parents need to know about co-signing student loan facilities and scheduling monthly contributions.',
      content: [
        'Supporting a student or learner can require careful planning when large tuition or education commitments fall due at once.',
        'Sponsors considering education financing should understand the total obligation, repayment schedule and affordability implications before accepting any arrangement.',
      ],
    },
  ];

  const categories = ['All', 'Education Financing', 'Wealth & Investment', 'Business Growth'];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const supporting = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#e3fff2] border-b border-[#0d0a64]/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-[#e7020b] font-bold tracking-widest uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0a64] tracking-[-0.03em] leading-tight">
              The Emunahh-Invest Blog
            </h1>
            <p className="text-sm sm:text-base text-[#17202A]/80 leading-relaxed font-normal">
              Practical perspectives on education finance, business funding, personal finance and responsible investing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Controls: Category Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#0d0a64]/10">
            <div className="flex items-center flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#0d0a64] text-white border-[#0d0a64]'
                      : 'bg-white text-[#17202A] border-[#0d0a64]/15 hover:border-[#e7020b]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-md border border-[#0d0a64]/15 focus:outline-hidden focus:border-[#e7020b]"
              />
            </div>
          </div>

          {/* Featured Article (if available) */}
          {featured && (
            <article className="bg-[#e3fff2] rounded-xl border border-[#0d0a64]/12 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#e7020b]/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#e7020b]">
                    <span className="px-2.5 py-0.5 rounded bg-[#e7020b]/10 text-[10px] uppercase font-bold tracking-wider">
                      Featured · {featured.category}
                    </span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                    <span>·</span>
                    <span className="text-[#17202A]/60">{featured.date}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0d0a64] tracking-tight leading-snug">
                    {featured.title}
                  </h2>

                  <p className="text-sm text-[#17202A]/80 leading-relaxed font-normal">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#0d0a64]/10 lg:pl-6">
                  <div className="text-xs text-[#17202A]/60">
                    Authored by <strong className="text-[#0d0a64] block">{featured.author}</strong>
                  </div>
                  <button
                    onClick={() => setSelectedPost(featured)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0d0a64] hover:bg-[#e7020b] text-white text-xs font-bold rounded-md transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Supporting Articles Grid */}
          {supporting.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {supporting.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-[#0d0a64]/12 p-6 flex flex-col justify-between hover:border-[#e7020b]/40 shadow-sm hover:shadow-xs transition-all group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#17202A]/60 pb-2.5 border-b border-[#0d0a64]/8">
                      <span className="text-[#e7020b] font-bold text-[10px] uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0d0a64] group-hover:text-[#e7020b] leading-snug transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#17202A]/75 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#0d0a64]/8 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#17202A]/60">{post.author}</span>
                    <span className="font-bold text-[#e7020b] group-hover:text-[#a3140a] inline-flex items-center gap-1">
                      <span>Read</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#0d0a64]/20 rounded-xl space-y-2">
              <p className="text-sm font-bold text-[#0d0a64]">No articles found</p>
              <p className="text-xs text-[#17202A]/60">Try adjusting your search query or selected category.</p>
            </div>
          )}

        </div>
      </section>

      {/* Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-[#0d0a64]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl overflow-y-auto border border-[#0d0a64]/15">
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#e7020b]">
                  <span className="px-2 py-0.5 rounded bg-[#e7020b]/10 uppercase text-[10px] tracking-wider font-bold">
                    {selectedPost.category}
                  </span>
                  <span>·</span>
                  <span>{selectedPost.readTime}</span>
                  <span>·</span>
                  <span className="text-gray-500">{selectedPost.date}</span>
                </div>
                
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded-md text-gray-400 hover:text-[#0d0a64] hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d0a64] leading-tight">
                  {selectedPost.title}
                </h3>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>Author: {selectedPost.author}</span>
                  <span>·</span>
                  <span>Emunahh-Invest Research</span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#17202A]/85 leading-relaxed font-normal border-t border-b border-gray-100 py-6">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Modal Footer Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d0a64] hover:text-[#e7020b] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Insights</span>
                </button>

                <a
                  href={`https://wa.me/2348023190807?text=Hello%20Emunahh-Invest,%20I%20just%20read%20your%20article%20on%20"${encodeURIComponent(selectedPost.title)}"%20and%20would%20like%20to%20consult.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#e7020b] hover:bg-[#a3140a] px-4 py-2.5 rounded-md transition-colors shadow-sm"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>Consult Advisory Desk</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
