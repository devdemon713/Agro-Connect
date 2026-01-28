const Product = require('../models/Product');

// @desc    Create a new product (Farmers only with Cloudinary)
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Ensure file exists (from Multer/Cloudinary)
        if (!req.file) {
            return res.status(400).json({ message: "Image upload is required" });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: req.file.path, // The secure URL from Cloudinary
            farmer: req.user.id   // From auth middleware
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all products with SEARCH and FILTER
exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice } = req.query;
        let query = {};

        if (search) query.name = { $regex: search, $options: 'i' };
        if (category) query.category = category;
        if (minPrice || maxPrice) {
            query.price = { 
                $gte: Number(minPrice) || 0, 
                $lte: Number(maxPrice) || Infinity 
            };
        }

        const products = await Product.find(query).populate('farmer', 'name email');
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// @desc    Get products by a specific farmer (for Dashboard)
exports.getFarmerProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.user.id });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// @desc    Update a product (Farmer Only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: "Product not found" });
        
        // Check ownership
        if (product.farmer.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        // Update text fields
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;

        // Update image only if a new file is uploaded to Cloudinary
        if (req.file) {
            product.image = req.file.path;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product (Farmer Only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) return res.status(404).json({ msg: "Product not found" });
        
        if (product.farmer.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        await product.deleteOne();
        res.json({ msg: "Product removed from database" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};