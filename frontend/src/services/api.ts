import {
  ApiResponse,
  Enquiry,
  EnquiryFormData,
  EnquiryStats,
  EnquiryStatus,
  PaginatedEnquiries,
} from '../types';

const DEFAULT_API_URL = import.meta.env.PROD
  ? 'https://dronetv-backend-api.onrender.com'
  : 'http://localhost:5000';

const rawBaseUrl = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_UR ||
  DEFAULT_API_URL
).trim().replace(/\/+$/, '');
const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl.slice(0, -4) : rawBaseUrl;

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({
        success: false,
        message: 'Invalid server response format',
      }));

      if (!response.ok) {
        return {
          success: false,
          message: data.message || `Request failed with status ${response.status}`,
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error(`[API Network Error] ${endpoint}:`, error);
      return {
        success: false,
        message:
          'Unable to connect to DroneTV servers. Please verify your internet connection or try again later.',
      };
    }
  }

  /**
   * Health check endpoint
   */
  async checkHealth(): Promise<ApiResponse<{ uptime: number; database: string }>> {
    return this.request('/api/health');
  }

  /**
   * Submit new enquiry lead
   */
  async submitEnquiry(enquiry: EnquiryFormData): Promise<ApiResponse<Enquiry>> {
    return this.request<Enquiry>('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiry),
    });
  }

  /**
   * Fetch all enquiries with optional filters and pagination
   */
  async fetchEnquiries(params: {
    page?: number;
    limit?: number;
    search?: string;
    userType?: string;
    status?: string;
  } = {}): Promise<ApiResponse<PaginatedEnquiries>> {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.search && params.search.trim()) query.append('search', params.search.trim());
    if (params.userType && params.userType !== 'All') query.append('userType', params.userType);
    if (params.status && params.status !== 'All') query.append('status', params.status);

    const queryString = query.toString();
    const endpoint = `/api/enquiries${queryString ? `?${queryString}` : ''}`;

    return this.request<PaginatedEnquiries>(endpoint);
  }

  /**
   * Fetch KPI statistics for admin dashboard
   */
  async fetchStats(): Promise<ApiResponse<EnquiryStats>> {
    return this.request<EnquiryStats>('/api/enquiries/stats');
  }

  /**
   * Fetch single enquiry by ID
   */
  async fetchEnquiryById(id: string): Promise<ApiResponse<Enquiry>> {
    return this.request<Enquiry>(`/api/enquiries/${id}`);
  }

  /**
   * Update enquiry status
   */
  async updateStatus(id: string, status: EnquiryStatus): Promise<ApiResponse<Enquiry>> {
    return this.request<Enquiry>(`/api/enquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  /**
   * Delete enquiry by ID
   */
  async deleteEnquiry(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>(`/api/enquiries/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
