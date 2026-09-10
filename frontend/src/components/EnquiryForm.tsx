import React, { useState, useEffect } from 'react';
import { EnquiryFormData, UserType } from '../types';
import { validateEnquiryForm, FormErrors } from '../utils/validation';
import { api } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Phone, Mail, User, BookOpen } from 'lucide-react';

interface EnquiryFormProps {
  initialInterest?: string;
  initialUserType?: UserType;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialInterest = '',
  initialUserType = 'Student',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    email: '',
    phone: '',
    userType: initialUserType,
    interest: initialInterest,
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (initialInterest) {
      setFormData((prev) => ({ ...prev, interest: initialInterest }));
    }
    if (initialUserType) {
      setFormData((prev) => ({ ...prev, userType: initialUserType }));
    }
  }, [initialInterest, initialUserType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    // Validate fields on client
    const validationErrors = validateEnquiryForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.submitEnquiry(formData);

      if (response.success && response.data) {
        setSubmitSuccess(
          `Thank you, ${response.data.name}! Your enquiry (#${response.data._id.slice(-6)}) has been received. Our team will contact you shortly.`
        );
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          userType: 'Student',
          interest: '',
          message: '',
        });
        setErrors({});
        if (onSuccess) onSuccess();
      } else {
        setSubmitError(response.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setSubmitError('A network error occurred. Please check your connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl relative">
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Priority Lead Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Connect With Our Drone Specialists
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Fill out the details below. Our technical team or admissions counselor will reach out within 2 hours.
        </p>
      </div>

      {/* Success Notification */}
      {submitSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-200">Submission Successful</p>
            <p className="text-xs text-emerald-300/90 mt-0.5 leading-relaxed">{submitSuccess}</p>
          </div>
        </div>
      )}

      {/* Server Error Notification */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-start gap-3 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-rose-200">Submission Failed</p>
            <p className="text-xs text-rose-300/90 mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20'
                }`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              Email Address <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              Phone Number <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 9876543210"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20'
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.phone}</p>}
          </div>

          {/* User Type */}
          <div>
            <label htmlFor="userType" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              User Category <span className="text-cyan-400">*</span>
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.userType
                  ? 'border-rose-500 focus:ring-rose-500/30'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20'
              }`}
            >
              <option value="Student">Student (Pilot License / Academic Training)</option>
              <option value="Customer">Customer (Enterprise UAV Commercial Services)</option>
              <option value="Other">Other (R&D / Career / Partnership)</option>
            </select>
            {errors.userType && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.userType}</p>
            )}
          </div>
        </div>

        {/* Service or Course of Interest */}
        <div>
          <label htmlFor="interest" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            Service / Course of Interest <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              id="interest"
              name="interest"
              type="text"
              value={formData.interest}
              onChange={handleChange}
              placeholder="e.g. DGCA Remote Pilot Certificate or Aerial LiDAR Survey"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.interest
                  ? 'border-rose-500 focus:ring-rose-500/30'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20'
              }`}
            />
          </div>
          {errors.interest && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.interest}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            Message & Inquiry Requirements <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your background, preferred batch timing, mission location, or any specific questions..."
            className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
              errors.message
                ? 'border-rose-500 focus:ring-rose-500/30'
                : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500/20'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Lead Enquiry</span>
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-500 mt-3">
            🔒 Your contact details are securely transmitted directly to the DroneTV admissions & enterprise desk.
          </p>
        </div>
      </form>
    </div>
  );
};
