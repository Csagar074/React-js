import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { forgotPasswordAdmin, OTPVerifyAdmin } from "../../services/auth/AuthService";

export default function OTPVerifyPage() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [loader, setLoader] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        const newOtp = [...otp];
        newOtp[index] = element.value.substring(element.value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (element.value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move to previous input on backspace if current is empty
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const finalOtp = otp.join("");

        if (finalOtp.length < 6) {
            toast.error("Please enter the complete 6-digit OTP");
            return;
        }

        setLoader(true);

        const data = await OTPVerifyAdmin(finalOtp);

        if (data.status === 200) {
            toast.success(data.message);
            navigate('/new-password');
        }
        else {
            toast.error(data.message);
        }

        setLoader(false);
    };

    const resendOTP = async () => {
        const email = sessionStorage.getItem('email') || "";
        const data = await forgotPasswordAdmin(email);

        if (data.status === 200) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Glow Pattern matching previous pages */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-4 gap-1"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                    Verify Identity
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    We've sent a 6-digit code to your email.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <div className="bg-white py-8 px-4 shadow-2xl shadow-blue-100/50 sm:rounded-3xl sm:px-10 border border-blue-50/50">
                    <form onSubmit={onFormSubmit} className="space-y-8">
                        {/* OTP Inputs with updated borders and focus state */}
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    // ref={(el) => (inputRefs.current[index] = el)}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-14 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                                />
                            ))}
                        </div>

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
                                    Verifying...
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                    </form>

                    {/* Resend Code with Blue Accent */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{" "}
                            <button onClick={resendOTP} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}