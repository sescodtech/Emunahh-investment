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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
        isScrolled
          ? 'border-b border-[#071A2B]/10 shadow-[0_4px_20px_-4px_rgba(7,26,43,0.06)]'
          : 'border-b border-[#071A2B]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-19 flex items-center justify-between">
        
        {/* Brand Zone: Single element wordmark with breathing room */}
        <Link
          to="/"
          className="focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#087A5A] rounded py-1 transition-opacity hover:opacity-90"
          aria-label="Emunahh-Invest Limited Home"
        >
          <Logo variant="light" size="md" />
        </Link>

        {/* Corporate Financial Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-[#17202A] tracking-tight">
          <Link
            to="/"
            className={`transition-colors hover:text-[#087A5A] py-1 ${
              isActive('/') ? 'text-[#087A5A] font-bold border-b-2 border-[#087A5A]' : ''
            }`}
          >
            HOME
          </Link>
          <Link
            to="/about"
            className={`transition-colors hover:text-[#087A5A] py-1 ${
              isActive('/about') ? 'text-[#087A5A] font-bold border-b-2 border-[#087A5A]' : ''
            }`}
          >
            ABOUT
          </Link>
          <a
            href="/#solutions"
            className="transition-colors hover:text-[#087A5A] py-1"
          >
            SOLUTIONS
          </a>
          <Link
            to="/student-loans"
            className={`transition-colors hover:text-[#087A5A] py-1 ${
              isActive('/student-loans') ? 'text-[#087A5A] font-bold border-b-2 border-[#087A5A]' : ''
            }`}
          >
            STUDENT LOANS
          </Link>
          <Link
            to="/investments"
            className={`transition-colors hover:text-[#087A5A] py-1 ${
              isActive('/investments') ? 'text-[#087A5A] font-bold border-b-2 border-[#087A5A]' : ''
            }`}
          >
            INVESTMENTS
          </Link>
          <Link
            to="/blog"
            className={`transition-colors hover:text-[#087A5A] py-1 ${
              isActive('/blog') ? 'text-[#087A5A] font-bold border-b-2 border-[#087A5A]' : ''
            }`}
          >
            RESOURCES
          </Link>
          <Link
            to="/contact"
            className={`transition-colors hover:text-[#087A5A] py-1 ${
              isActive('/contact') ? 'text-[#087A5A] font-bold border-b-2 border-[#087A5A]' : ''
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Header Primary Action */}
        <div className="flex items-center gap-3">
          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] active:scale-[0.98] rounded-md transition-all shadow-xs"
          >
            <span>GET STARTED</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation drawer"
            className="lg:hidden p-2 text-[#071A2B] hover:text-[#087A5A] rounded-md border border-[#071A2B]/10 hover:bg-[#F8F7F3] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out / Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#071A2B]/10 bg-[#FFFFFF] px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-[#17202A]">
            <Link to="/" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              HOME
            </Link>
            <Link to="/about" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              ABOUT
            </Link>
            <a href="/#solutions" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              SOLUTIONS
            </a>
            <Link to="/student-loans" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              STUDENT LOANS
            </Link>
            <Link to="/investments" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              INVESTMENTS
            </Link>
            <Link to="/business-financing" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              BUSINESS FINANCING
            </Link>
            <Link to="/blog" className="py-2 border-b border-gray-100 hover:text-[#087A5A]">
              RESOURCES & INSIGHTS
            </Link>
            <Link to="/contact" className="py-2 hover:text-[#087A5A]">
              CONTACT
            </Link>
          </nav>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <Link
              to="/apply"
              className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold text-white bg-[#087A5A] hover:bg-[#04513E] rounded-md shadow-xs transition-colors"
            >
              <span>GET STARTED</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </Link>
            <div className="text-center">
              <Link to="/admin/login" className="text-[11px] font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                Admin Management Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
