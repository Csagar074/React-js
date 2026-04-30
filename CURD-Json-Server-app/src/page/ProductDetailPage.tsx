import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchSingleProduct } from "../Services/ProductService";
import type { productFetchType } from "../utils/globle";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<productFetchType | null>(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productId) {
            getSingleProduct();
        }
    }, [productId]);

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        setProductData(data);
    };

    if (!productData) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                {/* Back Link */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-8 flex items-center text-sm font-bold text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-widest"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Explore Fleet
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Media */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800">
                            <img src={productData.p_image} alt="" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                        <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">{productData.p_category}</span>
                        <h1 className="text-5xl font-black text-white mb-6 leading-tight">{productData.p_name}</h1>
                        
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-black text-white">₹{Number(productData.p_price).toLocaleString()}</span>
                            <span className="text-zinc-500 font-bold">/ per day</span>
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                            {productData.p_description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                                onClick={() => setShowCartModal(true)}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                            >
                                Book Now
                            </button>
                            <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-black py-5 rounded-2xl border border-zinc-700 transition-all">
                                Save to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Isolated Cart Modal */}
            {showCartModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" onClick={() => setShowCartModal(false)}></div>
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-white">{productData.p_name}</h2>
                                    <p className="text-zinc-500 text-sm font-bold">Review your selection</p>
                                </div>
                                <button onClick={() => setShowCartModal(false)} className="text-zinc-500 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                                    <span className="text-zinc-400 font-bold text-sm uppercase">Quantity</span>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold hover:bg-orange-500 transition-colors">-</button>
                                        <span className="text-white font-black w-4 text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(q => Math.min(productData.p_stock, q + 1))} className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold hover:bg-orange-500 transition-colors">+</button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4">
                                    <span className="text-zinc-500 font-bold">Total Estimate</span>
                                    <span className="text-3xl font-black text-orange-500">₹{(productData.p_price * quantity).toLocaleString()}</span>
                                </div>

                                <button onClick={() => setShowCartModal(false)} className="w-full bg-white text-zinc-900 font-black py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all">
                                    Confirm Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}