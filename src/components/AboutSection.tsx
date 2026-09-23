import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ArrowUpRight, Compass, Eye, ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import hqImage from '../assets/images/lagos_financial_hq_1790142688340.jpg';

export const AboutSection: React.FC = () => {
  const { content } = useContent();
  const about = content.about;
  const contact = content.contact;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-[#071A2B]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Large Image & Headquarters Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Large Professional Image */}
            <div className="relative rounded-lg overflow-hidden border-2 border-[#071A2B] bg-[#071A2B] shadow-xl">
              <img
                src={hqImage}
                alt="Emunahh-Invest Limited Headquarters Lagos"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/75 to-transparent text-white">
                <div className="text-[10px] font-bold text-[#C6A15B] uppercase tracking-[0.16em]">
                  Physical Headquarters
                </div>
                <div className="text-sm font-bold text-white">
                  33, Crossway Plaza, New Oko Oba, Lagos
                </div>
              </div>
            </div>

            {/* Quick Contact & Walk-In Box */}
            <div className="p-6 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/12 space-y-4 shadow-2xs">
              <div className="text-xs font-bold text-[#071A2B] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#087A5A]" />
                <span>Headquarters & Advisory Desk</span>
              </div>
              
              <p className="text-xs text-[#17202A]/80 leading-relaxed">
                {contact.officeAddress}
              </p>

              <div className="pt-2 border-t border-[#071A2B]/8 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#17202A]/60 block text-[11px]">Direct Phone:</span>
                  <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#071A2B] hover:text-[#087A5A]">
                    {contact.phone}
                  </a>
                </div>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#087A5A] text-white text-[11px] font-bold rounded-md hover:bg-[#04513E] transition-colors"
                >
                  WhatsApp Desk
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Company Story, Mission, Vision, Values (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C6A15B]" />
                <span className="text-[11px] font-bold text-[#087A5A] uppercase tracking-[0.2em]">
                  {about.title}
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2B] tracking-[-0.03em] leading-tight">
                {about.headline}
              </h2>
            </div>

            <div className="space-y-4 text-base text-[#17202A]/80 leading-relaxed font-normal">
              <p>{about.intro}</p>
              <p>{about.secondaryIntro}</p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              
              <div className="p-6 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/10 space-y-2.5">
                <div className="w-8 h-8 rounded-md bg-[#087A5A] text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                  Our Mission
                </div>
                <p className="text-xs text-[#17202A]/80 leading-relaxed">
                  {about.mission}
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/10 space-y-2.5">
                <div className="w-8 h-8 rounded-md bg-[#071A2B] text-white flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <div className="text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                  Our Vision
                </div>
                <p className="text-xs text-[#17202A]/80 leading-relaxed">
                  {about.vision}
                </p>
              </div>

            </div>

            {/* Core Values Strip */}
            <div className="pt-4 border-t border-[#071A2B]/10">
              <div className="text-[11px] font-bold text-[#071A2B] uppercase tracking-[0.16em] mb-4">
                Core Governance Values
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {about.values.map((v, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087A5A] mt-2 shrink-0" />
                    <div className="text-xs leading-relaxed">
                      <strong className="text-[#071A2B] font-bold block">{v.title}</strong>
                      <span className="text-[#17202A]/70">{v.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors"
              >
                <span>Read Full Corporate Profile & Leadership</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
