import express from 'express';
import { validateBingo } from '../controllers/playerGameController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Endpoint to validate a bingo card
router.post('/validate', authenticateToken, validateBingo);

export default router;
