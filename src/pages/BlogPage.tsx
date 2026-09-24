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
      title: 'How to Navigate Student Loan Applications for Nigerian Universities and Professional Bodies',
      excerpt:
        'A comprehensive guide for Nigerian undergraduates, postgraduates, and professional candidates (ICAN, Law School) preparing documentation for institutional tuition financing.',
      content: [
        'Higher education and professional certifications represent the highest-return investments an individual or family can make in Nigeria. However, university registration deadlines and examination fees frequently coincide with periods of tight household liquidity.',
        'At Emunahh-Invest Limited, our student loan process is designed around institutional remittance. Unlike general cash credit, funds are paid straight to your school or examination body. This guarantees tuition clearance and protects students from academic disruption.',
        'Key documentation needed for swift approval includes your official admission letter or active semester course registration, the school-issued payment schedule or remita invoice, valid Nigerian identification (NIN or Voter’s Card), and verified documentation of an employed or commercially active guarantor.',
        'When planning your repayment horizon, always align milestone dates with your family sponsor’s cash flow cycles—whether monthly salary disbursement or quarterly commercial trade intervals.',
      ],
    },
    {
      id: 'wealth-preservation-nigeria',
      category: 'Wealth & Investment',
      readTime: '6 min read',
      date: 'August 2026',
      author: 'Emunahh Advisory Desk',
      title: 'Capital Preservation in Nigeria: Structuring Prudent Wealth Against Inflation',
      excerpt:
        'Why speculative get-rich-quick schemes fail Nigerian investors, and how disciplined, real-economy financial structuring safeguards purchasing power over time.',
      content: [
        'Managing capital in a high-inflation economic environment requires discipline over speculation. Too many individuals fall victim to unverified digital schemes promising improbable double-digit monthly returns, only to suffer catastrophic loss of principal.',
        'True wealth management begins with the inviolable principle of capital preservation: ensuring that the nominal principal is anchored in real-economy assets, verified corporate cash-flow, and legal transparency.',
        'By staggering investment horizons into short-term liquidity buffers and medium-term asset-backed growth vehicles, investors in Lagos and nationwide maintain accessibility while shielding their hard-earned capital from currency erosion.',
        'Consulting an on-ground, accessible advisory team at a physical office provides legal recourse and transparent reporting that anonymous online platforms can never match.',
      ],
    },
    {
      id: 'sme-working-capital',
      category: 'Business Growth',
      readTime: '4 min read',
      date: 'July 2026',
      author: 'Emunahh Commercial Credit',
      title: 'Working Capital vs. Asset Loans: Which Financing Fits Your Lagos Enterprise?',
      excerpt:
        'Understanding how to match credit products with your commercial cash-flow cycle to avoid over-leveraging and maintain healthy supplier relationships.',
      content: [
        'Nigerian retail merchants and service contractors frequently experience growth paradoxes: sales are surging, orders are booked, but cash is trapped in receivables or tied up in inventory replenishment.',
        'When evaluating debt financing, business operators must strictly distinguish between operational working capital (short-term cash to fulfill purchase orders or restock high-demand goods) and asset acquisition financing (long-term amortized capital to buy delivery vehicles, commercial generators, or specialized equipment).',
        'Financing seasonal inventory with a multi-year term creates unnecessary interest drag, while purchasing long-term machinery with short-term credit strains daily operations. Emunahh-Invest assesses real bank ledger turnover to match facility duration directly to your commercial cash-conversion cycle.',
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
        'Sponsoring a child or relative through university in Nigeria is a badge of honor, but sudden economic shifts can make lump-sum tuition payments burdensome.',
        'By partnering with Emunahh-Invest, sponsors convert large seasonal tuition burdens into predictable monthly installments, maintaining household savings and ensuring academic continuity for their wards.',
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
      <section className="bg-[#F8F7F3] border-b border-[#071A2B]/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-[#087A5A] font-bold tracking-widest uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Insights & Advisory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-[-0.03em] leading-tight">
              Financial Knowledge & Education Insights
            </h1>
            <p className="text-sm sm:text-base text-[#17202A]/80 leading-relaxed font-normal">
              Practical perspectives on navigating university fees, structured SME financing, and capital preservation in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Controls: Category Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#071A2B]/10">
            <div className="flex items-center flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#071A2B] text-white border-[#071A2B]'
                      : 'bg-white text-[#17202A] border-[#071A2B]/15 hover:border-[#087A5A]'
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
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-md border border-[#071A2B]/15 focus:outline-hidden focus:border-[#087A5A]"
              />
            </div>
          </div>

          {/* Featured Article (if available) */}
          {featured && (
            <article className="bg-[#F8F7F3] rounded-lg border border-[#071A2B]/12 p-6 sm:p-8 shadow-2xs hover:border-[#087A5A]/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#087A5A]">
                    <span className="px-2.5 py-0.5 rounded bg-[#087A5A]/10 text-[10px] uppercase font-bold tracking-wider">
                      Featured · {featured.category}
                    </span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                    <span>·</span>
                    <span className="text-[#17202A]/60">{featured.date}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#071A2B] tracking-tight leading-snug">
                    {featured.title}
                  </h2>

                  <p className="text-sm text-[#17202A]/80 leading-relaxed font-normal">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#071A2B]/10 lg:pl-6">
                  <div className="text-xs text-[#17202A]/60">
                    Authored by <strong className="text-[#071A2B] block">{featured.author}</strong>
                  </div>
                  <button
                    onClick={() => setSelectedPost(featured)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#071A2B] hover:bg-[#087A5A] text-white text-xs font-bold rounded-md transition-colors shadow-2xs cursor-pointer"
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
                  className="bg-white rounded-lg border border-[#071A2B]/12 p-6 flex flex-col justify-between hover:border-[#087A5A]/40 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#17202A]/60 pb-2.5 border-b border-[#071A2B]/8">
                      <span className="text-[#087A5A] font-bold text-[10px] uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#071A2B] group-hover:text-[#087A5A] leading-snug transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#17202A]/75 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#071A2B]/8 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#17202A]/60">{post.author}</span>
                    <span className="font-bold text-[#087A5A] group-hover:text-[#04513E] inline-flex items-center gap-1">
                      <span>Read</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#071A2B]/20 rounded-lg space-y-2">
              <p className="text-sm font-bold text-[#071A2B]">No articles found</p>
              <p className="text-xs text-[#17202A]/60">Try adjusting your search query or selected category.</p>
            </div>
          )}

        </div>
      </section>

      {/* Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-[#071A2B]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl overflow-y-auto border border-[#071A2B]/15">
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#087A5A]">
                  <span className="px-2 py-0.5 rounded bg-[#087A5A]/10 uppercase text-[10px] tracking-wider font-bold">
                    {selectedPost.category}
                  </span>
                  <span>·</span>
                  <span>{selectedPost.readTime}</span>
                  <span>·</span>
                  <span className="text-gray-500">{selectedPost.date}</span>
                </div>
                
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded-md text-gray-400 hover:text-[#071A2B] hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#071A2B] leading-tight">
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071A2B] hover:text-[#087A5A] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Insights</span>
                </button>

                <a
                  href={`https://wa.me/2348023190807?text=Hello%20Emunahh-Invest,%20I%20just%20read%20your%20article%20on%20"${encodeURIComponent(selectedPost.title)}"%20and%20would%20like%20to%20consult.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] px-4 py-2.5 rounded-md transition-colors shadow-2xs"
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
