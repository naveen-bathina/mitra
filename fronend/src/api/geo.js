import apiClient from './api';

export const fetchCityName = async (lat, lng) => {
    const response = await apiClient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    return response.data; // Adjust if your response structure is different
};