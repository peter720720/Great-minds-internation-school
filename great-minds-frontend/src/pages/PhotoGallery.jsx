import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Camera, Calendar, Image as ImageIcon } from 'lucide-react';

export default function PhotoGallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGalleryContent = async () => {
            try {
                const res = await api.get('/public/gallery');
                setImages(res.data);
            } catch (err) {
                console.error('Error reading website images.', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGalleryContent();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <Camera size={36} className="text-school-gold mx-auto mb-2" />
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-school-navy tracking-tight">Photo Gallery</h2>
                <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto mt-1">
                    Visual records highlighting recent historical events, interhouse sports, laboratory operations, and awards.
                </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
                    <div className="w-8 h-8 border-4 border-school-navy border-t-school-gold rounded-full animate-spin" />
                    <p className="text-xs font-bold uppercase tracking-widest mt-2">Loading Media Grid...</p>
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20 bg-white rounded shadow-sm border border-gray-200 max-w-md mx-auto p-6">
                    <ImageIcon size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-school-navy">No Public Assets Dispatched Yet</p>
                    <p className="text-xs text-gray-400 mt-1">Images uploaded via the administrative master login panel will show up here automatically.</p>
                </div>
            ) : (
                /* Dynamic Masonry-Inspired Grid Configuration */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img) => (
                        <div key={img._id} className="bg-white rounded overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
                            <div className="relative overflow-hidden h-56 bg-gray-200">
                                <img 
                                    src={img.imageUrl} 
                                    alt={img.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4 bg-white border-t border-gray-50">
                                <h3 className="font-bold text-sm text-school-navy truncate capitalize">{img.title}</h3>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1.5 font-medium">
                                    <Calendar size={12} />
                                    <span>{new Date(img.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
