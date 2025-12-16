
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { PropertiesProvider } from '@/contexts/PropertiesContext';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';
import HomePage from '@/pages/HomePage';
import PropertyDetailPage from '@/pages/PropertyDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import LocationPage from '@/pages/LocationPage';
import AdminPage from '@/pages/AdminPage';
import FloatingButtons from '@/components/FloatingButtons';

function App() {
  return (
    <HelmetProvider>
      <SiteSettingsProvider>
        <PropertiesProvider>
          <Router>
            <Helmet>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <div className="min-h-screen bg-[#F5F1ED]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
              <FloatingButtons />
              <Toaster />
            </div>
          </Router>
        </PropertiesProvider>
      </SiteSettingsProvider>
    </HelmetProvider>
  );
}

export default App;
