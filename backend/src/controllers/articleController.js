const Article = require('../models/article');

// Controller untuk mengambil semua artikel
const getAllArticles = async (req, res) => {
    try {
        // Ambil semua artikel dari database
        const articles = await Article.find();

        // Kirim respons dengan data artikel
        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil artikel',
            data: articles
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil artikel',
            error: error.message
        });
    }
};

const getArticles = async (req, res) => {
    try {
        const { searchQuery } = req.query; // Mengambil query string searchQuery dari URL
        
        if (!searchQuery) {
            return res.status(400).json({
                success: false,
                message: 'Search query tidak ditemukan'
            });
        }

        // Cari artikel yang title atau description-nya mengandung searchQuery
        const articles = await Article.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, // $options 'i' untuk case-insensitive
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        if (articles.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Artikel tidak ditemukan'
            });
        }

        // Kirim respons dengan data artikel yang ditemukan
        res.status(200).json({
            success: true,
            message: 'Artikel ditemukan',
            data: articles
        });
    } catch (error) {
        console.error('Error searching articles:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mencari artikel',
            error: error.message
        });
    }
};

module.exports = {
    getAllArticles,
    getArticles
};
