import house1 from "./assets/house1.webp";
import house2 from "./assets/house2.webp";

export default function Featured() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">
                        • Featured Farms
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                        Handpicked Farmlands for Productive Living
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-xl">
                        Explore our curated selection of fertile farms — thoughtfully chosen
                        for their soil quality, water access, and lasting agricultural value.
                    </p>
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
                    Explore All Farms
                </button>
            </div>

           <div className="grid md:grid-cols-2 gap-8">
    {/* Farmer 1 */}
    <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="relative">
            <img src={house1} className="rounded-xl w-full" />
            <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm">5 Acres</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm">Organic Farming</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm">Wheat</span>
            </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Ramesh Patel</h3>
                <p className="text-gray-500 text-sm">Gujarat, India</p>
            </div>
            <span className="bg-green-200 px-4 py-1 rounded-full font-medium">
                10+ Years Exp
            </span>
        </div>
    </div>

    {/* Farmer 2 */}
    <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="relative">
            <img src={house2} className="rounded-xl w-full" />
            <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm">12 Acres</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm">Irrigation</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm">Rice</span>
            </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">Suresh Yadav</h3>
                <p className="text-gray-500 text-sm">Uttar Pradesh, India</p>
            </div>
            <span className="bg-green-200 px-4 py-1 rounded-full font-medium">
                12+ Years Exp
            </span>
        </div>
    </div>
</div>
        </div>
    );
}
