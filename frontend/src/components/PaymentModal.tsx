import { useState, useEffect } from 'react';
import type { Course } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  coursePrice?: number;
  source?: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_id';

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  course,
  coursePrice,
  source = 'unknown'
}: PaymentModalProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [finalPrice, setFinalPrice] = useState(coursePrice);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  // Update final price when coursePrice changes
  useEffect(() => {
    if (!appliedCoupon) {
      setFinalPrice(coursePrice);
    }
  }, [coursePrice, appliedCoupon]);

  // Validate coupon function
  const validateCoupon = async (couponCodeInput: string) => {
    if (!couponCodeInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError('');

    try {
      const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: couponCodeInput.trim(),
          courseId: course.id,
          originalPrice: coursePrice
        }),
      });

      const data = await response.json();

      if (data.success && data.valid) {
        setAppliedCoupon(data);
        setFinalPrice(data.discount.finalPrice);
        setCouponError('');
      } else {
        setCouponError(data.error || 'Invalid coupon code');
        setAppliedCoupon(null);
        setFinalPrice(coursePrice);
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setCouponError('Failed to validate coupon. Please try again.');
      setAppliedCoupon(null);
      setFinalPrice(coursePrice);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  // Remove coupon function
  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponError('');
    setFinalPrice(coursePrice);
  };

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (isOpen) {
      loadRazorpayScript();
    }
  }, [isOpen]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) newErrors.email = 'Invalid email format';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?[\d\s-()]{10,}$/.test(customerInfo.phone)) newErrors.phone = 'Invalid phone format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPaymentOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          customerInfo: {
            name: customerInfo.name.trim(),
            email: customerInfo.email.trim(),
            phone: customerInfo.phone.trim()
          },
          ...(appliedCoupon && { couponCode: appliedCoupon.coupon.code })
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create payment order');
      }

      return data.order;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_signature: paymentData.razorpay_signature,
          customerInfo,
          courseInfo: {
            id: course.id,
            title: course.title,
            category: course.category
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Payment verification failed');
      }

      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setErrors({});

    try {
      // Create payment order
      const order = await createPaymentOrder();

      // Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'EdTech Platform',
        description: `Enrollment for ${course.title}${appliedCoupon ? ` (${appliedCoupon.coupon.code} applied)` : ''}`,
        order_id: order.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            await verifyPayment(response);
            
            // Payment successful
            alert(`Payment successful! Welcome to ${course.title}. You will receive course access details via email shortly.`);
            
            // Reset form and close modal
            setCustomerInfo({ name: '', email: '', phone: '' });
            setCouponCode('');
            setAppliedCoupon(null);
            setCouponError('');
            setFinalPrice(coursePrice);
            onClose();
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support if amount was deducted.');
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        notes: {
          source,
          course_id: course.id,
          course_title: course.title
        },
        theme: {
          color: '#10B981'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      console.error('Error in payment process:', error);
      alert(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
              Complete Your Enrollment
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Course: <span className="text-edtech-orange font-semibold">{course.title}</span>
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Complete your payment to get instant access to the course materials and start learning.
            </p>
          </div>

          {/* Pricing Display */}
          <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">Course Fee:</span>
              <div className="text-right">
                {appliedCoupon ? (
                  <>
                    <div className="text-white/40 line-through text-sm">${coursePrice}</div>
                    <div className="text-edtech-green font-bold text-lg">${finalPrice}</div>
                  </>
                ) : (
                  <div className="text-edtech-green font-bold text-lg">${finalPrice}</div>
                )}
              </div>
            </div>
            {appliedCoupon && (
              <div className="mt-2 text-edtech-green text-sm font-medium">
                💰 You saved ${appliedCoupon.discount.amount} with coupon {appliedCoupon.coupon.code}
              </div>
            )}
          </div>
          
          {/* Coupon Section */}
          {!appliedCoupon ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Have a Coupon Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all text-sm"
                  disabled={isValidatingCoupon}
                />
                <button
                  type="button"
                  onClick={() => validateCoupon(couponCode)}
                  disabled={isValidatingCoupon || !couponCode.trim()}
                  className="bg-edtech-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  {isValidatingCoupon ? 'Validating...' : 'Apply'}
                </button>
              </div>
              {couponError && (
                <p className="text-red-400 text-xs mt-1">{couponError}</p>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <div className="bg-edtech-green/20 border border-edtech-green/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-edtech-green font-semibold text-sm">
                      ✅ {appliedCoupon.coupon.code} Applied
                    </div>
                    <div className="text-white/70 text-xs">
                      Saved ${appliedCoupon.discount.amount}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-white/70 hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={customerInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-edtech-orange/50 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-edtech-orange hover:bg-edtech-orange/90 disabled:bg-edtech-orange/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${finalPrice}`
                )}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <p className="text-center text-xs text-white/50 mt-4">
            Secure payment powered by Razorpay. Your information is protected.
          </p>
        </div>
      </div>
    </div>
  );
}