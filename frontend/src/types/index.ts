export type UserType = 'Student' | 'Customer' | 'Other';

export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedEnquiries {
  enquiries: Enquiry[];
  pagination: PaginationInfo;
}

export interface StatusCounts {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  closed: number;
}

export interface UserTypeCounts {
  student: number;
  customer: number;
  other: number;
}

export interface EnquiryStats {
  statuses: StatusCounts;
  userTypes: UserTypeCounts;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export type ChatSender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: Date;
  ctaText?: string;
  ctaAction?: 'enquiry' | 'courses' | 'services';
  ctaPayload?: string;
  suggestions?: string[];
}

export interface ChatIntent {
  id: string;
  intent: string;
  keywords: string[];
  response: string;
  suggestions?: string[];
  ctaText?: string;
  ctaAction?: 'enquiry' | 'courses' | 'services';
  ctaPayload?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  iconName: string;
  badge?: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  duration: string;
  description: string;
  keyOutcomes: string[];
  certification: string;
  popular?: boolean;
  pathwayLevel?: string;
  feeRange?: string;
  rptoApproval?: string;
}

export interface EcosystemPillar {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  popularTopics: string[];
  stats: {
    videos: string;
    companies: string;
    events: string;
  };
  growthBadge: string;
  iconName: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  badge: string;
  dateRange: string;
  location: string;
  timing: string;
  description: string;
  ctaText: string;
}

export interface PartnerEntity {
  name: string;
  type: string;
}
