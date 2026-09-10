import mongoose from 'mongoose';

export const USER_TYPES = ['Student', 'Customer', 'Other'];
export const ENQUIRY_STATUSES = ['New', 'Contacted', 'In Progress', 'Closed'];

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/,
        'Please provide a valid phone number (at least 10 digits)',
      ],
      index: true,
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: {
        values: USER_TYPES,
        message: 'User type must be one of: Student, Customer, Other',
      },
      index: true,
    },
    interest: {
      type: String,
      required: [true, 'Service or course of interest is required'],
      trim: true,
      maxlength: [200, 'Interest cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ENQUIRY_STATUSES,
        message: 'Status must be one of: New, Contacted, In Progress, Closed',
      },
      default: 'New',
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound indexes for rapid admin dashboard filtering and sorting
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ userType: 1, createdAt: -1 });

// Text index for fast multi-field searching
enquirySchema.index(
  {
    name: 'text',
    email: 'text',
    phone: 'text',
    interest: 'text',
    message: 'text',
  },
  {
    weights: {
      name: 5,
      email: 4,
      phone: 3,
      interest: 2,
      message: 1,
    },
    name: 'EnquiryTextIndex',
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
