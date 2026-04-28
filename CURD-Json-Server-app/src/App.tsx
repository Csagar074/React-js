import { Outlet } from "react-router";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <Header />

      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="min-h-[500px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <Outlet />
        </div>

        <ToastContainer theme="dark" />
      </main>
    </div>
  );
}          