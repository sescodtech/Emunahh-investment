import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Compass, Eye, ShieldCheck, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import hqImage from '../assets/images/lagos_financial_hq_1790142688340.jpg';

export const AboutSection: React.FC = () => {
  const { content } = useContent();
  const about = content.about;
  const contact = content.contact;

  return (
    <section id="about" className="py-16 lg:py-22 bg-white border-b border-[#071A2B]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
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

        {/* Balanced Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Authentic HQ Photography & Walk-In Lagos Desk (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative rounded-lg overflow-hidden border-2 border-[#071A2B] bg-[#071A2B] shadow-md group">
              <img
                src={hqImage}
                alt="Emunahh-Invest Limited Headquarters Lagos"
                className="w-full h-[320px] sm:h-[360px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/85 to-transparent text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#C6A15B] uppercase tracking-[0.16em]">
                      Corporate Headquarters
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      33, Crossway Plaza, New Oko Oba, Lagos
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#087A5A] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Walk-In Lagos Advisory Desk Card */}
            <div className="p-5 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/12 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-[#071A2B] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#087A5A]" />
                  <span>Physical Advisory Desk</span>
                </div>
                <span className="text-[10px] font-bold text-[#087A5A] bg-[#087A5A]/10 px-2 py-0.5 rounded">
                  Open Weekdays
                </span>
              </div>
              
              <p className="text-xs text-[#17202A]/80 leading-relaxed font-normal">
                {contact.officeAddress}
              </p>

              <div className="pt-2 border-t border-[#071A2B]/8 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#17202A]/60 block text-[10px]">Direct Phone:</span>
                  <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#071A2B] hover:text-[#087A5A] transition-colors">
                    {contact.phone}
                  </a>
                </div>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20schedule%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#087A5A] hover:bg-[#04513E] text-white text-[11px] font-bold rounded-md transition-colors shadow-2xs shrink-0"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Heritage, Mission, Vision & Core Values (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3 text-sm sm:text-base text-[#17202A]/85 leading-relaxed font-normal">
              <p>{about.intro}</p>
              <p className="text-xs sm:text-sm text-[#17202A]/75">{about.secondaryIntro}</p>
            </div>

            {/* Mission & Vision Editorial Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 sm:p-5 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/10 space-y-2 shadow-2xs hover:border-[#087A5A]/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#087A5A] text-white flex items-center justify-center shrink-0">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
                    Our Mission
                  </span>
                </div>
                <p className="text-xs text-[#17202A]/80 leading-relaxed font-normal">
                  {about.mission}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-lg bg-[#F8F7F3] border border-[#071A2B]/10 space-y-2 shadow-2xs hover:border-[#071A2B]/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#071A2B] text-white flex items-center justify-center shrink-0">
                    <Eye className="w-3.5 h-3.5 text-[#C6A15B]" />
                  </div>
                  <span className="text-xs font-bold text-[#071A2B] uppercase tracking-wider">
                    Our Vision
                  </span>
                </div>
                <p className="text-xs text-[#17202A]/80 leading-relaxed font-normal">
                  {about.vision}
                </p>
              </div>
            </div>

            {/* Core Values Strip */}
            <div className="pt-4 border-t border-[#071A2B]/10">
              <div className="text-[11px] font-bold text-[#071A2B] uppercase tracking-[0.16em] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#087A5A]" />
                <span>Core Governance Values</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {about.values.map((v, idx) => (
                  <div key={idx} className="p-3 rounded-md bg-white border border-[#071A2B]/8 flex items-start gap-2.5 shadow-2xs">
                    <Check className="w-4 h-4 text-[#087A5A] shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed">
                      <strong className="text-[#071A2B] font-bold block">{v.title}</strong>
                      <span className="text-[#17202A]/70 text-[11px]">{v.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                to="/about"
                className="inline-flex items-center text-xs font-bold text-[#087A5A] hover:text-[#04513E] transition-colors group"
              >
                <span>Read Full Corporate Profile & Governance</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
