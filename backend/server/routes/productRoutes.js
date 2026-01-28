const express = require('express');
const router = express.Router();
const { 
    createProduct, 
    getAllProducts, 
    getFarmerProducts, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { protect, isFarmer } = require('../middleware/authMiddleware');

// Import the Cloudinary upload middleware you just created
const { upload } = require('../utils/cloudinary'); 

// @route   GET /api/products
router.get('/', getAllProducts);

// @route   POST /api/products
// ADDED: upload.single('image') middleware here
router.post('/', protect, isFarmer, upload.single('image'), createProduct);

// @route   GET /api/products/my-products
router.get('/my-products', protect, isFarmer, getFarmerProducts);

// @route   PUT /api/products/:id
// ADDED: upload.single('image') here too, in case the farmer wants to change the photo
router.put('/:id', protect, isFarmer, upload.single('image'), updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', protect, isFarmer, deleteProduct);

module.exports = router;