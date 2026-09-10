import React, { useState } from 'react';
import { Enquiry, EnquiryStatus } from '../../types';
import { X, User, Mail, Phone, Tag, Clock, Calendar, Shield } from 'lucide-react';

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: EnquiryStatus) => Promise<void>;
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !enquiry) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value as EnquiryStatus;
    setIsUpdating(true);
    await onUpdateStatus(enquiry._id, nextStatus);
    setIsUpdating(false);
  };

  const getStatusColor = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Contacted':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'In Progress':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Closed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-2xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Lead Enquiry Details</h3>
              <p className="text-xs text-slate-400 font-mono">ID: {enquiry._id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Bar */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Status:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                  enquiry.status
                )}`}
              >
                {enquiry.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Update Status:</span>
              <select
                value={enquiry.status}
                onChange={handleStatusChange}
                disabled={isUpdating}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name</span>
              </div>
              <p className="text-sm font-semibold text-white">{enquiry.name}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>User Category</span>
              </div>
              <p className="text-sm font-semibold text-cyan-300">{enquiry.userType}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Email Address</span>
              </div>
              <a
                href={`mailto:${enquiry.email}`}
                className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
              >
                {enquiry.email}
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Phone Number</span>
              </div>
              <a
                href={`tel:${enquiry.phone}`}
                className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
              >
                {enquiry.phone}
              </a>
            </div>
          </div>

          {/* Interest */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Service / Course of Interest
            </span>
            <p className="text-sm font-bold text-white">{enquiry.interest}</p>
          </div>

          {/* Message Content */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Inquiry Message Details
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </p>
          </div>

          {/* Timestamps */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Created: {formatDate(enquiry.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Last Updated: {formatDate(enquiry.updatedAt)}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
