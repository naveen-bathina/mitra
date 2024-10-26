// src/components/Navbar.js
import React, { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Tooltip } from '@mui/material';
import { Fingerprint, LocationOn, LogoutOutlined, PersonAdd, Settings } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import AccountSignedIn from './AccountSignedIn';
import { useUser } from '../context/UserContext';
import { fetchCityName } from '../api/geo';

const Navbar = () => {
    const { userData, isLoggedIn, logout } = useUser();
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [city, setCity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle click on "Logout" button
    const handleLogoutClick = () => {
        logout();
        navigate('/'); // Navigate to the home page
    };

    // Handle click on "Manage Services" button
    const handleManageServicesClick = () => {
        navigate('/manage-services'); // Navigate to the Manage Services page
    };

    // getting Geolocation
    const getGeolocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    setErrorMessage(`Error getting geolocation: ${error.message}`);
                    console.error(error);
                }
            );
        } else {
            setErrorMessage('Geolocation is not supported by this browser.');
            console.warn(errorMessage);
        }
    }, [errorMessage]);

    const getCityName = useCallback(async (lat, lng) => {
        try {
            const response = await fetchCityName(lat, lng);
            const city = response.address.village || response.address.county || response.address.town || response.address.suburb || response.address.city || 'Unknown location';
            setCity(city);
        } catch (error) {
            setErrorMessage(`Error getting city name: ${error.message}`);
        }
    }, []);

    // Get location on component mount
    useEffect(() => {
        getGeolocation();
    }, [getGeolocation]);

    // Fetch city name whenever location is updated
    useEffect(() => {
        if (location.lat && location.lng) {
            getCityName(location.lat, location.lng);
        }
    }, [location, getCityName]);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Mitra
                </Typography>
                <IconButton color="inherit" onClick={() => navigate('/')}>
                    <Tooltip title={city || 'Location'}>
                        <LocationOn />
                    </Tooltip>
                </IconButton>
                {isLoggedIn ? (
                    <>
                        <AccountSignedIn userSession={userData} logout={handleLogoutClick} />
                        <IconButton color="inherit" onClick={handleManageServicesClick}>
                            <Settings />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogoutClick}>
                            <LogoutOutlined />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton color="inherit" component={Link} to="/signin">
                            <Tooltip title="Sign In">
                                <Fingerprint />
                            </Tooltip>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/signup">
                            <Tooltip title="Sign Up">
                                <PersonAdd />
                            </Tooltip>
                        </IconButton>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
