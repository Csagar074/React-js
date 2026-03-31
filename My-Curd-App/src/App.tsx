import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { employeeType } from "./utils/global";

export default function App() {
  const [allEmployees, setAllEmployees] = useState<employeeType[]>(
    JSON.parse(localStorage.getItem("employees") || "[]"),
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEmployee, setEditEmployee] = useState<employeeType>();

  useEffect(() => {
    console.log("Use Effect : ", allEmployees);

    localStorage.setItem("employees", JSON.stringify(allEmployees));
  }, []);

  const deleteEmployee = (index: number) => {
    setAllEmployees((allEmployee) => allEmployee.filter((_, i) => i !== index));

    toast.success("Employee deleted successfully..");
  };

  const updateEmployee = (index: number) => {
    setEditIndex(index);
    console.log("Edit Employee : ", allEmployees[index]);
    setEditEmployee(allEmployees[index]);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Form
            allEmployees={allEmployees}
            setAllEmployees={setAllEmployees}
            editEmployee={editEmployee}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />

          <Table
            allEmployees={allEmployees}
            deleteEmployee={deleteEmployee}
            updateEmployee={updateEmployee}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}