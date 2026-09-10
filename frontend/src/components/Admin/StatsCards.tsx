import React from 'react';
import { StatusCounts } from '../../types';
import { Inbox, AlertCircle, PhoneCall, Activity, CheckCircle2 } from 'lucide-react';

interface StatsCardsProps {
  stats: StatusCounts;
  currentStatusFilter: string;
  onSelectStatus: (status: string) => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  currentStatusFilter,
  onSelectStatus,
}) => {
  const cards = [
    {
      title: 'Total Enquiries',
      count: stats.total,
      filterValue: 'All',
      icon: Inbox,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    {
      title: 'New Leads',
      count: stats.new,
      filterValue: 'New',
      icon: AlertCircle,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Contacted',
      count: stats.contacted,
      filterValue: 'Contacted',
      icon: PhoneCall,
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'In Progress',
      count: stats.inProgress,
      filterValue: 'In Progress',
      icon: Activity,
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Closed / Converted',
      count: stats.closed,
      filterValue: 'Closed',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = currentStatusFilter === card.filterValue;

        return (
          <button
            key={card.title}
            onClick={() => onSelectStatus(card.filterValue)}
            className={`glass-card p-4 rounded-xl border text-left transition-all hover:scale-[1.02] ${
              isSelected ? `${card.border} ring-2 ring-cyan-500/30` : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">{card.title}</span>
              <div className={`w-7 h-7 rounded-lg ${card.bg} flex items-center justify-center ${card.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">{card.count}</div>
            <div className="text-[10px] text-slate-500 mt-1">Click to filter table</div>
          </button>
        );
      })}
    </div>
  );
};
