import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import * as UserController from '../controllers/userController.js';

const router = Router();

// Private route - only accessible with valid JWT
router.get('/profile', authenticateToken, UserController.getProfile);

// Update user profile
router.put('/profile', authenticateToken, UserController.updateProfile);

// Delete user account
router.delete('/deleteAccount', authenticateToken, UserController.deleteAccount);

// Get all players with wins
router.get('/players', authenticateToken, isAdmin, UserController.getAllPlayersWithWins);

export default router;
