import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { CheckCircle, XCircle, User, Clock } from 'lucide-react';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchFarmerSales(); }, []);

  const fetchFarmerSales = async () => {
    try {
      const { data } = await API.get('/orders/farmer-sales');
      setOrders(data);
    } catch (err) { console.error("Error fetching sales", err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      alert(`Order ${status}`);
      fetchFarmerSales();
    } catch (err) { alert("Action failed"); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight flex items-center gap-3">
          <Clock className="text-emerald-600" /> Incoming Buyer Requests
        </h1>
        <div className="grid gap-6">
          {orders.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl text-center border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No requests yet. Your crops are waiting for buyers!</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order._id} className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-700"><User size={24} /></div>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Request from {order.buyer?.name || 'Guest'}</p>
                    <h3 className="text-2xl font-black text-slate-800">₹{order.totalAmount}</h3>
                    <p className="text-sm text-slate-500">{order.address}</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  {order.status === 'Pending' ? (
                    <>
                      <button onClick={() => updateStatus(order._id, 'Accepted')} className="flex-1 md:flex-none bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">Accept</button>
                      <button onClick={() => updateStatus(order._id, 'Cancelled')} className="flex-1 md:flex-none bg-red-50 text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-red-100 transition">Reject</button>
                    </>
                  ) : (
                    <span className={`px-6 py-3 rounded-xl font-bold border ${order.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                      {order.status}
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