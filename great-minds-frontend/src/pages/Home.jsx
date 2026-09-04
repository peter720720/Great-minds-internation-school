import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

// Ensure the 'default' keyword is added right here
export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const sliderImages = [
        {
            image: "/slider-bg.jpg",
            title: <>Nurturing <span className="text-school-gold">Great Minds</span> For Global Impact</>,
            description: "A vibrant learning environment built for academic excellence, digital growth, and strong character development."
        },
        {
            image: "/Assembly.png",
            title: <>Building <span className="text-school-gold">Confident Leaders</span> For Tomorrow</>,
            description: "Empowering students to learn, lead, and succeed with courage, discipline, and purpose."
        },
        {
            image: "/classroom.png",
            title: <>Inspiring <span className="text-school-gold">Curious Learners</span> Every Day</>,
            description: "A focused classroom where bright minds explore ideas, build knowledge, and grow together."
        },
        {
            image: "/playing-ball.png",
            title: <>Growing Through <span className="text-school-gold">Teamwork</span> And Play</>,
            description: "Developing fitness, friendship, and confidence through active outdoor learning and play."
        },
        {
            image: "/playing.png",
            title: <>Excellence In <span className="text-school-gold">Every Challenge</span></>,
            description: "Building teamwork, discipline, and determination through sport and shared achievement."
        }
    ];
    const indicatorDots = [...sliderImages, sliderImages[0]];
    const activeIndicatorIndex = currentSlide === sliderImages.length - 1 ? sliderImages.length : currentSlide;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [sliderImages.length]);

    return (
        <div className="w-full">
            {/* CAROUSEL SLIDER HERO COMPONENT */}
            <div className="relative h-[600px] md:h-[550px] bg-black overflow-hidden">
                <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {sliderImages.map((slide, index) => (
                        <div key={index} className="min-w-full h-full relative" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black/50" />
                        </div>
                    ))}
                </div>
                
                {/* Hero Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center text-center text-white z-10">
                    <div className="w-full rounded-none border-y border-white/25 bg-black/35 px-3 py-3 backdrop-blur-md md:flex md:items-center md:justify-between md:gap-8 md:px-8 md:py-6">
                        <div className="md:text-left">
                            <h2 className="text-lg md:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 md:mb-4 max-w-3xl mx-auto md:mx-0">
                                {sliderImages[currentSlide].title}
                            </h2>
                            <p className="max-w-2xl mx-auto md:mx-0 text-xs md:text-base text-gray-200 mb-3 md:mb-0 font-medium">
                                {sliderImages[currentSlide].description}
                            </p>
                        </div>
                        <div className="flex flex-row justify-center gap-2 sm:gap-4 w-full max-w-none mx-auto md:w-auto md:flex-none md:mx-0">
                            <Link to="/applicants" className="flex-1 bg-school-gold text-school-navy font-bold px-2 sm:px-6 py-2.5 md:py-3 rounded hover:bg-school-goldHover transition text-[10px] sm:text-sm uppercase text-center">
                                Apply for Admission
                            </Link>
                            <Link to="/about-us" className="flex-1 border-2 border-white text-white font-bold px-2 sm:px-6 py-2.5 md:py-3 rounded hover:bg-white hover:text-school-navy transition text-[10px] sm:text-sm uppercase text-center">
                                Explore Campus
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slider Controls */}
                <button onClick={() => setCurrentSlide(currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-school-gold transition z-20">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => setCurrentSlide((currentSlide + 1) % sliderImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-school-gold transition z-20">
                    <ChevronRight size={20} />
                </button>

                {/* Image indicators */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 z-20">
                    {indicatorDots.map((_, index) => {
                        const isActive = index === activeIndicatorIndex;

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentSlide(index % sliderImages.length)}
                                className={`w-2.5 h-2.5 rounded-full border border-white transition-all ${isActive ? 'bg-school-gold w-8' : 'bg-white/70'}`}
                                aria-label={`Go to slide ${index % sliderImages.length + 1}`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* CORE METRICS SECTION */}
            <section className="max-w-7xl mx-auto py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded shadow-sm border-t-4 border-school-navy flex flex-col items-center text-center">
                    <BookOpen size={40} className="text-school-gold mb-4" />
                    <h3 className="font-bold text-lg mb-2 uppercase text-school-navy">Excellent Academy</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Integrated structural tracking models mapped specifically to drive localized and global curriculum milestones.</p>
                </div>
                <div className="bg-white p-8 rounded shadow-sm border-t-4 border-school-gold flex flex-col items-center text-center">
                    <ShieldCheck size={40} className="text-school-navy mb-4" />
                    <h3 className="font-bold text-lg mb-2 uppercase text-school-navy">Safe Frameworks</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Advanced data isolation matrices securing every transactional database element and personal profile ledger.</p>
                </div>
                <div className="bg-white p-8 rounded shadow-sm border-t-4 border-school-navy flex flex-col items-center text-center">
                    <Award size={40} className="text-school-gold mb-4" />
                    <h3 className="font-bold text-lg mb-2 uppercase text-school-navy">Digital Integration</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Future-ready portals enabling streamlined operations, payment logs, and unified computer-based test channels.</p>
                </div>
            </section>
        </div>
    );
}
