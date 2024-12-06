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

const createArticle = async (req, res) => {
    try {
        const { title, description, tags, link } = req.body;
        const image = req.file ? req.file.filename : '';

        // Validate required fields
        if (!title || !description || !tags || !link) {
            return res.status(400).json({ message: 'Please fill out all fields' });
        }

        // Create a new article instance using the Article model
        const newArticle = new Article({ 
            title, 
            description, 
            tags: tags.split(',').map(tag => tag.trim()), 
            image, 
            link 
        });

        // Save the article to the database
        await newArticle.save();

        res.status(201).json({
            success: true,
            message: 'Article created successfully',
            data: newArticle
        });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating article',
            error: error.message
        });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, link } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Find the article by ID and update it
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, description, tags: tags.split(',').map(tag => tag.trim()), link, ...(image && { image }) },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            data: updatedArticle
        });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating article',
            error: error.message
        });
    }
};

module.exports = {
    getAllArticles,
    getArticles,
    createArticle,
    updateArticle
};
