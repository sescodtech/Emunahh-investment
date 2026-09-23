import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Compass, ShieldCheck, MapPin, Phone, Users, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FBFBF9] min-h-screen">
      {/* Header */}
      <section className="bg-[#00174D] text-white py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold tracking-wider uppercase">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-tight">
              About Emunahh-Invest Limited
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              A registered Nigerian financial and investment company dedicated to expanding educational 
              accessibility, safeguarding wealth, and fueling commercial enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Corporate Profile */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs text-[#00A859] font-semibold uppercase tracking-wider">
                Corporate Identity
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#002B99]">
                Building Real Possibilities Through Ethical, Transparent Finance
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#1E242B]/80 leading-relaxed font-light">
                <p>
                  <strong className="text-[#002B99] font-semibold">Emunahh-Invest Limited</strong> is a registered 
                  Nigerian financial and investment institution headquartered in the commercial hub of Lagos. 
                  Founded to bring transparency, dignity, and accessibility to Nigerian financial services, 
                  we eliminate the friction between aspirational individuals and the capital required to achieve their goals.
                </p>
                <p>
                  Our specialized student loan division was established in response to the pressing tuition challenges 
                  faced by Nigerian families. By creating an institutional remittance framework that pays schools directly, 
                  we safeguard academic progression and help thousands of students complete their tertiary education and 
                  professional certifications on schedule.
                </p>
                <p>
                  Concurrently, our commercial financing and wealth advisory desks empower Lagos SMEs and private investors 
                  with prudent capital allocations grounded in real-economy productivity rather than speculative bubbles.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-lg border border-[#1E242B]/10 shadow-xs space-y-6">
              <Logo variant="light" size="lg" />
              
              <div className="space-y-3 pt-2 text-xs text-[#1E242B]/80">
                <div className="font-semibold text-[#002B99] text-sm">Corporate Headquarters</div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                  <span>
                    33, Crossway Plaza, Beside UBA, 3/5 Charity Road, <br />
                    New Oko Oba, Agege/Abule Egba, Lagos, Nigeria.
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-[#1E242B]/10">
                  <Phone className="w-4 h-4 text-[#002B99] shrink-0" />
                  <span className="tabular-nums font-semibold text-[#002B99]">+234 817 917 1456 / +234 814 112 8119</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg bg-white border border-[#1E242B]/10 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#00A859] font-semibold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Our Mission</span>
              </div>
              <h3 className="text-xl font-semibold text-[#002B99]">Empowering Academic & Commercial Progress</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/75 leading-relaxed font-light">
                To provide transparent, dependable education financing and disciplined wealth solutions that 
                accelerate academic excellence and commercial progress across Nigeria.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-white border border-[#1E242B]/10 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#00E676] font-semibold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#00A859]" />
                <span>Our Vision</span>
              </div>
              <h3 className="text-xl font-semibold text-[#002B99]">Nigeria's Most Trusted Finance Partner</h3>
              <p className="text-xs sm:text-sm text-[#1E242B]/75 leading-relaxed font-light">
                To be Nigeria’s most trusted, accessible financial partner recognized for integrity, 
                uncompromising clarity, and genuine client empowerment.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
