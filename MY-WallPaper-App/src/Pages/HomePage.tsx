import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../componets/NavBar";

interface WallPaperHit {
    id: number,
    largeImageURL: string,
    tags: string,
    userImageURL: string,
    user: string,
    type: string,
    views: number,
    downloads: number,
    likes: number,
    comment: number
}

export default function HomePage() {
    const [allHits, setAllHits] = useState<WallPaperHit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetchAllWallpaper();
    }, []);  

    const fetchAllWallpaper = async (searchQuery: string = search) => {
        const wallPaperAPI = `https://pixabay.com/api?key=55643932-42fe2fac434ca0780f9015bba&q=${searchQuery}`;
        setLoading(true);
        try {
            const res = await axios.get(wallPaperAPI);
            if (res.status === 200) {
                setAllHits(res.data.hits);
                setLoading(false);
            }
        } catch (e) {
            console.log("Something went wrong", e);
        }
    };


    return (
        <div className="min-h-screen bg-gray-950">

            <NavBar search={search} setSearch={setSearch} onSearch={() => fetchAllWallpaper(search)} />

            {/* Hero Banner */}
            <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Stunning</span> Wallpapers
                    </h1>
                    <p className="text-white/60 text-base">
                        {search ? `Showing results for "${search}"` : "Explore millions of free high-quality images"}
                    </p>
                </div>
            </div>
   
            {/* Grid */}
            <main className="max-w-[1600px] mx-auto px-6 py-10">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(12)].map((_, n) => (
                            <div key={n} className="h-64 bg-gray-800 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {allHits.map((wallpaper) => (
                            <div
                                key={wallpaper.id}
                                className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-300"
                            >
                                <img
                                    src={wallpaper.largeImageURL}
                                    alt={wallpaper.tags}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                                    <div className="flex justify-end">
                                        <button className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white hover:bg-pink-500/80 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white">
                                            <img
                                                src={wallpaper.userImageURL || 'https://via.placeholder.com/30'}
                                                className="w-8 h-8 rounded-full border-2 border-white/50"
                                                alt=""
                                            />
                                            <span className="text-sm font-semibold truncate max-w-[100px]">{wallpaper.user}</span>
                                        </div>
                                        <a
                                            href={wallpaper.largeImageURL}
                                            download
                                            target="_blank"
                                            className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:from-violet-400 hover:to-indigo-400 transition-all"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
