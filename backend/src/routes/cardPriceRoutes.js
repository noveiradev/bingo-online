import express from 'express';
import { getCardPrice, updateCardPrice } from '../controllers/cardPriceController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Get price (available to all users)
router.get('/', getCardPrice);

// Update price (restricted to admin users)
router.put('/', authenticateToken, isAdmin, updateCardPrice);

export default router;
