import { Router } from 'express';
import { assignSelectedCards } from '../controllers/selectedCardController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/assign', authenticateToken, assignSelectedCards);

export default router;
