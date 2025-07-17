import { Router } from 'express';
import { loginLimiter } from '../middlewares/rateLimiter.js';
import { registerUser, loginUser, recoverPassword } from '../controllers/authController.js';

const router = Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginLimiter, loginUser);

// Route for recover password
router.post('/recover-password', recoverPassword);

export default router;
