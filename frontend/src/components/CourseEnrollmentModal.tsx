import { useState } from 'react';
import { submitCourseEnrollment } from '../api';
import type { CourseEnrollmentData } from '../api';

interface CourseEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseName: string;
  courseCategory?: string;
  source?: string;
}

export default function CourseEnrollmentModal({ 
  isOpen, 
  onClose, 
  courseId,
  courseName,
  courseCategory,
  source = 'unknown'
}: CourseEnrollmentModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const enrollmentData: CourseEnrollmentData = {
      ...formData,
      courseId,
      courseName,
      courseCategory,
      source
    };
    
    try {
      const result = await submitCourseEnrollment(enrollmentData);
      setIsSubmitting(false);
      setFormData({ fullName: '', email: '', phone: '' });
      onClose();
      alert(result.message);
    } catch (error) {
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({ fullName: '', email: '', phone: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-bg-deep/95 backdrop-blur border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all mx-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Apply for Course
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              You're applying for: <span className="text-edtech-orange font-semibold">{courseName}</span>
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Fill in your details and our team will contact you with enrollment information and next steps.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Course Info Display */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-xs text-white/60 mb-1">Course Details:</p>
              <p className="text-sm text-white font-medium">{courseName}</p>
              {courseCategory && (
                <p className="text-xs text-white/50">{courseCategory}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-edtech-orange hover:bg-edtech-orange/90 disabled:bg-edtech-orange/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Apply Now'
                )}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <p className="text-center text-xs text-white/50 mt-4">
            By applying, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}
