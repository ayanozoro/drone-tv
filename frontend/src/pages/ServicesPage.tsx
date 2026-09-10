import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES_DATA } from '../data/servicesData';
import { Compass } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(SERVICES_DATA.map((s) => s.category)))];

  const filteredServices =
    selectedCategory === 'All'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Book Drone, GIS & AI Services • DroneTv.in</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Enterprise Drone, GIS & AI Services
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Book verified commercial drone operations across India. Connect directly with certified flight providers for high-precision LiDAR mapping, 24/7 surveillance, thermal solar/wind inspections, and precision agriculture spraying.
        </p>
      </div>

      {/* Services Metrics Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="space-y-1 p-2">
          <div className="text-2xl font-black text-cyan-400">285+</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services Available</h4>
          <p className="text-[11px] text-slate-400">Verified Providers</p>
        </div>
        <div className="space-y-1 p-2 border-l border-slate-800">
          <div className="text-2xl font-black text-emerald-400">56</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Featured Solutions</h4>
          <p className="text-[11px] text-slate-400">Turnkey Execution</p>
        </div>
        <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-slate-800">
          <div className="text-2xl font-black text-blue-400">62</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Categories</h4>
          <p className="text-[11px] text-slate-400">Drone, GIS & AI</p>
        </div>
        <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-slate-800">
          <div className="text-2xl font-black text-purple-400">Direct</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Book Via DroneTV</h4>
          <p className="text-[11px] text-slate-400">Fast Quote Handoff</p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
