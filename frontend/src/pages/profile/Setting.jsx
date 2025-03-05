import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../../app/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAdrress] = useState({
    address: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };
  const HandleAddress = async () => {
    try {
      await axios.put(
        "https://library-j4qc.onrender.com/api/v1/update-address",
        address,
        {
          headers,
        }
      );
      alert("Address Update Successfully");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
  const HandleLogout = () => {
    if (confirm("Are you sure?")) {
      dispatch(authAction.logOut());
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-3 ">
        <input
          type="text"
          className="w-full h-15 px-6 bg-gray-700 border rounded"
          placeholder="Enter your Address"
          name="address"
          value={address.address}
          onChange={(e) => setAdrress({ address: e.target.value })}
        />
        <button
          className="bg-blue-500 p-2 rounded hover:bg-blue-600"
          onClick={HandleAddress}
        >
          Click Here To Change Address
        </button>
      </div>
      <button
        className="w-full bg-red-500 rounded p-2 hover:bg-red-600"
        onClick={HandleLogout}
      >
        LogOut
      </button>
    </div>
  );
};

export default Setting;
