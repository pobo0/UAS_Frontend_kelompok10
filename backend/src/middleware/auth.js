const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: "Access token tidak ditemukan" 
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Tambahkan informasi user ke request
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(403).json({ 
            success: false,
            message: "Token tidak valid atau kadaluarsa" 
        });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: "Unauthorized - User tidak ditemukan" 
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ 
                    success: false,
                    message: `Akses ditolak. Role yang dibutuhkan: ${roles.join(', ')}` 
                });
            }

            next();
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: "Error saat memeriksa role",
                error: error.message 
            });
        }
    };
};

module.exports = { authenticateToken, checkRole };
