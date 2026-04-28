import { useNavigate } from "react-router"

export default function NotFoundPage() {
    const navigate = useNavigate();
    return <>
        <center>
            <h1 className="text-center text-orange-500 text-9xl">404</h1>
            <h2 className="text-zinc-400 text-3xl text-center">Page Not Found</h2>
            <button onClick={() => navigate('/')} className="mt-4 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95">Go to Home</button>
        </center>
    </>
}