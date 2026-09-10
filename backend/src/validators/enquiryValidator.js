import mongoose from 'mongoose';
import { USER_TYPES, ENQUIRY_STATUSES } from '../models/Enquiry.js';
import { sendError } from '../utils/apiResponse.js';

// Basic HTML sanitization function to strip potentially dangerous tags
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

/**
 * Validate middleware for POST /api/enquiries
 */
export const validateCreateEnquiry = (req, res, next) => {
  const errors = [];
  const body = req.body || {};

  // Sanitize all string fields
  const name = sanitizeString(body.name);
  const email = sanitizeString(body.email);
  const phone = sanitizeString(body.phone);
  const userType = sanitizeString(body.userType);
  const interest = sanitizeString(body.interest);
  const message = sanitizeString(body.message);

  // Validate Name
  if (!name || name.length === 0) {
    errors.push('Name is required');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Validate Email
  if (!email || email.length === 0) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Invalid email address format');
  }

  // Validate Phone
  if (!phone || phone.length === 0) {
    errors.push('Phone number is required');
  } else if (!PHONE_REGEX.test(phone) || phone.replace(/\D/g, '').length < 10) {
    errors.push('Invalid phone number (minimum 10 valid digits required)');
  }

  // Validate User Type
  if (!userType || userType.length === 0) {
    errors.push('User type is required');
  } else if (!USER_TYPES.includes(userType)) {
    errors.push(`User type must be one of: ${USER_TYPES.join(', ')}`);
  }

  // Validate Interest
  if (!interest || interest.length === 0) {
    errors.push('Service or course of interest is required');
  } else if (interest.length > 200) {
    errors.push('Interest cannot exceed 200 characters');
  }

  // Validate Message
  if (!message || message.length === 0) {
    errors.push('Message is required');
  } else if (message.length < 5) {
    errors.push('Message must be at least 5 characters long');
  } else if (message.length > 3000) {
    errors.push('Message cannot exceed 3000 characters');
  }

  if (errors.length > 0) {
    return sendError(res, 400, errors[0], errors);
  }

  // Attach cleaned and sanitized data, deliberately discarding any client-provided 'status'
  req.cleanData = {
    name,
    email: email.toLowerCase(),
    phone,
    userType,
    interest,
    message,
    status: 'New', // Default status always enforced on creation
  };

  next();
};

/**
 * Validate middleware for PATCH /api/enquiries/:id
 */
export const validateUpdateEnquiry = (req, res, next) => {
  const body = req.body || {};
  const errors = [];

  // If status is provided, validate enum
  if (body.status !== undefined) {
    const status = sanitizeString(body.status);
    if (!ENQUIRY_STATUSES.includes(status)) {
      errors.push(`Status must be one of: ${ENQUIRY_STATUSES.join(', ')}`);
    } else {
      req.cleanData = { ...req.cleanData, status };
    }
  }

  // Optional message or notes update if allowed
  if (body.message !== undefined) {
    const message = sanitizeString(body.message);
    if (message.length < 5) {
      errors.push('Message must be at least 5 characters long');
    } else {
      req.cleanData = { ...req.cleanData, message };
    }
  }

  if (errors.length > 0) {
    return sendError(res, 400, errors[0], errors);
  }

  if (!req.cleanData || Object.keys(req.cleanData).length === 0) {
    return sendError(res, 400, 'No valid fields provided for update');
  }

  next();
};

/**
 * Validate MongoDB ObjectId parameter
 */
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return sendError(res, 400, 'Invalid enquiry ID format');
  }
  next();
};
