import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TextField, Button, Chip, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import debounce from 'lodash.debounce';
import { searchServices } from '../api/services';
import ServiceCard from '../components/ServiceCard';


const LandingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState([]);
    const popularServices = ['Beautician', 'Plumber', 'Electrician', 'Tutor', 'Carpenter'];

    // Debounced function for searching services
    // TODO: Fix this issue
    const debouncedSearch = React.useMemo(() =>
        debounce(async (query) => {
            const searchResult = await searchServices(query.toLowerCase());
            setServices(searchResult);
        }, 500),
        []
    );

    const handleSearch = useCallback(
        (query) => {
            setSearchQuery(query);
            debouncedSearch(query);
        },
        [debouncedSearch]
    );

    useEffect(() => {
        // Initial load or empty search
        handleSearch('');
        return () => debouncedSearch.cancel();
    }, [handleSearch, debouncedSearch]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {/* Page Header */}
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Find the Best Services Locally
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
                Search for various service providers around you!
            </Typography>

            {/* Search Input */}
            <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
                <TextField
                    label="Search for a service..."
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                        endAdornment: <SearchIcon />,
                    }}
                    sx={{ maxWidth: '600px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSearch(searchQuery)}
                    sx={{ ml: 2, height: '56px' }}
                >
                    Search
                </Button>
            </Box>

            {/* Popular Services Tags */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Most Used Services
                </Typography>
                {popularServices.map((service, index) => (
                    <Chip
                        key={index}
                        label={service}
                        onClick={() => handleSearch(service)}
                        sx={{ m: 1 }}
                        color="primary"
                        clickable
                    />
                ))}
            </Box>

            {/* Services Grid */}
            <Grid container spacing={2}>
                {services.length > 0 ? (
                    services.map((service) => (
                        <Grid item key={service._id} xs={12} sm={6} md={4} lg={3}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" align="center" sx={{ mt: 4, width: '100%' }}>
                        No services available.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default LandingPage;
