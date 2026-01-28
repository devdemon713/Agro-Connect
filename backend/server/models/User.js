const mongoose = require('mongoose'); // 👈 ADD THIS LINE

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'farmer'], default: 'buyer' },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  profileImage: { type: String, default: "" }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);