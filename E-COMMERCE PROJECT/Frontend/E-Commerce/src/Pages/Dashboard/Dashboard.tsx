
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router";


export default function Dashboard() {

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

