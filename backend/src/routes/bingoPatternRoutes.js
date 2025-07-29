import express from 'express';
import { createPattern, getAllPatterns, deletePattern } from '../controllers/bingoPatternController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js'; 

const router = express.Router();

router.post('/', authenticateToken, isAdmin, createPattern);
router.get('/', authenticateToken, getAllPatterns);
router.delete('/:id', authenticateToken, isAdmin, deletePattern);

export default router;
