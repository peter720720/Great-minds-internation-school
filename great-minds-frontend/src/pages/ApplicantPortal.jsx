import React, { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, User, CreditCard, CheckCircle } from 'lucide-react';

export default function ApplicantPortal() {
    const { user, token, login, logout } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classApplied, setClassApplied] = useState('Primary 1');
    const [feedback, setFeedback] = useState({ type: '', text: '' });
    const [processing, setProcessing] = useState(false);

    const availableClasses = [
        'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
        'Jss 1', 'Jss 2', 'Jss 3', 'Ss 1', 'Ss 2', 'Ss 3'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: '', text: '' });
        setProcessing(true);

        const endpoint = isSignUp ? '/applicants/signup' : '/applicants/login';
        const payload = isSignUp ? { fullName, email, password, classApplied } : { email, password };

        try {
            const res = await api.post(endpoint, payload);
            if (isSignUp) {
                setFeedback({ type: 'success', text: 'Account created! Please switch to login to enter your profile.' });
                setIsSignUp(false);
            } else {
                login(res.data.profile, res.data.token);
            }
        } catch (err) {
            setFeedback({ type: 'error', text: err.response?.data?.message || 'Portal authentication process dropped.' });
        } finally {
            setProcessing(false);
        }
    };

    const handleMockPayment = async () => {
        setProcessing(true);
        try {
            const mockRef = 'GM-' + Math.floor(Math.random() * 10000000);
            const res = await api.post('/applicants/verify-payment', { reference: mockRef });
            setFeedback({ type: 'success', text: 'Application Processing Fee Logged Successfully!' });
            login(res.data.data, token);
        } catch (err) {
            setFeedback({ type: 'error', text: 'Payment logging interface failure.' });
        } finally {
            setProcessing(false);
        }
    };

    // LOGGED IN VIEW WINDOW
    if (token && user) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <div className="bg-white rounded shadow-md overflow-hidden border-t-4 border-school-gold">
                    <div className="bg-school-navy p-6 text-white flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold uppercase tracking-wide">Applicant Workspace</h2>
                            <p className="text-xs text-gray-300">Great Mind International School Admissions Portal</p>
                        </div>
                        <button onClick={logout} className="text-xs font-bold uppercase bg-school-gold text-school-navy px-4 py-2 rounded hover:bg-school-goldHover transition">
                            Log Out
                        </button>
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-school-navy uppercase text-sm border-b pb-2 mb-4">Student Profile Information</h3>
                            <div className="space-y-3 text-xs text-gray-600">
                                <p><strong className="text-gray-900 uppercase">Full Name:</strong> {user.fullName}</p>
                                <p><strong className="text-gray-900 uppercase">Registered Email:</strong> {user.email}</p>
                                <p><strong className="text-gray-900 uppercase">Target Academic Class:</strong> <span className="bg-school-cream text-school-navy font-bold px-2 py-0.5 rounded">{user.classApplied}</span></p>
                            </div>
                        </div>

                        <div className="bg-school-cream/40 p-6 rounded border border-gray-200 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-school-navy uppercase text-sm mb-2">Application Checklist Status</h3>
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-2 text-xs">
                                        <CheckCircle size={16} className="text-green-600" /> Account Registration Secure
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        {user.paymentStatus === 'Paid' ? (
                                            <CheckCircle size={16} className="text-green-600" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-gray-400" />
                                        )}
                                        Processing Fee: <strong className={user.paymentStatus === 'Paid' ? 'text-green-700' : 'text-red-600'}>{user.paymentStatus}</strong>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        {user.admissionStatus === 'Approved' ? (
                                            <CheckCircle size={16} className="text-green-600" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-gray-400" />
                                        )}
                                        Admissions Screening Action: <strong className="text-school-navy">{user.admissionStatus}</strong>
                                    </div>
                                </div>
                            </div>

                            {user.paymentStatus !== 'Paid' && (
                                <button onClick={handleMockPayment} disabled={processing} className="mt-6 w-full bg-school-gold text-school-navy text-xs font-bold uppercase py-3 rounded tracking-wider shadow hover:bg-school-goldHover flex items-center justify-center gap-2">
                                    <CreditCard size={14} /> Pay Entrance & Application Fee
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ANONYMOUS ACCESS VIEW GATEWAY (SIGNUP / LOGIN INTERACTION)
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded shadow-md w-full max-w-md border-t-4 border-school-navy p-8">
                <div className="text-center mb-6">
                    <GraduationCap size={40} className="text-school-gold mx-auto mb-2" />
                    <h2 className="text-xl font-bold uppercase text-school-navy">{isSignUp ? 'Admission Registry' : 'Applicant Login'}</h2>
                    <p className="text-xs text-gray-400">Great Mind International Student Application Portal</p>
                </div>

                {feedback.text && (
                    <div className={`p-3 text-xs font-bold rounded mb-4 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {feedback.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Student Full Name</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" placeholder="John Doe" required />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" placeholder="student@example.com" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Portal Secure Password</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2.5 pl-10 rounded text-sm focus:outline-school-navy" placeholder="••••••••" required />
                        </div>
                    </div>

                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Applying For Academic Class</label>
                            <select value={classApplied} onChange={(e) => setClassApplied(e.target.value)} className="w-full border p-2.5 rounded text-sm bg-white focus:outline-school-navy font-medium">
                                {availableClasses.map((cls) => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button type="submit" disabled={processing} className="w-full bg-school-navy text-white text-xs font-bold uppercase py-3 rounded tracking-wider shadow hover:bg-school-navy/90 transition">
                        {processing ? 'Processing Server Route...' : isSignUp ? 'Create Application Account' : 'Authenticate Account'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="text-xs text-school-gold hover:underline font-semibold">
                        {isSignUp ? 'Already registered? Log in here' : 'Fresh Student? Register for Admissions Account here'}
                    </button>
                </div>
            </div>
        </div>
    );
}