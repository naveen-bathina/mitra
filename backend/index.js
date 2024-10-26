// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import servicesRoutesV1 from './routes/v1/services.js'; // Import routes
import servicesRoutesV2 from './routes/v2/services.js';
import errorHandler from './middleware/error.js'; // Import error handling middleware
import profileRoutes from './routes/v2/profile.js';
import authRoutes from './routes/v2/auth.js';
import bookingRoutes from './routes/v2/booking.js';

// Load environment variables
dotenv.config();

const app = express();
// const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Create HTTP server for soket io connection

// const io = new Server(server, {
//     cors: {
//         origin: "*",  // React frontend
//         methods: ['GET', 'POST']
//     },
//     transports: ['websocket'],
// });

// Socket.IO setup for handling notifications
// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Listening for an event
//     socket.on('send_message', (data) => {
//         console.log(data);
//         // Broadcast message to all clients
//         io.emit('receive_message', data);
//     });

//     // When user disconnects
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });



// Versioned routes
app.use('/api/v1/services', servicesRoutesV1);
app.use('/api/v2/services', servicesRoutesV2);
app.use('/api/v2/profile', profileRoutes);
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/bookings', bookingRoutes);

// Error handling middleware
app.use(errorHandler);

// Define the port from environment or fallback to 5000
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('MongoDB connection error:', error));

