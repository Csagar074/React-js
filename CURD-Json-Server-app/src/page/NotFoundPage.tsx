import { useNavigate } from "react-router";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            {/* Visual Indicator */}
            <div className="relative mb-8">
                <h1 className="text-[12rem] font-black text-slate-100 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-slate-900 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl border border-slate-100 shadow-xl">
                        Wrong Turn!
                    </h2>
                </div>
            </div>

            {/* Message */}
            <div className="text-center max-w-md">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                    This road leads nowhere.
                </h3>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Navigation Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Go Back
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
                    >
                        Back to Showroom
                    </button>
                </div>
            </div>

            {/* Aesthetic Background Detail */}
            <div className="mt-20 opacity-20 grayscale pointer-events-none">
                <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20H40M60 20H100M120 20H160M180 20H200" stroke="currentColor" strokeWidth="4" strokeDasharray="12 12"/>
                </svg>
            </div>
        </div>
    );
}