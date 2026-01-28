import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Common Pages
import Login from './pages/common/Login';
import Register from './pages/common/Register';

// Farmer Dashboard Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import AddProduct from './pages/farmer/AddProduct';
import FarmerOrders from './pages/farmer/FarmerOrders';

// Buyer Dashboard Pages
import Marketplace from './pages/buyer/Marketplace';
import BuyerOrders from './pages/buyer/BuyerOrders'; // Fixed .jsx extension in import
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import MyRequests from './pages/buyer/MyRequests'; // 👈 ADD THIS IMPORT

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Farmer Dashboard Routes */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/farmer-orders" element={<FarmerOrders />} />
          
          {/* Buyer Marketplace & Request Routes */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/my-requests" element={<MyRequests />} /> {/* 👈 NOW DEFINED */}
          <Route path="/my-orders" element={<BuyerOrders />} />

          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Catch-all: Redirect unknown routes back to Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;