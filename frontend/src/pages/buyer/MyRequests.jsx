import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { Phone, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyRequests = async () => {
            try {
                const { data } = await API.get('/requests/buyer-requests');
                setRequests(data);
            } catch (err) {
                console.error("Error fetching requests", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyRequests();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-emerald-600">Loading your requests...</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-black text-slate-800 mb-2">My Contact Requests</h1>
                <p className="text-slate-500 mb-8">Once a farmer approves your request, their mobile number will appear here.</p>

                <div className="grid gap-6">
                    {requests.length === 0 ? (
                        <div className="bg-white p-12 rounded-[2rem] text-center border border-slate-200">
                            <p className="text-slate-400">You haven't requested any contacts yet.</p>
                        </div>
                    ) : (
                        requests.map(req => (
                            <div key={req._id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                        <img src={req.product?.image} className="w-full h-full object-cover rounded-2xl" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">Request for {req.product?.name}</h3>
                                        <p className="text-slate-500 text-sm flex items-center gap-1">
                                            Farmer: <span className="font-bold text-slate-700">{req.farmer?.name}</span>
                                        </p>
                                        <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                                            <MapPin size={12} /> {req.farmer?.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-2">
                                    {req.status === 'approved' ? (
                                        <div className="flex flex-col items-center md:items-end gap-2">
                                            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center gap-2">
                                                <CheckCircle size={14} /> Approved
                                            </span>
                                            <a 
                                                href={`tel:${req.farmer?.phone}`} 
                                                className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
                                            >
                                                <Phone size={18} /> Call +91 {req.farmer?.phone}
                                            </a>
                                        </div>
                                    ) : req.status === 'pending' ? (
                                        <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center gap-2">
                                            <Clock size={14} /> Waiting for Approval
                                        </span>
                                    ) : (
                                        <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center gap-2">
                                            <XCircle size={14} /> Rejected
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyRequests;