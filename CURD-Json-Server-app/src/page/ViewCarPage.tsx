import { useEffect, useState } from "react";
import type { carFetchType } from "../utils/globle";
import { deleteCar, fetchAllCars } from "../Services/ProductService";
import { useNavigate } from "react-router";

export default function ViewProductPage() {
    const [allProducts, setAllProduct] = useState<carFetchType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const navigate = useNavigate();

    // Logic
    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const currentProducts = allProducts.slice(startIndex, startIndex + itemPerPage);

    useEffect(() => {
        getAllProducts();   
    }, []);

    const getAllProducts = async () => {
        const allProductData = await fetchAllCars();
        setAllProduct(allProductData);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to remove this vehicle?")) {
            await deleteCar(id);
            getAllProducts();
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Fleet Inventory</h1>
                    <p className="text-slate-500 mt-2 font-medium">Monitoring {totalItems} active vehicles in the DriveWay catalog.</p>
                </div>
                <button 
                    onClick={() => navigate('/add-car')}
                    className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                >
                    + Register Vehicle
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ref.</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Vehicle Details</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Daily Rate</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentProducts.map((product, index) => (
                                <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-4 text-xs font-bold text-slate-300">#{startIndex + index + 1}</td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.p_image} alt="" className="w-14 h-10 rounded-xl object-cover shadow-sm border border-slate-100" />
                                            <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{product.p_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600">
                                            {product.p_category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 font-black text-slate-900">₹{Number(product.p_price).toLocaleString()}</td>
                                    <td className="px-8 py-4">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => navigate(`/edit-car/${product.id}`)} className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Show</span>
                    <select 
                        value={itemPerPage}
                        onChange={(e) => { setItemPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 ring-indigo-100"
                    >
                        {[10, 20, 50].map(val => <option key={val} value={val}>{val} Vehicles</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                                    currentPage === i + 1 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                    : 'bg-white text-slate-400 border border-slate-100 hover:border-indigo-200'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}