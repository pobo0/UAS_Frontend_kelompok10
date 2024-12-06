require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/db'); // MongoDB connection function
const authRoutes = require('./src/routes/authRoutes');
const subsRoutes = require('./src/routes/subsRoutes');
const articleRoutes = require('./src/routes/articleRoutes');

const app = express();

// Connect to MongoDB
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the process if DB connection fails
});

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../frontend/views')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes); 
app.use('/api/subs', subsRoutes); 
app.use('/api/articles', articleRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        success: false,
        message: 'An error occurred on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// Handle 404 Not Found
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Route not found' 
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection! Shutting down...');
    console.error(err.name, err.message);
    process.exit(1); // Exit process after unhandled rejection
});
