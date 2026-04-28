import { NavLink } from "react-router";

export default function Header() {
    return <>
        {/* Navbar */}
        < header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800" >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center gap-8">
                        <NavLink to="/" className="flex items-center gap-2 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/30 group-hover:rotate-3 transition-transform">
                                <span className="text-white font-black text-xl italic">E</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                                E-Commerce PM
                            </span>
                        </NavLink>

                        {/* Navigation NavLinks */}
                        <ul className="flex items-center gap-1">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `rounded-md px-4 py-2 text-sm font-semibold ${isActive ? "text-orange-400 bg-zinc-800" : "text-zinc-400"}  hover:bg-zinc-800 hover:text-orange-400 transition-colors`}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/view-product"
                                    className={({ isActive }) => `rounded-md px-4 py-2 text-sm font-semibold ${isActive ? "text-orange-400 bg-zinc-800" : "text-zinc-400"}  hover:bg-zinc-800 hover:text-orange-400 transition-colors`}
                                >
                                    Manage Products
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center">
                        <NavLink
                            to="/add-product"
                            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-600 hover:ring-4 hover:ring-orange-500/20 transition-all active:scale-95"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Product</span>

                        </NavLink>
                    </div>

                </div>
            </nav>
        </header >
    </>
}