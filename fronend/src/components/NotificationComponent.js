// src/components/NotificationComponent.js
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io('http://localhost:5000'); // Adjust to your backend URL

        socketRef.current.on('receiveNotification', (data) => {
            setNotifications((prev) => [...prev, data]);
        });

        // Cleanup function to disconnect socket on component unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div>
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
