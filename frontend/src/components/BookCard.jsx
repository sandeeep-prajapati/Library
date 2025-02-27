import React from "react";
const BookCard = ({ book, classvalue }) => {
  return (
    classvalue === book.class && (
      <div className="w-60 shadow-lg rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 ">
        <img
          src={book?.url}
          alt=""
          className="w-fit h-40 object-cover justify-self-center"
        />
        <div className="p-2">
          <h2 className=" font-semibold">{book?.title}</h2>
          <p className="text-gray-100">by author: {book?.author}</p>
          <p className="text-gray-100">Category: {book?.category}</p>
          <p className="text-gray-100">Class: {book?.class}</p>
          {
            <span
              className={`mt-2 text-sm font-semibold ${
                book.availibility === "Available"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Status: {book.availibility}
            </span>
          }
          <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>
    )
  );
};
export default BookCard;
