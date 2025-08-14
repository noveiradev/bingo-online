import express from 'express';
import { findPossibleWinners } from '../controllers/possibleWinnersController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/:gameId/possible-winners', authenticateToken, isAdmin, findPossibleWinners);

export default router;
