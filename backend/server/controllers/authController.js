const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        // 1. Destructure ALL fields sent from the frontend
        const { name, email, password, role, address, phone, profileImage } = req.body;

        // 2. Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user with all new fields
        user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role, 
            address, 
            phone, 
            profileImage 
        });

        await user.save();
        res.status(201).json({ msg: "User registered successfully" });

    } catch (err) { 
        console.error("REGISTRATION ERROR:", err); 
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};


// backend/controllers/authController.js
exports.getMe = async (req, res) => {
    try {
        // req.user.id comes from your protect middleware
        const user = await User.findById(req.user.id).select('-password'); 
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

