// src/context/ServiceContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchServices } from '../api/services';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (err) {
                setError('Failed to fetch services');
            }
        };
        loadServices();
    }, []);

    return (
        <ServiceContext.Provider value={{ services, error }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => useContext(ServiceContext);
