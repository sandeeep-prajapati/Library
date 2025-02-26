import React, { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const BookPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Dummy Book Data (Replace with API or Redux Data)
  const book = {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic novel set in the Roaring Twenties, following the mysterious Jay Gatsby and his unrelenting love for Daisy Buchanan.",
    price: "$12.99",
    image: "https://via.placeholder.com/300x400", // Replace with actual book cover image URL
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10 flex">
      {/* Left Side - Book Image */}
      <div className="relative w-1/2 flex justify-center">
        <img
          src={book.image}
          alt={book.title}
          className="w-80 h-auto rounded-lg shadow-lg"
        />

        {/* Favorite (Heart) Icon */}
        <button
          className={`absolute top-4 left-4 text-2xl ${
            isFavorite ? "text-red-500" : "text-gray-400"
          } hover:text-red-500 transition`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart />
        </button>

        {/* Cart (Shopping) Icon */}
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-green-500 transition">
          <FaShoppingCart />
        </button>
      </div>

      {/* Right Side - Book Info */}
      <div className="w-1/2 p-6">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-300 mb-4">by {book.author}</p>
        <p className="text-gray-400 mb-6">{book.description}</p>
        <p className="text-2xl font-semibold text-blue-400 mb-6">
          {book.price}
        </p>

        <button className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-700 transition">
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default BookPage;
