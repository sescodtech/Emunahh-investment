import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ContentProvider } from './context/ContentContext';
import { AdminGuard } from './security/AdminGuard';
import { ErrorBoundary } from './security/ErrorBoundary';
import { PageLoader } from './components/PageLoader';
import { RouteMetadata } from './components/RouteMetadata';
import { RouteAnnouncer } from './components/RouteAnnouncer';

const InstitutionalHomePage = React.lazy(() =>
  import('./views/InstitutionalHomePage').then((module) => ({ default: module.InstitutionalHomePage })),
);
const BlogPage = React.lazy(() =>
  import('./views/BlogPage').then((module) => ({ default: module.BlogPage })),
);
const BlogArticlePage = React.lazy(() =>
  import('./views/BlogArticlePage').then((module) => ({ default: module.BlogArticlePage })),
);
const InstitutionalAboutPage = React.lazy(() =>
  import('./views/InstitutionalAboutPage').then((module) => ({ default: module.InstitutionalAboutPage })),
);
const TrustSecurityPage = React.lazy(() =>
  import('./views/TrustSecurityPage').then((module) => ({ default: module.TrustSecurityPage })),
);
const DisclosuresPage = React.lazy(() =>
  import('./views/DisclosuresPage').then((module) => ({ default: module.DisclosuresPage })),
);
const LegalDocumentPage = React.lazy(() =>
  import('./components/LegalDocumentPage').then((module) => ({ default: module.LegalDocumentPage })),
);
const CMSContactPage = React.lazy(() =>
  import('./views/CMSContactPage').then((module) => ({ default: module.CMSContactPage })),
);
const ApplyPage = React.lazy(() =>
  import('./views/ApplyPage').then((module) => ({ default: module.ApplyPage })),
);
const DocumentUploadPage = React.lazy(() =>
  import('./views/DocumentUploadPage').then((module) => ({ default: module.DocumentUploadPage })),
);
const NotFoundPage = React.lazy(() =>
  import('./views/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
const AdminLoginPage = React.lazy(() =>
  import('./views/admin/AdminLoginPage').then((module) => ({ default: module.AdminLoginPage })),
);
const AdminDashboardPage = React.lazy(() =>
  import('./views/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })),
);
const ServicesPage = React.lazy(() =>
  import('./views/ServicesPage').then((module) => ({ default: module.ServicesPage })),
);
const ServiceDetailPage = React.lazy(() =>
  import('./views/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })),
);

const LoadingScreen = () => <PageLoader label="Loading page" />;

const RouteEffects: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }, 60);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white text-[#152033] antialiased">
      <RouteEffects />
      <RouteMetadata />
      <RouteAnnouncer />
      {!isAdminRoute && (
        <>
          <a href="#main-content" className="ei-skip-link">
            Skip to content
          </a>
          <Navbar />
        </>
      )}

      <main id="main-content" tabIndex={-1} className="min-h-[50vh]">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<InstitutionalHomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/student-loans" element={<Navigate to="/services/education-financing" replace />} />
            <Route path="/investments" element={<Navigate to="/services/investment-services" replace />} />
            <Route path="/business-financing" element={<Navigate to="/services/business-financing" replace />} />
            <Route path="/personal-finance" element={<Navigate to="/services/personal-finance" replace />} />
            <Route path="/other-services" element={<Navigate to="/services" replace />} />
            <Route path="/about" element={<InstitutionalAboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/contact" element={<CMSContactPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/documents/:applicationId" element={<DocumentUploadPage />} />
            <Route path="/trust-security" element={<TrustSecurityPage />} />
            <Route path="/security" element={<Navigate to="/trust-security" replace />} />
            <Route path="/disclosures" element={<DisclosuresPage />} />
            <Route path="/terms" element={<LegalDocumentPage type="terms" />} />
            <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
            <Route path="/privacy" element={<LegalDocumentPage type="privacy" />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/:section?"
              element={
                <AdminGuard>
                  <AdminDashboardPage />
                </AdminGuard>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ContentProvider>
    </ErrorBoundary>
  );
}
