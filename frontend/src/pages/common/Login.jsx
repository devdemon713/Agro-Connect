import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            
            // Redirect based on role
            if (data.user.role === 'farmer') navigate('/farmer-dashboard');
            else navigate('/marketplace');
        } catch (err) {
            alert(err.response?.data?.msg || "Login Failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-green-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-green-700">Login to Agro-Connect</h2>
                <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>
                <p className="mt-4 text-sm">Don't have an account? <Link to="/register" className="text-green-600">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;