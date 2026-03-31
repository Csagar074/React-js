
export default function Navbar() {
    return (
        <div className="sticky top-4 z-50">
            <div className="w-2/4  absolute top-4 left-1/2 -translate-x-1/2 z-50 ">

                <nav className="max-w-5xl mx-auto bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-3xl">
                        <span>KisanSeva</span>
                    </div>
                    <ul className="hidden md:flex gap-8 text-md font-medium">
                        <li className="relative h-6 overflow-hidden cursor-pointer group">
                            <a href="#home" className="block transition-transform duration-300 group-hover:-translate-y-full">HOME</a>
                            <a href="#home" className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">HOME</a>
                        </li>
                        <li className="relative h-6 overflow-hidden cursor-pointer group">
                            <a href="#farms" className="block transition-transform duration-300 group-hover:-translate-y-full">FARMS</a>
                            <a href="#farms" className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">FARMS</a>
                        </li>
                        <li className="relative h-6 overflow-hidden cursor-pointer group">
                            <a href="#about" className="block transition-transform duration-300 group-hover:-translate-y-full">ABOUT</a>
                            <a href="#about" className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">ABOUT</a>
                        </li>
                        <li className="relative h-6 overflow-hidden cursor-pointer group">
                            <a href="#blog" className="block transition-transform duration-300 group-hover:-translate-y-full">BLOG</a>
                            <a href="#blog" className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">BLOG</a>
                        </li>
                    </ul>
                    <button className="bg-black text-white px-5 py-2 rounded-xl text-base font-medium transition">
                        <li className="relative h-6 overflow-hidden cursor-pointer group">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Talk to an Expert</span>
                            <span className="block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">Talk to an Expert</span>
                        </li>
                    </button>

                </nav>
            </div>
        </div>
    );
}
