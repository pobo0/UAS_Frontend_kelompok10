const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to get all articles
router.get('/', articleController.getAllArticles);

// Route to create a new article with file upload
router.post('/', upload.single('image'), articleController.createArticle);

// Route to update an article
router.patch('/:id', upload.single('image'), articleController.updateArticle);

module.exports = router;
