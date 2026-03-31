import Form from "./components/Form";
import Table from "./components/Table";

export default function App() {
  return <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Form />

        <Table />
      </div>
    </div>
  </>
}