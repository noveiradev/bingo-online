import express from 'express';
import { startGame, nextNumber, getGameHistory, restartGame, getUserActiveGame } from '../controllers/gameController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// Start a new game (only admins)
router.post('/start', authenticateToken, isAdmin, startGame);

// Generate next number (only admins)
router.post('/next-number', authenticateToken, isAdmin, nextNumber);

// Get game history (only for authenticated users)
router.get('/history', authenticateToken, getGameHistory);

// Restart game (only admins)
router.post('/restart', authenticateToken, isAdmin, restartGame);

// Get active game for user (only for authenticated users)
router.get('/active', authenticateToken, getUserActiveGame);

export default router;