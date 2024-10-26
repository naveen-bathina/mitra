import express from 'express';
import { getUserProfile, updateUserProfile } from '../../controllers/v2/profileController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Get current user's profile (protected)
router.get('/me', protect, getUserProfile);

// Update user's profile (protected)
router.put('/me', protect, updateUserProfile);

export default router;
