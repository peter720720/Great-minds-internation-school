import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, ChevronDown, Menu, X, GraduationCap, Users, ShieldCheck } from 'lucide-react';

// Make sure both 'export' and 'default' keywords are declared here
export default function DoubleNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();

    const handleDropdownToggle = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <div className="w-full sticky top-0 z-50 shadow-md">
            {/* FIRST NAVBAR LAYER: Contact & High-Tier Info */}
            <div className="bg-school-navy text-white text-sm py-2 px-4 md:px-8 flex justify-between items-center border-b border-school-navyLight">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1"><Phone size={14} className="text-school-gold" /> +234 800 GREATMINDS</span>
                    <span className="hidden sm:flex items-center gap-1"><Mail size={14} className="text-school-gold" /> info@greatminds.edu.ng</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/gallery" className="hover:text-school-gold transition">Photo Gallery</Link>
                    <span className="text-school-navyLight">|</span>
                    <Link to="/contact-us" className="hover:text-school-gold transition">Contact Us</Link>
                </div>
            </div>

            {/* SECOND NAVBAR LAYER: Core Navigation & Logo Branding */}
            <div className="bg-white text-school-navy px-4 md:px-8 py-3 flex justify-between items-center border-b border-gray-200">
                {/* Brand Logo & Name */}
                <Link to="/" className="flex items-center">
                    <img src="/school-logo.png" alt="Great Mind International School logo" className="h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6 font-semibold text-base">
                    <Link to="/" className="hover:text-school-gold transition">Home</Link>
                    <Link to="/about-us" className="hover:text-school-gold transition">About Us</Link>

                    {/* Academics Dropdown */}
                    <div className="relative group">
                        <button onClick={() => handleDropdownToggle('academics')} className="flex items-center gap-1 hover:text-school-gold transition text-base">
                            Academics <ChevronDown size={16} />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-xl hidden group-hover:block py-2">
                            <Link to="/academics/primary" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Primary Section</Link>
                            <Link to="/academics/secondary" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Secondary Section</Link>
                            <Link to="/academics/curriculum" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Our Curriculum</Link>
                        </div>
                    </div>

                    {/* Admissions Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-school-gold transition text-base">
                            Admissions <ChevronDown size={16} />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-xl hidden group-hover:block py-2">
                            <Link to="/admissions/guidelines" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Guidelines</Link>
                            <Link to="/admissions/fees-structure" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Fees Structure</Link>
                        </div>
                    </div>

                    {/* Students Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-school-gold transition text-base">
                            Students <ChevronDown size={16} />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-xl hidden group-hover:block py-2">
                            <Link to="/applicants" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold font-bold text-school-navy">Admission Application</Link>
                            <a href="http://greatminds.edu.ng" target="_blank" rel="noreferrer" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Great Mind Student Portal ↗</a>
                        </div>
                    </div>

                    {/* Staff Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-school-gold transition text-base">
                            Staff <ChevronDown size={16} />
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-xl hidden group-hover:block py-2">
                            <Link to="/staff-portal" className="block px-4 py-2 hover:bg-school-cream hover:text-school-gold">Staff Workspace Sign In</Link>
                        </div>
                    </div>

                    <Link to="/news" className="hover:text-school-gold transition text-base">News & Events</Link>
                </nav>

                {/* Apply Now Primary Action Trigger Button */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/applicants" className="bg-school-gold text-school-navy font-bold text-xs uppercase px-5 py-2.5 rounded hover:bg-school-goldHover transition tracking-wider shadow-sm">
                        Apply Now
                    </Link>
                </div>

                {/* Mobile Toggle Burger Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-school-navy">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div className="lg:hidden bg-white w-full border-b border-gray-200 py-4 px-4 flex flex-col gap-3 font-semibold shadow-inner">
                    <Link to="/" onClick={() => setIsOpen(false)} className="py-1">Home</Link>
                    <Link to="/about-us" onClick={() => setIsOpen(false)} className="py-1">About Us</Link>
                    <Link to="/applicants" onClick={() => setIsOpen(false)} className="py-1 text-school-gold">Admission Application Portal</Link>
                    <Link to="/staff-portal" onClick={() => setIsOpen(false)} className="py-1">Staff Access Portal</Link>
                    <Link to="/gallery" onClick={() => setIsOpen(false)} className="py-1">Photo Gallery</Link>
                    <Link to="/contact-us" onClick={() => setIsOpen(false)} className="py-1">Contact Us</Link>
                    <Link to="/applicants" onClick={() => setIsOpen(false)} className="bg-school-navy text-white text-center py-2.5 rounded mt-2">Apply Now</Link>
                </div>
            )}
        </div>
    );
}
