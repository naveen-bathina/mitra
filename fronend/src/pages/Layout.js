// src/layouts/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box, CssBaseline, Container } from '@mui/material';

const Layout = ({ isLoggedIn, userData }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Navbar isLoggedIn={isLoggedIn} userData={userData} sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }} />

            {/* Main Content */}
            <Box component="main" sx={{ flex: 1, mt: 8, mb: 8, p: 2, pt: 10 }}> {/* Adjust padding top to account for fixed Navbar */}
                <Container>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
