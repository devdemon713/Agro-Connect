const express = require('express');
const cors = require('cors');
const connectDB = require('./server/config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', require('./server/routes/authRoutes'));
app.use('/api/products', require('./server/routes/productRoutes'));
app.use('/api/orders', require('./server/routes/orderRoutes'));
app.use('/api/users', require('./server/routes/userRoutes'));
app.use('/api/requests', require('./server/routes/requestRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
    res.send("Agro-Connect API is live and healthy!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});