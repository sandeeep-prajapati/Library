import axios from "axios";
import React, { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite books
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const { data } = await axios.get(
        `https://library-j4qc.onrender.com/api/v1/get-favourite-books`,
        { headers }
      );
      setFavoriteBooks(data.data);
    } catch (error) {
      console.error("Error fetching favorites:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // Remove a book from favorites
  const handleRemoveFavorite = async (bookId) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.put(
        `https://library-j4qc.onrender.com/api/v1/remove-book-to-favourite/${bookId}`,
        {},
        { headers }
      );

      alert(response.data.message);

      // Update UI by filtering out removed book
      setFavoriteBooks((prevFavorites) =>
        prevFavorites.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.error("Error removing book:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="px-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">My Favorite Books</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteBooks.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow-lg bg-gray-900 hover:bg-gray-800 overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {/* Book Image */}
              <Link
                to={`/book/${book._id}`}
                state={{ nav: "/profile", value: "favorites" }}
              >
                <img
                  src={book.url || "https://via.placeholder.com/150"} // Fallback image if none is provided
                  alt={book.title}
                  className="w-fit h-38 flex justify-self-center object-cover"
                />
              </Link>

              {/* Book Info */}
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p
                  className={`text-sm ${
                    book.availibility === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {book.availibility}
                </p>

                {/* Remove Button */}
                <button
                  className="mt-4 flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleRemoveFavorite(book._id)}
                >
                  <Trash2Icon className="w-5 h-5 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No favorite books found.</p>
      )}
    </div>
  );
};

export default Favorites;
