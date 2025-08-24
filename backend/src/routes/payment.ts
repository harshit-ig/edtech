import { Router } from 'express';
import { 
  createPaymentOrder, 
  verifyPayment, 
  getPaymentOrders, 
  getPaymentTransactions, 
  getPaymentStats,
  handleWebhook
} from '../controllers/paymentController';
import { authenticate, requireAdminAuth } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);
router.post('/webhook', handleWebhook);

// Admin routes (protected)
router.get('/orders', requireAdminAuth, getPaymentOrders);
router.get('/transactions', requireAdminAuth, getPaymentTransactions);
router.get('/stats', requireAdminAuth, getPaymentStats);

export default router;
