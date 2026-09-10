import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio, Shield, Menu, X, Bot, Compass, GraduationCap, Send, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenChatbot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChatbot }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Radio },
    { name: 'Services', path: '/services', icon: Compass },
    { name: 'Courses', path: '/courses', icon: GraduationCap },
    { name: 'Enquire', path: '/enquire', icon: Send },
    { name: 'Admin', path: '/admin', icon: LayoutDashboard },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070C18]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  DroneTV<span className="text-cyan-400">.in</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Drone • GIS • AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Voice of Drone Technology</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800/90 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all hover:border-cyan-400"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>AI Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            )}

            <Link
              to="/enquire"
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700"
                aria-label="Open Chatbot"
              >
                <Bot className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0A0F1D]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/enquire"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20"
            >
              Submit Lead Enquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
