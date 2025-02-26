import React, { useState } from "react";
import Favorites from "./Favorites";
import Orders from "./Orders";
import Setting from "./Setting";
const Profile = () => {
  // Dummy Data (Replace with API or Redux State)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const [selectedTab, setSelectedTab] = useState("favorites");

  return (
    <div className="w-full h-full mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg  flex">
      {/* Left Sidebar (Navigation) */}
      <div className="w-1/3 p-4 border-r border-gray-700">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="mb-6">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div className="space-y-4">
          <button
            className={`w-full py-2 rounded text-left ${
              selectedTab === "favorites" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTab("favorites")}
          >
            📚 Favorite Books
          </button>
          <button
            className={`w-full py-2 rounded text-left ${
              selectedTab === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedTab("orders")}
          >
            📦 Order History
          </button>
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
      <div className="w-2/3 p-6">
        {selectedTab === "favorites" && <Favorites />}

        {selectedTab === "orders" && <Orders />}

        {selectedTab === "settings" && <Setting />}
      </div>
    </div>
  );
};

export default Profile;
