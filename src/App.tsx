import React, { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ApplicationModal } from './components/ApplicationModal';
import { ContentProvider } from './context/ContentContext';
import { AdminGuard } from './security/AdminGuard';
import { ErrorBoundary } from './security/ErrorBoundary';
import { PageLoader } from './components/PageLoader';
import { ServiceType } from './types';
const CMSPageRenderer=React.lazy(()=>import('./components/CMSPageRenderer').then(m=>({default:m.CMSPageRenderer})));
const BlogPage=React.lazy(()=>import('./views/BlogPage').then(m=>({default:m.BlogPage})));
const CMSContactPage=React.lazy(()=>import('./views/CMSContactPage').then(m=>({default:m.CMSContactPage})));
const ApplyPage=React.lazy(()=>import('./views/ApplyPage').then(m=>({default:m.ApplyPage})));
const NotFoundPage=React.lazy(()=>import('./views/NotFoundPage').then(m=>({default:m.NotFoundPage})));
const AdminLoginPage=React.lazy(()=>import('./views/admin/AdminLoginPage').then(m=>({default:m.AdminLoginPage})));
const AdminDashboardPage=React.lazy(()=>import('./views/admin/AdminDashboardPage').then(m=>({default:m.AdminDashboardPage})));
const ServicesPage=React.lazy(()=>import('./views/ServicesPage').then(m=>({default:m.ServicesPage})));
const LoadingScreen=()=> <PageLoader label="Loading page"/>;
const AppLayout:React.FC=()=>{const location=useLocation();const isAdminRoute=location.pathname.startsWith('/admin');const [isModalOpen,setIsModalOpen]=useState(false);const [selectedService,setSelectedService]=useState<ServiceType>('student_loan');const handleOpenApply=(service:ServiceType='student_loan')=>{setSelectedService(service);setIsModalOpen(true)};return <div className="min-h-screen flex flex-col bg-white text-[#17202A] font-sans antialiased selection:bg-[#e7020b]/20 selection:text-[#0d0a64]">{!isAdminRoute&&<Navbar onOpenApply={handleOpenApply}/>}<main className="flex-1"><Suspense fallback={<LoadingScreen/>}><Routes>
<Route path="/" element={<CMSPageRenderer slug="home"/>}/><Route path="/services" element={<ServicesPage/>}/><Route path="/student-loans" element={<CMSPageRenderer slug="student-loans"/>}/><Route path="/investments" element={<CMSPageRenderer slug="investments"/>}/><Route path="/business-financing" element={<CMSPageRenderer slug="business-financing"/>}/><Route path="/personal-finance" element={<CMSPageRenderer slug="personal-finance"/>}/><Route path="/other-services" element={<CMSPageRenderer slug="other-services"/>}/><Route path="/about" element={<CMSPageRenderer slug="about"/>}/><Route path="/blog" element={<BlogPage/>}/><Route path="/contact" element={<CMSContactPage/>}/><Route path="/apply" element={<ApplyPage/>}/><Route path="/terms" element={<CMSPageRenderer slug="terms"/>}/><Route path="/terms-of-service" element={<CMSPageRenderer slug="terms"/>}/><Route path="/privacy" element={<CMSPageRenderer slug="privacy"/>}/><Route path="/privacy-policy" element={<CMSPageRenderer slug="privacy"/>}/><Route path="/admin/login" element={<AdminLoginPage/>}/><Route path="/admin" element={<AdminGuard><AdminDashboardPage/></AdminGuard>}/><Route path="*" element={<NotFoundPage/>}/>
</Routes></Suspense></main>{!isAdminRoute&&<><Footer onOpenApply={handleOpenApply}/><FloatingWhatsApp/><ApplicationModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} defaultService={selectedService}/></>}</div>};
export default function App(){return <ErrorBoundary><ContentProvider><BrowserRouter><AppLayout/></BrowserRouter></ContentProvider></ErrorBoundary>}
