const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Remove "Bearer " from string if it exists
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // This adds the user id and role to the request
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = { protect };


// Add this below your 'protect' function
const isFarmer = (req, res, next) => {
    if (req.user && req.user.role === 'farmer') {
        next();
    } else {
        res.status(403).json({ msg: "Access denied. Only farmers can perform this action." });
    }
};

module.exports = { protect, isFarmer };