import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { employeeType } from "../utils/global";

type propsType = {
  allEmployees: employeeType[];
  setAllEmployees: (value: React.SetStateAction<employeeType[]>) => void;
  editEmployee: employeeType | undefined;
  editIndex: number | null;
  setEditIndex: (value: React.SetStateAction<number | null>) => void;
};

export default function Form({
  allEmployees,
  setAllEmployees,
  editEmployee,
  editIndex,
  setEditIndex,
}: propsType) {
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

  useEffect(() => {
    console.log("Use Effect : ", allEmployees);

    localStorage.setItem("employees", JSON.stringify(allEmployees));
  }, [allEmployees]);

  useEffect(() => {
    if (editEmployee) {
      setFName(editEmployee.fName);
      setLName(editEmployee.lName);
      setEmail(editEmployee.email);
      setPhone(editEmployee.phone);
      setGender(editEmployee.gender);
      setHobby(editEmployee.hobby);
      setCity(editEmployee.city);
      setAddress(editEmployee.address);
    }
  }, [editEmployee]);

  const getEmployeeHobby = (event: any) => {
    const data = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setHobby((abc) => [...abc, data]);
    } else {
      setHobby((hobby) => hobby.filter((myHobby) => myHobby !== data));
    }
  };

  const validation = () => {
    let newError = {};

    if (!fName) {
      newError.fname = "first name is required..";
    }

    if (!lName) {
      newError.lname = "last name is required..";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newError.email = "email is required..";
    } else if (!emailPattern.test(email)) {
      newError.email = "Invalid email address...";
    }

    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

    if (!phone) {
      newError.phone = "phone number is required..";
    } else if (phone.length !== 10 || !phonePattern.test(phone)) {
      newError.phone = "Invalid phone number..";
    }

    if (!gender) {
      newError.gender = "gender is required..";
    }

    if (hobby.length === 0) {
      newError.hobby = "hobby is required..";
    }

    if (!city) {
      newError.city = "city is required..";
    }

    if (!address) {
      newError.address = "address is required..";
    }

    setError(newError);

    console.log("Error Length : ", Object.keys(newError).length);

    return Object.keys(newError).length;
  };

  const employeeFormSubmit = (event: any) => {
    event.preventDefault();

    if (validation() !== 0) {
      return;
    }

    const employeeData: employeeType = {
      fName,
      lName,
      email,
      phone,
      gender,
      hobby,
      city,
      address,
    };

    if (editIndex !== null) {
      let updateEmployee = [...allEmployees];
      updateEmployee[editIndex] = employeeData;
      setAllEmployees(updateEmployee);

      setEditIndex(null);

      toast.success("Employee updated successfully...");
    } else {
      setAllEmployees((allEmployees) => [...allEmployees, employeeData]);

      toast.success("Employee added successfully...");
    }

    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setGender("");
    setHobby([]);
    setCity("");
    setAddress("");
  };

  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
          Employees Form
        </h1>
        <p className="text-gray-600 text-lg">
          Add new employee information below
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
          <h2 className="text-white text-xl font-semibold">
            Employee Registration Form
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Please {fName} fill all the required fields
          </p>
        </div>

        {/* Form Body */}
        <form className="p-8 space-y-6" onSubmit={employeeFormSubmit}>
          {/* Grid Layout for Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="f_name"
                value={fName}
                onChange={(event) => setFName(event.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${error.fname ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white`}
                placeholder="Enter first name"
              />
              {error.fname && (
                <span className="text-red-400">{error.fname}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="l_name"
                value={lName}
                onChange={(event) => setLName(event.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${error.lname ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white`}
                placeholder="Enter last name"
              />
              {error.lname && (
                <span className="text-red-400">{error.lname}</span>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${error.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white`}
                placeholder="employee@example.com"
              />
              {error.email && (
                <span className="text-red-400">{error.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${error.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white`}
                placeholder="8956214785"
              />
              {error.phone && (
                <span className="text-red-400">{error.phone}</span>
              )}
            </div>
          </div>

          {/* Gender Radio Buttons */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male" ? true : false}
                  onChange={(event) => setGender(event.target.value)}
                  className={`w-5 h-5 text-blue-600 focus:ring-blue-500 ${error.gender ? "border-red-500" : "border-gray-300"}`}
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female" ? true : false}
                  onChange={(event) => setGender(event.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">Female</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={gender === "Other" ? true : false}
                  onChange={(event) => setGender(event.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">Other</span>
              </label>
            </div>
            {error.gender && (
              <span className="text-red-400">{error.gender}</span>
            )}
          </div>

          {/* Hobby Checkboxes */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Hobbies
            </label>
            <div className="flex flex-wrap gap-6 pt-2">
              {allHobby.map((myHobby, index) => {
                return (
                  <label
                    key={index}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={myHobby}
                      checked={hobby.includes(myHobby)}
                      onChange={getEmployeeHobby}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-gray-700">{myHobby}</span>
                  </label>
                );
              })}
            </div>
            {error.hobby && <span className="text-red-400">{error.hobby}</span>}
          </div>

          {/* City Select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white cursor-pointer"
            >
              <option value="select">Select a city</option>
              {allCity.map((myCity, index) => {
                return (
                  <option key={index} value={myCity}>
                    {myCity}
                  </option>
                );
              })}
            </select>
            {error.city && <span className="text-red-400">{error.city}</span>}
          </div>

          {/* Address Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              rows={4}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-gray-50 hover:bg-white resize-none"
              placeholder="Enter full address"
            ></textarea>
            {error.address && (
              <span className="text-red-400">{error.address}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full bg-gradient-to-r ${editIndex !== null ? " from-yellow-600 to-amber-600  hover:from-yellow-700 hover:to-amber-700" : " from-blue-600 to-indigo-600  hover:from-blue-700 hover:to-indigo-700"}  text-white py-4 px-6 rounded-lg font-semibold text-lg focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-[1.02] shadow-lg`}
            >
              {editIndex !== null ? "Update Employee" : "Add Employee"}
            </button>
          </div>

          {/* Required Fields Note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            <span className="text-red-500">*</span> Required fields
          </p>
        </form>
      </div>
    </>
  );
}