import heroImg from "./assets/hero-banner.jpg";

export default function Hero() {
    return (
        <div
            className="h-screen w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
                <div className="max-w-2xl text-white">
                    <p className="uppercase tracking-widest text-sm mb-4">
                        • TRUSTED & NATURAL
                    </p>

                    <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
                        Fresh Farms & <br /> Fertile Land for Sale
                    </h1>

                    <p className="mt-6 text-gray-200 text-lg">
                        Connecting farmers with the best agricultural land and resources.
                    </p>

                    <button className="mt-8 flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-medium transition">
                        <li className="relative h-6 overflow-hidden cursor-pointer group">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Explore Farms</span>
                            <span className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">Explore Farms</span>
                        </li>
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
