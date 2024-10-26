// src/components/ErrorNotification.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ErrorNotification = ({ open, onClose, message }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity="error">
            {message}
        </Alert>
    </Snackbar>
);

export default ErrorNotification;
