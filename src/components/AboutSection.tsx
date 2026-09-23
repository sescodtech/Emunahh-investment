import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const AboutSection: React.FC = () => {
  const corporateValues = [
    {
      title: 'Integrity & Legal Certainty',
      desc: 'We operate with uncompromised ethics. Every condition, repayment interval, and requirement is communicated truthfully in legally binding contracts.',
    },
    {
      title: 'Educational Advancement',
      desc: 'We view student financing as a foundational investment in Nigeria’s intellectual capital and future economic productivity.',
    },
    {
      title: 'Physical Walk-In Accountability',
      desc: 'We maintain open doors. Our clients can visit our physical headquarters, meet dedicated advisors, and receive face-to-face guidance.',
    },
    {
      title: 'Disciplined Capital Growth',
      desc: 'Prudent risk management governs all our financing and wealth portfolios, ensuring enduring stability and principal protection.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-[#1E242B]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: About Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs text-[#00A859] font-bold tracking-wider uppercase">
                Corporate Heritage & Governance
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#002B99] tracking-tight leading-tight">
                A Financial Institution Founded to Build Real Possibilities
              </h2>
            </div>

            <div className="space-y-4 text-base text-[#1E242B]/75 leading-relaxed font-light">
              <p>
                <strong className="text-[#002B99] font-semibold">Emunahh-Invest Limited</strong> is a registered 
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
              <div className="p-6 rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 space-y-2">
                <div className="text-xs font-bold text-[#00A859] uppercase tracking-wider">
                  Our Mission
                </div>
                <div className="text-base font-semibold text-[#002B99]">
                  Democratizing Progress
                </div>
                <p className="text-xs text-[#1E242B]/70 leading-relaxed font-light">
                  To provide transparent, dependable education financing and disciplined wealth solutions that 
                  accelerate academic excellence and commercial progress across Nigeria.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 space-y-2">
                <div className="text-xs font-bold text-[#002B99] uppercase tracking-wider">
                  Our Vision
                </div>
                <div className="text-base font-semibold text-[#002B99]">
                  Nigeria's Most Trusted Partner
                </div>
                <p className="text-xs text-[#1E242B]/70 leading-relaxed font-light">
                  To be Nigeria’s most trusted, accessible financial partner recognized for integrity, 
                  uncompromising clarity, and genuine client empowerment.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002B99] hover:text-[#00A859] transition-colors"
              >
                <span>Read Full Company Profile & Governance</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Corporate Headquarters Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-lg bg-[#FBFBF9] border border-[#1E242B]/10 space-y-6 shadow-xs">
              
              {/* Logo Lockup */}
              <Logo variant="light" size="lg" layout="stacked" />

              <div className="pt-6 border-t border-[#1E242B]/10 space-y-4 text-xs text-[#1E242B]/80">
                <div>
                  <span className="font-bold text-[#002B99] block text-sm mb-1">
                    Corporate Headquarters Location
                  </span>
                  <div className="flex items-start gap-2 text-[#1E242B]/75 leading-relaxed font-light">
                    <MapPin className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                    <span>
                      33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                      New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded bg-white border border-[#1E242B]/10 space-y-2">
                  <div className="text-[11px] font-bold text-[#00A859] uppercase tracking-wider">
                    Direct Telephone Access
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#00A859]" />
                    <span className="text-[#1E242B]/60">WhatsApp / Phone:</span>
                    <a
                      href="https://wa.me/2348179171456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#002B99] hover:underline tabular-nums"
                    >
                      +234 817 917 1456
                    </a>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#1E242B]/10">
                    <Phone className="w-3.5 h-3.5 text-[#1E242B]/60" />
                    <span className="text-[#1E242B]/60">Alternative Desk:</span>
                    <a
                      href="tel:+2348141128119"
                      className="font-bold text-[#002B99] hover:underline tabular-nums"
                    >
                      +234 814 112 8119
                    </a>
                  </div>
                </div>

                <div className="text-[11px] text-[#1E242B]/60 pt-1">
                  Operating Hours: Monday – Friday: 8:30 AM – 5:00 PM (WAT)
                </div>
              </div>

              <a
                href="https://wa.me/2348179171456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-[#00A859] hover:bg-[#00914c] rounded transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat with Executive Desk</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
