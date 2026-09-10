import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiryController.js';
import {
  validateCreateEnquiry,
  validateUpdateEnquiry,
  validateObjectId,
} from '../validators/enquiryValidator.js';

const router = Router();

// GET /api/enquiries/stats - Aggregate metrics for admin
router.get('/stats', EnquiryController.getStats);

// GET /api/enquiries - Paginated list with search and filters
router.get('/', EnquiryController.getAll);

// GET /api/enquiries/:id - Single enquiry detail
router.get('/:id', validateObjectId, EnquiryController.getById);

// POST /api/enquiries - Create new enquiry (validated & sanitized)
router.post('/', validateCreateEnquiry, EnquiryController.create);

// PATCH /api/enquiries/:id - Update status / properties
router.patch('/:id', validateObjectId, validateUpdateEnquiry, EnquiryController.update);

// DELETE /api/enquiries/:id - Delete enquiry
router.delete('/:id', validateObjectId, EnquiryController.delete);

export default router;
