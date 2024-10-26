// routes/v1/services.js
import express from 'express';
import { getAllServices, getServiceById, createService, updateService, deleteService, searchServices, getServicesByProvider } from '../../controllers/v2/servicesController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.get('/search', searchServices);    // Search and filter services
router.get('/myservices', protect, getServicesByProvider); // Get my services
router.get('/', getAllServices);          // Get all services
router.get('/:id', getServiceById);       // Get a service by ID
router.post('/', protect, createService);          // Create a new service
router.put('/:id', protect, updateService);        // Update a service by ID
router.delete('/:id', protect, deleteService);     // Delete a service by ID

export default router; // Export router
