const express = require('express');
const router = express.Router();
const { register, login, updatePassword } = require('../controllers/authController');
const { authenticateToken, checkRole } = require('../middleware/auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.put('/updatePassword', authenticateToken, updatePassword); // Tambahkan auth untuk keamanan

// Protected routes berdasarkan role
router.get('/admin', authenticateToken, checkRole(['admin']), (req, res) => {
    res.json({ message: "Halaman Admin" });
});

router.get('/user', authenticateToken, checkRole(['user', 'admin']), (req, res) => {
    res.json({ message: "Halaman User" });
});

// Add delete account route
router.delete('/deleteAccount', authenticateToken, async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = req.user.userId; // Assuming userId is stored in the token

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify the username
        if (user.username !== username) {
            return res.status(401).json({ message: "Username is incorrect" });
        }

        // Verify the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting account", error: error.message });
    }
});

module.exports = router;
