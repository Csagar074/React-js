"use client";

import { useState, useEffect } from "react";
import { BookDataType } from "../utils/type";
import {
  Book,
  Users,
  Languages,
  BookOpen,
  Edit,
  Trash2,
  AlertCircle,
  Package,
  PlusCircle,
  TrendingUp,
  Hash
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ViewBooks() {
  const [allBooks, setAllBooks] = useState<BookDataType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedBooks = localStorage.getItem('library_books');
    if (storedBooks) {
      setAllBooks(JSON.parse(storedBooks));
    }
  }, []);

  const deleteBook = (id: number) => {
    const deletedBookData = allBooks.filter((book) => book.id !== id);
    setAllBooks(deletedBookData);
    localStorage.setItem('library_books', JSON.stringify(deletedBookData));
    toast.success("Book deleted from library...");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Library Catalog</h1>
          <p className="text-gray-600">Manage and view all books in your library collection</p>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Titles</p>
                <p className="text-3xl font-bold text-gray-900">{allBooks.length}</p>
              </div>
              <Book className="w-10 h-10 text-emerald-600 opacity-75" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Unique Authors</p>
                <p className="text-3xl font-bold text-gray-900">{new Set(allBooks.map(b => b.author)).size}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600 opacity-75" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Copies</p>
                <p className="text-3xl font-bold text-gray-900">
                  {allBooks.reduce((sum, b) => sum + Number(b.copies), 0)}
                </p>
              </div>
              <Hash className="w-10 h-10 text-purple-600 opacity-75" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Copies/Book</p>
                <p className="text-3xl font-bold text-gray-900">
                  {allBooks.length > 0 ? (allBooks.reduce((sum, b) => sum + Number(b.copies), 0) / allBooks.length).toFixed(1) : 0}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-600 opacity-75" />
            </div>
          </div>
        </div>

        {/* Add Book Button */}
        <div className="mb-6 flex justify-end">
          <button onClick={() => router.push('/add-book')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
            <PlusCircle className="w-5 h-5" /> Add New Book
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-emerald-600 to-emerald-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">No.</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Book Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Copies</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Languages</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Format</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allBooks.length > 0 ? (
                  allBooks.map((book, index) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                             <Book className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{book.title}</div>
                            <div className="text-xs text-gray-500">{book.author}</div>
                          </div>  
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{book.copies}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {book.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {book.languages.map((lang, idx) => (
                            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                         <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                           <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                           {book.format}
                         </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button onClick={() => router.push(`/edit-Book/${book.id}`)} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteBook(book.id)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">Your library is empty</p>
                        <button onClick={() => router.push('/add-book')} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                          <PlusCircle className="w-5 h-5" /> Add Your First Book
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}