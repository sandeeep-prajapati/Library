import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [refresh, setRefresh] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const HandleStatus = async (e, orderid) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.put(
        `https://library-j4qc.onrender.com/api/v1/update-status/${orderid}`, // ✅ Adjust API URL as needed
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  // Fetch User Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://library-j4qc.onrender.com/api/v1/${
          role === "admin" ? "get-all-order" : "get-order-history"
        }`,
        { headers }
      );
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  return (
    <div className="px-6 w-full  ">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {loading ? (
        <p className="text-center text-2xl mt-10 font-bold">Loading...</p>
      ) : orders.length > 0 ? (
        <div className="flex flex-col gap-1 ">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-lg bg-gray-700 transform transition duration-200 hover:scale-102"
            >
              {/* Order Info */}
              <div className="p-2 flex justify-between h-auto items-center">
                <div className="">
                  <h3 className="text-lg font-semibold">{order.book.title}</h3>
                  {role === "admin" && (
                    <h3 className="text-sm font-semibold">
                      {order.user.username}
                    </h3>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={` font-semibold ${
                    (order.status === "Take It Now" && "text-green-400") ||
                    (order.status === "Taken By You" && "text-green-600") ||
                    (order.status === "Return By You" && "text-blue-500") ||
                    (order.status === "Canceled" && "text-red-600") ||
                    (order.status === "Order Placed" && "text-yellow-500")
                  }`}
                >
                  Status: {order.status}
                </p>
                {role === "admin" && (
                  <select
                    value={status}
                    className="bg-gray-800"
                    onChange={(e) => HandleStatus(e, order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Take It Now">Take It Now</option>
                    <option value="Taken By You">Taken By You</option>
                    <option value="Return By You">Return By You</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl mt-10 font-bold">No Orders Found.</p>
      )}
    </div>
  );
};

export default Orders;
