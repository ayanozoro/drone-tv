import React from 'react';
import { Enquiry } from '../../types';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  enquiry,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !enquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-2xl border border-rose-500/40 shadow-2xl p-6 text-center animate-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white mb-2">Delete Lead Enquiry</h3>
        <p className="text-sm text-slate-300 mb-4">
          Are you sure you want to delete the enquiry from{' '}
          <strong className="text-white">{enquiry.name}</strong> ({enquiry.email})?
        </p>

        <p className="text-xs text-rose-400/90 mb-6 bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/20">
          ⚠️ This action will permanently remove the record from the database and cannot be undone.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 text-white hover:bg-rose-500 transition-colors disabled:opacity-50 shadow-md shadow-rose-600/30"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
