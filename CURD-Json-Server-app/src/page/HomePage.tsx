import { useEffect, useState } from "react";
import { fetchAllProducts } from "../Services/ProductService";
import type { productFetchType } from "../utils/global";
import { Link } from "react-router";

export default function HomePage() {
    const [allProducts, setAllProducts] = useState<productFetchType[]>([]);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>("All");

    useEffect(() => {
        getAllProductData();
    }, []);

    useEffect(() => {
        const categories = new Set(allProducts.map((product) => product.p_category));
        setAllCategories(["All", ...Array.from(categories)]);
    }, [allProducts]);

    const getAllProductData = async () => {
        const allProductData = await fetchAllProducts();
        setAllProducts(allProductData);
    };

    const filterProducts = (filterCategory === "All")
        ? allProducts
        : allProducts.filter((product) => product.p_category === filterCategory);

    return (
        <div className="bg-zinc-950 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="bg-zinc-900 border-b border-zinc-800 mb-10">
                <div className="max-w-7xl mx-auto py-12 px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Fleet <span className="text-orange-400">Inventory</span>
                    </h1>
                    <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
                        Explore our premium collection of vehicles ready for the road.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-wrap gap-2">
                {allCategories.map((category, index) => (
                    <button 
                        key={index} 
                        onClick={() => setFilterCategory(category)} 
                        className={`${(filterCategory === category) ? "bg-orange-500 shadow-orange-500/20" : "bg-zinc-800 hover:bg-zinc-700"} text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filterProducts.map((product) => (
                        <Link key={product.id} to={`/product-detail/${product.id}`} className="group">
                            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 overflow-hidden flex flex-col h-full">
                                <div className="relative aspect-square overflow-hidden bg-zinc-800">
                                    <img
                                        src={product.p_image}
                                        alt={product.p_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-zinc-900/90 backdrop-blur-sm text-orange-400 text-[10px] font-bold uppercase px-2 py-1 rounded-md border border-zinc-700">
                                            {product.p_category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <h2 className="text-lg font-bold text-zinc-100 line-clamp-1 group-hover:text-orange-400 transition-colors mb-2">
                                        {product.p_name}
                                    </h2>
                                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4 flex-grow italic">
                                        {product.p_description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-500 uppercase font-black">Daily Rate</span>
                                            <span className="text-xl font-black text-white">₹{Number(product.p_price).toLocaleString()}</span>
                                        </div>
                                        <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-orange-500 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filterProducts.length === 0 && (
                    <div className="text-center py-20 text-zinc-500 font-medium">
                        No vehicles found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}