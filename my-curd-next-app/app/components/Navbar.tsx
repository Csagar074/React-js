"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function to close menu on mobile link click
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center space-x-2">
                <span className="text-2xl">📚</span>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-300">
                  LMS Pro
                </h2>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: "Home", path: "/" },
                { name: "Add Book", path: "/add-book" },
                { name: "View Book", path: "/view-book" },
                { name: "Members", path: "/members" },
                { name: "Reports", path: "/reports" },
              ].map((link) => (
                <Link
                  key={link.name}   
                  href={link.path}
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:bg-white/10 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-2 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700 bg-slate-900">
              <div className="flex flex-col space-y-2">
                {[
                  { name: "Dashboard", path: "/" },
                  { name: "Add New Book", path: "/add-book" },
                  { name: "View Book", path: "/view-Book" },
                  { name: "Manage Members", path: "/members" },
                  { name: "Settings", path: "/settings" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={closeMenu}
                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-emerald-600/20 rounded-lg font-medium transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
