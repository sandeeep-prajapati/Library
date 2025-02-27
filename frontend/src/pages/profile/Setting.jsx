import React from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../../app/auth";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleAddress = () => {};
  const HandleLogout = () => {
    dispatch(authAction.logOut());
    localStorage.clear();

    navigate("/");
  };
  return (
    <div className="flex flex-col gap-5 ">
      <div className="w-full flex flex-col gap-3 ">
        <input
          type="text"
          className="w-full h-15 px-6 bg-gray-700 border rounded"
          placeholder="Enter your Address"
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
