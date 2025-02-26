import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from "../app/auth";
import { useDispatch } from "react-redux";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetch = await axios.post(
        "http://localhost:5000/api/v1/sign-in",
        formData
      );
      console.log(fetch);
      localStorage.setItem("id", fetch.data.id);
      localStorage.setItem("token", fetch.data.token);
      localStorage.setItem("role", fetch.data.role);
      setFormData({ email: "", password: "" });
      dispatch(authAction.logIn());
      dispatch(authAction.changeRole(fetch.data.role));

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-black">
      <form
        className="bg-white p-6 rounded-lg shadow-lg md:w-96 w-80 text-black"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
