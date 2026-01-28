import React, { useState } from 'react';
import API from '../../api';
import Navbar from '../../components/Navbar';
import { ImagePlus, Loader2, CheckCircle2 } from 'lucide-react';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle text inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file selection & Preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Creates a temporary local URL for preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Prepare FormData (Required for Cloudinary/Multer)
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('image', imageFile); // 'image' matches upload.single('image') in backend

        try {
            // 2. API Call with Multi-part header
            await API.post('/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            alert("✅ Product uploaded to Cloudinary & saved to DB!");
            // Reset form
            setFormData({ name: '', price: '', description: '', category: '', stock: '' });
            setImageFile(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error(err);
            alert("❌ Upload failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
                    <header className="mb-10 text-center">
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">List New Harvest</h1>
                        <p className="text-slate-500 mt-2">Upload your fresh produce to the global marketplace.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload Area */}
                        <div className="relative group">
                            <label className="block w-full h-64 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer overflow-hidden">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-400 group-hover:text-emerald-500">
                                        <ImagePlus size={48} strokeWidth={1.5} />
                                        <span className="mt-4 font-bold text-sm uppercase tracking-widest">Click to upload photo</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} required />
                            </label>
                        </div>

                        {/* Text Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase ml-2">Product Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Organic Alphanso" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase ml-2">Price (per kg)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="₹ 0.00" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase ml-2">Stock Available (kg)</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase ml-2">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer" required>
                                    <option value="">Select Category</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Grains">Grains</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase ml-2">Short Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Describe the freshness..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" required></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-slate-200 hover:shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {loading ? (
                                <> <Loader2 className="animate-spin" /> Uploading to Cloud...</>
                            ) : (
                                <> <CheckCircle2 size={20} /> List Crop Now</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;