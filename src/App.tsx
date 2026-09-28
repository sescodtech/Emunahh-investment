'use client';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ApplicationModal } from './components/ApplicationModal';
import { ContentProvider } from './context/ContentContext';

import { HomePage } from './views/HomePage';
import { StudentLoansPage } from './views/StudentLoansPage';
import { InvestmentsPage } from './views/InvestmentsPage';
import { BusinessFinancingPage } from './views/BusinessFinancingPage';
import { PersonalFinancePage } from './views/PersonalFinancePage';
import { OtherServicesPage } from './views/OtherServicesPage';
import { AboutPage } from './views/AboutPage';
import { BlogPage } from './views/BlogPage';
import { ContactPage } from './views/ContactPage';
import { ApplyPage } from './views/ApplyPage';
import { TermsPage } from './views/TermsPage';
import { PrivacyPage } from './views/PrivacyPage';
import { NotFoundPage } from './views/NotFoundPage';

import { AdminLoginPage } from './views/admin/AdminLoginPage';
import { AdminDashboardPage } from './views/admin/AdminDashboardPage';

import { ServiceType } from './types';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('student_loan');

  const handleOpenApply = (service: ServiceType = 'student_loan') => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17202A] font-sans antialiased selection:bg-[#e7020b]/20 selection:text-[#0d0a64]">
      {/* Show Public Header only on non-admin routes */}
      {!isAdminRoute && <Navbar onOpenApply={handleOpenApply} />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenApply={handleOpenApply} />} />
          <Route path="/student-loans" element={<StudentLoansPage onOpenApply={handleOpenApply} />} />
          <Route path="/investments" element={<InvestmentsPage onOpenApply={handleOpenApply} />} />
          <Route path="/business-financing" element={<BusinessFinancingPage onOpenApply={handleOpenApply} />} />
          <Route path="/personal-finance" element={<PersonalFinancePage onOpenApply={handleOpenApply} />} />
          <Route path="/other-services" element={<OtherServicesPage onOpenApply={handleOpenApply} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />

          {/* Admin Management System */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Show Public Footer and WhatsApp Desk only on non-admin routes */}
      {!isAdminRoute && (
        <>
          <Footer onOpenApply={handleOpenApply} />
          <FloatingWhatsApp />
          <ApplicationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            defaultService={selectedService}
          />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ContentProvider>
  );
}
