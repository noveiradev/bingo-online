import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
  getCardById,
  getUserCards,
  getAvailableCards,
  reserveCard,
  cancelReservedCard
} from '../controllers/bingoCardController.js';

const router = Router();

// Bingo Card Routes
router.get('/', authenticateToken, getUserCards);

// Route to get available bingo cards
router.get('/available', authenticateToken, getAvailableCards);

// Route to get a specific bingo card by ID
router.get('/:id', authenticateToken, getCardById);

// Route to reserve a bingo card
router.post('/reserve/:id', authenticateToken, reserveCard);

// Route to cancel a reserved bingo card
router.put('/:id/cancel', authenticateToken, cancelReservedCard);

export default router;