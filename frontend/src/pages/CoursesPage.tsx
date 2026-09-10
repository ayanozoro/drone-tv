import React, { useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { COURSES_DATA } from '../data/coursesData';
import { GraduationCap } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses =
    selectedLevel === 'All'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.level === selectedLevel);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>DroneTV Flight Training Pathways India</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          DGCA Remote Pilot Training & Career Pathways
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore structured commercial drone pilot pathways across 240+ DGCA-approved Remote Pilot Training Organisations (RPTOs). From baseline DGCA Remote Pilot Certification to high-demand GIS photogrammetry, agriculture spraying, and flight instructor licensing.
        </p>
      </div>

      {/* RPTO Network Stats */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="space-y-1 p-2">
          <div className="text-2xl font-black text-cyan-400">240+</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">DGCA Approved RPTOs</h4>
          <p className="text-[11px] text-slate-400">Nationwide Network</p>
        </div>
        <div className="space-y-1 p-2 border-l border-slate-800">
          <div className="text-2xl font-black text-emerald-400">4 Levels</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Career Progression</h4>
          <p className="text-[11px] text-slate-400">Foundation to Expert</p>
        </div>
        <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-slate-800">
          <div className="text-2xl font-black text-blue-400">1,200+</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pilots Certified</h4>
          <p className="text-[11px] text-slate-400">Across Industry Tracks</p>
        </div>
        <div className="space-y-1 p-2 border-t sm:border-t-0 sm:border-l border-slate-800">
          <div className="text-2xl font-black text-purple-400">100%</div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Placement Support</h4>
          <p className="text-[11px] text-slate-400">Enterprise Hiring Cell</p>
        </div>
      </div>

      {/* Featured RPTOs Banner */}
      <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Featured RPTO Partners on DroneTv.in</span>
            <h3 className="text-lg font-bold text-white">Approved Remote Pilot Training Academies</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 w-fit">
            Verified DGCA Standards
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">Drone Academy Private Limited</span>
            <span className="text-slate-400 block mb-1">Hyderabad, Telangana</span>
            <p className="text-[11px] text-slate-500">Operating entity behind DroneTv.in. Small & Medium RPC licensing with active drone fleet.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">PinakShakti Aerospace Academy</span>
            <span className="text-slate-400 block mb-1">Multi-location | 1,200+ Pilots</span>
            <p className="text-[11px] text-slate-500">Leading academy across 8 locations with defense track & direct job placement assistance.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">Manipal Skill Development Centre</span>
            <span className="text-slate-400 block mb-1">Pan-India | University-Affiliated</span>
            <p className="text-[11px] text-slate-500">Academic credentials with commercial pilot certification and campus placement pipelines.</p>
          </div>
        </div>
      </div>

      {/* Level Filter Pills */}
      <div className="flex items-center justify-center gap-2">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedLevel === lvl
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-white'
              }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
