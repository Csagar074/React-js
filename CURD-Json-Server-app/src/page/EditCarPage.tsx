import { useEffect, useState } from "react";
import { type carFetchType } from "../utils/globle";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { fetchSingleCar, updateCar } from "../Services/ProductService";

export default function EditVehiclePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [vehicleData, setVehicleData] = useState<carFetchType>({
        id: "",
        p_name: "",
        p_price: 0,
        p_stock: 0,
        p_image: "",
        p_category: "",
        p_description: "",
    });

    const carCategories = ["SUV", "Sedan", "Luxury", "Electric", "Sports", "Off-Road"];

    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputClasses = "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 placeholder:text-slate-400";

    useEffect(() => {
        if (id) {
            getVehicleData();
        }
    }, [id]);

    async function getVehicleData() {
        try {
            const data = await fetchSingleCar(id || "");
            setVehicleData(data);
        } catch (error) {
            toast.error("Failed to load vehicle details.");
        } finally {
            setIsLoading(false);
        }
    }

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setVehicleData(prev => ({ 
            ...prev, 
            [name]: (name === 'p_price' || name === 'p_stock') ? Number(value) : value 
        }));
    };

    const onHandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!vehicleData.p_name || vehicleData.p_price <= 0 || !vehicleData.p_category) {
            toast.error("Please ensure all required fields are valid.");
            return;
        }

        const status = await updateCar(vehicleData);

        if (status) {
            toast.success("Vehicle updated successfully!");
            navigate('/view-car');
        }
    };

    if (isLoading) return <div className="text-center py-20 text-slate-500">Loading vehicle details...</div>;

    return (
        <div className="max-w-2xl mx-auto py-10">
            {/* Page Header */}
            <div className="mb-8 border-b border-slate-100 pb-5 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Edit Vehicle
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Update the specifications or pricing for the <span className="font-semibold text-slate-700">{vehicleData.p_name}</span>.
                    </p>
                </div>
                {vehicleData.p_image && (
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                        <img src={vehicleData.p_image} className="h-full w-full object-cover" alt="Preview" />
                    </div>
                )}
            </div>

            <form className="space-y-6" onSubmit={onHandleSubmit}>
                <div>
                    <label className={labelClasses}>Vehicle Model Name</label>
                    <input
                        type="text"
                        name="p_name"
                        value={vehicleData.p_name}
                        onChange={onHandleChange}
                        className={inputClasses}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Daily Rental Price ($)</label>
                        <input
                            type="number"
                            name="p_price"
                            value={vehicleData.p_price}
                            onChange={onHandleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Fleet Inventory</label>
                        <input
                            type="number"
                            name="p_stock"
                            value={vehicleData.p_stock}
                            onChange={onHandleChange}
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClasses}>Image URL</label>
                        <input
                            type="text"
                            name="p_image"
                            value={vehicleData.p_image}
                            onChange={onHandleChange}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Vehicle Category</label>
                        <div className="relative">
                            <select 
                                name="p_category" 
                                value={vehicleData.p_category} 
                                onChange={onHandleChange} 
                                className={`${inputClasses} appearance-none cursor-pointer`}
                            >
                                <option value="">Select Category</option>
                                {carCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Technical Specs & Description</label>
                    <textarea
                        name="p_description"
                        rows={4}
                        value={vehicleData.p_description}
                        onChange={onHandleChange}
                        className={`${inputClasses} resize-none`}
                    ></textarea>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-amber-500 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-amber-100 transition-all hover:bg-amber-600 active:scale-95"
                    >
                        Save Updates
                    </button>
                </div>
            </form>
        </div>
    );
}