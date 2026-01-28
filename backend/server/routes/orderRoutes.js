const express = require('express');
const router = express.Router();
const { protect, isFarmer } = require('../middleware/authMiddleware');
const { 
    placeOrder, 
    getBuyerOrders, 
    getFarmerSales, 
    updateOrderStatus 
} = require('../controllers/orderController');

// Buyer Routes
router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getBuyerOrders);

// Farmer Routes
router.get('/farmer-sales', protect, isFarmer, getFarmerSales);
router.put('/:id/status', protect, isFarmer, updateOrderStatus);

module.exports = router;