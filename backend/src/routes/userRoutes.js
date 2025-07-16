import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Private route - only accessible with valid JWT
router.get('/profile', authenticateToken, getProfile);

export default router;
