import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ContentProvider } from './context/ContentContext';
import { AdminGuard } from './security/AdminGuard';
import { ErrorBoundary } from './security/ErrorBoundary';
import { PageLoader } from './components/PageLoader';

const CMSPageRenderer = React.lazy(() =>
  import('./components/CMSPageRenderer').then((module) => ({ default: module.CMSPageRenderer })),
);
const InstitutionalHomePage = React.lazy(() =>
  import('./views/InstitutionalHomePage').then((module) => ({ default: module.InstitutionalHomePage })),
);
const BlogPage = React.lazy(() =>
  import('./views/BlogPage').then((module) => ({ default: module.BlogPage })),
);
const CMSContactPage = React.lazy(() =>
  import('./views/CMSContactPage').then((module) => ({ default: module.CMSContactPage })),
);
const ApplyPage = React.lazy(() =>
  import('./views/ApplyPage').then((module) => ({ default: module.ApplyPage })),
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
      {!isAdminRoute && (
        <>
          <a href="#main-content" className="ei-skip-link">
            Skip to content
          </a>
          <Navbar />
        </>
      )}

      <main id="main-content" className="min-h-[50vh]">
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
            <Route path="/about" element={<CMSPageRenderer slug="about" />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<CMSContactPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/terms" element={<CMSPageRenderer slug="terms" />} />
            <Route path="/terms-of-service" element={<CMSPageRenderer slug="terms" />} />
            <Route path="/privacy" element={<CMSPageRenderer slug="privacy" />} />
            <Route path="/privacy-policy" element={<CMSPageRenderer slug="privacy" />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
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
