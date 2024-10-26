import api from './api';

// Fetch user profile
export const fetchCurrentUserProfile = async () => {
    const response = await api.get('/profile/me');
    return response.data; // Adjust if your response structure is different
};

// Login function
export const signIn = async (credentials) => {
    const response = await api.post('/auth/login', credentials); // Adjust the endpoint according to your API
    return response.data; // Return the response to the caller
};

// Signup function
export const signup = async (userData) => {
    const response = await api.post('/auth/register', userData); // Adjust the endpoint according to your API
    return response.data; // Return the response to the caller
};