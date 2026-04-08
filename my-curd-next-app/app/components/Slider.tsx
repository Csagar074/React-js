// components/Slider.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';

type Slide = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    cta: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Discover Your Next Adventure",
        subtitle: "New Arrivals 2026",
        description: "Explore thousands of new titles across fiction, science, and history. Your journey into a world of knowledge starts here.",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
        cta: "Browse Collection"
    },
    {
        id: 2,
        title: "Digital Library at Your Fingertips",
        subtitle: "E-Books & Audiobooks",
        description: "Access our vast digital archive from anywhere in the world. Borrow e-books and listen to audiobooks on any device.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        cta: "Explore Digital"
    },
    {
        id: 3,
        title: "A Community of Readers",
        subtitle: "Join the Book Club",
        description: "Connect with fellow book lovers, participate in monthly discussions, and attend exclusive author events.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
        cta: "Join Now"
    }
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-slate-900">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        index === currentSlide
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                    }`}
                >
                    {/* Overlay with Gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                    
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="container mx-auto px-8 md:px-16">
                            <div className="max-w-2xl text-white">
                                <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-widest text-sm mb-4">
                                    <BookOpen size={16} />
                                    {slide.subtitle}
                                </span>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                                    {slide.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-4">
                                    <Link 
                                        href="/catalog" 
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2"
                                    >
                                        <Search size={18} />
                                        {slide.cta}
                                    </Link>
                                    <button className="border border-white/30 hover:bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <div className="absolute bottom-10 right-10 z-30 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="bg-white/10 backdrop-blur-md hover:bg-emerald-600 border border-white/20 text-white p-3 rounded-full transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white/10 backdrop-blur-md hover:bg-emerald-600 border border-white/20 text-white p-3 rounded-full transition-all"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                            idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-white/40'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}