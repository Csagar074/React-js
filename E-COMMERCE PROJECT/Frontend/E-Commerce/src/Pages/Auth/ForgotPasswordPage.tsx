import { useState } from "react";
import { useNavigate } from "react-router";
import { Loader2, ArrowLeft } from "lucide-react";
import { forgotPasswordAdmin } from "../../services/auth/AuthService";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFormSubmit = async (event: any) => {
        event.preventDefault();
        setLoader(true);

        // Forgot Password API
        const data = await forgotPasswordAdmin(email);

        if (data.status === 200) {
            toast.success(data.message);
            navigate('/otp-verify');
            sessionStorage.setItem('email', email);
        } else {
            toast.error(data.message);
        }

        setLoader(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Glow Pattern matching Login Page */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Forgot Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Manage your orders and inventory
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="bg-white py-8 px-4 shadow-2xl shadow-blue-100/50 sm:rounded-3xl sm:px-10 border border-blue-50/50">
                    <form onSubmit={onFormSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="admin@yourstore.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 transition-all duration-200 uppercase tracking-wide
                                    ${loader ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 active:scale-[0.98]"}
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                {loader ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending OTP...
                                    </>
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Back to Login Option */}
                    <div className="mt-5 text-center">
                        <Link to="/login" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors gap-1.5">
                            <ArrowLeft size={16} />
                            Back to Sign In
                        </Link>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-3 bg-white text-gray-400 tracking-widest font-medium">
                                    Secure Access
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-gray-500 italic">
                    &copy; 2026 YourCommerce Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}