import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceItem } from '../types';
import {
  MapPin,
  ShieldAlert,
  Leaf,
  Video,
  Radio,
  Cpu,
  CheckCircle,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  ShieldAlert,
  Leaf,
  Video,
  Radio,
  Cpu,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const IconComponent = iconMap[service.iconName] || MapPin;

  const handleEnquire = () => {
    // Navigate to enquiry page with prefilled service interest query parameter
    navigate(`/enquire?interest=${encodeURIComponent(service.title)}&type=Customer`);
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group">
      <div>
        {/* Header: Icon & Category Badge */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>
          {service.badge && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
              {service.badge}
            </span>
          )}
        </div>

        {/* Title & Category */}
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
          {service.category}
        </p>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="space-y-2 mb-6 border-t border-slate-800/80 pt-4">
          {service.features.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <button
        onClick={handleEnquire}
        className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800/90 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500 hover:text-slate-950 transition-all group-hover:shadow-md"
      >
        <span>Request Service Quote</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
