import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

// Ensure 'export default' is explicitly declared on this line
export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, token, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token && user?.role === 'admin') {
            navigate('/admin-dashboard', { replace: true });
        }
    }, [navigate, token, user]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/admin/admin-login', { email, password });
            login(res.data.admin, res.data.token);
            navigate('/admin-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication processing error encountered.');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <form onSubmit={handleLoginSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md border-t-4 border-school-navy">
                <h2 className="text-xl font-bold uppercase text-school-navy mb-1 text-center">Admin Workspace</h2>
                <p className="text-xs text-gray-400 mb-6 text-center">Sign in to update frontend assets, gallery images, and messages.</p>
                
                {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded mb-4 font-semibold">{error}</div>}
                
                <div className="mb-4">
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">System Mail Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-school-navy" required />
                </div>
                <div className="mb-6">
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Access Token Key</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded text-sm focus:outline-none focus:border-school-navy" required />
                </div>
                <button type="submit" className="w-full bg-school-navy text-white font-bold py-3 rounded uppercase text-xs tracking-wider hover:bg-school-navyLight transition shadow">
                    Verify Access Credentials
                </button>
            </form>
        </div>
    );
}
