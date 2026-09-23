import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ApplicationModal } from './components/ApplicationModal';

import { HomePage } from './pages/HomePage';
import { StudentLoansPage } from './pages/StudentLoansPage';
import { InvestmentsPage } from './pages/InvestmentsPage';
import { BusinessFinancingPage } from './pages/BusinessFinancingPage';
import { PersonalFinancePage } from './pages/PersonalFinancePage';
import { OtherServicesPage } from './pages/OtherServicesPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { ServiceType } from './types';

export default function App() {
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
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-[#1E242B] font-sans antialiased selection:bg-[#00A859]/20 selection:text-[#002B99]">
        {/* Multi-Page Sticky Navigation */}
        <Navbar onOpenApply={handleOpenApply} />

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Corporate Multi-Page Footer */}
        <Footer onOpenApply={handleOpenApply} />

        {/* Quick Lead / Application Modal */}
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          defaultService={selectedService}
        />

        {/* Floating Fast Access WhatsApp & Call Desk */}
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
