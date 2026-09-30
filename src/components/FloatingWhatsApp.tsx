import React, { useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Landmark, Plane, UserRound, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useContent } from '../context/ContentContext';

const servicePrompts = [
  {
    label: 'Education Financing',
    icon: GraduationCap,
    text: 'Hello Emunahh-Invest, I would like to enquire about Education Financing.',
  },
  {
    label: 'Travel Financing',
    icon: Plane,
    text: 'Hello Emunahh-Invest, I would like to enquire about Travel Financing.',
  },
  {
    label: 'Business Financing',
    icon: BriefcaseBusiness,
    text: 'Hello Emunahh-Invest, I would like to enquire about Business Financing.',
  },
  {
    label: 'Personal Finance',
    icon: UserRound,
    text: 'Hello Emunahh-Invest, I would like to enquire about Personal Finance.',
  },
  {
    label: 'Investment Services',
    icon: Landmark,
    text: 'Hello Emunahh-Invest, I would like to enquire about Investment Services.',
  },
];

export const FloatingWhatsApp: React.FC = () => {
  const { content, settings } = useContent() as any;
  const [isOpen, setIsOpen] = useState(false);

  const rawNumber = settings?.whatsapp || content?.contact?.whatsapp || '';
  const whatsappNumber = String(rawNumber).replace(/[^0-9]/g, '');
  if (!whatsappNumber) return null;

  const openWhatsApp = (message: string) => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen && (
        <div
          className="mb-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(8,6,66,0.18)]"
          role="dialog"
          aria-label="WhatsApp client support"
        >
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf8ef] text-[#1f9d55]">
                  <WhatsAppIcon className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h2 className="text-[14px] font-[750] text-[#0d0a64]">Client support</h2>
                  <p className="mt-0.5 text-[11px] text-slate-500">Continue your enquiry on WhatsApp</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close WhatsApp options"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-3">
            {servicePrompts.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.label}
                  type="button"
                  onClick={() => openWhatsApp(service.text)}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-[#0d0a64] transition-colors group-hover:bg-[#0d0a64] group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-[13px] font-[650] text-slate-700">{service.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#d91c23]" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-12 items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3.5 text-[#0d0a64] shadow-[0_12px_30px_rgba(8,6,66,0.12)] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_34px_rgba(8,6,66,0.16)]"
        aria-expanded={isOpen}
        aria-label="Open WhatsApp client support"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white">
          <WhatsAppIcon className="h-4 w-4 fill-current" />
        </span>
        <span className="hidden text-[12px] font-[700] sm:inline">WhatsApp support</span>
      </button>
    </div>
  );
};
