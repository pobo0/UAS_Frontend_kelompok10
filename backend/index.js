// backend/index.js
require('dotenv').config(); // Memuat variabel lingkungan dari .env
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes'); // Mengimpor rute auth


const app = express();

// Menghubungkan ke database MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies

// Serve static files dari folder 'public'
app.use(express.static(path.join(__dirname, '../frontend/views')));

// Routes
app.use('/api/auth', authRoutes); // Rute autentikasi


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Route tidak ditemukan' 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
