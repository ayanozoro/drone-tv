import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, CheckCircle2, Sparkles, Navigation, Award, Users, Crosshair } from 'lucide-react';

interface HeroProps {
  onOpenChatbot?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChatbot }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Col */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Announcement pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice of Drone Technology, GIS & AI Industries</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Discover The Complete{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Drone Ecosystem
              </span>{' '}
              In One Place
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              DroneTV.in showcases the products, technologies, and pioneers across Drone, GIS, and AI industries. Connecting manufacturers, certified commercial pilots, geospatial analysts, and enterprise buyers across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02]"
              >
                <span>Explore RPTO Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {onOpenChatbot && (
                <button
                  onClick={onOpenChatbot}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-cyan-300 bg-slate-800/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-md hover:scale-[1.02]"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Ask AI Assistant</span>
                </button>
              )}

              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                <span>Browse Services</span>
              </Link>
            </div>

            {/* Value checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                240+ DGCA Approved RPTOs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                285+ Listed Enterprise Services
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Drone • GIS • AI Ecosystem
              </span>
            </div>
          </div>

          {/* Right Visual Col - Flight Telemetry HUD Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl p-6 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              {/* Radar Grid Animation effect */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                    DRONETV.IN // LIVE ECOSYSTEM
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">STATUS: NETWORK ACTIVE</span>
              </div>

              {/* HUD Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 py-5 font-mono text-xs">
                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>DGCA ACADEMIES</span>
                  </div>
                  <div className="text-xl font-bold text-white tracking-wide">
                    240+ <span className="text-xs text-cyan-400">RPTOs</span>
                  </div>
                  <p className="text-[10px] text-emerald-400 mt-1">✓ Approved Nationwide</p>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                    <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                    <span>VERIFIED SERVICES</span>
                  </div>
                  <div className="text-xl font-bold text-white tracking-wide">
                    285+ <span className="text-xs text-cyan-400">SOLUTIONS</span>
                  </div>
                  <p className="text-[10px] text-cyan-300 mt-1">62 Specialized Categories</p>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>MEDIA HUB</span>
                  </div>
                  <div className="text-xl font-bold text-white tracking-wide">
                    150+ <span className="text-xs text-cyan-400">VIDEOS</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Drone Expo Spotlights</p>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PARTNER NETWORK</span>
                  </div>
                  <div className="text-xl font-bold text-emerald-400 tracking-wide">12+ GOVTS</div>
                  <p className="text-[10px] text-slate-400 mt-1">State & Police Fleets</p>
                </div>
              </div>

              {/* Bot Prompt Prompt Bar in Hero */}
              <div className="mt-2 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-cyan-200">
                  <Bot className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Have questions about eligibility or services?</span>
                </div>
                {onOpenChatbot && (
                  <button
                    onClick={onOpenChatbot}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors flex-shrink-0"
                  >
                    Ask Bot
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
