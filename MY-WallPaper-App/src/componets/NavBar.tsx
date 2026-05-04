import React from 'react';

type NavBarProps = {
    search: string;
    setSearch: (val: string) => void;
    onSearch: () => void;
};

export default function NavBar({ search, setSearch, onSearch }: NavBarProps) {
    return (
        <nav className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 sticky top-0 z-50 shadow-lg shadow-purple-500/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <a href="/" className="text-2xl font-black tracking-tight text-white">
                        Wall<span className="text-yellow-300">Scape</span>
                    </a>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        <a href="/" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold transition-all">Home</a>
                        <a href="/trending" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold transition-all">Trending</a>
                        <a href="/categories" className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold transition-all">Categories</a>
                    </div>

                    {/* Search Bar — single search */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                                placeholder="Search wallpapers..."
                                className="bg-white/15 text-white placeholder-white/60 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 text-sm w-48 lg:w-64 transition-all"
                            />
                            <svg className="w-4 h-4 text-white/60 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button
                            onClick={onSearch}
                            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-full text-sm transition-all active:scale-95 shadow-lg shadow-yellow-500/30"
                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}