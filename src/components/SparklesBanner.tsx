import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { SparklesCore } from './ui/sparkles';

export const SparklesBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#071A2B] text-white py-24 sm:py-32 overflow-hidden border-y border-white/10 flex flex-col items-center justify-center">
      
      {/* Sparkles Particle Layer */}
      <div className="w-full absolute inset-0 h-full pointer-events-none">
        <SparklesCore
          id="tsparticlesexecutive"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          particleColors={['#FFFFFF', '#C6A15B', '#087A5A']}
          className="w-full h-full"
        />
      </div>

      {/* Radiant Glow Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-[#087A5A]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-6">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B] shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Institutional Capital & Education Support</span>
        </div>

        {/* Grand Headline with Aceternity-inspired Editorial Impact */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[-0.035em] leading-[1.15] max-w-4xl mx-auto">
          Financial Solutions Engineered for Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#C6A15B] to-[#087A5A]">
            Next Chapter.
          </span>
        </h2>

        {/* Aceternity Core Radiant Lines */}
        <div className="w-full max-w-2xl mx-auto relative h-8 flex items-center justify-center">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#087A5A] to-transparent h-[2px] w-3/4 blur-xs" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent h-px w-3/4" />
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#087A5A] to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-[#FFFFFF] to-transparent h-px w-1/4" />
        </div>

        {/* Grounded Description */}
        <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto font-normal leading-relaxed">
          From accredited university tuition disbursement to disciplined commercial liquidity, 
          we structure dependable financing with total clarity and zero hidden catches.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold text-[#071A2B] bg-white hover:bg-[#F8F7F3] rounded-md transition-all shadow-[0_0_24px_rgba(255,255,255,0.2)] group"
          >
            <span>START YOUR APPLICATION</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#087A5A]" />
          </Link>

          <Link
            to="/student-loans"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-md transition-all shadow-md"
          >
            <span>EXPLORE STUDENT LOANS</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
