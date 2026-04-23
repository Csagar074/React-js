import { useState } from "react";
import type { carType } from "../utils/globle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addCar } from "../Services/ProductService";

export default function AddVehiclePage() {
    const navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState<carType>({
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    // Updated categories for the DriveWay project
    const carCategories = ["SUV", "Sedan", "Luxury", "Electric", "Sports", "Off-Road"];

    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400";

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setVehicleData(prev => ({ 
            ...prev, 
            [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value 
        }));
    };

    const onHandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validation
        if (!vehicleData.p_name || vehicleData.p_price <= 0 || vehicleData.p_stock <= 0 || !vehicleData.p_image || !vehicleData.p_category || !vehicleData.p_description) {
            toast.error("Please fill in all vehicle details correctly.");
            return;
        }

        const status = await addCar(vehicleData);

        if (status) {
            toast.success("Vehicle added to the fleet!");
            setVehicleData({ p_name: "", p_price: 0, p_stock: 0, p_image: "", p_category: "", p_description: "" });
        } else {
            toast.error("Failed to add vehicle. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            {/* Page Header */}
            <div className="mb-8 border-b border-slate-100 pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Add New Vehicle
                </h1>
                <p className="mt-2 text-slate-500">
                    Expand the DriveWay fleet by adding a new car model to the inventory.
                </p>
            </div>

            {/* Form Card */}
            <form className="space-y-6" onSubmit={onHandleSubmit}>
                {/* Vehicle Name */}
                <div>
                    <label className={labelClasses}>Vehicle Model Name</label>
                    <input
                        type="text"
                        name="p_name"
                        value={vehicleData.p_name}
                        onChange={onHandleChange}
                        placeholder="e.g. Tesla Model S"
                        className={inputClasses}
                    />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Rental Price (per day)</label>
                        <input
                            type="number"
                            name="p_price"
                            value={vehicleData.p_price || ""}
                            onChange={onHandleChange}
                            placeholder="e.g. 12000"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Available Fleet Count</label>
                        <input
                            type="number"
                            name="p_stock"
                            value={vehicleData.p_stock || ""}
                            onChange={onHandleChange}
                            placeholder="Number of units"
                            className={inputClasses}
                        />
                    </div>
                </div>

                {/* Image URL & Category */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Vehicle Image URL</label>
                        <input
                            type="text"
                            name="p_image"
                            value={vehicleData.p_image}
                            onChange={onHandleChange}
                            placeholder="https://images.unsplash.com/..."
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Vehicle Type</label>
                        <div className="relative">
                            <select 
                                name="p_category" 
                                value={vehicleData.p_category}
                                onChange={onHandleChange} 
                                className={`${inputClasses} appearance-none cursor-pointer`}
                            >
                                <option value="">Select a category</option>
                                {carCategories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className={labelClasses}>Specifications & Features</label>
                    <textarea
                        name="p_description"
                        rows={4}
                        value={vehicleData.p_description}
                        onChange={onHandleChange}
                        placeholder="Detail the engine, range, transmission, and top features..."
                        className={`${inputClasses} resize-none`}
                    ></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
                    >
                        Register Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
}