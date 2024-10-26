import Service from '../../models/Service.js';

// Get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a service by ID
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new service
export const createService = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const newService = new Service({
            name,
            description,
            price,
            provider: req.user._id, // The logged-in user is the service provider
        });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a service by ID
export const updateService = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { name, description, price, provider: req.user._id },
            { new: true, runValidators: true }
        );
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a service by ID
export const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search and filter services
export const searchServices = async (req, res) => {
    const { name, minPrice, maxPrice } = req.query;

    try {
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        const services = await Service.find(query);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get services by provider
export const getServicesByProvider = async (req, res) => {
    try {
        const services = await Service.find({ provider: req.user._id });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
