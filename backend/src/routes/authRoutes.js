const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authenticateToken, checkRole } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes berdasarkan role
router.get('/admin', 
    authenticateToken, 
    checkRole(['admin']), 
    (req, res) => {
        res.json({ message: "Halaman Admin" });
    }
);

router.get('/user', 
    authenticateToken, 
    checkRole(['user', 'admin']), 
    (req, res) => {
        res.json({ message: "Halaman User" });
    }
);

module.exports = router;