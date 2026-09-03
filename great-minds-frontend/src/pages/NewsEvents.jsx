import React, { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import api from '../utils/api';

export default function NewsEvents() {
    const [newsEvents, setNewsEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsEvents = async () => {
            try {
                const res = await api.get('/public/news-events');
                setNewsEvents(res.data);
            } catch (err) {
                console.error('Error reading school news and events.', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsEvents();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <CalendarDays size={36} className="text-school-gold mx-auto mb-2" />
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-school-navy tracking-tight">News &amp; Events</h2>
                <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-2">
                    Follow the latest activities, announcements, celebrations, and important school events.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xs font-bold uppercase text-gray-400">Loading News &amp; Events...</div>
            ) : newsEvents.length === 0 ? (
                <div className="text-center py-20 bg-white rounded shadow-sm border border-gray-200 max-w-md mx-auto p-6">
                    <CalendarDays size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-school-navy">No New Events Yet</p>
                    <p className="text-xs text-gray-400 mt-1">New school announcements and events will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {newsEvents.map((newsEvent) => (
                        <article key={newsEvent._id} className="bg-white p-6 rounded shadow-sm border-t-4 border-school-gold">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase font-bold mb-3">
                                <CalendarDays size={14} />
                                {new Date(newsEvent.createdAt).toLocaleDateString()}
                            </div>
                            <h3 className="text-lg font-bold uppercase text-school-navy mb-2">{newsEvent.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{newsEvent.content}</p>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}