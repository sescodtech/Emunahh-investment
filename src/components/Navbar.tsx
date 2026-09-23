import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { ServiceType } from '../types';

interface NavbarProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200/80'
          : 'bg-[#F8F7F3] border-b border-gray-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo with exact Pin+Globe+Airplane Mark & EMUNAHH-INVEST name */}
        <Link
          to="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087A5A] rounded transition-opacity hover:opacity-90"
          aria-label="Emunahh-Invest Limited Home"
        >
          <Logo variant="light" size="md" />
        </Link>

        {/* Serious Financial Institution Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold tracking-normal text-[#17202A]/80">
          <Link
            to="/"
            className={`transition-colors hover:text-[#071A2B] ${
              isActive('/') ? 'text-[#071A2B] font-bold border-b-2 border-[#087A5A] pb-0.5' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`transition-colors hover:text-[#071A2B] ${
              isActive('/about') ? 'text-[#071A2B] font-bold border-b-2 border-[#087A5A] pb-0.5' : ''
            }`}
          >
            About
          </Link>
          <a
            href="/#solutions"
            className="transition-colors hover:text-[#071A2B]"
          >
            Solutions
          </a>
          <Link
            to="/student-loans"
            className={`transition-colors hover:text-[#071A2B] ${
              isActive('/student-loans') ? 'text-[#071A2B] font-bold border-b-2 border-[#087A5A] pb-0.5' : ''
            }`}
          >
            Student Loans
          </Link>
          <Link
            to="/investments"
            className={`transition-colors hover:text-[#071A2B] ${
              isActive('/investments') ? 'text-[#071A2B] font-bold border-b-2 border-[#087A5A] pb-0.5' : ''
            }`}
          >
            Investments
          </Link>
          <Link
            to="/blog"
            className={`transition-colors hover:text-[#071A2B] ${
              isActive('/blog') ? 'text-[#071A2B] font-bold border-b-2 border-[#087A5A] pb-0.5' : ''
            }`}
          >
            Resources
          </Link>
          <Link
            to="/contact"
            className={`transition-colors hover:text-[#071A2B] ${
              isActive('/contact') ? 'text-[#071A2B] font-bold border-b-2 border-[#087A5A] pb-0.5' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Header Action Button: Get Started */}
        <div className="flex items-center gap-4">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] active:bg-[#04513E] rounded transition-all duration-200 shadow-xs"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#C6A15B]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#17202A] hover:text-[#087A5A] rounded"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-6 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-[#17202A]">
            <Link to="/" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              Home
            </Link>
            <Link to="/about" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              About Us
            </Link>
            <a href="/#solutions" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              Solutions
            </a>
            <Link to="/student-loans" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              Student Loans
            </Link>
            <Link to="/investments" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              Investments
            </Link>
            <Link to="/business-financing" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              Business Financing
            </Link>
            <Link to="/blog" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              Resources & Insights
            </Link>
            <Link to="/contact" className="py-2 hover:text-[#087A5A]">
              Contact
            </Link>
          </nav>

          <div className="pt-3 border-t border-gray-100">
            <Link
              to="/apply"
              className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold text-white bg-[#071A2B] hover:bg-[#087A5A] rounded shadow-xs transition-colors"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#C6A15B]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
