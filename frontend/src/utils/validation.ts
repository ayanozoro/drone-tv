import { EnquiryFormData } from '../types';

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  userType?: string;
  interest?: string;
  message?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

export const validateEnquiryForm = (data: EnquiryFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name
  if (!data.name || !data.name.trim()) {
    errors.name = 'Full name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name cannot exceed 100 characters';
  }

  // Email
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone
  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else {
    const digitsOnly = data.phone.replace(/\D/g, '');
    if (!PHONE_REGEX.test(data.phone.trim()) || digitsOnly.length < 10) {
      errors.phone = 'Please enter a valid phone number (min 10 digits)';
    }
  }

  // User Type
  if (!data.userType) {
    errors.userType = 'Please select a user category';
  } else if (!['Student', 'Customer', 'Other'].includes(data.userType)) {
    errors.userType = 'Invalid user category';
  }

  // Interest
  if (!data.interest || !data.interest.trim()) {
    errors.interest = 'Please specify your service or course of interest';
  } else if (data.interest.trim().length > 200) {
    errors.interest = 'Interest cannot exceed 200 characters';
  }

  // Message
  if (!data.message || !data.message.trim()) {
    errors.message = 'Please provide details or questions in your message';
  } else if (data.message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters long';
  } else if (data.message.trim().length > 3000) {
    errors.message = 'Message cannot exceed 3000 characters';
  }

  return errors;
};
