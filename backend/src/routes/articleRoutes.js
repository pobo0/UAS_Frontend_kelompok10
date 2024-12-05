const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route untuk mendapatkan semua artikel
router.get('/articles', articleController.getAllArticles);
router.get('/articles/search', articleController.getArticles);

module.exports = router;
