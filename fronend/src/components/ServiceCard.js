// src/components/ServiceCard.js
import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    const handleBookService = () => {
        navigate(`/service/${service._id}`);
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '250px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {service.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Price: ₹{service.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary" onClick={handleBookService}>
                    Book Now
                </Button>
            </CardActions>
        </Card>
    );
};

export default ServiceCard;
