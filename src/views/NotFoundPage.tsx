import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Phone, ArrowUpRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#e7020b]/10 text-[#e7020b] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-[#e7020b]" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-[#e7020b] uppercase tracking-wider">
            Page Not Found · 404
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d0a64] tracking-tight">
            Looking for an Emunahh Solution?
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            The page or address you navigated to could not be found. Please return to our home page 
            or explore our main financial services below.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#e3fff2] border border-gray-200 text-xs text-left space-y-2">
          <div className="font-bold text-[#0d0a64]">Quick Navigation:</div>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <Link to="/services/education-financing" className="text-[#e7020b] hover:underline">
              • Student Loans
            </Link>
            <Link to="/services/investment-services" className="text-[#e7020b] hover:underline">
              • Investment Desk
            </Link>
            <Link to="/services/business-financing" className="text-[#e7020b] hover:underline">
              • Business Credit
            </Link>
            <Link to="/terms" className="text-[#e7020b] hover:underline">
              • Terms of Service
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-6 py-3 text-xs font-bold text-white bg-[#0d0a64] hover:bg-[#a3140a] rounded-xl transition-colors shadow-xs"
          >
            <Home className="w-4 h-4 text-[#e3fff2]" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-bold text-[#0d0a64] bg-[#e3fff2] border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4 text-[#e7020b]" />
            <span>Contact Lagos Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
