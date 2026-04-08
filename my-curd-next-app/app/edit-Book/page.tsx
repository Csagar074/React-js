"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BookDataType } from "@/app/utils/type"; 

// Options (Aap inhein utils/type se bhi import kar sakte hain)
const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography", "History"];
const languages = ["English", "Hindi", "Gujarati", "Marathi", "French"];
const formats = ["Hardcover", "Paperback", "E-Book", "Audiobook"];

export default function EditBookPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formBookData, setFormBookData] = useState<BookDataType>({
        id: 0,
        title: "",
        author: "",
        copies: 0,
        genre: "",
        languages: [],
        format: ""
    });

    const [errorForm, setErrorForm] = useState<any>({});

    // Step 1: Load Existing Book Data
    useEffect(() => {
        const storedBooks: BookDataType[] = JSON.parse(localStorage.getItem('library_books') || '[]');
        const bookToEdit = storedBooks.find((book) => book.id === Number(id));

        if (bookToEdit) {
            setFormBookData(bookToEdit);
        } else {
            toast.error("Book not found!");
            router.push('/viewBooks');
        }
    }, [id]);

    // Step 2: Handle Input Changes
    const onHandleChange = (event: any) => {
        const { name, value } = event.target;
        setFormBookData(prev => ({ 
            ...prev, 
            [name]: (name === 'copies') ? Number(value) : value 
        }));
    };

    // Step 3: Handle Checkbox (Languages)
    const onLanguageChange = (event: any) => {
        const { value, checked } = event.target;
        setFormBookData(prev => ({
            ...prev,
            languages: checked 
                ? [...prev.languages, value] 
                : prev.languages.filter((lang) => lang !== value)
        }));
    };

    // Step 4: Validation
    const validation = () => {
        const error: any = {};
        if (!formBookData.title.trim()) error.title = "Book title is required...";
        if (!formBookData.author.trim()) error.author = "Author name is required...";
        if (formBookData.copies <= 0) error.copies = "Invalid copies...";
        if (!formBookData.genre) error.genre = "Genre is required...";
        if (formBookData.languages.length === 0) error.languages = "Select at least one language...";
        if (!formBookData.format) error.format = "Format is required...";

        setErrorForm(error);
        return Object.keys(error).length === 0;
    };

    // Step 5: Update Data
    const onSubmit = (event: any) => {
        event.preventDefault();

        if (!validation()) return;

        let allBooks: BookDataType[] = JSON.parse(localStorage.getItem('library_books') || '[]');

        const updatedBooks = allBooks.map((book) => {
            if (book.id === Number(id)) {
                return formBookData;
            }
            return book;
        });

        localStorage.setItem('library_books', JSON.stringify(updatedBooks));
        toast.success("Book updated successfully!");
        router.push('/viewBooks');
    };

    return (
        <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Book Details</h1>
                    <div className="w-24 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-emerald-100">
                    
                    {/* Book Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Book Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formBookData.title}
                            onChange={onHandleChange}
                            className={`w-full px-4 py-3 border ${errorForm.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
                        />
                        {errorForm.title && <p className="text-red-500 text-xs">{errorForm.title}</p>}
                    </div>

                    {/* Author Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Author Name</label>
                        <input
                            type="text"
                            name="author"
                            value={formBookData.author}
                            onChange={onHandleChange}
                            className={`w-full px-4 py-3 border ${errorForm.author ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Copies */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Number of Copies</label>
                            <input
                                type="number"
                                name="copies"
                                value={formBookData.copies}
                                onChange={onHandleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>

                        {/* Genre */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Genre</label>
                            <select
                                name="genre"
                                value={formBookData.genre}
                                onChange={onHandleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                            >
                                <option value="">Select Genre</option>
                                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Languages (Checkbox) */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Available Languages</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {languages.map((lang) => (
                                <label key={lang} className="flex items-center space-x-2 p-2 border border-gray-100 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all">
                                    <input
                                        type="checkbox"
                                        checked={formBookData.languages.includes(lang)}
                                        onChange={onLanguageChange}
                                        value={lang}
                                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="text-gray-700 text-sm">{lang}</span>
                                </label>
                            ))}
                        </div>
                        {errorForm.languages && <p className="text-red-500 text-xs">{errorForm.languages}</p>}
                    </div>

                    {/* Format (Radio) */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Format</label>
                        <div className="flex flex-wrap gap-4">
                            {formats.map((f) => (
                                <label key={f} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="format"
                                        value={f}
                                        checked={formBookData.format === f}
                                        onChange={onHandleChange}
                                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="text-gray-700 text-sm">{f}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.01] shadow-lg"
                        >
                            Update Book Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}