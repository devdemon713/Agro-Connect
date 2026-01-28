import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { MapPin, Phone, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

const BuyerDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await API.get('/auth/me');
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
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
                            <div className="w-28 h-28 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-blue-100">
                                {user?.name?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-4xl font-black text-slate-800">Hello, {user?.name}!</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                            <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                <MapPin size={14} /> {user?.address}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                <Phone size={14} /> +91 {user?.phone}
                            </span>
                        </div>
                    </div>

                    <Link to="/marketplace" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">
                        <ShoppingBag size={20} /> Shop Fresh Crops
                    </Link>
                </div>

                {/* Quick Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/my-requests" className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-emerald-500 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <MessageSquare size={32} />
                            </div>
                            <ArrowRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">My Requests</h2>
                        <p className="text-slate-500 mt-2 text-sm">Check approval status and view farmer contact details.</p>
                    </Link>

                    <Link to="/my-orders" className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-500 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ShoppingBag size={32} />
                            </div>
                            <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">Order History</h2>
                        <p className="text-slate-500 mt-2 text-sm">Review your past purchases and delivery status.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default BuyerDashboard;