import React from 'react';
import { Link } from 'react-router-dom';

// Ensure the 'default' keyword is added right here
export default function Footer() {
    return (
        <footer className="bg-school-navy text-gray-300 pt-12 pb-6 px-4 md:px-8 border-t-4 border-school-gold">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 className="text-white font-extrabold text-xl uppercase tracking-wider mb-4">Great Mind Int'l</h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Nurturing exemplary children through values, strong character development, and a joyful learning experience that prepares them for future success.
                    </p>
                </div>
                <div>
                    <h4 className="text-school-gold font-bold mb-4 text-base uppercase tracking-widest">Quick Portals</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/applicants" className="hover:text-white transition">Admissions Application</Link></li>
                        <li><a href="http://greatminds.edu.ng" className="hover:text-white transition">Great Mind Student Portal ↗</a></li>
                        <li><Link to="/staff-portal" className="hover:text-white transition">Staff Workspace Registry</Link></li>
                        <li><Link to="/admin-login" className="hover:text-white transition">Administrative Portal Link</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-school-gold font-bold mb-4 text-base uppercase tracking-widest">Academics</h4>
                    <ul className="space-y-2 text-sm">
                        <li><span className="text-gray-400">Primary Foundations</span></li>
                        <li><span className="text-gray-400">Junior Secondary School (JSS)</span></li>
                        <li><span className="text-gray-400">Senior Secondary School (SSS)</span></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-school-gold font-bold mb-4 text-base uppercase tracking-widest">Campus Address</h4>
                    <p className="text-sm text-gray-400 leading-loose">
                        Great Mind International School Main Campus Cluster,<br />
                        Federal Capital Territory / Lagos Delivery Corridors,<br />
                        Nigeria.
                    </p>
                </div>
            </div>
            <div className="border-t border-school-navyLight pt-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Great Mind International School. All Rights Reserved. Setup mapped with React Node Infrastructure.
            </div>
        </footer>
    );
}
