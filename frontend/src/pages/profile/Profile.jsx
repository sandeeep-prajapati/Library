import React, { useEffect, useState } from "react";
import Favorites from "./Favorites";
import Orders from "./Orders";
import Setting from "./Setting";
import Cart from "./Cart";
import axios from "axios";
import { useSelector } from "react-redux";
const Profile = () => {
  const [user, setUser] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const fetch = async () => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `bearer ${localStorage.getItem("token")}`,
    };

    try {
      const data = await axios.get(
        "http://localhost:5000/api/v1/get-user-information",
        { headers }
      );
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const [selectedTab, setSelectedTab] = useState("settings");

  return (
    <div className="w-full md:h-auto  p-6 bg-black text-white rounded-lg shadow-lg  flex md:flex-row flex-col md:items-start items-center">
      {/* Left Sidebar (Navigation) */}
      <div className="md:w-1/3 p-4 md:border-r  border-gray-700">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <img
          src={user.avatar}
          alt="user image "
          className="h-20 w-20 border border-white rounded-full"
        />
        <div className="mb-6">
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
        </div>
        <div className="space-y-4">
          {role === "user" && (
            <button
              className={`w-full py-2 rounded text-left ${
                selectedTab === "favorites"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedTab("favorites")}
            >
              📚 Favorite Books
            </button>
          )}
          <button
            className={`w-full py-2 rounded text-left ${
              selectedTab === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTab("orders")}
          >
            📦 Order History
          </button>
          {role === "user" && (
            <button
              className={`w-full py-2 rounded text-left ${
                selectedTab === "cart" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedTab("cart")}
            >
              🛒 Cart
            </button>
          )}
          <button
            className={`w-full py-2 rounded text-left ${
              selectedTab === "settings" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTab("settings")}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Right Side (Dynamic Content) */}
      <div className="md:w-2/3 p-6">
        {role === "user" && selectedTab === "favorites" && <Favorites />}

        {selectedTab === "orders" && <Orders />}

        {selectedTab === "settings" && <Setting />}

        {role === "user" && selectedTab === "cart" && <Cart />}
      </div>
    </div>
  );
};

export default Profile;
