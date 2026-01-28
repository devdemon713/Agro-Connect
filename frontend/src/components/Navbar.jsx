import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  LogOut, 
  LayoutDashboard, 
  ShoppingBasket, 
  ClipboardList, 
  UserCircle 
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role'); // Get role from local storage

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Helper to check if a link is active for styling
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-100 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 text-emerald-700 font-black text-xl tracking-tighter">
        <div className="bg-emerald-600 p-1.5 rounded-xl">
          <Leaf className="text-white fill-white" size={20} />
        </div>
        <span>Agro<span className="text-emerald-500">Connect</span></span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-2 md:gap-6">
        
        {role === 'farmer' ? (
          <>
            {/* Farmer Specific Links */}
            <Link 
              to="/farmer-dashboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('/farmer-dashboard') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <LayoutDashboard size={18} /> 
              <span className="hidden md:block">Dashboard</span>
            </Link>

            <Link 
              to="/farmer-orders" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('/farmer-orders') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <ClipboardList size={18} /> 
              <span className="hidden md:block">Buyer Requests</span>
            </Link>
          </>
        ) : (
          <>
            {/* Buyer Specific Links */}
            <Link 
              to="/buyer-dashboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('/buyer-dashboard') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <UserCircle size={18} /> 
              <span className="hidden md:block">Profile</span>
            </Link>

            <Link 
              to="/marketplace" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('/marketplace') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <ShoppingBasket size={18} /> 
              <span className="hidden md:block">Shop</span>
            </Link>

            <Link 
              to="/my-orders" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('/my-orders') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <ClipboardList size={18} /> 
              <span className="hidden md:block">My Orders</span>
            </Link>
          </>
        )}

        {/* Vertical Divider */}
        <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
        >
          <LogOut size={18} /> 
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;