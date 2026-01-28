import { useEffect, useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { Search, PhoneCall, CheckCircle2 } from 'lucide-react';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [requestedIds, setRequestedIds] = useState([]); // Track which products were requested

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get(`/products?search=${search}`);
            setProducts(data);
        } catch (err) { console.error(err); }
    };

    const handleRequestContact = async (farmerId, productId) => {
        try {
            // Create a record in our new Request model
            await API.post('/requests', { 
                farmerId, 
                productId 
            });
            
            // Update UI to show request was sent
            setRequestedIds([...requestedIds, productId]);
            alert("✅ Request Sent! Once the farmer approves, you will see their contact details in your 'My Requests' page.");
        } catch (err) { 
            alert(err.response?.data?.msg || "You have already sent a request for this product."); 
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-slate-100 pb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Direct from Farm</h1>
                        <p className="text-slate-500 text-sm">Connect with farmers and negotiate deals directly.</p>
                    </div>
                    
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                        <input 
                            type="text" 
                            placeholder="Search produce..." 
                            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all"
                            onChange={(e) => setSearch(e.target.value)} 
                            onKeyUp={fetchProducts} 
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => (
                        <div key={p._id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                                    Farmer: {p.farmer?.name || 'Verified Farmer'}
                                </span>
                            </div>
                            
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-slate-800">{p.name}</h3>
                                <p className="text-xs text-slate-500 mt-1 mb-4 line-clamp-2">
                                    Located in {p.farmer?.address || 'Maharashtra'}
                                </p>
                                
                                <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-50">
                                    <p className="text-xl font-black text-slate-900">₹{p.price}<span className="text-[10px] text-slate-400 font-medium">/kg</span></p>
                                    
                                    {requestedIds.includes(p._id) ? (
                                        <button disabled className="bg-slate-100 text-slate-400 p-2.5 rounded-xl flex items-center gap-2 font-bold text-sm cursor-not-allowed">
                                            <CheckCircle2 size={16} /> Requested
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleRequestContact(p.farmer._id, p._id)} 
                                            className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 flex items-center gap-2 font-bold text-sm transition-all active:scale-95 shadow-md shadow-emerald-100"
                                        >
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