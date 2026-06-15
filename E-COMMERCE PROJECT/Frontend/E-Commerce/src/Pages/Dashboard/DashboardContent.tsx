import { useEffect, useState } from "react";
import CountdownTimer from "../../components/Dashboard/CountdownTimer";
import StatsCards from "../../components/Dashboard/StatsCards";

// Dashboard Content Component
export function DashboardContent() {
    const [stats, setStats] = useState({
        totalAdmins: 0,
        totalUsers: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalSubCategories: 0,
        totalExtraCategories: 0,
        totalOrders: 0,
        earnings: 0,
        pendingOrders: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        // Simulate API call
        setTimeout(() => {
            setStats({
                totalAdmins: 12,
                totalUsers: 1248,
                totalProducts: 342,
                totalCategories: 15,
                totalSubCategories: 48,
                totalExtraCategories: 32,
                totalOrders: 856,
                earnings: 45678,
                pendingOrders: 23
            });
            setLoading(false);
        }, 1000);
    };

    return (
        /* Changed background to light slate tint */
        <div className="p-6 min-h-screen bg-slate-50">
            {/* Header */}
            <div className="mb-8">
                {/* Changed text colors to blue-gray palette */}
                <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer targetDate="2024-12-31T23:59:59" />

            {/* Stats Cards */}
            <StatsCards stats={stats} loading={loading} />
        </div>
    );
}