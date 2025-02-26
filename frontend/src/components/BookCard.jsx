export default function BookCard({ book }) {
  return (
    <div className="w-60 shadow-lg rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 ">
      <img src="" alt="" className="w-full h-50 object-cover" />
      <div className="p-2">
        <h2 className=" font-semibold">title</h2>
        <p className="text-gray-100">by author</p>
        <p className="text-gray-100">Category: category</p>
        <p className="text-gray-100">Class: class</p>
        {/* <pages
          className={`mt-2 text-sm font-semibold ${
            book.availibility === "Available"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Status: {book.availibility}
        </pages> */}
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          View Details
        </button>
      </div>
    </div>
  );
}
