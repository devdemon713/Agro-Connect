const Order = require('../models/Order');

// @desc    Place a new order (Buyer)
exports.placeOrder = async (req, res) => {
    try {
        const { products, totalAmount, address } = req.body;
        const newOrder = new Order({
            buyer: req.user.id,
            products,
            totalAmount,
            address
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ msg: "Order failed" });
    }
};

// @desc    Get orders for a logged-in Buyer
exports.getBuyerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// @desc    Get sales for a Farmer (Orders containing their products)
exports.getFarmerSales = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product').populate('buyer', 'name');
        // Filter to only show orders containing products belonging to this farmer
        const sales = orders.filter(order => 
            order.products.some(p => p.product && p.product.farmer.toString() === req.user.id)
        );
        res.json(sales);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// @desc    Update Order Status (Farmer accepts/rejects)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        console.log(`Updating Order ${req.params.id} to status: ${status}`); // DEBUG LOG

        const order = await Order.findById(req.params.id);

        if (!order) {
            console.log("Order ID not found in database");
            return res.status(404).json({ msg: "Order not found" });
        }

        order.status = status;
        await order.save();
        
        console.log("Order updated successfully!");
        res.json(order);
    } catch (err) {
        console.error("BACKEND ERROR:", err.message); // THIS WILL SHOW IN YOUR TERMINAL
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};