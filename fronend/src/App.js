// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your custom theme
import ManageServices from './pages/ManageServices';
import LandingPage from './pages/LandingPage';
import ServiceDetail from './pages/ServiceDetail';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import BrandingSignInPage from './pages/BrandingSignInPage';
import { fetchCurrentUserProfile } from './api/userprofile';
import { useState, useEffect } from 'react';
import Layout from './pages/Layout';
import { UserProvider } from './context/UserContext';

// import io from 'socket.io-client';

// const socket = io('http://localhost:4000', {
//   transports: ['websocket'],  // Force WebSocket usage
//   upgrade: false,             // Disable the fallback to polling
// });

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check if user is logged in by checking for a token in localStorage
  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Fetch user profile if logged in
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { data } = await fetchCurrentUserProfile();
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserData(null);
    }
  };

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []); // Check login status only once on mount

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      setUserData(null);
    }
  }, [isLoggedIn]); // Only fetch user data if logged in status changes

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProvider>
          <Router>
            <Routes>
              {/* All pages will be wrapped within the Layout component */}
              <Route path="/" element={<Layout isLoggedIn={isLoggedIn} userData={userData} />}>
                <Route index element={<LandingPage />} />
                <Route path="signin" element={<BrandingSignInPage />} />
                <Route path="signup" element={<Signup />} />
                <Route path="manage-services" element={<ManageServices />} />
                <Route path="service/:id" element={<ServiceDetail />} />
              </Route>
            </Routes>
          </Router>
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
