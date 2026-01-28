import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { Clock, CheckCircle, XCircle, Phone } from 'lucide-react';

const BuyerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Hits the backend: GET /api/orders/my-orders
                const { data } = await API.get('/orders/my-orders');
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="p-10 text-center font-bold text-emerald-600">Loading your requests...</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-black text-slate-800 mb-8">My Orders & Requests</h1>
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="bg-white p-10 rounded-[2rem] text-center text-slate-400 border border-dashed">
                            No requests sent yet. Go to the Marketplace to connect with farmers.
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-xl text-slate-800">{order.product?.name}</h3>
                                    <p className="text-slate-500">Farmer: {order.farmer?.name}</p>
                                    {order.status === 'approved' && (
                                        <p className="text-emerald-600 font-bold mt-2 flex items-center gap-2">
                                            <Phone size={16} /> Contact: {order.farmer?.phone}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className={`px-4 py-2 rounded-full text-xs font-black uppercase flex items-center gap-2 ${
                                        order.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                                        order.status === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                        {order.status === 'pending' && <Clock size={14} />}
                                        {order.status === 'approved' && <CheckCircle size={14} />}
                                        {order.status === 'rejected' && <XCircle size={14} />}
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default BuyerOrders;