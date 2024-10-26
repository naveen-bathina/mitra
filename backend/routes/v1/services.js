// routes/v1/services.js
import express from 'express';
import { getAllServices, getServiceById } from '../../controllers/v1/servicesController.js'; // Import controllers

const router = express.Router();

// Define routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);

export default router; // Export router
