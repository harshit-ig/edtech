import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { PaymentOrderModel, PaymentTransactionModel, CourseModel, CourseDetailsModel, CouponModel, CustomerModel } from '../models';
import { generateCustomerId } from '../utils/idGenerator';
import EmailService from '../utils/emailService';

// Validate Razorpay environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables');
  process.exit(1);
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create payment order
export const createPaymentOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId, customerInfo, couponCode } = req.body;

    // Validate required fields
    if (!courseId || !customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: courseId, customerInfo (name, email, phone)' 
      });
      return;
    }

    // Get course details
    const course = await CourseModel.findOne({ id: courseId });
    if (!course) {
      res.status(404).json({ 
        success: false, 
        error: 'Course not found' 
      });
      return;
    }

    // Get course pricing (use default pricing if not found)
    let courseDetails;
    try {
      courseDetails = await CourseDetailsModel.findOne({ courseId });
    } catch (error) {
      // Course details not found
    }

    const originalAmount = courseDetails?.pricing?.current;
    
    if (!originalAmount || originalAmount <= 0) {
      res.status(400).json({ 
        success: false, 
        error: 'Course pricing not available. Cannot create payment order.' 
      });
      return;
    }

    let finalAmount = originalAmount;
    let appliedCoupon = null;
    let discountInfo = null;

    // Apply coupon if provided
    if (couponCode && couponCode.trim()) {
      try {
        const couponResult = await CouponModel.applyCoupon(couponCode.trim(), courseId, originalAmount);
        appliedCoupon = couponResult.coupon;
        discountInfo = couponResult.discount;
        finalAmount = discountInfo.finalPrice;
      } catch (couponError: any) {
        res.status(400).json({
          success: false,
          error: `Coupon Error: ${couponError.message}`
        });
        return;
      }
    }

    const currency = 'GBP'; // Default to GBP, can be made dynamic later

    // Create unique order ID
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Create Razorpay order with final amount
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(finalAmount * 100), // Razorpay expects amount in cents/paise
      currency,
      receipt: orderId,
      notes: {
        courseId,
        courseName: course.title,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        ...(appliedCoupon && discountInfo && {
          couponCode: appliedCoupon.code,
          originalAmount: originalAmount,
          discountAmount: discountInfo.discountAmount,
          finalAmount: finalAmount
        })
      }
    });

    // Save order to database
    const paymentOrder = new PaymentOrderModel({
      id: `PAY_${Date.now()}`,
      orderId,
      courseId,
      courseName: course.title,
      amount: finalAmount,
      currency,
      status: 'created',
      customerInfo,
      razorpayOrderId: razorpayOrder.id,
      notes: {
        courseCategory: course.category,
        courseBadge: course.badge,
        ...(appliedCoupon && discountInfo && {
          couponCode: appliedCoupon.code,
          discountType: appliedCoupon.discountType,
          discountValue: appliedCoupon.discountValue,
          originalAmount: originalAmount,
          discountAmount: discountInfo.discountAmount,
          finalAmount: finalAmount
        })
      }
    });

    await paymentOrder.save();

    res.json({
      success: true,
      order: {
        orderId: razorpayOrder.id,
        amount: Math.round(finalAmount * 100),
        currency,
        courseInfo: {
          id: course.id,
          title: course.title,
          category: course.category
        },
        customerInfo,
        pricing: {
          originalAmount: originalAmount,
          finalAmount: finalAmount,
          ...(discountInfo && appliedCoupon && {
            discount: {
              couponCode: appliedCoupon.code,
              discountAmount: discountInfo.discountAmount,
              savings: discountInfo.savings
            }
          })
        }
      }
    });

  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create payment order' 
    });
  }
};

// Verify payment
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customerInfo,
      courseInfo
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ 
        success: false, 
        error: 'Missing payment verification data' 
      });
      return;
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      res.status(400).json({ 
        success: false, 
        error: 'Invalid payment signature' 
      });
      return;
    }

    // Find the payment order
    const paymentOrder = await PaymentOrderModel.findOne({ 
      razorpayOrderId: razorpay_order_id 
    });

    if (!paymentOrder) {
      res.status(404).json({ 
        success: false, 
        error: 'Payment order not found' 
      });
      return;
    }

    // Update payment order status
    paymentOrder.status = 'paid';
    paymentOrder.razorpayPaymentId = razorpay_payment_id;
    paymentOrder.razorpaySignature = razorpay_signature;
    await paymentOrder.save();

    // Get payment details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    // Create transaction record
    const transaction = new PaymentTransactionModel({
      id: `TXN_${Date.now()}`,
      orderId: paymentOrder.orderId,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      status: 'success',
      method: paymentDetails.method || 'unknown',
      customerInfo: paymentOrder.customerInfo,
      courseInfo: {
        courseId: paymentOrder.courseId,
        courseName: paymentOrder.courseName,
        category: paymentOrder.notes?.courseCategory || 'General'
      },
      paymentDate: new Date()
    });

    await transaction.save();

    // Create customer record
    const customer = new CustomerModel({
      id: generateCustomerId(),
      name: paymentOrder.customerInfo.name,
      email: paymentOrder.customerInfo.email,
      phone: paymentOrder.customerInfo.phone,
      courseId: paymentOrder.courseId,
      courseName: paymentOrder.courseName,
      courseCategory: paymentOrder.notes?.courseCategory || 'General',
      paymentType: 'full_payment',
      paymentStatus: 'paid',
      customerStatus: 'pending', // Will be manually approved by admin
      amount: paymentOrder.amount,
      currency: paymentOrder.currency,
      paymentId: razorpay_payment_id,
      orderId: paymentOrder.orderId,
      source: 'payment_modal',
      notes: `Payment verified successfully. Transaction ID: ${transaction.id}`
    });

    await customer.save();

    // Send payment confirmation email
    try {
      const emailService = new EmailService();
      const emailData = {
        customerName: customer.name,
        customerEmail: customer.email,
        courseTitle: customer.courseName,
        courseCategory: customer.courseCategory,
        amount: customer.amount,
        currency: customer.currency,
        orderId: customer.orderId || paymentOrder.orderId, // Use payment order ID as fallback
        transactionId: transaction.id,
        paymentDate: transaction.paymentDate
      };

      // Send email asynchronously (don't wait for it to complete)
      emailService.sendPaymentConfirmation(emailData).catch(error => {
        console.error('Failed to send payment confirmation email:', error);
        // Don't fail the payment verification if email fails
      });

      console.log('Payment confirmation email queued for:', customer.email);
    } catch (emailError) {
      console.error('Error setting up payment confirmation email:', emailError);
      // Don't fail the payment verification if email setup fails
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      transaction: {
        id: transaction.id,
        orderId: transaction.orderId,
        amount: transaction.amount,
        courseInfo: transaction.courseInfo,
        customerInfo: transaction.customerInfo,
        paymentDate: transaction.paymentDate
      },
      customer: {
        id: customer.id,
        status: customer.customerStatus
      }
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to verify payment' 
    });
  }
};

// Get payment orders (for admin)
export const getPaymentOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20, status, courseId } = req.query;
    
    const filter: any = {};
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;

    const orders = await PaymentOrderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await PaymentOrderModel.countDocuments(filter);

    res.json({
      success: true,
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching payment orders:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch payment orders' 
    });
  }
};

// Get payment transactions (for admin)
export const getPaymentTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20, status, courseId } = req.query;
    
    const filter: any = {};
    if (status) filter.status = status;
    if (courseId) filter['courseInfo.courseId'] = courseId;

    const transactions = await PaymentTransactionModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await PaymentTransactionModel.countDocuments(filter);

    res.json({
      success: true,
      transactions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching payment transactions:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch payment transactions' 
    });
  }
};

// Get payment statistics (for admin dashboard)
export const getPaymentStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { period = '30' } = req.query; // days
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - Number(period));

    // Total revenue
    const totalRevenue = await PaymentTransactionModel.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Revenue in period
    const periodRevenue = await PaymentTransactionModel.aggregate([
      { 
        $match: { 
          status: 'success',
          paymentDate: { $gte: daysAgo }
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Transaction counts
    const totalTransactions = await PaymentTransactionModel.countDocuments({ status: 'success' });
    const periodTransactions = await PaymentTransactionModel.countDocuments({ 
      status: 'success',
      paymentDate: { $gte: daysAgo }
    });

    // Course-wise stats
    const courseStats = await PaymentTransactionModel.aggregate([
      { $match: { status: 'success' } },
      { 
        $group: { 
          _id: '$courseInfo.courseId',
          courseName: { $first: '$courseInfo.courseName' },
          totalRevenue: { $sum: '$amount' },
          totalEnrollments: { $sum: 1 }
        } 
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 }
    ]);

    // Daily revenue for the period
    const dailyRevenue = await PaymentTransactionModel.aggregate([
      { 
        $match: { 
          status: 'success',
          paymentDate: { $gte: daysAgo }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paymentDate" } },
          revenue: { $sum: '$amount' },
          transactions: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalRevenue: totalRevenue[0]?.total || 0,
        periodRevenue: periodRevenue[0]?.total || 0,
        totalTransactions,
        periodTransactions,
        courseStats,
        dailyRevenue,
        period: Number(period)
      }
    });

  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch payment statistics' 
    });
  }
};

// Webhook handler for Razorpay events
export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const webhook_secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (webhook_secret) {
      const body = JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac('sha256', webhook_secret)
        .update(body)
        .digest('hex');
      
      const signature = req.headers['x-razorpay-signature'];
      
      if (signature !== expectedSignature) {
        res.status(400).json({ error: 'Invalid webhook signature' });
        return;
      }
    }

    const { event, payload } = req.body;

    // Handle different webhook events
    switch (event) {
      case 'payment.captured':
        // Payment captured - webhook handled
        break;
      
      case 'payment.failed':
        // Payment failed - update order status
        await PaymentOrderModel.updateOne(
          { razorpayOrderId: payload.payment.entity.order_id },
          { status: 'failed' }
        );
        break;
      
      default:
        // Unhandled webhook event
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};
