

type BookCardProps = {
  title: string;
  author: string;
  genre: string;
  status: "Available" | "Issued";
};

export default function BookCard({ title, author, genre, status }: BookCardProps) {
  return (
    <div className="group block max-w-sm p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      
      {/* Decorative side bar */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
          {genre}
        </span>
        <span className={`text-[10px] uppercase tracking-wider font-bold ${status === 'Available' ? 'text-green-500' : 'text-red-400'}`}>
          ● {status}
        </span>
      </div>

      <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-600 transition-colors">
        {title}
      </h5>
      
      <p className="text-sm font-medium text-gray-500 mb-4">
        by <span className="text-gray-700">{author}</span>
      </p>

      <div className="flex items-center justify-between mt-6">
        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
          View Details →
        </button>
        
        {status === "Available" && (
          <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
            Issue Book
          </button>
        )}
      </div>
    </div>
  );
}