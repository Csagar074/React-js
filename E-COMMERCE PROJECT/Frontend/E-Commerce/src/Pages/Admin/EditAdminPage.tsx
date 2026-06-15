import { UserCheck, Upload, Mail, Phone, User, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchSingleAdmin, updateAdmin } from '../../services/admin/AdminService';
import { toast } from 'react-toastify';
import { allRoutes } from '../../routes/router';

export interface adminEditForm {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    profile_image: File | string,
}

export default function EditAdminPage() {
    const [adminFormData, setAdminFormData] = useState<adminEditForm>({
        _id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        profile_image: "",
    });

    const { adminId } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        getSingleAdmin();
    }, []);

    const getSingleAdmin = async () => {
        const data = await fetchSingleAdmin(adminId || "");

        if (data.status === 200) {
            setAdminFormData(data.result);
        } else {
            toast.error(data.message);
        }
    }

    const getFormValue = (e: any) => {
        const { name, value } = e.target;

        if (name === 'profile_image') {
            setAdminFormData(adminFormData => ({ ...adminFormData, [name]: e.target.files[0] }));
        } else {
            setAdminFormData(adminFormData => ({ ...adminFormData, [name]: value }));
        }
    }

    const onAdminFormSubmit = async (e: any) => {
        e.preventDefault();
        console.log(adminFormData);

        // validation
        // Update Admin API

        setLoader(true);
        const data = await updateAdmin(adminFormData);

        if (data.status === 200) {
            toast.success(data.message);
            navigate(`${allRoutes.dashboard}/${allRoutes.viewAdmin}`);
        } else {
            toast.error(data.message);
        }
        setLoader(false);
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 text-slate-800">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        {/* Changed text-amber-400 to text-blue-600 and updated icon to UserCheck */}
                        <UserCheck className="text-blue-600 w-6 h-6" />
                        Edit Administrator
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Provision a edit administrator account with system access permissions.</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <form onSubmit={onAdminFormSubmit} className="p-6 md:p-8 space-y-6">

                    {/* Grid Section for Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* First Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <User size={13} className="text-slate-400" />
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={adminFormData.first_name}
                                onChange={getFormValue}
                                placeholder="e.g., Jenish"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden transition duration-150"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <User size={13} className="text-slate-400" />
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                onChange={getFormValue}
                                value={adminFormData.last_name}
                                placeholder="e.g., Jaljira"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden transition duration-150"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <Mail size={13} className="text-slate-400" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={getFormValue}
                                value={adminFormData.email}
                                placeholder="name@whitecart.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden transition duration-150"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <Phone size={13} className="text-slate-400" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                onChange={getFormValue}
                                value={adminFormData.phone}
                                placeholder="Enter phone number"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-hidden transition duration-150"
                            />
                        </div>

                        {/* Profile Image Drag & Drop Area */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <Upload size={13} className="text-slate-400" />
                                Profile Image
                            </label>

                            <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl p-6 text-center hover:bg-slate-50/20 hover:border-blue-500 transition-colors duration-150 group cursor-pointer relative flex flex-col items-center justify-center min-h-[140px]">
                                <input
                                    type="file"
                                    name="profile_image"
                                    onChange={getFormValue}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                />

                                {adminFormData.profile_image ? (
                                    <div className="relative z-20">
                                        <img 
                                            src={typeof adminFormData.profile_image === 'string' ? adminFormData.profile_image : URL.createObjectURL(adminFormData.profile_image)} 
                                            alt="Profile Preview" 
                                            className="w-24 h-24 object-cover rounded-lg border border-slate-200 shadow-xs" 
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="p-2.5 bg-white border border-slate-200 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 rounded-lg shadow-2xs mb-3 transition duration-150">
                                            <Upload size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            PNG, JPG, or WEBP up to 5MB
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Action Panel Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(`${allRoutes.dashboard}/${allRoutes.viewAdmin}`)}
                            className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition duration-150 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loader}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer min-w-[140px]"
                        >
                            {loader ? (
                                <>
                                    <Loader className="animate-spin text-white" size={18} />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                "Update Account"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}