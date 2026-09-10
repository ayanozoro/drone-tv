import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/Chatbot/ChatbotWidget';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { EnquiryPage } from './pages/EnquiryPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on every route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#070C18] text-slate-100 selection:bg-cyan-500 selection:text-white">
      <ScrollToTop />

      {/* Navigation Bar */}
      <Navbar onOpenChatbot={() => setIsChatbotOpen(true)} />

      {/* Main Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenChatbot={() => setIsChatbotOpen(true)} />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/enquire" element={<EnquiryPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Persistent Floating Chatbot Widget */}
      <ChatbotWidget
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen((prev) => !prev)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
