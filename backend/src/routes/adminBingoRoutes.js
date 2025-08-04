import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import * as AdminBingoController from '../controllers/adminBingoController.js';

const router = express.Router();

router.get('/reserved', authenticateToken, isAdmin, AdminBingoController.getReservedCards);
router.post('/approve', authenticateToken, isAdmin, AdminBingoController.approveReservation);
router.post('/reject', authenticateToken, isAdmin, AdminBingoController.rejectReservation);
router.post('/approve-all', authenticateToken, isAdmin, AdminBingoController.approveAllReservations);
router.patch('/release-used-cards', authenticateToken, isAdmin, AdminBingoController.releaseUsedCards);

export default router;