import { Outlet } from "react-router";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">

      <Header />

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Container for the Outlet content */}
        <div className="min-h-500px rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}