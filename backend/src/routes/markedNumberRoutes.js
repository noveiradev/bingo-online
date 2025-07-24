import { Router } from 'express';
import { getMarkedNumbers, updateMarkedNumbers } from '../controllers/markedNumberController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:reservationId', authenticateToken, getMarkedNumbers);
router.post('/update', authenticateToken, updateMarkedNumbers);

export default router;
