import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../../api';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        role: 'buyer', 
        address: '', 
        phone: '' 
    });
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        
        try {
            let imageUrl = "";

            // 1. Upload Profile Photo to Cloudinary
            if (image) {
                const data = new FormData();
                data.append("file", image);
                // Using your preset name from image_79cffc.png
                data.append("upload_preset", "prashant"); 
                
                // Using your Cloud Name from image_79cffc.png
                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/ddrcpxrbv/image/upload", 
                    data
                );
                imageUrl = res.data.secure_url;
            }

            // 2. Register User with all fields
            await API.post('/auth/register', { 
                ...formData, 
                profileImage: imageUrl 
            });

            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.msg || "Registration Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-emerald-50 p-4 text-slate-800">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-emerald-100">
                <h2 className="text-3xl font-black mb-6 text-emerald-700 text-center">Join Agro-Connect</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Profile Photo</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-bold"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-emerald-500/20" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-emerald-500/20" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-emerald-500/20" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} required />

                    <input type="text" placeholder="Address (City, State)" className="w-full p-3 border rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-emerald-500/20" 
                        onChange={(e) => setFormData({...formData, address: e.target.value})} required />

                    <input type="tel" placeholder="Mobile Number" className="w-full p-3 border rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-emerald-500/20" 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} required />

                    <select className="w-full p-3 border rounded-2xl bg-emerald-50 text-emerald-700 font-bold outline-none cursor-pointer" 
                        onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        <option value="buyer">I am a Buyer</option>
                        <option value="farmer">I am a Farmer</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold mt-6 hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 disabled:bg-slate-300"
                >
                    {uploading ? "Uploading Image..." : "Register Now"}
                </button>
            </form>
        </div>
    );
};

export default Register;