import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Allbook from "./pages/Allbook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddBook from "./pages/AddBook";
import Footer from "./components/Footer";
import Profile from "./pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./app/auth";
import Book from "./pages/Book";
import Cart from "./pages/profile/Cart";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authAction.logIn());
      dispatch(authAction.changeRole(localStorage.getItem("role")));
    }
  }, [role]);
  return (
    <div className="md:h-screen  flex flex-col bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allbook" element={<Allbook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:bookid" element={<Book />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
