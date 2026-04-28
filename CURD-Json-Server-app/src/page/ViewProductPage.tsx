import { useEffect, useState } from "react";
import type { productFetchType } from "../utils/globle";
import { deleteProduct, fetchAllProducts } from "../Services/ProductService";
import { useNavigate } from "react-router";

export default function ViewProductPage() {
    const [allProducts, setAllProduct] = useState<productFetchType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState(10);

    const navigate = useNavigate();

    const totalItems = allProducts.length; // totalItems = 51
    const totalPages = Math.ceil(totalItems / itemPerPage); // totalPages = 51 / 10 = 5.1 = 6

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;


    console.log("Total Item : ", totalItems);
    console.log("Total Pages : ", totalPages);
    console.log("Start Index : ", startIndex); // 0
    console.log("End Index : ", endIndex); // 10

    const currentProducts = allProducts.slice(startIndex, endIndex);

    console.log("Current Products : ", currentProducts);
    console.log("Total : ", [...Array(totalPages)]); // []



    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const allProductData = await fetchAllProducts();
        setAllProduct(allProductData);
    };

    return (
        <div className="container mx-auto py-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Product Manager</h1>
                    <p className="text-zinc-400 text-sm">Manage your e-commerce catalog and stock levels</p>
                </div>
                <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-700 shadow-sm">
                    <span className="text-zinc-400 text-sm">Total Products: </span>
                    <span className="font-bold text-orange-400">{currentProducts.length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-800 border-b border-zinc-700">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">No.</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Product</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Category</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Price</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400">Description</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <tr key={product.id || index} className="hover:bg-zinc-800/60 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.p_image}
                                                    alt={product.p_name}
                                                    className="w-12 h-12 rounded-lg object-cover bg-zinc-800 border border-zinc-700"
                                                />
                                                <span className="font-semibold text-zinc-100">{product.p_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                                {product.p_category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-zinc-200">
                                            ${Number(product.p_price).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-medium ${product.p_stock < 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {product.p_stock} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-zinc-500 max-w-[200px] truncate" title={product.p_description}>
                                                {product.p_description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => navigate(`/edit-product/${product.id}`)} className="p-2 text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all" title="Edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-zinc-500 italic">
                                        No products found in the inventory.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-1">
                <button onClick={() => { }} className={`ml-1 px-3 py-1 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-800`}>{"<"}</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button onClick={() => setCurrentPage(index + 1)} className={`ml-1 px-3 py-1 border rounded ${(currentPage === index + 1) ? 'bg-orange-500 text-white border-orange-500' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}`}>{index + 1}</button>
                ))}
                <button onClick={() => { }} className={`ml-1 px-3 py-1 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-800`}>{">"}</button>

                <select onChange={(event) => {
                    setItemPerPage(Number(event.target.value));
                    setCurrentPage(1);
                }} className="ml-3 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded px-2 py-1 text-sm">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    );
}