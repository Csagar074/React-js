import { UserPlus, Upload, Mail, Lock, Phone, User, Loader } from 'lucide-react';
import { useState } from 'react';
import { addAdmin } from '../../services/admin/AdminService';
import { toast } from 'react-toastify';

export interface adminForm {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    profile_image: File | null,
}

// Interface for localized field errors
interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    phone?: string;
    profile_image?: string;
}

export default function AddAdminPage() {
    const [adminFormData, setAdminFormData] = useState<adminForm>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        profile_image: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [loader, setLoader] = useState<boolean>(false);

    // Modern tracking clear helper for error clear on keystroke
    const clearError = (fieldName: keyof FormErrors) => {
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: undefined }));
        }
    };

    const getFormValue = (e: any) => {
        const { name, value, files } = e.target;

        if (name === 'profile_image' && files && files[0]) {
            const file = files[0];

            // File Type Validation (Images only)
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, profile_image: "Please upload a valid image file (PNG, JPG, WEBP)" }));
                return;
            }
            // File Size Validation (Max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, profile_image: "Image size must be less than 5MB" }));
                return;
            }

            setAdminFormData(prev => ({ ...prev, [name]: file }));
            clearError('profile_image');
        } else {
            setAdminFormData(prev => ({ ...prev, [name]: value }));
            clearError(name as keyof FormErrors);
        }
    };

    // Robust Frontend Regex Validations
    const validateForm = (): boolean => {
        const tempErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Rules: At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        // General International standard phone regex validation
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;

        if (!adminFormData.first_name.trim()) {
            tempErrors.first_name = "First name is required";
        } else if (adminFormData.first_name.length < 2) {
            tempErrors.first_name = "First name must be at least 2 characters";
        }

        if (!adminFormData.last_name.trim()) {
            tempErrors.last_name = "Last name is required";
        }

        if (!adminFormData.email.trim()) {
            tempErrors.email = "Email address is required";
        } else if (!emailRegex.test(adminFormData.email)) {
            tempErrors.email = "Please enter a valid email address";
        }

        if (!adminFormData.password) {
            tempErrors.password = "Password is required";
        } else if (!passwordRegex.test(adminFormData.password)) {
            tempErrors.password = "Password must be 8+ characters with an uppercase letter, lowercase letter, and a number";
        }

        if (!adminFormData.phone.trim()) {
            tempErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(adminFormData.phone.replace(/[\s()-]/g, ''))) {
            tempErrors.phone = "Please enter a valid phone number";
        }

        if (!adminFormData.profile_image) {
            tempErrors.profile_image = "Profile image avatar is required";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const onAdminFormSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please resolve form validation parameters.");
            return;
        }

        setLoader(true);

        try {
            const data = await addAdmin(adminFormData);

            if (data.status === 201) {
                toast.success(data.message || "Administrator registered successfully!");
                setAdminFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    phone: "",
                    profile_image: null,
                });
                setErrors({});
            } else {
                toast.error(data.message || "An error occurred during provisioning.");
            }
        } catch (error) {
            toast.error("Network interface connection failure.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 text-slate-800">

            {/* Header Section */}
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <UserPlus className="text-blue-600 w-6 h-6" />
                        Create New Administrator
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Provision a new administrator account with system access permissions.</p>
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
                                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white outline-hidden transition duration-150 ${errors.first_name
                                    ? "bg-rose-50/50 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                            />
                            {errors.first_name && <p className="text-xs font-medium text-rose-600">{errors.first_name}</p>}
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
                                value={adminFormData.last_name}
                                onChange={getFormValue}
                                placeholder="e.g., Jaljira"
                                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white outline-hidden transition duration-150 ${errors.last_name
                                    ? "bg-rose-50/50 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                            />
                            {errors.last_name && <p className="text-xs font-medium text-rose-600">{errors.last_name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <Mail size={13} className="text-slate-400" />
                                Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={adminFormData.email}
                                onChange={getFormValue}
                                placeholder="name@whitecart.com"
                                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white outline-hidden transition duration-150 ${errors.email
                                    ? "bg-rose-50/50 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                            />
                            {errors.email && <p className="text-xs font-medium text-rose-600">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <Lock size={13} className="text-slate-400" />
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={adminFormData.password}
                                onChange={getFormValue}
                                placeholder="••••••••"
                                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white outline-hidden transition duration-150 ${errors.password
                                    ? "bg-rose-50/50 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                            />
                            {errors.password && <p className="text-xs font-medium text-rose-600">{errors.password}</p>}
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
                                value={adminFormData.phone}
                                onChange={getFormValue}
                                placeholder="Enter phone number"
                                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white outline-hidden transition duration-150 ${errors.phone
                                    ? "bg-rose-50/50 border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                                    : "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                            />
                            {errors.phone && <p className="text-xs font-medium text-rose-600">{errors.phone}</p>}
                        </div>

                        {/* Profile Image Drag & Drop Area */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-1">
                                <Upload size={13} className="text-slate-400" />
                                Profile Image
                            </label>

                            <div className={`border-2 border-dashed bg-slate-50 rounded-xl p-6 text-center transition-colors duration-150 group cursor-pointer relative ${errors.profile_image
                                ? "border-rose-300 bg-rose-50/20 hover:border-rose-400"
                                : "border-slate-200 hover:bg-slate-50/20 hover:border-blue-400"
                                }`}>
                                <input
                                    type="file"
                                    name="profile_image"
                                    accept="image/*"
                                    onChange={getFormValue}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <div className={`p-2.5 bg-white border rounded-lg shadow-2xs mb-3 transition duration-150 ${errors.profile_image
                                        ? "text-rose-50/50 border-rose-100 group-hover:text-rose-600"
                                        : "text-slate-400 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-100"
                                        }`}>
                                        <Upload size={20} />
                                    </div>
                                    <p className={`text-sm font-semibold ${errors.profile_image ? "text-rose-700" : "text-slate-700"}`}>
                                        {adminFormData.profile_image ? adminFormData.profile_image.name : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        PNG, JPG, or WEBP up to 5MB
                                    </p>
                                </div>
                            </div>
                            {errors.profile_image && <p className="text-xs font-medium text-rose-600">{errors.profile_image}</p>}
                        </div>

                    </div>

                    {/* Action Panel Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            disabled={loader}
                            className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg transition duration-150 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loader}
                            className="inline-flex items-center justify-center min-w-[120px] h-10 px-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg shadow-xs transition duration-150"
                        >
                            {loader ? <Loader className="animate-spin text-white" size={18} /> : "Create Account"}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}