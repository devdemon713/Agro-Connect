import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { Check, X, User, Phone, MapPin } from 'lucide-react';

const FarmerOrders = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            // Updated to the correct route to avoid 404 errors
            const { data } = await API.get('/orders/farmer-sales');
            setRequests(data);
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            // Sends the PUT request to update status
            await API.put(`/orders/${orderId}/status`, { status: newStatus });
            alert(`Request ${newStatus} successfully!`);
            fetchRequests(); // Refresh the list to show updated status
        } catch (err) {
            alert("Failed to update status.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    Incoming Buyer Requests
                </h1>

                <div className="grid gap-6">
                    {requests.length === 0 ? (
                        <div className="bg-white p-10 rounded-3xl text-center text-slate-400 border border-dashed">
                            No requests found yet.
                        </div>
                    ) : (
                        requests.map((req) => (
                            <div key={req._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        {req.buyer?.profileImage ? (
                                            <img src={req.buyer.profileImage} className="h-full w-full rounded-2xl object-cover" />
                                        ) : <User size={30} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800">Request for {req.product?.name}</h3>
                                        <p className="text-slate-500 text-sm flex items-center gap-1">
                                            From: <span className="font-bold text-slate-700">{req.buyer?.name}</span>
                                        </p>
                                        <div className="flex gap-4 mt-2 text-xs font-medium text-slate-400">
                                            <span className="flex items-center gap-1"><MapPin size={12}/> {req.buyer?.address || 'No Address'}</span>
                                            {req.status === 'approved' && (
                                                <span className="flex items-center gap-1 text-emerald-600"><Phone size={12}/> {req.buyer?.phone}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                    {req.status === 'pending' ? (
                                        <>
                                            <button 
                                                onClick={() => updateStatus(req._id, 'approved')}
                                                className="flex-1 md:flex-none bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                                            >
                                                <Check size={18} /> Accept
                                            </button>
                                            <button 
                                                onClick={() => updateStatus(req._id, 'rejected')}
                                                className="flex-1 md:flex-none bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-100 transition-all"
                                            >
                                                <X size={18} /> Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`px-6 py-3 rounded-2xl font-black uppercase text-xs ${
                                            req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default FarmerOrders;