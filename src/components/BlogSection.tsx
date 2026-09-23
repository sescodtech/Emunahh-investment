import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Clock, X, ArrowLeft, UserCheck, MessageSquare } from 'lucide-react';

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
    <section id="blog" className="py-20 lg:py-28 bg-[#FBFBF9] border-b border-[#1E242B]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1E242B]/10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#00A859] font-semibold tracking-wider uppercase">
              <span>Financial Education & Insights</span>
              <span aria-hidden="true">·</span>
              <span>Emunahh Knowledge Base</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#002B99] tracking-tight leading-tight">
              Practical Perspectives for Nigerian Scholars & Enterprises
            </h2>
            <p className="text-sm sm:text-base text-[#1E242B]/75 leading-relaxed font-light">
              Clear, honest analysis on navigating education financing, structuring commercial credit, 
              and protecting family wealth in Nigeria.
            </p>
          </div>

          <a
            href="https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20have%20questions%20regarding%20your%20financial%20advisory%20articles."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002B99] hover:text-[#00A859] transition-colors py-1 self-start md:self-end"
          >
            <span>Ask an Advisor on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-[#1E242B]/10 p-7 flex flex-col justify-between hover:border-[#002B99]/30 transition-all shadow-xs group"
            >
              <div>
                {/* Zero-Pill Metadata Line */}
                <div className="flex items-center gap-2 text-xs text-[#1E242B]/50 pb-4 mb-4 border-b border-[#1E242B]/10 font-medium">
                  <span className="text-[#00A859] font-semibold">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-semibold text-[#002B99] group-hover:text-[#001f6e] leading-snug mb-3 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#1E242B]/70 leading-relaxed font-normal mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E242B]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#1E242B]/50">{post.author}</span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#002B99] hover:text-[#00A859] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080F1D]/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl border border-[#1E242B]/15 overflow-hidden my-8 p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E242B]/10 mb-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E242B]/70 hover:text-[#002B99]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Articles</span>
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
                className="p-1 rounded text-[#1E242B]/60 hover:text-[#1E242B] hover:bg-[#1E242B]/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs text-[#00A859] font-medium mb-3">
              <span>{selectedPost.category}</span>
              <span aria-hidden="true" className="text-[#1E242B]/30">·</span>
              <span className="text-[#1E242B]/60">{selectedPost.readTime}</span>
              <span aria-hidden="true" className="text-[#1E242B]/30">·</span>
              <span className="text-[#1E242B]/60">{selectedPost.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#002B99] leading-tight mb-4">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-[#1E242B]/60 mb-6 pb-6 border-b border-[#1E242B]/10">
              <UserCheck className="w-4 h-4 text-[#00A859]" />
              <span>Written by {selectedPost.author} · Emunahh-Invest Limited</span>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-sm sm:text-base text-[#1E242B]/85 leading-relaxed font-light">
              {selectedPost.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Direct Consultation prompt inside blog */}
            <div className="mt-8 p-5 rounded-lg bg-[#002B99]/5 border border-[#002B99]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#002B99]">Have questions regarding this topic?</div>
                <div className="text-xs text-[#1E242B]/70 mt-0.5">
                  Discuss your scenario with an Emunahh advisor at our Lagos headquarters or on WhatsApp.
                </div>
              </div>
              <a
                href={`https://wa.me/2348179171456?text=Hello%20Emunahh,%20I%20just%20read%20your%20article%20on%20"${encodeURIComponent(selectedPost.title)}"%20and%20would%20like%20to%20consult.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-colors whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>Chat on WhatsApp (+234 817 917 1456)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
