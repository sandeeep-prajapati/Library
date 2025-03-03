import axios from "axios";
import React, { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Remove book from cart
  const HandleCart = async (bookid) => {
    try {
      const fetch = await axios.put(
        `http://localhost:5000/api/v1/remove-book-to-cart/${bookid}`,
        {},
        { headers }
      );
      alert(fetch.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch cart books
  const fetchCartBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/get-user-cart`,
        { headers }
      );
      setCart(data.data);
    } catch (error) {
      console.error(
        "Error fetching books:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  //order book
  const HandleOrders = async () => {
    setOrders(cart);
    try {
      const fetch = await axios.post(
        `http://localhost:5000/api/v1/place-order`,
        orders,
        { headers }
      );
      alert(fetch.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartBooks();
  }, [refresh]);

  return (
    <div className="px-6 w-full ">
      <h2 className="text-2xl font-bold mb-6 text-center">My Cart</h2>

      {loading ? (
        <p className="text-center text-2xl mt-10 font-bold">Loading...</p>
      ) : cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow-lg bg-gray-900 hover:bg-gray-800 overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {/* Book Image */}
              <Link
                to={`/book/${book._id}`}
                state={{ nav: "/profile", value: "cart" }}
              >
                <img
                  src={book.url || "https://via.placeholder.com/150"}
                  alt={book.title}
                  className="w-fit h-38 flex justify-self-center object-cover"
                />
              </Link>

              {/* Book Info */}
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p
                  className={`text-sm ${
                    book.availability === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {book.availability}
                </p>

                {/* Remove Button */}
                <button
                  className="mt-4 flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  onClick={() => HandleCart(book._id)}
                >
                  <Trash2Icon className="w-5 h-5 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl mt-10 font-bold">
          No Books Available in cart
        </p>
      )}

      {cart.length > 0 && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-6 w-full hover:bg-green-600"
          onClick={HandleOrders}
        >
          Order Now
        </button>
      )}
    </div>
  );
};

export default CartPage;
