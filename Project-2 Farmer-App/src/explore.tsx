import exploreImg from "./assets/house3.webp";

export default function Explore() {
    return (
        <div
            className="h-screen w-full bg-cover bg-center relative flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${exploreImg})` }}
        >
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 text-white">
                <p className="text-sm tracking-widest uppercase mb-4">
                    • EXPLORE KISANSEVA
                </p>

                <h2 className="text-5xl md:text-6xl font-semibold leading-tight">
                    Find Your Perfect Farmland Today
                </h2>

                <div className="mt-8 flex justify-center">
                    <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                        Explore Farms
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
