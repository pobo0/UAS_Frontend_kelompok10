const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Validasi input
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        // Tambahkan validasi role
        const allowedRoles = ['user', 'admin'];
        if (role && !allowedRoles.includes(role)) {
            return res.status(400).json({ 
                success: false,
                message: "Role tidak valid" 
            });
        }

        // Cek apakah username sudah ada
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username sudah digunakan" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const user = new User({
            username,
            password: hashedPassword,
            email,
            role: role || 'user'
        });

        await user.save();

        res.status(201).json({ 
            success: true,
            message: "Registrasi berhasil" 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error saat registrasi", 
            error: error.message 
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ message: "Username dan password harus diisi" });
        }

        // Cari user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        // Buat token
        const token = jwt.sign(
            { 
                userId: user._id,
                username: user.username,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: "Login berhasil",
            data: {
                userId: user._id,
                username: user.username,
                role: user.role,
                email: user.email
            },
            token: `Bearer ${token}`,
            tokenType: "Bearer",
            expiresIn: "24h"
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error saat login", 
            error: error.message 
        });
    }
};

module.exports = {
    register,
    login
};