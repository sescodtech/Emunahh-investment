import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';
import { ServiceType } from '../types';
import defaultHeroImg from '../assets/images/nigerian_professional_hero_1790151218863.webp';

interface HeroProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply }) => {
  const { content } = useContent();
  const heroData = content.hero;

  const [selectedCategory, setSelectedCategory] = useState<'student' | 'investment' | 'business' | 'personal'>('student');

  const categoryCards = {
    student: {
      title: 'Education Financing',
      desc: 'Tuition and academic clearance remitted directly to accredited institutions.',
      path: '/student-loans',
      cta: 'Apply for this service',
    },
    investment: {
      title: 'Investment Services',
      desc: 'Structured placements backed by productive real assets with legal covenants.',
      path: '/investments',
      cta: 'Start an enquiry',
    },
    business: {
      title: 'Business Financing',
      desc: 'Working capital underwritten on verified commercial velocity and turnover.',
      path: '/business-financing',
      cta: 'Apply for this service',
    },
    personal: {
      title: 'Personal Finance',
      desc: 'Salary-backed facilities for verified professionals with predictable terms.',
      path: '/personal-finance',
      cta: 'Apply for this service',
    },
  };

  const currentImage = heroData.imageUrl || defaultHeroImg.src;

  return (
    <section className="relative bg-[#e3fff2] text-[#17202A] pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-[#0d0a64]/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow with Subtle Gold/Navy Line */}
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="h-px w-8 bg-[#e3fff2]" aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0d0a64] uppercase">
            {heroData.eyebrow}
          </span>
          <span className="h-px w-8 bg-[#e7020b]/30" aria-hidden="true" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Major Editorial Typography & Action Hierarchy (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Main Headline: High contrast, authoritative typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-[#0d0a64] tracking-[-0.035em] leading-[1.12]"
            >
              {heroData.heading.split(heroData.highlightWord)[0]}
              <span className="text-[#e7020b] inline-block font-extrabold relative">
                {heroData.highlightWord}
                {/* Subtle under-accent line in subtle gold */}
                <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-[#e3fff2]/70 rounded-full" />
              </span>
            </motion.h1>

            {/* Supporting Copy: Concrete, grounded, highly legible */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-[#17202A]/80 leading-relaxed font-normal max-w-xl"
            >
              {heroData.description}
            </motion.p>

            {/* CTAs: Primary & Secondary with disciplined button styling */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-white bg-[#e7020b] hover:bg-[#a3140a] active:scale-[0.98] rounded-md transition-all shadow-[0_2px_10px_rgba(8,122,90,0.2)] group"
              >
                <span>{heroData.primaryCta}</span>
                <ArrowDown className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-y-0.5 text-white/90" />
              </a>

              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-6 py-3.5 text-xs font-bold text-[#0d0a64] bg-white hover:bg-[#e3fff2] active:scale-[0.98] border border-[#0d0a64]/25 rounded-md transition-all shadow-xs group"
              >
                <span>{heroData.secondaryCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#e7020b]" />
              </Link>
            </motion.div>

            {/* Editorial Category Quick-Selector */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="pt-5 border-t border-[#0d0a64]/10"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0d0a64]/75 mb-2.5 flex items-center justify-between">
                <span>Direct Solutions Routing</span>
                <span className="text-[#e7020b] font-semibold text-[10px] tracking-normal">Quick navigation</span>
              </div>

              {/* Segmented Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
                {(['student', 'investment', 'business', 'personal'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 text-xs font-semibold rounded-md border text-left transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0d0a64] text-white border-[#0d0a64] shadow-xs'
                        : 'bg-white text-[#17202A] border-[#0d0a64]/15 hover:border-[#e7020b]/40'
                    }`}
                  >
                    <span className="capitalize">{cat === 'student' ? 'Education' : cat === 'investment' ? 'Investment' : cat === 'business' ? 'Business' : 'Personal'}</span>
                  </button>
                ))}
              </div>

              {/* Active Selection Information Strip */}
              <div className="p-3.5 bg-white border border-[#0d0a64]/10 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#0d0a64]">
                    {categoryCards[selectedCategory].title}
                  </div>
                  <div className="text-[11px] text-[#17202A]/70">
                    {categoryCards[selectedCategory].desc}
                  </div>
                </div>
                <Link
                  to={categoryCards[selectedCategory].path}
                  className="inline-flex items-center text-xs font-bold text-[#e7020b] hover:text-[#a3140a] shrink-0 group"
                >
                  <span>{categoryCards[selectedCategory].cta}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </motion.div>

          </div>

          {/* RIGHT: Professional financial advisory setting (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Subtle Gold Accent Frame Geometry behind */}
              <div className="absolute -inset-1 border border-[#e3fff2]/45 rounded-xl pointer-events-none transform -rotate-0.5" />
              
              {/* Primary Image Container with Navy Framing and Controlled Radius */}
              <div className="relative rounded-xl overflow-hidden border-2 border-[#0d0a64] bg-[#0d0a64] shadow-[0_16px_36px_-12px_rgba(7,26,43,0.25)]">
                <img
                  src={currentImage}
                  alt="Emunahh-Invest professional financial advisory"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-top transition-transform duration-700 hover:scale-[1.01]"
                  loading="eager"
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src=defaultHeroImg.src; }}
                />
                
                {/* Clear, Non-Obstructive Lower Banner (Doesn't cover face) */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0d0a64] via-[#0d0a64]/85 to-transparent text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e3fff2]">
                        Professional Advisory Desk
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        Emunahh-Invest Limited
                      </div>
                    </div>
                    <div className="h-7 w-7 rounded-md bg-[#e7020b] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Advisory Status Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                className="flex absolute -top-2.5 -right-2.5 items-center gap-1.5 px-3 py-1.5 bg-[#0d0a64] text-white text-[10px] font-bold tracking-wider rounded-md border border-[#e3fff2]/60 shadow-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#e7020b] animate-pulse" />
                <span>OFFICIAL ADVISORY</span>
              </motion.div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
