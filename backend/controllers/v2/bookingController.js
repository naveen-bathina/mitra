import Booking from '../../models/Booking.js';
import Service from '../../models/Service.js';
import User from '../../models/User.js';

// Create a new booking
export const createBooking = async (req, res) => {
    const { serviceId, date } = req.body;

    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const provider = await User.findById(service.provider);
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        const booking = new Booking({
            service: serviceId,
            provider: provider._id,
            seeker: req.user._id,
            date,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bookings for a provider
export const getProviderBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ provider: req.user._id }).populate('service seeker');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get bookings for a seeker
export const getSeekerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ seeker: req.user._id }).populate('service provider');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
