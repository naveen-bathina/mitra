import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v2', // Adjust this based on your backend API URL
});

// Set the token in the request headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        //config.headers.Authorization = `Bearer ${token}`; // Set the token in the headers
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Handle errors
});

const apiClient = axios.create();

// expose both  api and api client
export default api;
export { apiClient };