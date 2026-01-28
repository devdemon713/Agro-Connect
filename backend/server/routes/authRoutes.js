const express = require('express');
const router = express.Router();

// 1. Import Auth functions
const { login, register, getMe } = require('../controllers/authController');

// 2. Import Request functions (Add this line!)
const { getBuyerRequests } = require('../controllers/requestController');

const { protect } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/login', login); 
router.post('/register', register);
router.get('/me', protect, getMe);

// Request Routes
router.get('/buyer-requests', protect, getBuyerRequests);

module.exports = router;