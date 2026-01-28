const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        // ADDED 'Accepted' and 'Cancelled' to the list below
        enum: ['Pending', 'Accepted', 'Cancelled', 'Processing', 'Shipped', 'Delivered'], 
        default: 'Pending' 
    },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);