import { sendError } from '../utils/apiResponse.js';

/**
 * Global centralized error handler
 * Catches all unexpected errors, formats clean responses, and ensures
 * internal details/stack traces are never exposed to the client.
 */
export const errorHandler = (err, req, res, next) => {
  // Always log detailed internal error on the server side
  console.error('[Unhandled Error caught by Global Handler]:', {
    message: err.message,
    name: err.name,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
  });

  // Handle Mongoose CastError (e.g., malformed ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, 400, `Invalid value provided for field: ${err.path}`);
  }

  // Handle Mongoose Schema Validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return sendError(res, 400, messages[0] || 'Validation failed', messages);
  }

  // Handle MongoDB Duplicate Key error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return sendError(res, 409, `An entry with this ${field} already exists`);
  }

  // Handle JSON parse syntax errors in body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, 400, 'Malformed JSON payload received in request body');
  }

  // Generic fallback: never expose internal stack trace
  const safeMessage =
    process.env.NODE_ENV === 'development'
      ? err.message || 'Something went wrong. Please try again later.'
      : 'Something went wrong. Please try again later.';

  return sendError(res, err.statusCode || 500, safeMessage);
};
