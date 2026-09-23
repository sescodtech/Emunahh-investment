import React, { useState } from 'react';
import { ArrowUpRight, Clock, X, ArrowLeft, MessageSquare } from 'lucide-react';

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

export const BlogSection: React.FC = () => {
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
  ];

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-150">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
              Financial Education & Insights
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
              Practical Perspectives for Nigerian Scholars & Enterprises
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Clear, honest analysis on navigating education financing, structuring commercial credit, 
              and protecting family wealth in Nigeria.
            </p>
          </div>

          <a
            href="https://wa.me/2348023190807?text=Hello%20Emunahh,%20I%20have%20questions%20regarding%20your%20financial%20advisory%20articles."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors py-1 self-start md:self-end"
          >
            <span>Ask an Advisor on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-gray-200 p-7 flex flex-col justify-between hover:border-[#002B99]/40 hover:shadow-xs transition-all group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 pb-3 mb-3 border-b border-gray-100 font-medium">
                  <span className="text-[#00A859] font-bold">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#00174D] group-hover:text-[#002B99] leading-snug mb-2 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.author}</span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-bold text-[#002B99] hover:text-[#00A859] flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-gray-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-150 pb-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002B99] hover:text-[#00174D] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-[#00A859] uppercase tracking-wider">
                {selectedPost.category} · {selectedPost.readTime}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#00174D] leading-tight">
                {selectedPost.title}
              </h2>
              <div className="text-xs text-gray-500">
                Published by {selectedPost.author} · {selectedPost.date}
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed border-t border-gray-150 pt-4">
              {selectedPost.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="border-t border-gray-150 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="https://wa.me/2348023190807"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#00A859] hover:bg-[#008f4c] px-4 py-2.5 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss with Our Financial Desk</span>
              </a>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
