import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { Search, PhoneCall, CheckCircle2 } from 'lucide-react';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [requestedIds, setRequestedIds] = useState([]);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get(`/products?search=${search}`);
            setProducts(data);
        } catch (err) { console.error(err); }
    };

    const handleGetContact = async (farmerId, productId) => {
        try {
            const res = await API.post('/orders', { productId, farmerId });
            if(res.status === 201 || res.status === 200) {
                setRequestedIds(prev => [...prev, productId]);
                alert("Request sent successfully! Check 'My Orders' for status.");
            }
        } catch (err) {
            alert(err.response?.data?.msg || "Failed to send request.");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-slate-100 pb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800">Direct from Farm</h1>
                        <p className="text-slate-500 text-sm">Connect with farmers directly.</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200" onChange={(e) => setSearch(e.target.value)} onKeyUp={fetchProducts} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => (
                        <div key={p._id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl transition-all">
                            <img src={p.image} alt={p.name} className="h-48 w-full object-cover" />
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-slate-800">{p.name}</h3>
                                <p className="text-xs text-slate-500 mb-4">Farmer: {p.farmer?.name}</p>
                                <div className="mt-auto flex justify-between items-center pt-3 border-t">
                                    <p className="text-xl font-black text-slate-900">₹{p.price}/kg</p>
                                    {requestedIds.includes(p._id) ? (
                                        <button disabled className="bg-slate-100 text-slate-400 p-2.5 rounded-xl flex items-center gap-2 font-bold text-sm cursor-not-allowed">
                                            <CheckCircle2 size={16} /> Requested
                                        </button>
                                    ) : (
                                        <button onClick={() => handleGetContact(p.farmer?._id, p._id)} className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 flex items-center gap-2 font-bold text-sm">
                                            <PhoneCall size={16} /> Get Contact
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Marketplace;