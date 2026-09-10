import { EnquiryService } from '../services/enquiryService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * Controller handling HTTP requests for Enquiries
 */
export class EnquiryController {
  /**
   * POST /api/enquiries
   * Create a new lead enquiry
   */
  static async create(req, res, next) {
    try {
      const newEnquiry = await EnquiryService.createEnquiry(req.cleanData);
      return sendSuccess(res, 201, 'Enquiry submitted successfully', newEnquiry);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/enquiries
   * Fetch paginated enquiries with search and filter capabilities
   */
  static async getAll(req, res, next) {
    try {
      const { page, limit, search, userType, status } = req.query;
      const result = await EnquiryService.getEnquiries({
        page,
        limit,
        search,
        userType,
        status,
      });

      return sendSuccess(res, 200, 'Enquiries retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/enquiries/stats
   * Fetch aggregate KPI statistics for admin dashboard
   */
  static async getStats(req, res, next) {
    try {
      const stats = await EnquiryService.getStats();
      return sendSuccess(res, 200, 'Enquiry statistics retrieved successfully', stats);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/enquiries/:id
   * Fetch a single enquiry by its MongoDB ObjectId
   */
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const enquiry = await EnquiryService.getEnquiryById(id);

      if (!enquiry) {
        return sendError(res, 404, 'Enquiry not found with the requested ID');
      }

      return sendSuccess(res, 200, 'Enquiry details retrieved successfully', enquiry);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/enquiries/:id
   * Update enquiry status or allowed properties
   */
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedEnquiry = await EnquiryService.updateEnquiry(id, req.cleanData);

      if (!updatedEnquiry) {
        return sendError(res, 404, 'Enquiry not found with the requested ID');
      }

      return sendSuccess(res, 200, 'Enquiry updated successfully', updatedEnquiry);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/enquiries/:id
   * Delete an enquiry by its ID
   */
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedEnquiry = await EnquiryService.deleteEnquiry(id);

      if (!deletedEnquiry) {
        return sendError(res, 404, 'Enquiry not found with the requested ID');
      }

      return sendSuccess(res, 200, 'Enquiry deleted successfully', { id });
    } catch (error) {
      next(error);
    }
  }
}
