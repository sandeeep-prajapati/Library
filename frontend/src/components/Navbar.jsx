import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-amber-500 to-black text-white rounded-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          MyWebsite
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className={`md:flex space-x-6 hidden`}>
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allbook" className="hover:text-gray-400">
              All Books
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:bg-blue-300  bg-blue-500 rounded p-1"
            >
              LogIn
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="hover:bg-amber-300 bg-amber-500 rounded p-1"
            >
              SignUP
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2">
          <li>
            <Link
              to="/allbook"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              All Books
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              LogIn
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              SignUp
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
