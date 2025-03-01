import axios from "axios";
import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import Book from "../pages/Book";
const BookCard = ({ book, classvalue }) => {
  return (
    classvalue === book.class && (
      <div className="w-60 shadow-lg rounded-2xl overflow-hidden bg-gray-800 border hover:scale-105 transition-all ease-in-out duration-200 pt-1">
        <img
          src={book?.url}
          alt="book url"
          className="w-fit h-40 object-cover justify-self-center hover:shadow-2xl"
        />
        <div className="p-2 flex flex-col m-1">
          <h2 className=" font-bold text-gray-200">{book?.title}</h2>
          <p className="text-gray-200  font-semibold">Author: {book?.author}</p>
          <p className="text-gray-200 font-semibold">
            Category: {book?.category}
          </p>
          <p className="text-gray-200 font-semibold">Class: {book?.class}</p>
          {
            <span
              className={`mt-2 text-sm font-semibold ${
                book.availability === "Available"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Status: {book.availability}
            </span>
          }
          <Link
            to={`/book/${book._id}`}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center"
          >
            View details
          </Link>
        </div>
      </div>
    )
  );
};
export default BookCard;
