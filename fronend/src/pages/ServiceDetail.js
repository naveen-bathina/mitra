import { useParams } from "react-router-dom";
import { fetchServiceById } from "../api/services";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { createBooking } from "../api/services";

const ServiceDetail = () => {
    const [service, setService] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetchServiceById(id).then((data) => {
            setService(data);
        });
    }, [id]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleBooking = () => {
        if (selectedDate) {
            createBooking({ serviceId: service._id, date: new Date(selectedDate) }).then((data) => {
                if (data.error) {
                    alert(`failed to book service. Reason: ${data.error}`);
                } else {
                    alert(`Service booked for ${new Date(selectedDate).toLocaleDateString()}`);
                }
            });

        } else {
            alert('Please select a booking date.');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ maxWidth: 500, padding: '1rem' }}>
                <CardContent>
                    {/* Service Name */}
                    <Typography variant="h5" component="div" gutterBottom>
                        {service.name}
                    </Typography>

                    {/* Service Description */}
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {service.description}
                    </Typography>

                    {/* Service Price */}
                    <Typography variant="h6" component="div" color="text.primary" gutterBottom>
                        Price: ₹{service.price}
                    </Typography>

                    {/* Service Availability */}
                    {/* <Typography variant="body1" color={service.availability === 'Available' ? 'green' : 'red'}>
                        {service.availability}
                    </Typography> */}

                    {/* Date Picker for Booking */}
                    <Box mt={2}>
                        <DatePicker
                            label="Select Booking Date"
                            value={selectedDate}
                            onChange={(date) => handleDateChange(date)}
                            disablePast
                            slotProps={{ textField: { variant: 'outlined' } }}
                        />
                    </Box>
                </CardContent>

                {/* Action Buttons */}
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleBooking}>
                        Book Now
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ServiceDetail;