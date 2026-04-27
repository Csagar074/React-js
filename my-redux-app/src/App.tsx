import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./app/store";
import { decrement, increment, reset } from "./features/counter/counterSlice";
import Header from "./components/Header";

export default function App() {
  const counter = useSelector((state: RootState) => state.counterReducer.counter);
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const getCounterColor = () => {
    if (counter > 10) return "from-green-400 to-emerald-500";
    if (counter < 0) return "from-red-400 to-rose-500";
    return "from-violet-400 to-indigo-500";
  };

  const isLight = theme === "light";

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
      isLight
        ? "bg-white"
        : "bg-gray-950"
    }`}>

      {/* Floating blobs — only in light mode */}
      {isLight && (
        <>
          <div className="absolute top-10 left-10 w-64 h-64 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </>
      )}

      {/* Dark mode blobs */}
      {!isLight && (
        <>
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-900 rounded-full opacity-40 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-900 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        </>
      )}

      <Header />

      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-4">

        {/* Card */}
        <div className={`w-full max-w-sm backdrop-blur-xl border rounded-3xl shadow-2xl p-10 text-center transition-colors duration-500 ${
          isLight
            ? "bg-white/60 border-gray-200 shadow-pink-100"
            : "bg-white/5 border-white/10"
        }`}>

          <p className={`text-sm font-bold uppercase tracking-widest mb-1 ${
            isLight ? "text-purple-500" : "text-white/60"
          }`}>Redux Counter</p>

          <h2 className={`text-3xl font-extrabold mb-8 ${
            isLight ? "text-gray-900" : "text-white"
          }`}>Count Tracker ✨</h2>

          {/* Animated Counter Circle */}
          <div className={`mx-auto w-40 h-40 rounded-full bg-gradient-to-br ${getCounterColor()} flex items-center justify-center shadow-2xl mb-8 transition-all duration-500 hover:scale-105`}>
            <span className="text-white text-6xl font-black">{counter}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => dispatch(increment())}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-green-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              + Increment
            </button>
            <button
              onClick={() => dispatch(decrement())}
              className="flex-1 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-red-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              - Decrement
            </button>
          </div>

          <button
            onClick={() => dispatch(reset())}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-orange-400/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            🔄 Reset
          </button>
        </div>
      </main>
    </div>
  );
}