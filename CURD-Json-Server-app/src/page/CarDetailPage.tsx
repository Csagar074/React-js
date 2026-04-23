import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAllCars, fetchSingleCar } from "../Services/ProductService";
import type { carFetchType } from "../utils/globle";

export default function ViewVehiclesPage() {
    const [vehicles, setVehicles] = useState<carFetchType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFleet();
    }, []);

    const loadFleet = async () => {
        const data = await fetchAllCars();
        setVehicles(data);
        setLoading(false);
    };

    if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Accessing Fleet Database...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Fleet Management</h1>
                    <p className="text-slate-500 mt-1">Review and manage your DriveWay vehicle inventory.</p>
                </div>
                <Link 
                    to="/add-product" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    + Add New Vehicle
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Vehicle</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Price/Day</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Availability</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {vehicles.map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={vehicle.p_image} 
                                                className="h-12 w-16 object-cover rounded-lg border border-slate-100 shadow-sm" 
                                                alt="" 
                                            />
                                            <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                                {vehicle.p_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                                            {vehicle.p_category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900">
                                        ₹{Number(vehicle.p_price).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2 w-2 rounded-full ${vehicle.p_stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                            <span className="text-sm font-semibold text-slate-600">{vehicle.p_stock} in fleet</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link 
                                                to={`/edit-product/${vehicle.id}`}
                                                className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
                                                title="Edit Vehicle"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button 
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Remove Vehicle"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}