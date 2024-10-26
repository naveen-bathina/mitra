// src/pages/ManageServices.js
import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import { Alert } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material';
import { fetchServicesByProvider, createService, updateService, deleteService } from '../api/services'; // Ensure these API methods exist

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchMyServices();
    }, []);

    const fetchMyServices = async () => {
        try {
            const response = await fetchServicesByProvider();
            setServices(response); // Assuming response contains the services array
        } catch (err) {
            setError('Failed to fetch services');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const serviceData = { name, description, price };

        try {
            if (editingServiceId) {
                await updateService(editingServiceId, serviceData);
                setSuccessMessage('Service updated successfully!');
            } else {
                await createService(serviceData);
                setSuccessMessage('Service created successfully!');
            }
            fetchMyServices(); // Refresh the service list
            resetForm();
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Service operation failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setName(service.name);
        setDescription(service.description);
        setPrice(service.price);
        setEditingServiceId(service._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                setSuccessMessage('Service deleted successfully!');
                fetchMyServices();
            } catch (err) {
                setError('Failed to delete service');
            }
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setEditingServiceId(null);
    };

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccessMessage(null);
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h5" align="center">Manage Services</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Service Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        autoComplete="off"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        autoComplete="off"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        style={{ marginTop: '20px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : (editingServiceId ? 'Update Service' : 'Add Service')}
                    </Button>
                </form>

                {/* Service Table */}
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No services available.</TableCell>
                                </TableRow>
                            ) : (
                                services.map(service => (
                                    <TableRow key={service._id}>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>{service.description}</TableCell>
                                        <TableCell>{service.price}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(service)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(service._id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">{error}</Alert>
                </Snackbar>
                <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">{successMessage}</Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default ManageServices;
