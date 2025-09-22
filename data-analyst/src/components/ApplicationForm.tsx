'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Phone, Laptop, Target, Clock, CheckCircle } from 'lucide-react';
import { bootcampApi, type BootcampApplication } from '@/lib/api';
import toast from 'react-hot-toast';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationForm({ isOpen, onClose }: ApplicationFormProps) {
  const [formData, setFormData] = useState<BootcampApplication>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await bootcampApi.submitApplication({
        ...formData,
        source: 'data_analyst_application'
      });
      
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
      });
      onClose();
      toast.success('Application submitted successfully! We will contact you within 2 hours.');
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Apply to 4-Month Data Analytics Career Program</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  15-Day Money Back Guarantee
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Job Placement Assistance
                </span>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form id="application-form" onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Simple Lead Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                  placeholder="+44 7XXX XXXXXX"
                />
              </div>
            </div>

            {/* Guarantees Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                What You Get With Your Free Consultation
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    15-Day Money Back Guarantee
                  </div>
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Job Placement Assistance
                  </div>
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Freelancing Business Setup
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-blue-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Double Income Promise
                  </div>
                  <div className="flex items-center text-blue-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    4-Month Comprehensive Training
                  </div>
                  <div className="flex items-center text-blue-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Lifetime Career Support
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Submit Button */}
        <div className="border-t border-gray-200 p-6 bg-white rounded-b-2xl">
          <button
            type="submit"
            form="application-form"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Get FREE Data Analytics Career Consultation
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 We'll call you within 2 hours to discuss your Data Analytics career opportunity. 100% Free consultation.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
