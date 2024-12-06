const express = require('express');
const router = express.Router();
const { createSubscription } = require('../controllers/subsController');

// Route untuk membuat subscription
router.post('/subscribe', createSubscription);

module.exports = router;
