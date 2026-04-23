import { NavLink } from "react-router";

export default function Header() {
    return (
        <>
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo Section */}
                        <div className="flex items-center gap-8">
                            <NavLink to="/" className="flex items-center gap-2 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-black text-xl italic">D</span>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                                    Drive<span className="text-indigo-600">Way</span>
                                </span>
                            </NavLink>

                            {/* Navigation NavLinks */}
                            <ul className="flex items-center gap-1">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => 
                                            `rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                                                isActive ? "text-indigo-600 bg-slate-100" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/view-car"
                                        className={({ isActive }) => 
                                            `rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                                                isActive ? "text-indigo-600 bg-slate-100" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                            }`
                                        }
                                    >
                                        Fleet
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center">
                            <NavLink
                                to="/add-car"
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:ring-4 hover:ring-indigo-50 transition-all active:scale-95"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Vehicle</span>
                            </NavLink>
                        </div>

                    </div>
                </nav>
            </header>
        </>
    );
}