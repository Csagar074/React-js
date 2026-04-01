"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl"
            : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                  Cars
                </h2>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contect">Contact</NavLink>
              <NavLink href="/about/flutter">Flutter</NavLink>
              
              {/* CTA Button */}
              <Link
                href="/get-started"
                className="ml-4 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-200 hover:bg-white/10"
                aria-label="Toggle menu"
              >
                <div className="absolute w-6 h-6">
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "rotate-45 translate-y-0"
                        : "-translate-y-2"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "-rotate-45 translate-y-0"
                        : "translate-y-2"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            } overflow-hidden`}
          >
            <div className="py-4 border-t border-white/10">
              <div className="flex flex-col space-y-1">
                <MobileNavLink
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </MobileNavLink>
                <MobileNavLink
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </MobileNavLink>
                <MobileNavLink
                  href="/about/flutter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Flutter
                </MobileNavLink>
                
                {/* Mobile CTA Button */}
                <Link
                  href="/get-started"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, children }: any) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 group overflow-hidden"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, onClick, children }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-all duration-200 overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
    </Link>
  );
}   