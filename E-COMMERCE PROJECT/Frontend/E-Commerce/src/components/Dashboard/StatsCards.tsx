// components/Dashboard/StatsCards.tsx
import {
    Users,
    Package,
    Grid,
    Layers,
    ShoppingCart,
    DollarSign,
    Clock,
    Loader
} from "lucide-react";

interface StatsCardsProps {
    stats: {
        totalAdmins: number;
        totalUsers: number;
        totalProducts: number;
        totalCategories: number;
        totalSubCategories: number;
        totalExtraCategories: number;
        totalOrders: number;
        earnings: number;
        pendingOrders: number;
    };
    loading: boolean;
}

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
    trend?: number;
}

function StatCard({ title, value, icon, color, trend }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
                    {trend !== undefined && (
                        <p className={`text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
                        </p>
                    )}
                </div>
                <div className={`${color} p-3 rounded-full`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    const cards = [
        {
            title: "Total Admins",
            value: stats.totalAdmins,
            icon: <Users className="text-blue-500" size={24} />,
            color: "bg-blue-100"
        },
        {
            title: "Total Users",
            value: stats.totalUsers.toLocaleString(),
            icon: <Users className="text-green-500" size={24} />,
            color: "bg-green-100",
            trend: 12
        },
        {
            title: "Total Products",
            value: stats.totalProducts.toLocaleString(),
            icon: <Package className="text-purple-500" size={24} />,
            color: "bg-purple-100",
            trend: 8
        },
        {
            title: "Total Categories",
            value: stats.totalCategories,
            icon: <Grid className="text-yellow-500" size={24} />,
            color: "bg-yellow-100"
        },
        {
            title: "Sub Categories",
            value: stats.totalSubCategories,
            icon: <Layers className="text-indigo-500" size={24} />,
            color: "bg-indigo-100"
        },
        {
            title: "Extra Categories",
            value: stats.totalExtraCategories,
            icon: <Layers className="text-pink-500" size={24} />,
            color: "bg-pink-100"
        },
        {
            title: "Total Orders",
            value: stats.totalOrders.toLocaleString(),
            icon: <ShoppingCart className="text-orange-500" size={24} />,
            color: "bg-orange-100",
            trend: 15
        },
        {
            title: "Total Earnings",
            value: `$${stats.earnings.toLocaleString()}`,
            icon: <DollarSign className="text-green-600" size={24} />,
            color: "bg-green-100",
            trend: 23
        },
        {
            title: "Pending Orders",
            value: stats.pendingOrders,
            icon: <Clock className="text-red-500" size={24} />,
            color: "bg-red-100",
            trend: -5
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
}