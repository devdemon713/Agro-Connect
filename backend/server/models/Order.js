const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Changed: Single product and farmer fields for "Get Contact" flow
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    // Kept for backward compatibility but removed 'required: true' to fix the 500 error
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ],
    totalAmount: { type: Number }, // Removed required: true
    address: { type: String },     // Removed required: true
    
    status: { 
        type: String, 
        // Ensure 'pending' (lowercase) is included if your controller sends lowercase
        enum: ['Pending', 'Accepted', 'Cancelled', 'Processing', 'Shipped', 'Delivered', 'pending', 'approved', 'rejected'], 
        default: 'pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);