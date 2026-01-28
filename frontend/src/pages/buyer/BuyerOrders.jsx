import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/my-orders');
        setOrders(data);
      } catch (err) { console.error(err); }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Order Tracking</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-400 mb-1">OrderID: #{order._id.slice(-6)}</p>
                <h3 className="text-xl font-bold text-slate-800">₹{order.totalAmount}</h3>
              </div>
              <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter ${
                order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                order.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerOrders;