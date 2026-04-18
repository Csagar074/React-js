"use client";

import { useEffect, useState } from "react";
import { BookDataType } from "../utils/type"; // Maan ke chal rahe hain aapne types define kiye hain
import { toast } from "react-toastify";

// Mock data options
const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography", "History"];
const languages = ["English", "Hindi", "Gujarati", "Marathi", "French"];
const formats = ["Hardcover", "Paperback", "E-Book", "Audiobook"];

export default function AddBook() {
  const [formBookData, setFormBookData] = useState<BookDataType>({
    id: Math.floor(Math.random() * 10000),
    title: "",
    author: "",
    copies: 0,
    genre: "",
    languages: [],
    format: ""
  });

  const [errorForm, setErrorForm] = useState<any>({});
  
  // Initialize from localStorage
  const [allBooks, setAllBooks] = useState<BookDataType[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem('library_books') || '[]')
    }
    return [];
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(allBooks));
  }, [allBooks]);

  const onHandleChange = (event: any) => {
    const { name, value } = event.target;
    setFormBookData(prev => ({ 
        ...prev, 
        [name]: (name === 'copies') ? Number(value) : value 
    }));
    setErrorForm((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const onLanguageChange = (event: any) => {
    const { value, checked } = event.target;
    setFormBookData(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, value] 
        : prev.languages.filter(lang => lang !== value)
    }));
    setErrorForm((prev: any) => ({ ...prev, languages: undefined }));
  };

  const validation = () => {
    const error: any = {};
    if (!formBookData.title.trim()) error.title = "Book title is required...";
    if (!formBookData.author.trim()) error.author = "Author name is required...";
    if (formBookData.copies <= 0) error.copies = "Invalid number of copies...";
    if (!formBookData.genre) error.genre = "Please select a genre...";
    if (formBookData.languages.length === 0) error.languages = "Select at least one language...";
    if (!formBookData.format) error.format = "Book format is required...";

    setErrorForm(error);
    return Object.keys(error).length === 0;
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!validation()) return;

    setAllBooks(prev => [...prev, formBookData]);
    toast.success("Book added to catalog!");

    // Reset Form
    setFormBookData({
      id: Math.floor(Math.random() * 10000),
      title: "",
      author: "",
      copies: 0,
      genre: "",
      languages: [],
      format: ""
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Book</h1>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Book Title *</label>
            <input
              type="text"
              name="title"
              value={formBookData.title}
              onChange={onHandleChange}
              placeholder="e.g., The Alchemist"
              className={`w-full px-4 py-3 border ${errorForm.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
            {errorForm.title && <p className="text-red-500 text-xs">{errorForm.title}</p>}
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Author Name *</label>
            <input
              type="text"
              name="author"
              value={formBookData.author}
              onChange={onHandleChange}
              className={`w-full px-4 py-3 border ${errorForm.author ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
            {errorForm.author && <p className="text-red-500 text-xs">{errorForm.author}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Copies */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">No. of Copies *</label>
              <input
                type="number"
                name="copies"
                value={formBookData.copies}
                onChange={onHandleChange}
                className={`w-full px-4 py-3 border ${errorForm.copies ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
              />
              {errorForm.copies && <p className="text-red-500 text-xs">{errorForm.copies}</p>}
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Genre *</label>
              <select
                name="genre"
                value={formBookData.genre}
                onChange={onHandleChange}
                className={`w-full px-4 py-3 border ${errorForm.genre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white`}
              >
                <option value="">Select Genre</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              {errorForm.genre && <p className="text-red-500 text-xs">{errorForm.genre}</p>}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Available Languages *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {languages.map(lang => (
                <label key={lang} className="flex items-center space-x-2 p-2 border border-gray-100 rounded-lg hover:bg-emerald-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formBookData.languages.includes(lang)}
                    onChange={onLanguageChange}
                    value={lang}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">{lang}</span>
                </label>
              ))}
            </div>
            {errorForm.languages && <p className="text-red-500 text-xs">{errorForm.languages}</p>}
          </div>

          {/* Format */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Book Format *</label>
            <div className="flex flex-wrap gap-4">
              {formats.map(f => (
                <label key={f} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={f}
                    checked={formBookData.format === f}
                    onChange={onHandleChange}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
            {errorForm.format && <p className="text-red-500 text-xs">{errorForm.format}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.01] shadow-lg"
          >
            Add Book to Library
          </button>
        </form>
      </div>
    </div>
  );
}