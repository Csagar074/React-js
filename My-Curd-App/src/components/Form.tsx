import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { EmployeeType } from "../App";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _EmployeeType = {
    fName: string;
    lName: string;
    email: string;
    phone: string;
    gender: string;
    hobby: string[];
    city: string;
    address: string;
};

type FormProps = { onAdd: (employee: EmployeeType) => void };

export default function EmployeeForm({ onAdd }: FormProps) {
    const [fName, setFName] = useState<string>("");
    const [lName, setLName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [hobby, setHobby] = useState<string[]>([]);
    const [city, setCity] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const [error, setError] = useState<any>({});

    const allHobby = ["Reading", "Gaming", "Sports", "Music", "Other"];
    const allCity = ["Surat", "Rajkot", "Mumbai", "UP", "Bihar"];

    const getEmployeeHobby = (event: any) => {
        const data = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setHobby(prev => [...prev, data]);
        } else {
            setHobby(prev => prev.filter((myHobby) => myHobby !== data));
        }
    }

    const validation = () => {
        let newError: any = {};

        if (!fName) newError.fname = "First name is required..";
        if (!lName) newError.lname = "Last name is required..";

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            newError.email = "Email is required..";
        } else if (!emailPattern.test(email)) {
            newError.email = "Invalid email address...";
        }

        const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (!phone) {
            newError.phone = "Phone number is required..";
        } else if (phone.length !== 10 || !phonePattern.test(phone)) {
            newError.phone = "Invalid phone number..";
        }

        if (!gender) newError.gender = "Gender is required..";
        if (hobby.length === 0) newError.hobby = "At least one hobby is required..";
        if (!city || city === "select") newError.city = "City is required..";
        if (!address) newError.address = "Address is required..";

        setError(newError);
        return Object.keys(newError).length;
    }

    const employeeFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (validation() !== 0) return;

        const employeeData: EmployeeType = {
            fName, lName, email, phone, gender, hobby, city, address
        };

        onAdd(employeeData);

        // Reset Form
        setFName("");
        setLName("");
        setEmail("");
        setPhone("");
        setGender("");
        setHobby([]);
        setCity("");
        setAddress("");

        toast.success("Employee added successfully!");
    }

    return (
        <>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                    Employee Portal
                </h1>
                <p className="text-gray-600 text-lg">Register a new employee into the system</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
                    <h2 className="text-white text-xl font-semibold">Employee Registration Form</h2>
                    <p className="text-blue-100 text-sm mt-1">Please fill out the details for {fName || 'the employee'}</p>
                </div>

                <form className="p-8 space-y-6" onSubmit={employeeFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${error.fname ? 'border-red-500' : 'border-gray-300'} outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500`}
                                placeholder="John"
                            />
                            {error.fname && <span className="text-red-500 text-xs">{error.fname}</span>}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${error.lname ? 'border-red-500' : 'border-gray-300'} outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500`}
                                placeholder="Doe"
                            />
                            {error.lname && <span className="text-red-500 text-xs">{error.lname}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Work Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${error.email ? 'border-red-500' : 'border-gray-300'} outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500`}
                                placeholder="employee@company.com"
                            />
                            {error.email && <span className="text-red-500 text-xs">{error.email}</span>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${error.phone ? 'border-red-500' : 'border-gray-300'} outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500`}
                                placeholder="9876543210"
                            />
                            {error.phone && <span className="text-red-500 text-xs">{error.phone}</span>}
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
                        <div className="flex gap-6 pt-2">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={gender === g}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span>{g}</span>
                                </label>
                            ))}
                        </div>
                        {error.gender && <span className="text-red-500 text-xs">{error.gender}</span>}
                    </div>

                    {/* Hobbies */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Interests/Hobbies</label>
                        <div className="flex flex-wrap gap-4 pt-2">
                            {allHobby.map((h, index) => (
                                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={h}
                                        checked={hobby.includes(h)}
                                        onChange={getEmployeeHobby}
                                        className="w-4 h-4 rounded text-blue-600"
                                    />
                                    <span>{h}</span>
                                </label>
                            ))}
                        </div>
                        {error.hobby && <span className="text-red-500 text-xs">{error.hobby}</span>}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Base Office City <span className="text-red-500">*</span></label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="select">Select a city</option>
                            {allCity.map((c, i) => <option key={i} value={c}>{c}</option>)}
                        </select>
                        {error.city && <span className="text-red-500 text-xs">{error.city}</span>}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Residential Address</label>
                        <textarea
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Enter full address"
                        />
                        {error.address && <span className="text-red-500 text-xs">{error.address}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold hover:scale-[1.01] transition-transform shadow-lg"
                    >
                        Add Employee to Records
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}