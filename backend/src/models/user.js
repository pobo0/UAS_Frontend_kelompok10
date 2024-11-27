const mongoose = require('mongoose');

// ... existing code ...

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Menentukan role yang valid
        default: 'user', // Role default
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Membuat model pengguna
const User = mongoose.model('User', userSchema);
module.exports = User;