import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { ServiceType } from '../types';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  onOpenApply: (service?: ServiceType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply }) => {
  const { settings } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'HOME', to: '/' },
    { label: 'ABOUT', to: '/about' },
    { label: 'SOLUTIONS', to: '/#solutions', isHash: true },
    { label: 'STUDENT LOANS', to: '/student-loans' },
    { label: 'INVESTMENTS', to: '/investments' },
    { label: 'RESOURCES', to: '/blog' },
    { label: 'CONTACT', to: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${
        isScrolled
          ? 'border-b border-[#0d0a64]/10 shadow-[0_4px_16px_-4px_rgba(7,26,43,0.05)] py-2'
          : 'border-b border-[#0d0a64]/8 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Zone: High visual dominance */}
        <Link
          to="/"
          className="focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#e7020b] rounded py-0.5 transition-opacity hover:opacity-95"
          aria-label="Emunahh-Invest Limited Home"
        >
          <Logo variant="light" size="md" logoUrl={settings.logoUrl} />
        </Link>

        {/* Corporate Financial Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold text-[#17202A] tracking-[0.04em]">
          {navLinks.map((link) => {
            const active = !link.isHash && isActive(link.to);
            if (link.isHash) {
              return (
                <a
                  key={link.label}
                  href={link.to}
                  className="transition-colors hover:text-[#e7020b] py-1 text-[#17202A]/85 hover:text-[#e7020b]"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`relative py-1 transition-colors ${
                  active ? 'text-[#e7020b]' : 'text-[#17202A]/85 hover:text-[#e7020b]'
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e7020b] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/apply"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#e7020b] hover:bg-[#a3140a] active:scale-[0.98] rounded-md transition-all shadow-xs group cursor-pointer"
          >
            <span>GET STARTED</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-2 text-[#0d0a64] hover:text-[#e7020b] rounded-md border border-[#0d0a64]/12 hover:bg-[#e3fff2] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#0d0a64]/10 bg-white px-5 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1 text-xs font-bold text-[#17202A]">
            <Link
              to="/"
              className={`p-2.5 rounded-md transition-colors ${isActive('/') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              HOME
            </Link>
            <Link
              to="/about"
              className={`p-2.5 rounded-md transition-colors ${isActive('/about') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              ABOUT
            </Link>
            <a
              href="/#solutions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              SOLUTIONS
            </a>
            <Link
              to="/student-loans"
              className={`p-2.5 rounded-md transition-colors ${isActive('/student-loans') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              STUDENT LOANS
            </Link>
            <Link
              to="/investments"
              className={`p-2.5 rounded-md transition-colors ${isActive('/investments') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              INVESTMENTS
            </Link>
            <Link
              to="/business-financing"
              className={`p-2.5 rounded-md transition-colors ${isActive('/business-financing') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              BUSINESS FINANCING
            </Link>
            <Link
              to="/blog"
              className={`p-2.5 rounded-md transition-colors ${isActive('/blog') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              RESOURCES
            </Link>
            <Link
              to="/contact"
              className={`p-2.5 rounded-md transition-colors ${isActive('/contact') ? 'bg-[#e7020b]/10 text-[#e7020b]' : 'hover:bg-gray-50'}`}
            >
              CONTACT
            </Link>
          </nav>

          <div className="pt-2 border-t border-[#0d0a64]/8 space-y-2">
            <Link
              to="/apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold text-white bg-[#e7020b] hover:bg-[#a3140a] rounded-md shadow-xs transition-colors"
            >
              <span>GET STARTED</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            <div className="text-center pt-1">
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[11px] font-semibold text-gray-400 hover:text-[#0d0a64] transition-colors"
              >
                Administrative Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
