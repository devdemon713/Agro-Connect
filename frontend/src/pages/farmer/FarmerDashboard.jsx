import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import API from '../../api';
import Navbar from '../../components/Navbar';
import { MapPin, Tag, PlusCircle } from 'lucide-react';

const FarmerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // 2. Initialize navigate

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Removed requestRes from the Promise.all since requests are moving to a new page
                const [userRes, productRes] = await Promise.all([
                    API.get('/auth/me'),
                    API.get('/products/my-products')
                ]);
                setUser(userRes.data);
                setProducts(productRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-600">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-10">
                
                {/* Profile Header */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8">
                    
                    <div className="relative">
                        {user?.profileImage ? (
                            <img 
                                src={user.profileImage} 
                                alt="Profile" 
                                className="w-28 h-28 rounded-3xl object-cover shadow-lg border-4 border-emerald-50"
                            />
                        ) : (
                            <div className="w-28 h-28 bg-emerald-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-emerald-100">
                                {user?.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-4xl font-black text-slate-800">Welcome, {user?.name}!</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                            <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                <MapPin size={14} /> {user?.address}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                📞 +91 {user?.phone}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-bold">
                                <Tag size={14} /> Farmer
                            </span>
                        </div>
                    </div>
                    
                    {/* 3. ADDED onClick HERE TO FIX THE BUTTON */}
                    <button 
                        onClick={() => navigate('/add-product')} 
                        className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                    >
                        <PlusCircle size={20} /> List New Crop
                    </button>
                </div>

                {/* Buyer Requests Section has been moved to FarmerRequests.jsx */}

                <h3 className="text-2xl font-black text-slate-800 mb-6">Your Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.length === 0 ? (
                        <div className="col-span-full bg-white p-10 rounded-3xl text-center text-slate-400 border border-dashed">
                            You haven't listed any crops yet. Click "List New Crop" to start.
                        </div>
                    ) : (
                        products.map(p => (
                            <div key={p._id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group hover:scale-[1.02] transition-all">
                                <img src={p.image} className="h-48 w-full object-cover" alt={p.name} />
                                <div className="p-6">
                                    <h4 className="font-bold text-xl text-slate-800">{p.name}</h4>
                                    <div className="flex justify-between mt-4">
                                        <span className="text-emerald-600 font-black text-lg">₹{p.price}/kg</span>
                                        <span className="text-slate-400 font-bold">Stock: {p.stock}kg</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default FarmerDashboard;