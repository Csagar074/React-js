import { useEffect, useState } from "react";
import { fetchAllCars } from "../Services/ProductService";
import type { carFetchType } from "../utils/globle";
import { Link } from "react-router";

export default function HomePage() {
    const [allVehicles, setAllVehicles] = useState<carFetchType[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("All");

    useEffect(() => {
        getVehicleData();
    }, []);

    useEffect(() => {
        const categories = new Set(allVehicles.map((v) => v.p_category));
        setAllCategories(["All", ...Array.from(categories)]);
    }, [allVehicles]);

    const getVehicleData = async () => {
        const data = await fetchAllCars();
        setAllVehicles(data);
    };

    const filteredVehicles = (filterCategory === "All")
        ? allVehicles
        : allVehicles.filter((v) => v.p_category === filterCategory);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200 mb-10 overflow-hidden relative">
                <div className="max-w-7xl mx-auto py-16 px-4 text-center relative z-10">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-6xl">
                        Premium <span className="text-indigo-600">DriveWay</span> Fleet
                    </h1>
                    <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
                        Discover the perfect ride for your next journey. From electric city cars to luxury SUVs, 
                        find the vehicle that fits your style.
                    </p>
                    
                    {/* Category Filter Bar */}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        {allCategories.map((category, index) => (
                            <button 
                                key={index} 
                                onClick={() => setFilterCategory(category)} 
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${
                                    filterCategory === category 
                                    ? "bg-indigo-600 text-white shadow-indigo-200 scale-105" 
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vehicle Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredVehicles.map((vehicle, index) => (
                        <Link key={vehicle.id || index} to={`product-detail/${vehicle.id}`}>
                            <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full">
                                
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                    <img
                                        src={vehicle.p_image}
                                        alt={vehicle.p_name}
                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/80 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-tighter px-3 py-1.5 rounded-full shadow-sm border border-white/50">
                                            {vehicle.p_category}
                                        </span>
                                    </div>
                                </div>

                                {/* Vehicle Info */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {vehicle.p_name}
                                    </h2>
                                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
                                        {vehicle.p_description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Daily Rate</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-black text-slate-900">₹{Number(vehicle.p_price).toLocaleString()}</span>
                                                <span className="text-slate-400 text-xs font-medium">/day</span>
                                            </div>
                                        </div>

                                        {/* Rental Action Button */}
                                        <button className="bg-slate-900 group-hover:bg-indigo-600 text-white p-3 rounded-2xl shadow-lg transition-all duration-300 active:scale-90">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredVehicles.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No vehicles found</h3>
                        <p className="text-slate-500 mt-2">Try selecting a different category from our garage.</p>
                    </div>
                )}
            </div>
        </div>
    );
}