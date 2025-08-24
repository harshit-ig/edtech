# Razorpay Payment Integration Guide

This guide explains how the Razorpay payment system has been integrated into the EdTech platform.

## Overview

The integration provides:
- **Direct payment flow** without requiring user login
- **Seamless course enrollment** with immediate payment processing
- **Admin payment analytics** with real-time statistics
- **Transaction management** and monitoring
- **Webhook support** for payment notifications

## Architecture

### Frontend Changes
- **PaymentModal component**: Replaces course enrollment form with direct payment
- **Payment context**: Manages payment modal state globally
- **Direct buy buttons**: "Buy Now" buttons on course cards and course pages
- **Razorpay SDK integration**: Handles payment processing

### Backend Changes
- **Payment models**: PaymentOrder and PaymentTransaction schemas
- **Payment controller**: Handles order creation, verification, and statistics
- **Payment routes**: `/api/payments/*` endpoints
- **Webhook handling**: For payment status updates

### Admin Panel Changes
- **Payment analytics page**: Revenue, transaction stats, course performance
- **Transaction history**: View all payment transactions
- **Dashboard integration**: Payment metrics on main dashboard

## Setup Instructions

### 1. Environment Variables

**Backend (.env)**
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

**Frontend (.env)**
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_URL=http://localhost:5000/api
```

### 2. Razorpay Account Setup

1. Create a Razorpay account at https://razorpay.com
2. Get your API keys from the dashboard
3. Set up webhooks pointing to `your-domain/api/payments/webhook`
4. Configure webhook events: `payment.captured`, `payment.failed`

### 3. Install Dependencies

**Frontend**
```bash
cd frontend
npm install razorpay
```

**Backend**
```bash
cd backend
npm install razorpay
```

## How It Works

### Payment Flow

1. **User clicks "Buy Now"** on course card or course page
2. **PaymentModal opens** collecting user details (name, email, phone)
3. **Order creation** - Backend creates Razorpay order
4. **Payment processing** - Razorpay checkout opens
5. **Payment verification** - Backend verifies payment signature
6. **Success handling** - Transaction recorded, user notified

### User Experience

- **No login required** - Users can purchase directly
- **Instant access** - Payment confirmation shows immediately
- **Mobile optimized** - Razorpay checkout works on all devices
- **Multiple payment methods** - UPI, cards, wallets, net banking

### Admin Features

- **Real-time analytics** - Revenue, transaction counts, growth metrics
- **Course performance** - Best-selling courses, enrollment stats
- **Transaction management** - View all payments, filter by status
- **Export functionality** - Download payment reports

## API Endpoints

### Payment Endpoints

```
POST /api/payments/create-order
POST /api/payments/verify
POST /api/payments/webhook
GET  /api/payments/orders (admin)
GET  /api/payments/transactions (admin)
GET  /api/payments/stats (admin)
```

### Example Payment Creation

```javascript
// Frontend - Create payment order
const response = await fetch('/api/payments/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    courseId: 'course-123',
    customerInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210'
    }
  })
});
```

### Example Payment Verification

```javascript
// Frontend - Verify payment
const response = await fetch('/api/payments/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    razorpay_order_id: 'order_xyz',
    razorpay_payment_id: 'pay_abc',
    razorpay_signature: 'signature_123',
    customerInfo: customerData,
    courseInfo: courseData
  })
});
```

## Database Schema

### PaymentOrder
```javascript
{
  id: String,
  orderId: String,
  courseId: String,
  courseName: String,
  amount: Number,
  currency: String,
  status: 'created' | 'paid' | 'failed' | 'cancelled',
  customerInfo: {
    name: String,
    email: String,
    phone: String
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
}
```

### PaymentTransaction
```javascript
{
  id: String,
  orderId: String,
  razorpayPaymentId: String,
  amount: Number,
  status: 'success' | 'failed' | 'pending',
  method: String,
  customerInfo: Object,
  courseInfo: Object,
  paymentDate: Date
}
```

## Testing

### Test Mode
- Use Razorpay test keys for development
- Test cards provided by Razorpay work in test mode
- No real money is charged in test mode

### Test Card Numbers
```
Success: 4111 1111 1111 1111
Failure: 4000 0000 0000 0002
```

## Security Features

- **Signature verification** - All payments verified using webhook signatures
- **Order validation** - Orders validated before payment processing
- **Secure endpoints** - Admin endpoints protected with authentication
- **Input sanitization** - All user inputs validated and sanitized

## Customization

### Course Pricing
- Default price: $29 USD
- Course-specific pricing from CourseDetails model
- Dynamic pricing display on frontend

### Payment Options
- All Razorpay payment methods enabled
- UPI, Cards, Wallets, Net Banking
- International cards (if enabled in Razorpay)

### Branding
- Payment modal styled to match platform design
- Razorpay checkout uses platform colors
- Custom success/failure messages

## Troubleshooting

### Common Issues

1. **Payment signature mismatch**
   - Check webhook secret configuration
   - Verify signature generation logic

2. **Order not found**
   - Ensure order creation completes before payment
   - Check order ID mapping

3. **Webhook failures**
   - Verify webhook URL accessibility
   - Check webhook signature validation

### Debug Mode
Add environment variable for enhanced logging:
```env
PAYMENT_DEBUG=true
```

## Production Checklist

- [ ] Set production Razorpay keys
- [ ] Configure production webhook URLs
- [ ] Test payment flow end-to-end
- [ ] Verify admin panel access
- [ ] Set up monitoring and alerts
- [ ] Test webhook delivery
- [ ] Backup payment data regularly

## Support

For payment-related issues:
1. Check Razorpay dashboard for payment status
2. Review backend logs for error details
3. Verify webhook delivery in Razorpay dashboard
4. Contact Razorpay support for payment gateway issues

## Next Steps

Potential enhancements:
- **Subscription payments** for course bundles
- **Partial payments** and installments
- **Coupon codes** and discounts
- **Refund processing** through admin panel
- **Payment analytics** dashboard improvements
- **Email notifications** for payment confirmations
