import React from 'react';
import { Enquiry, EnquiryStatus, PaginationInfo } from '../../types';
import { Eye, Trash2, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface EnquiryTableProps {
  enquiries: Enquiry[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  onPageChange: (newPage: number) => void;
  onViewDetails: (enquiry: Enquiry) => void;
  onDeleteRequest: (enquiry: Enquiry) => void;
  onStatusChange: (id: string, newStatus: EnquiryStatus) => Promise<void>;
  onRetry: () => void;
}

export const EnquiryTable: React.FC<EnquiryTableProps> = ({
  enquiries,
  loading,
  error,
  pagination,
  onPageChange,
  onViewDetails,
  onDeleteRequest,
  onStatusChange,
  onRetry,
}) => {
  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Contacted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'In Progress':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Closed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-12 border border-slate-800 text-center flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-sm font-medium text-slate-400">Loading lead enquiries from database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-10 border border-rose-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Unable to Load Enquiries</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">{error}</p>
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (enquiries.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 border border-slate-800 text-center space-y-3">
        <p className="text-base font-semibold text-white">No enquiries match your search or filter criteria.</p>
        <p className="text-xs text-slate-500">
          Try clearing your search query or switching user type/status filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800 text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Candidate / Lead</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">User Type</th>
                <th className="px-5 py-3.5">Interest</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {enquiries.map((enquiry) => (
                <tr
                  key={enquiry._id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Name */}
                  <td className="px-5 py-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span>{enquiry.name}</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4 text-slate-300">
                    <div className="space-y-0.5">
                      <div className="text-slate-200">{enquiry.email}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{enquiry.phone}</div>
                    </div>
                  </td>

                  {/* User Type */}
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-cyan-300 border border-slate-700">
                      {enquiry.userType}
                    </span>
                  </td>

                  {/* Interest */}
                  <td className="px-5 py-4 text-slate-300 max-w-[200px] truncate" title={enquiry.interest}>
                    {enquiry.interest}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-5 py-4">
                    <div className="relative inline-block">
                      <select
                        value={enquiry.status}
                        onChange={(e) =>
                          onStatusChange(enquiry._id, e.target.value as EnquiryStatus)
                        }
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none appearance-none pr-6 bg-slate-900 ${getStatusBadge(
                          enquiry.status
                        )}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                        ▼
                      </div>
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="px-5 py-4 text-slate-400 text-xs font-mono">
                    {formatDate(enquiry.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewDetails(enquiry)}
                        title="View Full Details"
                        className="p-1.5 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteRequest(enquiry)}
                        title="Delete Enquiry"
                        className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-xs text-slate-400">
        <div>
          Showing page <span className="font-bold text-white">{pagination.page}</span> of{' '}
          <span className="font-bold text-white">{pagination.totalPages}</span> (Total{' '}
          <span className="font-bold text-cyan-400">{pagination.total}</span> enquiries)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrevPage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
