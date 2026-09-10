import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040711] border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                DroneTV<span className="text-cyan-400">.in</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              India's drone industry platform — connecting manufacturers, certified pilots, GIS & AI companies, buyers, and policymakers across the ecosystem.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                240+ DGCA Approved RPTOs
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  285+ Drone Services
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  4 RPTO Pilot Pathways
                </Link>
              </li>
              <li>
                <Link to="/enquire" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Submit Lead Enquiry
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Administrator CRM
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Training Programs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              RPTO Career Pathways
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Level 01: DGCA Remote Pilot (RPC)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Level 02: GIS & Drone Mapping
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Level 03: Agriculture Specialist
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors">
                  Level 04: Certified Flight Instructor
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Official Headquarters
            </h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Drone Academy Pvt Ltd, Hyderabad & New Delhi, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>support@dronetv.in</span>
            </div>
            <div className="pt-2 flex items-center gap-3 text-xs text-cyan-400 font-semibold">
              <a href="https://www.youtube.com/@indiadronetv" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a>
              <span>•</span>
              <a href="https://x.com/indiadronetv" target="_blank" rel="noreferrer" className="hover:underline">X</a>
              <span>•</span>
              <a href="https://www.instagram.com/dronetv.in/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
              <span>•</span>
              <a href="https://www.facebook.com/dronetv.in" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DroneTV.in — Voice of Drone Technology, GIS & AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">
              Candidate: Mohit Uniyal • Full Stack Assessment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
