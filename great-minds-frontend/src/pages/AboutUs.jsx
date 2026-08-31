import React from 'react';
import { Award, Compass, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-school-navy tracking-tight">About Our Institution</h2>
                <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-2">
                    Discover our history, values, and educational approach built to develop confident learners and future-ready leaders.
                </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded shadow-sm border-b-4 border-school-navy text-center">
                    <Compass size={32} className="text-school-gold mx-auto mb-3" />
                    <h3 className="font-bold text-sm uppercase text-school-navy mb-2">Our Mission</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        To nurture exemplary children through fundamental character building, academic discipline, and complete digital integration frameworks.
                    </p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-b-4 border-school-gold text-center">
                    <Award size={32} className="text-school-navy mx-auto mb-3" />
                    <h3 className="font-bold text-sm uppercase text-school-navy mb-2">Our Vision</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        To stand as a premier educational ecosystem recognized globally for producing innovative thinkers ready to lead their generations.
                    </p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border-b-4 border-school-navy text-center">
                    <ShieldCheck size={32} className="text-school-gold mx-auto mb-3" />
                    <h3 className="font-bold text-sm uppercase text-school-navy mb-2">Core Integrity</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Upholding total transparency, database profile protection security, and reliable tracking metrics for every student record.
                    </p>
                </div>
            </div>

            {/* Narrative Component Block */}
            <div className="bg-white p-8 rounded shadow-sm border border-gray-100 leading-relaxed">
                <h3 className="font-extrabold text-md uppercase text-school-navy mb-4 border-b pb-2">Welcome to Great Mind International School</h3>
                <p className="text-xs text-gray-600 mb-4">
                    Founded with a clear focus on quality teaching, discipline, and strong values, Great Mind International School creates a safe and inspiring learning environment for every child.
                </p>
                <p className="text-xs text-gray-600">
                    Our school combines academic excellence, digital learning, and a strong community spirit to help students grow in confidence, character, and achievement.
                </p>
            </div>
        </div>
    );
}
