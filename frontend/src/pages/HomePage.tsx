import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { CourseCard } from '../components/CourseCard';
import { EnquiryForm } from '../components/EnquiryForm';
import { SERVICES_DATA } from '../data/servicesData';
import { COURSES_DATA } from '../data/coursesData';
import {
  ECOSYSTEM_PILLARS,
  UPCOMING_EVENTS,
  ECOSYSTEM_PARTNERS,
  MEDIA_SPOTLIGHTS,
} from '../data/ecosystemData';
import {
  Compass,
  GraduationCap,
  Award,
  ShieldCheck,
  Zap,
  Users2,
  ArrowRight,
  Sparkles,
  Plane,
  Brain,
  Map,
  Calendar,
  MapPin,
  Quote,
  Building2,
  TrendingUp,
} from 'lucide-react';

interface HomePageProps {
  onOpenChatbot?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenChatbot }) => {
  const navigate = useNavigate();

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Plane':
        return <Plane className="w-6 h-6 text-cyan-400" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-cyan-400" />;
      case 'Map':
        return <Map className="w-6 h-6 text-cyan-400" />;
      default:
        return <Zap className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <Hero onOpenChatbot={onOpenChatbot} />

      {/* 3 Core Ecosystem Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>The DroneTV Trinity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Browse By Industry Pillar
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dive deep into specialized content areas and discover cutting-edge innovations across drone technology, artificial intelligence, and geographic information systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ECOSYSTEM_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-card glass-card-hover rounded-2xl p-7 border border-slate-800 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {pillar.growthBadge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">{pillar.tagline}</p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{pillar.description}</p>

                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Popular Topics:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.popularTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs text-slate-400 font-mono space-x-3">
                  <span>
                    <strong className="text-white">{pillar.stats.videos}</strong> Videos
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">{pillar.stats.companies}</strong> Entities
                  </span>
                </div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About DroneTV Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pioneering Indian Aerospace Innovation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Architecting the Future of Aerial Autonomy & Pilot Mastery
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                DroneTV is an integrated drone ecosystem bridging enterprise industrial services with certified flight education. Operating across energy grids, precision agriculture, and large-scale infrastructure mapping, we empower corporations with mission-critical aerial intelligence while cultivating India’s premier licensed UAV pilot cadre.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-bold text-white">DGCA Standardized</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rigorous civil aviation training aligned with DigitalSky compliance and safety regulations.
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-bold text-white">RTK & Thermal Fleet</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Equipped with dual radiometric thermal sensors and sub-centimeter GPS accuracy for precision assets.
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                <Users2 className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-bold text-white">240+ RPTO Network</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated placement pathways with GIS consultancies, renewable developers, and UAV manufacturers.
                </p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                <Award className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Certified Master Tutors</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Over 5,000+ logged flight hours across instructors with military and commercial UAS credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Industry Events & Expos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Industry Summits & Conclaves</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Upcoming Drone & AI Events
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Connect, learn, and network with 5,000+ industry leaders, regulators, and innovators at upcoming expos across India.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {event.badge}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">Seats Open</span>
                </div>

                <h3 className="text-xl font-bold text-white">{event.title}</h3>

                <div className="space-y-2 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{event.dateRange}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{event.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {event.description}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/enquire?interest=${encodeURIComponent(event.title)}&type=Customer`)
                }
                className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-cyan-400 hover:text-white hover:bg-cyan-600/30 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>{event.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* DroneTV Video & Media Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Quote className="w-3.5 h-3.5" />
            <span>Voices from the Drone Ecosystem</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Popular Media & Broadcast Spotlights
          </h2>
          <p className="text-slate-400 text-sm">
            DroneTV captures candid interviews, expert insights, and bold visions shaping India’s UAV ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDIA_SPOTLIGHTS.map((spotlight) => (
            <div
              key={spotlight.id}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  {spotlight.tag}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {spotlight.title}
                </h4>
                <p className="text-xs text-slate-400 italic leading-relaxed">
                  {spotlight.quote}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] font-semibold text-cyan-300">
                — {spotlight.speaker}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Partners & Collaborators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Trusted Government & Enterprise Partners</span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ECOSYSTEM_PARTNERS.map((partner, index) => (
            <div
              key={index}
              className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800/80 text-center flex flex-col items-center justify-center gap-1 hover:border-cyan-500/30 transition-colors"
            >
              <span className="text-xs font-bold text-slate-200">{partner.name}</span>
              <span className="text-[10px] text-slate-500 font-medium">{partner.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Enterprise UAV Capabilities</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Specialized Aerial Services (285+ Listed)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Turnkey drone solutions engineered for infrastructure inspection, precision mapping, agriculture, and high-stakes media broadcasting.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Courses / Training Section Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>DroneTV Flight Academy</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              4-Level Pilot Career Pathways (240+ RPTOs)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              From beginner DGCA licensing to advanced GIS photogrammetry, agriculture spraying, and flight instructor credentials.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
          >
            <span>View All Pathways</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES_DATA.slice(0, 2).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquire-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <EnquiryForm />
      </section>
    </div>
  );
};

