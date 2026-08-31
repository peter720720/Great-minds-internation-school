import React, { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, LogIn, Briefcase, Mail, Lock, User } from 'lucide-react';

export default function StaffPortal() {
    const { user, token, login, logout } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('teaching');
    const [feedback, setFeedback] = useState({ type: '', text: '' });
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: '', text: '' });
        setProcessing(true);

        const endpoint = isSignUp ? '/staff/signup' : '/staff/login';
        const payload = isSignUp ? { fullName, email, password, role } : { email, password };

        try {
            const res = await api.post(endpoint, payload);
            if (isSignUp) {
                setFeedback({ type: 'success', text: 'Staff profile submitted. Awaiting administrator system verification clearance.' });
                setIsSignUp(false);
            } else {
                login(res.data.staff, res.data.token);
            }
        } catch (err) {
            setFeedback({ type: 'error', text: err.response?.data?.message || 'Access pipeline authentication failure.' });
        } finally {
            setProcessing(false);
        }
    };

    // ACTIVE DEPLOYED STAFF DASHBOARD DESK VIEW
    if (token && user && user.role !== 'admin') {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded shadow-md overflow-hidden border-t-4 border-school-navy">
                    <div className="bg-school-navyLight p-6 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Briefcase size={24} className="text-school-gold" />
                            <div>
                                <h2 className="text-lg font-bold uppercase">Staff Management Desk</h2>
                                <p className="text-[11px] text-gray-300">Welcome back, internal officer node.</p>
                            </div>
                        </div>
                        <button onClick={logout} className="text-xs font-bold uppercase bg-school-gold text-school-navy px-4 py-2 rounded hover:bg-school-goldHover transition">
                            Disconnect Portal
                        </button>
                    </div>
                    <div className="p-8 text-center bg-school-cream/20">
                        <div className="w-16 h-16 bg-school-cream text-school-navy mx-auto rounded-full flex items-center justify-center font-black text-xl mb-4 border border-school-gold">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-bold text-school-navy tracking-tight">{user.name}</h3>
                        <p className="text-xs text-gray-400 capitalize font-medium">{user.role} Track Registry</p>
                        
                        <div className="mt-8 p-6 max-w-md mx-auto bg-white border border-dashed border-gray-300 rounded text-xs text-gray-500 leading-relaxed">
                            💡 **CBT Examinations Module, Grading Schemes, & Assessment Matrices Link Active.** Complete academic structural updates directly via internal local subnet nodes.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // PUBLIC UNAUTHENTICATED AUTH GATEWAY
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded shadow-md w-full max-w-md border-t-4 border-school-gold p-8">
                <div className="text-center mb-6">
                    <ShieldAlert size={36} className="text-school-navy mx-auto mb-2" />
                    <h2 className="text-xl font-bold uppercase text-school-navy">{isSignUp ? 'Staff Enlistment' : 'Staff Secure Access'}</h2>
                    <p className="text-xs text-gray-400 font-medium">Great Mind School Professional Workspace Gateway</p>
                </div>

                {feedback.text && <div className={`p-3 text-xs font-bold rounded mb-4 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{feedback.text}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Official Name Document</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" required />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Corporate Mail Route</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">System Operational Key</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" required />
                        </div>
                    </div>

                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Operational Division Assignment</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2.5 rounded text-sm bg-white focus:outline-school-navy font-bold text-school-navy">
                                <option value="teaching">Teaching Faculty / Instructors</option>
                                <option value="non-teaching">Administrative / Support Personnel</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" disabled={processing} className="w-full bg-school-navy text-white text-xs font-bold uppercase py-3 rounded tracking-widest shadow hover:bg-school-navyLight transition disabled:bg-gray-400">
                        {processing ? 'Verifying Node Signature...' : isSignUp ? 'Request Workspace Account' : 'Secure Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-school-gold hover:underline font-semibold">
                        {isSignUp ? 'Already have an authorized staff profile? Login' : 'New instructor assignment? Register workspace account entry here'}
                    </button>
                </div>
            </div>
        </div>
    );
}