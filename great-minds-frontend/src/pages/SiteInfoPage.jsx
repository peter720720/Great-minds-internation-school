import React from 'react';

export default function SiteInfoPage({ title, description }) {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-school-navy tracking-tight">{title}</h2>
                <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-2">{description}</p>
            </div>
            <div className="text-center py-20 bg-white rounded shadow-sm border border-gray-200 max-w-2xl mx-auto p-6">
                <p className="text-sm text-gray-600">More information will be available here soon.</p>
            </div>
        </div>
    );
}