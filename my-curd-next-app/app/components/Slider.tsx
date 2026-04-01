"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; 

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Luxury Performance",
      subtitle: "Experience the thrill of ultimate driving",
      description: "Discover our collection of high-performance vehicles engineered for perfection",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Now",
      color: "from-red-600 to-orange-600"
    },
    {
      id: 2,
      title: "Electric Revolution",
      subtitle: "Drive the future today",
      description: "Zero emissions, maximum performance with our cutting-edge electric fleet",
      image: "https://images.unsplash.com/photo-1593941707882-7f0e0b4edc7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Discover Electric",
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      title: "Premium Comfort",
      subtitle: "Luxury redefined for modern travelers",
      description: "Experience unparalleled comfort with premium interiors and advanced features",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "View Models",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 4,
      title: "Adventure Ready",
      subtitle: "Conquer any terrain with confidence",
      description: "Built for adventure, designed for comfort - your ultimate companion",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Adventure",
      color: "from-green-600 to-emerald-600"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    })
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3 }
    }
  };

  return (
    <div 
      ref={sliderRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Container */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].color} opacity-20 z-10`}></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full"
                >
                  <span className="text-white text-sm font-semibold">Featured Vehicle</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
                >
                  {slides[currentIndex].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl md:text-2xl text-gray-200 mb-4"
                >
                  {slides[currentIndex].subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-gray-300 mb-8 text-lg"
                >
                  {slides[currentIndex].description}
                </motion.p>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 bg-gradient-to-r ${slides[currentIndex].color} text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300`}
                >
                  {slides[currentIndex].cta}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all duration-300 group"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all duration-300 group"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}></div>
            {currentIndex === index && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 -m-1 rounded-full bg-white/30"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-30 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full">
        <span className="text-white text-sm font-semibold">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 z-30 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
        style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
      ></div>

      {/* Auto-play Indicator */}
      <div className="absolute top-8 right-8 z-30">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 transition-all"
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}