import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Phone, ArrowUpRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#087A5A]/10 text-[#087A5A] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-[#087A5A]" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-[#087A5A] uppercase tracking-wider">
            Page Not Found · 404
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B] tracking-tight">
            Looking for an Emunahh Solution?
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            The page or address you navigated to could not be found. Please return to our home page 
            or explore our main financial services below.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#F8F7F3] border border-gray-200 text-xs text-left space-y-2">
          <div className="font-bold text-[#071A2B]">Quick Navigation:</div>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            <Link to="/student-loans" className="text-[#087A5A] hover:underline">
              • Student Loans
            </Link>
            <Link to="/investments" className="text-[#087A5A] hover:underline">
              • Investment Desk
            </Link>
            <Link to="/business-financing" className="text-[#087A5A] hover:underline">
              • Business Credit
            </Link>
            <Link to="/terms" className="text-[#087A5A] hover:underline">
              • Terms of Service
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-6 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#04513E] rounded-lg transition-colors shadow-xs"
          >
            <Home className="w-4 h-4 text-[#C6A15B]" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-bold text-[#071A2B] bg-[#F8F7F3] border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4 text-[#087A5A]" />
            <span>Contact Lagos Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
