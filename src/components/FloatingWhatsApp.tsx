import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/2348179171456?text=Hello%20Emunahh-Invest,%20I%20would%20like%20to%20make%20an%20inquiry."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Emunahh-Invest Limited"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      {/* Official WhatsApp SVG Icon */}
      <svg
        className="w-8 h-8 fill-white transition-transform group-hover:scale-110"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.477-.15-.678.15-.201.301-.778.978-.954 1.179-.176.201-.352.226-.653.075-1.527-.765-2.852-1.92-3.87-3.328-.201-.276-.02-.427.13-.652.126-.188.276-.452.414-.678.138-.226.184-.377.276-.628.092-.251.046-.477-.023-.678-.069-.201-.678-1.633-.929-2.235-.245-.587-.494-.508-.678-.517-.176-.009-.377-.01-.578-.01s-.528.075-.804.377c-.276.301-1.055 1.03-1.055 2.511 0 1.481 1.08 2.912 1.231 3.113.15.201 2.124 3.243 5.146 4.549.718.311 1.278.497 1.716.636.721.23 1.378.197 1.897.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.352z" />
        <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.944.557 3.757 1.517 5.292L2 22l4.835-1.472A9.957 9.957 0 0 0 12.004 22C17.524 22 22 17.52 22 12.004 22 6.48 17.524 2 12.004 2zm0 18.232c-1.66 0-3.21-.497-4.512-1.354l-.323-.213-3.348 1.02.91-3.212-.224-.343a8.214 8.214 0 0 1-1.355-4.526c0-4.544 3.697-8.241 8.241-8.241 4.544 0 8.24 3.697 8.24 8.241 0 4.544-3.696 8.241-8.24 8.241z" />
      </svg>
    </a>
  );
};
