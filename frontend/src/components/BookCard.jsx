export default function BookCard({ book, classvalue }) {
  return (
    book?.class === classvalue && (
      <div className="py-4">
        <h1 className="text-3xl ">Class {classvalue}</h1>
        <hr className="border-gray-500 mb-2" />
        <br />
        <div className="flex flex-wrap justify-center  gap-10 ">
          <div className="w-60 shadow-lg rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 ">
            <img src={book?.url} alt="" className="w-full h-50 object-cover" />
            <div className="p-2">
              <h2 className=" font-semibold">{book?.title}</h2>
              <p className="text-gray-100">by author {book?.author}</p>
              <p className="text-gray-100">Category: {book?.category}</p>
              <p className="text-gray-100">Class: {book?.class}</p>
              {
                <pages
                  className={`mt-2 text-sm font-semibold ${
                    book.availibility === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {book.availibility}
                </pages>
              }
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
