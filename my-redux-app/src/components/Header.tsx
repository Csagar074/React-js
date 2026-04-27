import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { themeChanger } from '../features/counter/theme/themeSlice';

export default function Header() {
    const theme = useSelector((state: RootState) => state.themeReducer.theme);
    const dispatch = useDispatch();
    const isLight = theme === "light";

    return (
        <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-500 ${
            isLight
                ? "bg-white/80 border-gray-200"
                : "bg-gray-950/80 border-white/10"
        }`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-lg">R</span>
                    </div>
                    <h1 className={`text-xl font-extrabold tracking-tight transition-colors duration-500 ${
                        isLight ? "text-gray-900" : "text-white"
                    }`}>
                        Redux<span className="text-orange-500">App</span>
                    </h1>
                </div>

                {/* Nav Links */}
                <ul className={`hidden md:flex items-center gap-6 text-sm font-semibold transition-colors duration-500 ${
                    isLight ? "text-gray-600" : "text-white/80"
                }`}>
                    <li><a href="#" className={`hover:text-orange-500 transition-colors`}>Home</a></li>
                    <li><a href="#" className={`hover:text-orange-500 transition-colors`}>About</a></li>
                    <li><a href="#" className={`hover:text-orange-500 transition-colors`}>Contact</a></li>
                </ul>

                {/* Theme Toggle */}
                <button
                    onClick={() => dispatch(themeChanger())}
                    className={`h-9 w-9 flex items-center justify-center rounded-full border transition-all ${
                        isLight
                            ? "bg-gray-100 border-gray-200 hover:bg-gray-200"
                            : "bg-white/10 border-white/20 hover:bg-white/20"
                    }`}
                >
                    <span className="text-lg">{isLight ? '🌙' : '☀️'}</span>
                </button>
            </div>
        </nav>
    );
}