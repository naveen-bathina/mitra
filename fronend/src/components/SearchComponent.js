// src/components/SearchComponent.js
import { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/v2/services/search`, {
                params: {
                    name: searchTerm,
                    minPrice,
                    maxPrice,
                },
            });
            setServices(response.data);
        } catch (error) {
            console.error('Error searching services:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {services.map((service) => (
                    <li key={service._id}>{service.name} - ${service.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
