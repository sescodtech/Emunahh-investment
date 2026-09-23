import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: About Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#087A5A] uppercase tracking-[0.15em]">
                Corporate Heritage & Governance
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071A2B] tracking-tight leading-tight">
                An Established Financial Institution Founded to Build Real Possibilities
              </h2>
            </div>

            <div className="space-y-4 text-base text-[#17202A]/75 leading-relaxed font-light">
              <p>
                <strong className="text-[#071A2B] font-semibold">Emunahh-Invest Limited</strong> is a registered 
                Nigerian financial and investment company headquartered in Lagos. Established on the core belief 
                that financial services must be straightforward, ethical, and accessible, we bridge critical liquidity 
                gaps for students, working families, and growing commercial enterprises.
              </p>
              <p>
                In an era dominated by opaque algorithms and impersonal mobile loan apps, we take pride in human-centered, 
                responsible financing. Our specialized student loan division ensures that tuition deadlines do not derail 
                promising Nigerian futures, while our wealth advisory and business financing desks provide solid capital 
                foundations for long-term prosperity.
              </p>
            </div>

            {/* Mission & Vision Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-xl bg-[#F8F7F3] border border-gray-200 space-y-2">
                <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                  Our Mission
                </div>
                <div className="text-base font-bold text-[#071A2B]">
                  Democratizing Progress
                </div>
                <p className="text-xs text-[#17202A]/70 leading-relaxed font-normal">
                  To provide transparent, dependable education financing and disciplined wealth solutions that 
                  accelerate academic excellence and commercial progress across Nigeria.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#F8F7F3] border border-gray-200 space-y-2">
                <div className="text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                  Our Vision
                </div>
                <div className="text-base font-bold text-[#071A2B]">
                  Nigeria's Most Trusted Partner
                </div>
                <p className="text-xs text-[#17202A]/70 leading-relaxed font-normal">
                  To be Nigeria’s most trusted, accessible financial partner recognized for integrity, 
                  uncompromising clarity, and genuine client empowerment.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors"
              >
                <span>Read Full Corporate Profile & Leadership</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Corporate Headquarters Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#F8F7F3] border border-gray-200 space-y-6 shadow-xs">
              
              {/* Logo Lockup */}
              <Logo variant="light" size="lg" layout="stacked" />

              <div className="pt-6 border-t border-gray-200 space-y-4 text-xs text-[#17202A]/80">
                <div>
                  <span className="font-bold text-[#071A2B] block text-sm mb-1">
                    Corporate Headquarters Location
                  </span>
                  <div className="flex items-start gap-2 text-[#17202A]/75 leading-relaxed font-normal">
                    <MapPin className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                    <span>
                      33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                      New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
                  <div className="text-[11px] font-bold text-[#087A5A] uppercase tracking-wider">
                    Direct Telephone Access
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#087A5A]" />
                    <span className="text-[#17202A]/60">WhatsApp / Phone:</span>
                    <a
                      href="https://wa.me/2348179171456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#071A2B] hover:underline tabular-nums"
                    >
                      +234 817 917 1456
                    </a>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                    <Phone className="w-3.5 h-3.5 text-[#17202A]/60" />
                    <span className="text-[#17202A]/60">Alternative Desk:</span>
                    <a
                      href="tel:+2348141128119"
                      className="font-bold text-[#071A2B] hover:underline tabular-nums"
                    >
                      +234 814 112 8119
                    </a>
                  </div>
                </div>

                <div className="text-[11px] text-[#17202A]/60 pt-1">
                  Operating Hours: Monday – Friday: 8:30 AM – 5:00 PM (WAT)
                </div>
              </div>

              <a
                href="https://wa.me/2348179171456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Message Executive Desk</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
