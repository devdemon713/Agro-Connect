const Order = require('../models/Order');

// @desc    Place a new request/order (Buyer clicks "Get Contact")
// backend/controllers/orderController.js
exports.placeOrder = async (req, res) => {
    try {
        const { productId, farmerId } = req.body;

        // Create the order using the fields sent from Marketplace.jsx
        const newOrder = new Order({
            buyer: req.user.id,    // From protect middleware
            farmer: farmerId,      // Sent from frontend
            product: productId,    // Sent from frontend
            status: 'pending' 
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Database Save Error:", err.message);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

// @desc    Get orders for a logged-in Buyer
exports.getBuyerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate('product', 'name price image') 
            .populate('farmer', 'name phone address') 
            .sort({ createdAt: -1 });
        
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// @desc    Get sales/requests for a Farmer (Feeds the Buyer Requests page)
exports.getFarmerSales = async (req, res) => {
    try {
        // Finds orders specifically for the logged-in farmer
        const requests = await Order.find({ farmer: req.user.id })
            .populate('buyer', 'name phone address profileImage')
            .populate('product', 'name price')
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (err) {
        console.error("Error fetching farmer sales:", err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// @desc    Update Order Status (Farmer accepts/rejects)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

