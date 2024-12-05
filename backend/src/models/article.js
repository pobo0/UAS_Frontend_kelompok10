const mongoose = require('mongoose');

// Skema untuk Artikel
const articleSchema = new mongoose.Schema({
    image: { type: String, required: true },
    alt: { type: String, required: true },
    tags: { type: [String], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true }
});

// Membuat model Artikel berdasarkan skema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
