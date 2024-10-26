// src/api/services.js
import api from './api';

// Fetch all services
export const fetchServices = async () => {
    const response = await api.get('/services');
    return response.data; // Adjust if your response structure is different
};

// Fetch a single service by ID
export const fetchServiceById = async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data; // Adjust if your response structure is different
};

// Create a new service
export const createService = async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data; // Adjust if your response structure is different
};

// Update an existing service
export const updateService = async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data; // Adjust if your response structure is different
};

// Delete a service
export const deleteService = async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data; // Adjust if your response structure is different
};

// fetch services by provider
export const fetchServicesByProvider = async () => {
    const response = await api.get(`/services/myservices`);
    return response.data; // Adjust if your response structure is different
};

// search services
export const searchServices = async (searchQuery) => {
    const response = await api.get(`/services/search?name=${searchQuery}`);
    return response.data; // Adjust if your response structure is different
};


export const createBooking = async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
}