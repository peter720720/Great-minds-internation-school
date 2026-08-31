import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Image, Mail, LayoutDashboard, LogOut, Upload, Check, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
    const { logout } = useAuth();
    const [view, setView] = useState('metrics'); // View toggles: metrics, upload, messages
    const [metrics, setMetrics] = useState({ totalApplicants: 0, paidApplications: 0, unreadMessages: 0 });
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchDashboardData();
    }, [view]);

    const fetchDashboardData = async () => {
        try {
            const metricRes = await api.get('/admin/admin-dashboard');
            setMetrics(metricRes.data.metrics);
            
            if (view === 'messages') {
                const msgRes = await api.get('/admin/messages');
                setMessages(msgRes.data);
            }
        } catch (err) {
            console.error('Failed to load dashboard parameters.', err);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!imageFile) return setFeedback({ type: 'error', text: 'Select an image before submitting.' });

        setUploading(true);
        setFeedback({ type: '', text: '' });
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', imageFile);

        try {
            await api.post('/admin/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFeedback({ type: 'success', text: 'Image successfully uploaded to the public website!' });
            setTitle('');
            setImageFile(null);
        } catch (err) {
            setFeedback({ type: 'error', text: err.response?.data?.message || 'Media file upload failed.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Admin Side Menu Controls */}
            <aside className="w-full md:w-64 bg-school-navy text-white flex flex-col p-6 gap-2">
                <div className="mb-6">
                    <h2 className="font-extrabold text-md tracking-wider uppercase text-school-gold">GM Admin Desk</h2>
                    <p className="text-[10px] text-gray-400">Great Mind International School</p>
                </div>
                
                <button onClick={() => setView('metrics')} className={`flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider rounded transition ${view === 'metrics' ? 'bg-school-gold text-school-navy' : 'hover:bg-school-navyLight'}`}>
                    <LayoutDashboard size={16} /> Overview
                </button>
                <button onClick={() => setView('upload')} className={`flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider rounded transition ${view === 'upload' ? 'bg-school-gold text-school-navy' : 'hover:bg-school-navyLight'}`}>
                    <Upload size={16} /> Media Upload
                </button>
                <button onClick={() => setView('messages')} className={`flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider rounded transition ${view === 'messages' ? 'bg-school-gold text-school-navy' : 'hover:bg-school-navyLight'}`}>
                    <Mail size={16} /> Contact Mail ({metrics.unreadMessages})
                </button>
                
                <button onClick={logout} className="mt-auto flex items-center gap-3 p-3 text-xs uppercase font-bold tracking-wider text-red-400 hover:bg-red-950/40 rounded transition">
                    <LogOut size={16} /> Terminate Session
                </button>
            </aside>

            {/* Core Workspace View */}
            <main className="flex-grow p-6 md:p-12">
                {view === 'metrics' && (
                    <div>
                        <h3 className="text-xl font-bold uppercase text-school-navy mb-6">System Analytics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded shadow-sm border-l-4 border-school-navy">
                                <p className="text-xs text-gray-400 font-bold uppercase">Total Registered Applicants</p>
                                <p className="text-3xl font-extrabold text-school-navy mt-2">{metrics.totalApplicants}</p>
                            </div>
                            <div className="bg-white p-6 rounded shadow-sm border-l-4 border-school-gold">
                                <p className="text-xs text-gray-400 font-bold uppercase">Paid Application Forms</p>
                                <p className="text-3xl font-extrabold text-school-navy mt-2">{metrics.paidApplications}</p>
                            </div>
                            <div className="bg-white p-6 rounded shadow-sm border-l-4 border-gray-400">
                                <p className="text-xs text-gray-400 font-bold uppercase">Unread Inquiry Messages</p>
                                <p className="text-3xl font-extrabold text-school-navy mt-2">{metrics.unreadMessages}</p>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'upload' && (
                    <div className="max-w-xl bg-white p-8 rounded shadow-sm">
                        <h3 className="text-lg font-bold uppercase text-school-navy mb-4">Upload Event Image to Gallery</h3>
                        {feedback.text && <div className={`p-3 text-xs font-bold rounded mb-4 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{feedback.text}</div>}
                        
                        <form onSubmit={handleImageUpload} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image Captioned Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2.5 rounded text-sm focus:outline-school-navy" placeholder="e.g., Interhouse Sports 2026" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select File (.png, .jpg, .jpeg)</label>
                                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-school-cream file:text-school-navy hover:file:bg-gray-200" accept="image/*" required />
                            </div>
                            <button type="submit" disabled={uploading} className="bg-school-navy text-white text-xs font-bold uppercase px-6 py-3 rounded tracking-wider shadow hover:bg-school-navyLight disabled:bg-gray-400">
                                {uploading ? 'Processing Assets...' : 'Broadcast to Website Gallery'}
                            </button>
                        </form>
                    </div>
                )}

                {view === 'messages' && (
                    <div>
                        <h3 className="text-lg font-bold uppercase text-school-navy mb-4">Incoming Contact Requests</h3>
                        <div className="space-y-4">
                            {messages.length === 0 ? (
                                <p className="text-xs text-gray-400 italic">No contact entries logged yet.</p>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg._id} className="bg-white p-6 rounded shadow-sm border-t-2 border-gray-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-sm text-school-navy">{msg.subject}</h4>
                                                <p className="text-xs text-gray-400">From: {msg.name} ({msg.email})</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-mono">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed mt-2">{msg.message}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
