import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { EnquiryForm } from '../components/EnquiryForm';
import { UserType } from '../types';
import { Send, Clock, ShieldCheck, Headphones } from 'lucide-react';

export const EnquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialInterest = searchParams.get('interest') || '';
  const rawType = searchParams.get('type');
  const initialUserType: UserType =
    rawType === 'Customer' || rawType === 'Other' ? rawType : 'Student';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Send className="w-3.5 h-3.5" />
          <span>Official Lead & Enrollment Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Submit Your Lead Enquiry
        </h1>
        <p className="text-sm text-slate-300">
          Interested in scheduling an enterprise UAV survey or enrolling in our upcoming DGCA certification cohorts? Connect with our team below.
        </p>
      </div>

      {/* Info Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <Clock className="w-5 h-5 text-cyan-400 mx-auto" />
          <h4 className="text-xs font-bold text-white uppercase">2-Hour SLA</h4>
          <p className="text-[11px] text-slate-400">Rapid callback from domain experts</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
          <h4 className="text-xs font-bold text-white uppercase">DGCA Verified</h4>
          <p className="text-[11px] text-slate-400">Authentic compliance & certification</p>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-1">
          <Headphones className="w-5 h-5 text-blue-400 mx-auto" />
          <h4 className="text-xs font-bold text-white uppercase">Direct Support</h4>
          <p className="text-[11px] text-slate-400">Customized enterprise proposals</p>
        </div>
      </div>

      {/* Form */}
      <EnquiryForm
        initialInterest={initialInterest}
        initialUserType={initialUserType}
      />
    </div>
  );
};
