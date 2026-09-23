import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-gray-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: About Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#00A859] uppercase tracking-[0.14em]">
                Corporate Heritage & Governance
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00174D] tracking-tight leading-tight">
                An Established Financial Institution Founded to Build Real Possibilities
              </h2>
            </div>

            <div className="space-y-3.5 text-base text-gray-600 leading-relaxed font-normal">
              <p>
                <strong className="text-[#00174D] font-semibold">Emunahh-Invest Limited</strong> is a registered 
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
              <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                <div className="text-xs font-bold text-[#00A859] uppercase tracking-wider">
                  Our Mission
                </div>
                <div className="text-base font-bold text-[#00174D]">
                  Democratizing Progress
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  To provide transparent, dependable education financing and disciplined wealth solutions that 
                  accelerate academic excellence and commercial progress across Nigeria.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-gray-200 space-y-2 shadow-2xs">
                <div className="text-xs font-bold text-[#002B99] uppercase tracking-wider">
                  Our Vision
                </div>
                <div className="text-base font-bold text-[#00174D]">
                  Nigeria's Most Trusted Partner
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  To be recognized across West Africa as the most dependable and ethical private finance house, 
                  known for transformative education loans and sound commercial support.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
              >
                <span>Read Full Corporate Profile & Leadership</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Physical Headquarters Verification Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#002B99]/20 rounded-2xl p-7 sm:p-9 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-gray-150">
              <Logo variant="light" size="md" layout="stacked" className="items-start text-left" />
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#002B99] uppercase tracking-wider">
                  Headquarters & Principal Office
                </div>
                <div className="text-sm font-semibold text-[#00174D] flex items-start gap-2.5 pt-1">
                  <MapPin className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                  <span>
                    33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba, Lagos, Nigeria
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-gray-100">
                <div className="text-xs font-bold text-[#002B99] uppercase tracking-wider">
                  Telephone Inquiries & Advisory
                </div>
                <div className="text-sm font-semibold text-[#00174D] flex items-center gap-2.5 pt-1">
                  <Phone className="w-4 h-4 text-[#00A859] shrink-0" />
                  <a href="tel:08023190807" className="hover:text-[#002B99] transition-colors">
                    0802 319 0807
                  </a>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-gray-100">
                <div className="text-xs font-bold text-[#002B99] uppercase tracking-wider">
                  Office Hours
                </div>
                <div className="text-xs text-gray-600">
                  Monday – Friday: 8:30 AM – 5:00 PM (WAT)
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/2348023190807?text=Hello%20Emunahh-Invest%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-[#00A859] hover:bg-[#008f4c] rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Verified Advisor on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
