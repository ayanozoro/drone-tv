import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="glass-card max-w-md p-10 rounded-3xl border border-slate-800 space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
          <Navigation className="w-7 h-7 rotate-45" />
        </div>
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Waypoint Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The flight coordinates you requested do not exist in our airspace. Return to base to resume navigation.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
