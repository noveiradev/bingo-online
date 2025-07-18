import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
  getUserCards,
  getAvailableCards,
  reserveCard
} from '../controllers/bingoCardController.js';

const router = Router();

router.get('/', authenticateToken, getUserCards);
router.get('/available', authenticateToken, getAvailableCards);
router.post('/reserve/:id', authenticateToken, reserveCard);

export default router;