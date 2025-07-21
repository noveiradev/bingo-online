import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { getReservedCards, approveReservation, rejectReservation, approveReservationWithBonus  } from '../controllers/adminBingoController.js';

const router = express.Router();

router.get('/reserved', authenticateToken, isAdmin, getReservedCards);
router.post('/approve', authenticateToken, isAdmin, approveReservation);
router.post('/reject', authenticateToken, isAdmin, rejectReservation);
router.post('/reservations/approve', isAdmin, approveReservationWithBonus);

export default router;