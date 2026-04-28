import { useEffect, useState } from "react";
import { type productFetchType } from "../utils/globle";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleProduct, updateProduct } from "../Services/ProductService";

export default function EditProductPage() {

    const { productId } = useParams();
    const navigate = useNavigate();


    const [productData, setProductData] = useState<productFetchType>({
        id: "",
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "abc",
        p_category: "",
        p_description: "",
    });

    const productCategory = ["Electronic", "Home & Living", "Sports", "Fashion"];

    // Shared Tailwind classes for consistent styling
    const labelClasses = "block text-sm font-semibold text-zinc-300 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 transition-all focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-zinc-500";

    useEffect(() => {
        if (productId) {
            getSingleProductData();
        }
    }, [productId]);

    async function getSingleProductData() {
        const data = await fetchSingleProduct(productId || "");

        setProductData(data);
    }

    const onHandleChange = (event: any) => {
        const { name, value } = event.target;

        setProductData(prev => ({ ...prev, [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value }));
    }

    const onHandleSubmit = async (event: any) => {
        event.preventDefault();

        if (!productData.p_name || productData.p_price === 0 || productData.p_stock === 0 || !productData.p_image || !productData.p_category || !productData.p_description) {
            toast.error("All filds are required..");
            return;
        }

        console.log("Product Data : ", productData);

        // update product

        const status = await updateProduct(productData);

        if (status) {
            navigate('/view-product');
        }

    }
    return (
        <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 border-b border-zinc-800 pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Update Product
                </h1>
                <p className="mt-2 text-zinc-400">
                    Modify the details below to update this product in your e-commerce store.
                </p>
            </div>

            {/* Form Card */}
            <form className="space-y-6" onSubmit={onHandleSubmit}>
                {/* Row 1: Product Name */}
                <div>
                    <label className={labelClasses}>Product Name</label>
                    <input
                        type="text"
                        name="p_name"
                        value={productData.p_name}
                        onChange={onHandleChange}
                        placeholder="e.g. Wireless Noise Cancelling Headphones"
                        className={inputClasses}
                    />
                </div>

                {/* Row 2: Price & Stock (Grid) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Price ($)</label>
                        <input
                            type="number"
                            name="p_price"
                            value={productData.p_price}
                            onChange={onHandleChange}
                            placeholder="0.00"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Product Stock</label>
                        <input
                            type="number"
                            name="p_stock"
                            value={productData.p_stock}
                            onChange={onHandleChange}
                            placeholder="Quantity available"
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Row 3: Image Link & Category (Grid) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Product Image URL</label>
                        <input
                            type="text"
                            name="p_image"
                            value={productData.p_image}
                            onChange={onHandleChange}
                            placeholder="https://images.com/product.jpg"
                            className={inputClasses}
                        />

                        <img src={productData.p_image} width={100} alt="" />
                    </div>
                    <div>
                        <label className={labelClasses}>Product Category</label>
                        <div className="relative">
                            <select name="p_category" value={productData.p_category} onChange={onHandleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                                <option value="">Select a category</option>
                                {productCategory.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            {/* Custom Chevron Icon for Select */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 4: Description */}
                <div>
                    <label className={labelClasses}>Product Description</label>
                    <textarea
                        name="p_description"
                        rows={4}
                        value={productData.p_description}
                        onChange={onHandleChange}
                        placeholder="Describe the product's features and benefits..."
                        className={`${inputClasses} resize-none`}
                    ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        className="px-6 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-orange-500 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
}