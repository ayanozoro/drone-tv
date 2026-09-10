import { Enquiry } from '../models/Enquiry.js';

/**
 * Service to handle business logic and database interactions for enquiries
 */
export class EnquiryService {
  /**
   * Create a new lead enquiry in database
   */
  static async createEnquiry(enquiryData) {
    // Ensure status is always 'New' upon initial creation
    const enquiry = new Enquiry({
      ...enquiryData,
      status: 'New',
    });

    return await enquiry.save();
  }

  /**
   * Get enquiries with pagination, search, and filtering
   */
  static async getEnquiries({ page = 1, limit = 20, search = '', userType = '', status = '' }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Build query filter
    const query = {};

    if (userType && userType !== 'All') {
      query.userType = userType;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    // Multi-field search support with case-insensitive regex
    if (search && search.trim().length > 0) {
      const sanitizedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(sanitizedSearch, 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { interest: searchRegex },
        { message: searchRegex },
      ];
    }

    const [enquiries, total] = await Promise.all([
      Enquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Enquiry.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    return {
      enquiries,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  /**
   * Get KPI statistics for Admin Dashboard
   */
  static async getStats() {
    const counts = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {
      total: 0,
      new: 0,
      contacted: 0,
      inProgress: 0,
      closed: 0,
    };

    counts.forEach((item) => {
      statusCounts.total += item.count;
      if (item._id === 'New') statusCounts.new = item.count;
      else if (item._id === 'Contacted') statusCounts.contacted = item.count;
      else if (item._id === 'In Progress') statusCounts.inProgress = item.count;
      else if (item._id === 'Closed') statusCounts.closed = item.count;
    });

    // Also get breakdown by user type
    const userTypeCounts = await Enquiry.aggregate([
      {
        $group: {
          _id: '$userType',
          count: { $sum: 1 },
        },
      },
    ]);

    const userTypes = {
      student: 0,
      customer: 0,
      other: 0,
    };

    userTypeCounts.forEach((item) => {
      if (item._id === 'Student') userTypes.student = item.count;
      else if (item._id === 'Customer') userTypes.customer = item.count;
      else if (item._id === 'Other') userTypes.other = item.count;
    });

    return {
      statuses: statusCounts,
      userTypes,
    };
  }

  /**
   * Get single enquiry by ID
   */
  static async getEnquiryById(id) {
    return await Enquiry.findById(id);
  }

  /**
   * Update enquiry by ID
   */
  static async updateEnquiry(id, updateData) {
    return await Enquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete enquiry by ID
   */
  static async deleteEnquiry(id) {
    return await Enquiry.findByIdAndDelete(id);
  }
}
