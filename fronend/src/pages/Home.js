// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { fetchServices } from '../api/services';
import { Alert } from '@mui/lab';
import { useNavigate } from 'react-router-dom'; // Updated import


const Home = ({ isLoggedIn, userData }) => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [services, setServices] = useState([]); // State to hold services
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State to hold any error message

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await fetchServices(); // Fetch services
                setServices(response); // Adjust based on your actual response structure
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch services');
            } finally {
                setLoading(false); // Set loading to false regardless of the outcome
            }
        };

        getServices(); // Call the function to fetch services
    }, []); // Empty dependency array to run only once on mount

    const handleCloseSnackbar = () => {
        setError(null); // Clear error message
    };

    // if (!isLoggedIn) {
    //     return (
    //         <div>
    //             <Typography variant='h5' >
    //                 You are not logged in. Please log in to continue.
    //             </Typography>
    //         </div>
    //     )
    // }

    function handleBooking(serviceId) {
        navigate(`/service/${serviceId}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" textAlign={'center'} gutterBottom>
                Available Services
            </Typography>
            {loading ? (
                <CircularProgress /> // Loading indicator
            ) : error ? (
                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            ) : (
                <Grid2 container spacing={3}>
                    {Array.isArray(services) && services.length > 0 ? (
                        services.map((service) => (
                            <Grid2 xs={12} sm={6} md={4} lg={3} key={service._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {service.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {service.description}
                                        </Typography>
                                        <Typography variant="body1">Provider: {service.provider}</Typography>
                                        <Typography variant="body1">Price: ₹{service.price}</Typography>
                                        <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => { handleBooking(service._id) }} >
                                            Book Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="h6">No services available.</Typography> // Message when no services are found
                    )}
                </Grid2>
            )}
        </div>
    );
};

export default Home;
