import { useEffect, useState } from 'react';
import { Edit2, Trash2, Search, Plus, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { allRoutes } from '../../routes/router';
import { deleteSingleUser, fetchAllUsers, userActiveOrInactive } from '../../services/users/userService';

interface userData {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    gender: string,
    address: string,
    profile_image: string,
    isActive: boolean,
    create_at: string,
}

export default function ViewUserPage() {

    const [allUsers, setAllUsers] = useState<userData[]>([]);
    const [loader, setLoader] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const data = await fetchAllUsers();

        setLoader(true);
        if (data.status === 200) {
            setAllUsers(data.result);
            // toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        setLoader(false);
    }

    const deleteUser = async (id: string) => {
        const data = await deleteSingleUser(id);

        if (data.status === 200) {
            await getAllUsers();
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    }

    const changeStatus = async (id: string) => {
        const data = await userActiveOrInactive(id);

        if (data.status === 200) {
            toast.success(data.message);
            await getAllUsers();
        } else {
            toast.error(data.message);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 text-slate-800">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="text-blue-600 w-6 h-6" />
                        Users Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage system users, permissions, and roles.</p>
                </div>

                <button onClick={() => {
                    navigate(`${allRoutes.dashboard}/${allRoutes.addUser}`);
                }} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition duration-150 shadow-xs">
                    <Plus size={16} />
                    Add New User
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white border border-slate-200 border-b-0 rounded-t-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search admins..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm outline-hidden focus:border-blue-500 focus:bg-white transition duration-150"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-medium text-slate-500">
                    Showing active administrators
                </div>
            </div>

            {/* Loader */}
            {loader && (
                <div className="bg-white border border-slate-200 rounded-b-xl shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    <th className="py-3.5 px-4 w-16 text-center">ID</th>
                                    <th className="py-3.5 px-4">Administrator</th>
                                    <th className="py-3.5 px-4">Email</th>
                                    <th className="py-3.5 px-4">Phone</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Create At</th>
                                    <th className="py-3.5 px-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[...Array(15)].map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        {/* ID Skeleton */}
                                        <td className="py-4 px-4 text-center">
                                            <div className="h-4 bg-slate-200 rounded-sm w-8 mx-auto" />
                                        </td>

                                        {/* Administrator Skeleton */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
                                                <div className="space-y-2 w-full">
                                                    <div className="h-4 bg-slate-200 rounded-md w-28" />
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email Skeleton */}
                                        <td className="py-4 px-4">
                                            <div className="h-4 bg-slate-200 rounded-md w-40" />
                                        </td>

                                        {/* Phone Skeleton */}
                                        <td className="py-4 px-4">
                                            <div className="h-4 bg-slate-200 rounded-md w-24" />
                                        </td>

                                        {/* Status Badge Skeleton */}
                                        <td className="py-4 px-4">
                                            <div className="h-6 bg-slate-200 rounded-full w-20" />
                                        </td>

                                        {/* Date Skeleton */}
                                        <td className="py-4 px-4">
                                            <div className="h-4 bg-slate-200 rounded-md w-20" />
                                        </td>

                                        {/* Action Buttons Skeleton */}
                                        <td className="py-4 px-4 text-right pr-6">
                                            <div className="inline-flex items-center gap-2 justify-end w-full">
                                                <div className="w-7 h-7 bg-slate-200 rounded-md" />
                                                <div className="w-7 h-7 bg-slate-200 rounded-md" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Table Container */}
            {!loader && <div className="bg-white border border-slate-200 rounded-b-xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                <th className="py-3.5 px-4 w-16 text-center">ID</th>
                                <th className="py-3.5 px-4">Administrator</th>
                                <th className="py-3.5 px-4">Email</th>
                                <th className="py-3.5 px-4">Phone</th>
                                <th className="py-3.5 px-4">Gender</th>
                                <th className="py-3.5 px-4">Address</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4">Create At</th>
                                <th className="py-3.5 px-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 text-sm">

                            {allUsers.map((user, index) => {
                                return <tr key={user._id} className="hover:bg-slate-50/50 transition duration-150 group">
                                    <td className="py-4 px-4 text-center font-mono text-xs text-slate-400">
                                        #{index + 101}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.profile_image} alt="Jenish"
                                                className="w-10 h-10 rounded-full object-cover border border-slate-100 ring-2 ring-slate-100/50"
                                            />
                                            <div>
                                                <div className="font-semibold text-slate-900">{user.first_name} {user.last_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="text-slate-600 font-medium">{user.email}</div>

                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="text-slate-600 font-medium">{user.phone}</div>
                                    </td>

                                    <td className="py-4 px-4">
                                        <div className="text-slate-600 font-medium">{user.gender === "Male" ? <img src={"https://static.vecteezy.com/system/resources/thumbnails/051/960/739/small/business-cartoon-portrait-of-a-man-in-a-suit-and-red-tie-ideal-for-professional-use-corporate-identity-or-office-decor-png.png"} width={80} /> : <img src={"https://cdn-icons-png.magnific.com/256/6997/6997662.png?semt=ais_white_label"} width={50} />}</div>
                                    </td>

                                    <td className="py-4 px-4">
                                        <div className="text-slate-600 font-medium">{user.address}</div>
                                    </td>

                                    <td className="py-4 px-4">
                                        <button onClick={() => changeStatus(user._id)} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 ${user.isActive ? 'text-emerald-700 border border-emerald-200' : 'text-red-700 border border-red-200'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            {user.isActive ? "Active" : "InActive"}
                                        </button>
                                    </td>
                                    <td className="py-4 px-4 text-slate-500 font-medium">
                                        {user.create_at}
                                    </td>
                                    <td className="py-4 px-4 text-right pr-6 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <button onClick={() => {
                                                navigate(`${allRoutes.dashboard + "/" + allRoutes.editUser}/${user._id}`);
                                            }} title="Edit User" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition duration-150">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteUser(user._id)} title="Delete User" className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition duration-150">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                </div>
            </div>}
        </div>
    );
}