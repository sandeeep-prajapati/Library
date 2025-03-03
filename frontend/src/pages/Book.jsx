import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

const BookPage = () => {
  const location = useLocation();
  const { nav } = location.state;
  const navigate = useNavigate();
  const HandleNavigate = () => {
    navigate(nav);
  };
  const role = useSelector((state) => state.auth.role);
  const [isFavorite, setIsFavorite] = useState(false);
  const { bookid } = useParams();
  const [bookdetail, setBookdetail] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
    bookid: bookid,
  };
  const HandleDelete = async () => {
    try {
      const fetch = await axios.delete(
        `http://localhost:5000/api/v1/delete-book`,
        { headers }
      );
      alert(fetch.data.message);
      navigate("/allbook");
    } catch (error) {
      console.log(error);
    }
  };
  const HandleCart = async () => {
    try {
      const fetch = await axios.put(
        `http://localhost:5000/api/v1/add-book-to-cart`,
        {},
        { headers }
      );
      alert(fetch.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const HandleFavorites = async () => {
    try {
      const fetch = await axios.put(
        `http://localhost:5000/api/v1/add-book-to-favourite`,
        {},
        { headers }
      );
      alert(fetch.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const fetch = await axios.get(
        `http://localhost:5000/api/v1/get-all-books/${bookid}`
      );
      setBookdetail(fetch.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:w-[80%] w-full md:mt-15 p-6  bg-gray-900 text-white rounded-lg shadow-lg flex md:flex-row flex-col self-center">
      <button
        className="text-xl rounded-full bg-gray-500 h-fit w-fit p-2"
        onClick={HandleNavigate}
      >
        <ArrowLeft size={20} />{" "}
      </button>
      {/* Left Side - Book Image */}
      <div className="relative md:w-1/2 flex justify-center">
        <img
          src={bookdetail.url}
          alt={bookdetail.title}
          className="w-60 h-fit rounded-lg shadow-lg"
        />

        {/* Favorite (Heart) Icon */}
        {role === "user" && (
          <button
            className={`absolute top-5 right-4 text-4xl ${
              isFavorite ? "text-red-500" : "text-gray-500"
            } hover:text-red-500 transition`}
            onClick={HandleFavorites}
          >
            <FaHeart />
          </button>
        )}

        {/* Cart (Shopping) Icon */}
        {role === "user" && (
          <button
            className="absolute top-20 right-4 text-4xl text-gray-500 hover:text-green-500 transition"
            onClick={HandleCart}
          >
            <FaShoppingCart />
          </button>
        )}
      </div>

      {/* Right Side - Book Info */}
      <div className="md:w-1/2 p-6 ">
        <h1 className="text-3xl font-bold mb-2">{bookdetail.title}</h1>
        <p className="text-lg font-bold text-gray-300 mb-4">
          by {bookdetail.author} -{" "}
          <span className="text-blue-500">{bookdetail.category}</span>
        </p>
        <p className="text-gray-400 mb-6 text-xl">
          Class - {bookdetail.classNumber}
        </p>
        <p
          className={`mt-10 text-2xl font-bold mb-6 ${
            bookdetail.availability === "Available"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {bookdetail.availability}
        </p>

        {role === "user" && (
          <button
            className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-700 transition"
            onClick={HandleCart}
          >
            Add to Cart 🛒
          </button>
        )}
        {role === "admin" && (
          <button
            className="bg-red-500 px-6 py-3 rounded hover:bg-red-700 transition"
            onClick={HandleDelete}
          >
            Delete Book 🛒
          </button>
        )}
      </div>
    </div>
  );
};

export default BookPage;
