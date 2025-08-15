import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import * as BingoCardController from '../controllers/bingoCardController.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

// Bingo Card Routes
router.get('/', authenticateToken, BingoCardController.getUserCards);

// Route to get available bingo cards
router.get('/available', authenticateToken, BingoCardController.getAvailableCards);

// Route to get a specific bingo card by ID
router.get('/:id', authenticateToken, BingoCardController.getCardById);

// Route to reserve a bingo card
router.post('/reserve/:id', authenticateToken, BingoCardController.reserveCard);

// Route to cancel a reserved bingo card
router.put('/:id/cancel', authenticateToken, BingoCardController.cancelReservedCard);

// Route to get a specific bingo card by ID for admin
router.get('/:id/admin', authenticateToken, isAdmin, BingoCardController.getCardByIdAdmin);

export default router;