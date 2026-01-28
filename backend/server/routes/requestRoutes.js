const express = require('express');
const router = express.Router();
const { getFarmerRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');
const Request = require('../models/Request');

// Create a new request (Buyer action)
router.post('/', protect, async (req, res) => {
    try {
        const { farmerId, productId } = req.body;
        const newRequest = new Request({
            buyer: req.user.id,
            farmer: farmerId,
            product: productId
        });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ msg: "Failed to send request" });
    }
});

// Get requests for farmer
router.get('/farmer-requests', protect, getFarmerRequests);

// Update request (Approve/Reject)
router.put('/:id', protect, updateRequestStatus);

module.exports = router;