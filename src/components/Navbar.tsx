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

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
        isScrolled
          ? 'shadow-sm border-b border-gray-200'
          : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with exact Pin+Globe+Airplane Mark & EMUNAHH-INVEST name */}
        <Link
          to="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002B99] rounded transition-transform hover:opacity-95"
        >
          <Logo variant="light" size="md" />
        </Link>

        {/* Navigation Links: Dedicated Multi-Page Routing */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
          <Link
            to="/"
            className={`transition-colors py-1 ${
              isActive('/') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/student-loans"
            className={`transition-colors py-1 ${
              isActive('/student-loans') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            Student Loans
          </Link>
          <Link
            to="/investments"
            className={`transition-colors py-1 ${
              isActive('/investments') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            Investments
          </Link>
          <Link
            to="/business-financing"
            className={`transition-colors py-1 ${
              isActive('/business-financing') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            Business Credit
          </Link>
          <Link
            to="/blog"
            className={`transition-colors py-1 ${
              isActive('/blog') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`transition-colors py-1 ${
              isActive('/about') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`transition-colors py-1 ${
              isActive('/contact') ? 'text-[#002B99] font-bold border-b-2 border-[#00A859]' : 'hover:text-[#002B99]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Header Action Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#002B99] hover:bg-[#002073] active:bg-[#001752] rounded shadow-xs transition-colors"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#00E676]" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-gray-700 hover:text-[#002B99] rounded"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-gray-800">
            <Link to="/" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Home
            </Link>
            <Link to="/student-loans" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Student Loans
            </Link>
            <Link to="/investments" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Investments
            </Link>
            <Link to="/business-financing" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Business Credit
            </Link>
            <Link to="/personal-finance" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Personal Finance
            </Link>
            <Link to="/other-services" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Other Financial Services
            </Link>
            <Link to="/blog" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              Blog & Insights
            </Link>
            <Link to="/about" className="py-2 border-b border-gray-100 hover:text-[#002B99]">
              About Us
            </Link>
            <Link to="/contact" className="py-2 hover:text-[#002B99]">
              Contact Us
            </Link>
          </nav>

          <div className="pt-2 border-t border-gray-100">
            <Link
              to="/apply"
              className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold text-white bg-[#002B99] rounded shadow-xs"
            >
              <span>Apply Online</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#00E676]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
