import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { getReservedCards, approveReservation, rejectReservation, approveAllReservations  } from '../controllers/adminBingoController.js';

const router = express.Router();

router.get('/reserved', authenticateToken, isAdmin, getReservedCards);
router.post('/approve', authenticateToken, isAdmin, approveReservation);
router.post('/reject', authenticateToken, isAdmin, rejectReservation);
router.post('/approve-all', authenticateToken, isAdmin, approveAllReservations);

export default router;