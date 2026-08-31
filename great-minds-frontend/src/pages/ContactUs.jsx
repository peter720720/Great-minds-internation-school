import React, { useState } from 'react';
import api from '../utils/api';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', text: '' });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setFeedback({ type: '', text: '' });

        try {
            const res = await api.post('/public/contact-us', { name, email, subject, message });
            setFeedback({ type: 'success', text: res.data.message });
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (err) {
            setFeedback({ 
                type: 'error', 
                text: err.response?.data?.message || 'Unable to submit your message right now. Please try again later.' 
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-school-navy tracking-tight">Contact Us</h2>
                <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-2">
                    Have questions about admissions, fees, or events? Send us a message and our administrative team will reach out to you.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Anchor Info Column */}
                <div className="bg-school-navy text-white p-8 rounded shadow-md flex flex-col justify-between border-b-4 border-school-gold">
                    <div>
                        <h3 className="font-bold text-md uppercase tracking-wider text-school-gold mb-6">Campus Coordinates</h3>
                        <div className="space-y-6 text-xs text-gray-300">
                            <div className="flex items-start gap-4">
                                <MapPin size={18} className="text-school-gold shrink-0" />
                                <p className="leading-relaxed">Great Mind International School Main Cluster, Federal Capital Territory Corridor, Nigeria.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone size={18} className="text-school-gold shrink-0" />
                                <p>+234 800 GREATMINDS</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail size={18} className="text-school-gold shrink-0" />
                                <p>info@greatminds.edu.ng</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-school-navyLight text-[11px] text-gray-400">
                        Operational Desk Hours:<br />Monday – Friday, 8:00 AM – 4:00 PM
                    </div>
                </div>

                {/* Form Processing Interactive Column */}
                <div className="lg:col-span-2 bg-white p-8 rounded shadow-sm border-t-4 border-school-navy">
                    <h3 className="font-bold text-school-navy text-sm uppercase mb-6 tracking-wide">Send an Electronic Inquiry</h3>
                    
                    {feedback.text && (
                        <div className={`p-4 text-xs font-bold rounded mb-6 flex items-center gap-2 ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                            {feedback.type === 'success' && <CheckCircle2 size={16} />}
                            {feedback.text}
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Your Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2.5 rounded text-sm focus:outline-school-navy" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2.5 rounded text-sm focus:outline-school-navy" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Subject Header</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border p-2.5 rounded text-sm focus:outline-school-navy" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Detailed Message</label>
                            <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border p-2.5 rounded text-sm focus:outline-school-navy resize-none" required></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <button type="submit" disabled={processing} className="bg-school-navy text-white text-xs font-bold uppercase px-6 py-3 rounded tracking-wider shadow hover:bg-school-navyLight transition disabled:bg-gray-400 flex items-center gap-2">
                                <Send size={14} /> {processing ? 'Transmitting Data...' : 'Dispatch Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
