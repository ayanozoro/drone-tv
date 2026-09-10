import React, { useState, useEffect, useCallback } from 'react';
import { Enquiry, EnquiryStatus, PaginationInfo, StatusCounts } from '../types';
import { api } from '../services/api';
import { StatsCards } from '../components/Admin/StatsCards';
import { FilterBar } from '../components/Admin/FilterBar';
import { EnquiryTable } from '../components/Admin/EnquiryTable';
import { EnquiryDetailModal } from '../components/Admin/EnquiryDetailModal';
import { DeleteConfirmModal } from '../components/Admin/DeleteConfirmModal';
import {
  LayoutDashboard,
  Shield,
  KeyRound,
  RefreshCw,
  LogOut,
  AlertCircle,
  Lock,
} from 'lucide-react';

const ADMIN_PASSKEY = 'dronetv2026';

export const AdminDashboardPage: React.FC = () => {
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('dronetv_admin_auth') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stats State
  const [stats, setStats] = useState<StatusCounts>({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    closed: 0,
  });

  // Filter & Search State
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState('All');
  const [status, setStatus] = useState('All');
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 15,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Modals State
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Success/Info Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch Dashboard Stats
  const loadStats = useCallback(async () => {
    try {
      const res = await api.fetchStats();
      if (res.success && res.data) {
        setStats(res.data.statuses);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  }, []);

  // Fetch Enquiries
  const loadEnquiries = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.fetchEnquiries({
          page: pageToLoad,
          limit: pagination.limit,
          search,
          userType,
          status,
        });

        if (res.success && res.data) {
          setEnquiries(res.data.enquiries);
          setPagination(res.data.pagination);
        } else {
          setError(res.message || 'Failed to fetch enquiries.');
        }
      } catch (err) {
        console.error('Error loading enquiries:', err);
        setError('Network error occurred while communicating with database.');
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, search, userType, status]
  );

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      loadEnquiries(1);
    }
  }, [isAuthenticated, loadStats, loadEnquiries]);

  // Handle Passkey Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim() === ADMIN_PASSKEY) {
      sessionStorage.setItem('dronetv_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrative passkey. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('dronetv_admin_auth');
    setIsAuthenticated(false);
    setPasskeyInput('');
  };

  // Status Change Handler
  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await api.updateStatus(id, newStatus);
      if (res.success && res.data) {
        // Update locally in table
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast(`Status updated to "${newStatus}"`);
        loadStats(); // Refresh stats numbers
      } else {
        alert(res.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Network error while updating enquiry status.');
    }
  };

  // Delete Action Handler
  const handleDeleteConfirm = async () => {
    if (!enquiryToDelete) return;

    setIsDeleting(true);
    try {
      const res = await api.deleteEnquiry(enquiryToDelete._id);
      if (res.success) {
        setIsDeleteOpen(false);
        setEnquiryToDelete(null);
        showToast('Enquiry deleted successfully.');
        loadEnquiries(pagination.page);
        loadStats();
      } else {
        alert(res.message || 'Failed to delete enquiry');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Network error while deleting enquiry.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Export to CSV Handler
  const handleExportCsv = () => {
    if (enquiries.length === 0) return;

    const headers = ['ID', 'Name', 'Email', 'Phone', 'UserType', 'Interest', 'Status', 'CreatedAt'];
    const rows = enquiries.map((e) => [
      e._id,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.userType}"`,
      `"${e.interest.replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${new Date(e.createdAt).toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DroneTV_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Enquiry export downloaded.');
  };

  // Passkey Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <div className="glass-card w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Admin Portal Authorization</h2>
            <p className="text-xs text-slate-400">
              Please enter the administrative key to manage lead enquiries.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="passkey" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Admin Passkey
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="passkey"
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter admin passkey..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Demo Key: <code className="text-cyan-400 font-mono">dronetv2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all"
            >
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 p-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl animate-fade-in flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Lead Management & Enquiry CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Monitor, filter, update, and manage student admissions and enterprise leads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              loadStats();
              loadEnquiries(pagination.page);
              showToast('Data refreshed');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/40 text-rose-300 hover:text-white border border-rose-500/30 hover:bg-rose-900/60 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <StatsCards
        stats={stats}
        currentStatusFilter={status}
        onSelectStatus={(st) => setStatus(st)}
      />

      {/* Filter and Search Bar */}
      <FilterBar
        search={search}
        onSearchChange={(val) => setSearch(val)}
        userType={userType}
        onUserTypeChange={(val) => setUserType(val)}
        status={status}
        onStatusChange={(val) => setStatus(val)}
        onReset={() => {
          setSearch('');
          setUserType('All');
          setStatus('All');
        }}
        onExportCsv={handleExportCsv}
      />

      {/* Enquiries Data Table */}
      <EnquiryTable
        enquiries={enquiries}
        loading={loading}
        error={error}
        pagination={pagination}
        onPageChange={(newPage) => loadEnquiries(newPage)}
        onViewDetails={(enq) => {
          setSelectedEnquiry(enq);
          setIsDetailOpen(true);
        }}
        onDeleteRequest={(enq) => {
          setEnquiryToDelete(enq);
          setIsDeleteOpen(true);
        }}
        onStatusChange={handleStatusChange}
        onRetry={() => {
          loadStats();
          loadEnquiries(pagination.page);
        }}
      />

      {/* View Details Modal */}
      <EnquiryDetailModal
        enquiry={selectedEnquiry}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedEnquiry(null);
        }}
        onUpdateStatus={handleStatusChange}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        enquiry={enquiryToDelete}
        isOpen={isDeleteOpen}
        isDeleting={isDeleting}
        onClose={() => {
          setIsDeleteOpen(false);
          setEnquiryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
