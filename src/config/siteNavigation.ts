export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const solutionNavigation: NavigationItem[] = [
  {
    label: 'Education Financing',
    href: '/services/education-financing',
    description: 'Structured support for eligible education costs.',
  },
  {
    label: 'Travel Financing',
    href: '/services/travel-financing',
    description: 'Financing for eligible travel-related requirements.',
  },
  {
    label: 'Business Financing',
    href: '/services/business-financing',
    description: 'Working-capital and commercial financing solutions.',
  },
  {
    label: 'Personal Finance',
    href: '/services/personal-finance',
    description: 'Responsible financing for eligible personal needs.',
  },
  {
    label: 'Investment Services',
    href: '/services/investment-services',
    description: 'Investment solutions aligned to defined objectives.',
  },
];

export const companyNavigation: NavigationItem[] = [
  { label: 'About Emunahh-Invest', href: '/about' },
  { label: 'Trust & Security', href: '/trust-security' },
  { label: 'Disclosures', href: '/disclosures' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const legalNavigation: NavigationItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];
