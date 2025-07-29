import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js'; 
import * as MobilePaymentController from '../controllers/mobilePaymentController.js';

const router = express.Router();

// Route to create a new mobile payment method. Only accessible by authenticated admin users
router.post('/', authenticateToken, isAdmin, MobilePaymentController.createPayment);

// Route to activate a specific mobile payment method by its ID. Only admins can activate payment methods
router.put('/activate/:id', authenticateToken, isAdmin, MobilePaymentController.activatePayment);

// Route to delete a mobile payment method by its ID. Only admins are allowed to delete
router.delete('/delete/:id', authenticateToken, isAdmin, MobilePaymentController.deletePayment);

// Route to retrieve all registered mobile payment methods. Only visible to authenticated admins
router.get('/', authenticateToken, isAdmin, MobilePaymentController.getAllPayments);

// Route to fetch the currently active mobile payment method. Accessible by any authenticated user
router.get('/active', authenticateToken, MobilePaymentController.getActivePayment);

export default router;