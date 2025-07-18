import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { getReservedCards, approveReservation, rejectReservation } from '../controllers/adminBingoController.js';

const router = express.Router();

router.get('/reserved', authenticateToken, isAdmin, getReservedCards);
router.post('/approve', authenticateToken, isAdmin, approveReservation);
router.post('/reject', authenticateToken, isAdmin, rejectReservation);

export default router;