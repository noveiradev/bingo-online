import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import * as UserController from '../controllers/userController.js';

const router = Router();

// Private route - only accessible with valid JWT
router.get('/profile', authenticateToken, UserController.getProfile);

// Update user profile
router.put('/profile', authenticateToken, UserController.updateProfile);

export default router;
