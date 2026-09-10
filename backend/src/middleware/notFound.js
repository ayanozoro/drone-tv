import { sendError } from '../utils/apiResponse.js';

/**
 * 404 Route Not Found Middleware
 */
export const notFound = (req, res) => {
  return sendError(res, 404, `API route not found: ${req.method} ${req.originalUrl}`);
};
