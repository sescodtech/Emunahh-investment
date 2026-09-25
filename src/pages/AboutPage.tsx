import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Compass, ShieldCheck, MapPin, Phone, Users, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-[#F8F7F3] border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#087A5A] font-bold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
              About Emunahh-Invest Limited
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              A registered Nigerian financial and investment company dedicated to expanding educational 
              accessibility, safeguarding wealth, and fueling commercial enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Corporate Profile */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs text-[#087A5A] font-bold uppercase tracking-wider">
                Corporate Identity
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A2B] tracking-tight">
                Building Real Possibilities Through Ethical, Transparent Finance
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                <p>
                  <strong className="text-[#071A2B] font-semibold">Emunahh-Invest Limited</strong> is a registered 
                  Nigerian financial and investment institution headquartered in the commercial hub of Lagos. 
                  Founded to bring transparency, dignity, and accessibility to Nigerian financial services, 
                  we eliminate the friction between aspirational individuals and the capital required to achieve their goals.
                </p>
                <p>
                  Our specialized student loan division was established in response to the pressing tuition challenges 
                  faced by Nigerian families. By creating an institutional remittance framework that pays schools directly, 
                  we ensure that students maintain uninterrupted enrollment while sponsors enjoy manageable, 
                  structured repayments.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-1 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
                  <div className="text-xs font-bold text-[#087A5A] uppercase">Mission</div>
                  <div className="text-sm font-bold text-[#071A2B]">Empowering Educational & Commercial Ambition</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Delivering transparent, ethical credit and wealth preservation that propels Nigerian families forward.
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-200 bg-white space-y-1 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
                  <div className="text-xs font-bold text-[#C6A15B] uppercase">Vision</div>
                  <div className="text-sm font-bold text-[#071A2B]">The Benchmark for Trusted Finance</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    To be the most respected non-bank financial institution in Lagos and West Africa.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8F7F3] border border-gray-200 p-8 rounded-2xl space-y-6 shadow-xs">
              <Logo variant="light" size="lg" layout="stacked" className="items-start text-left" />

              <div className="space-y-4 text-xs text-gray-700">
                <div className="space-y-1">
                  <span className="font-bold text-[#071A2B] uppercase tracking-wider block">Headquarters:</span>
                  <div className="flex items-start gap-2 text-gray-600 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                    <span>33, Crossway Plaza, Beside UBA, Charity Road, New Oko Oba, Lagos, Nigeria.</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-gray-200">
                  <span className="font-bold text-[#071A2B] uppercase tracking-wider block">Direct Line:</span>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-[#087A5A] shrink-0" />
                    <span className="font-bold text-[#071A2B]">0802 319 0807 / 0817 917 1456</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-gray-200">
                  <span className="font-bold text-[#071A2B] uppercase tracking-wider block">Operational Desks:</span>
                  <div className="space-y-1 text-gray-600">
                    <div>• Tertiary Education Financing Desk</div>
                    <div>• Private Wealth & Portfolio Advisory</div>
                    <div>• Commercial Trade & SME Credit Group</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-8 pt-8 border-t border-gray-200">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B]">
                Our Institutional Values
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                The principles that govern every transaction, contract, and client interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
                <ShieldCheck className="w-6 h-6 text-[#087A5A]" />
                <h3 className="text-base font-bold text-[#071A2B]">Radical Transparency</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  No hidden compounding charges, ambiguous clauses, or surprise administrative levies. Every cost is disclosed upfront.
                </p>
              </div>

              <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
                <Compass className="w-6 h-6 text-[#087A5A]" />
                <h3 className="text-base font-bold text-[#071A2B]">Prudent Stewardship</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We treat every naira entrusted to us with rigorous discipline, prioritizing capital preservation over speculative gambles.
                </p>
              </div>

              <div className="bg-white p-7 rounded-xl border border-gray-200 space-y-3 shadow-2xs hover:border-[#087A5A]/40 transition-colors">
                <Users className="w-6 h-6 text-[#087A5A]" />
                <h3 className="text-base font-bold text-[#071A2B]">Human Dignity</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Financial challenges should never diminish a person’s respect. We engage every applicant with courtesy, responsiveness, and genuine counsel.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
