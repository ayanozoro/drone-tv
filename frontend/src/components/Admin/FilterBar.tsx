import { Search, RotateCcw, Download } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  userType: string;
  onUserTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
  onExportCsv?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  userType,
  onUserTypeChange,
  status,
  onStatusChange,
  onReset,
  onExportCsv,
}) => {
  const hasActiveFilters = search || (userType && userType !== 'All') || (status && status !== 'All');

  return (
    <div className="glass-card p-4 rounded-xl border border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search enquiries by name, email, phone, interest..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* User Type Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={userType}
            onChange={(e) => onUserTypeChange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All User Types</option>
            <option value="Student">Student</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Export CSV */}
        {onExportCsv && (
          <button
            onClick={onExportCsv}
            title="Export to CSV"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export CSV</span>
          </button>
        )}
      </div>
    </div>
  );
};
