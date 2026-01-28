import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { MapPin, Tag, IndianRupee, Package, PlusCircle, AlertCircle, Check, X, User } from 'lucide-react';

const FarmerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [userRes, productRes, requestRes] = await Promise.all([
                    API.get('/auth/me'),
                    API.get('/products/my-products'),
                    API.get('/requests/farmer-requests') 
                ]);
                setUser(userRes.data);
                setProducts(productRes.data);
                setRequests(requestRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/requests/${id}`, { status });
            setRequests(requests.map(req => req._id === id ? { ...req, status } : req));
        } catch (err) {
            alert("Failed to update status");
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-600">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-10">
                
                {/* Profile Header with Profile Photo Support */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8">
                    
                    {/* DYNAMIC PHOTO SECTION */}
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
                    
                    <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                        <PlusCircle size={20} /> List New Crop
                    </button>
                </div>

                Buyer Requests Section
                <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <User className="text-emerald-600" /> Buyer Requests
                </h3>
                
                <div className="space-y-4 mb-10">
                    {requests.length === 0 ? (
                        <p className="text-slate-400 italic text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200">
                            No pending requests yet.
                        </p>
                    ) : (
                        requests.map(req => (
                            <div key={req._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800">{req.buyer?.name} wants to buy {req.product?.name}</h4>
                                    <p className="text-slate-500 text-sm">Location: {req.buyer?.address}</p>
                                    {req.status === 'approved' && (
                                        <p className="text-emerald-600 font-bold text-sm mt-2 flex items-center gap-1">
                                            ✅ Contact shared: {req.buyer?.phone}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="flex gap-2">
                                    {req.status === 'pending' ? (
                                        <>
                                            <button 
                                                onClick={() => handleStatusUpdate(req._id, 'approved')}
                                                className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-emerald-700 transition">
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(req._id, 'rejected')}
                                                className="bg-slate-100 text-slate-600 px-5 py-2 rounded-xl font-bold hover:bg-slate-200 transition">
                                                Ignore
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                                            req.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <h3 className="text-2xl font-black text-slate-800 mb-6">Your Inventory</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(p => (
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
                    ))}
                </div>
            </main>
        </div>
    );
};

export default FarmerDashboard;