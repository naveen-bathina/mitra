import express from 'express';
import { createBooking, getProviderBookings, getSeekerBookings } from '../../controllers/v2/bookingController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Create a new booking
router.post('/', protect, createBooking);

// Get provider's bookings
router.get('/provider', protect, getProviderBookings);

// Get seeker's bookings
router.get('/seeker', protect, getSeekerBookings);

export default router;
