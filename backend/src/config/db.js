// backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect("mongodb://localhost:27017/uas-projek", {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
