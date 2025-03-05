import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetch = await axios.post(
        "https://library-j4qc.onrender.com/api/v1/sign-up",
        formData
      );
      alert(fetch.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        address: "",
        avatar: null,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-full flex justify-center items-center bg-black ">
      <form
        className="bg-white p-6 rounded-lg shadow-lg md:w-96  w-80 text-black"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="avatar"
          className="w-full p-2 border rounded mb-2"
          onChange={handleFileChange}
          accept="image/*"
        />
        <p className="py-1">
          Already have a account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Login
          </Link>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
