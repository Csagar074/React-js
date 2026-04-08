"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookDataType } from "../../utils/type";
import { toast } from "react-toastify";

const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography", "History", "Self-Help"];
const languages = ["English", "Hindi", "Gujarati", "Marathi", "French", "Spanish"];
const formats = ["Hardcover", "Paperback", "E-Book", "Audiobook"];

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<BookDataType | null>(null);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const books: BookDataType[] = JSON.parse(localStorage.getItem("library_books") || "[]");
    const book = books.find((b) => b.id === Number(id));
    if (book) setFormData(book);
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => prev ? { ...prev, [name]: name === "copies" ? Number(value) : value } : prev);
  };

  const handleLanguageChange = (e: any) => {
    const { value, checked } = e.target;
    setFormData((prev) => prev ? {
      ...prev,
      languages: checked ? [...prev.languages, value] : prev.languages.filter((l) => l !== value),
    } : prev);
  };

  const validate = () => {
    if (!formData) return false;
    const err: any = {};
    if (!formData.title.trim()) err.title = "Book title is required...";
    if (!formData.author.trim()) err.author = "Author name is required...";
    if (formData.copies <= 0) err.copies = "Invalid number of copies...";
    if (!formData.genre) err.genre = "Please select a genre...";
    if (formData.languages.length === 0) err.languages = "Select at least one language...";
    if (!formData.format) err.format = "Book format is required...";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!validate() || !formData) return;
    const books: BookDataType[] = JSON.parse(localStorage.getItem("library_books") || "[]");
    const updated = books.map((b) => (b.id === formData.id ? formData : b));
    localStorage.setItem("library_books", JSON.stringify(updated));
    toast.success("Book updated successfully!");
    router.push("/view-book");
  };

  if (!formData) return <div className="min-h-screen flex items-center justify-center text-gray-500">Book not found...</div>;

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Book</h1>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Book Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`} />
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Author Name *</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.author ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`} />
            {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">No. of Copies *</label>
              <input type="number" name="copies" value={formData.copies} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              {errors.copies && <p className="text-red-500 text-xs">{errors.copies}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Genre *</label>
              <select name="genre" value={formData.genre} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                <option value="">Select Genre</option>
                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.genre && <p className="text-red-500 text-xs">{errors.genre}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Available Languages *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <label key={lang} className="flex items-center space-x-2 p-2 border border-gray-100 rounded-lg hover:bg-emerald-50 cursor-pointer">
                  <input type="checkbox" value={lang} checked={formData.languages.includes(lang)} onChange={handleLanguageChange} className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">{lang}</span>
                </label>
              ))}
            </div>
            {errors.languages && <p className="text-red-500 text-xs">{errors.languages}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Book Format *</label>
            <div className="flex flex-wrap gap-4">
              {formats.map((f) => (
                <label key={f} className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="format" value={f} checked={formData.format === f} onChange={handleChange} className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
            {errors.format && <p className="text-red-500 text-xs">{errors.format}</p>}
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => router.push("/view-book")}
              className="w-full border border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
