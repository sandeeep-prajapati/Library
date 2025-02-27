import { Library } from "lucide-react";
import library from "../assets/library-image.webp";
import BlueLibrary from "../assets/blue_library.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center text-white text-center px-4 relative"
      style={{
        backgroundImage: `url(${isLoggedIn ? BlueLibrary : library})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4 ">Welcome to DavLibrary</h1>
        <p className="text-lg max-w-2xl mb-6 font-mono shadow-2xl">
          Discover a world of knowledge with our vast collection of books.
          Whether you're looking for fiction, non-fiction, or academic
          resources, DavLibrary is here to fuel your curiosity and passion for
          reading.
        </p>
        <Link
          to="/allbook"
          className={`${
            isLoggedIn
              ? " bg-blue-500 hover:bg-blue-600"
              : "bg-amber-500 hover:bg-amber-600"
          } text-white px-6 py-3 text-lg font-bold rounded-lg shadow-lg  flex justify-self-center`}
        >
          <Library /> Discover Books
        </Link>
      </div>
    </div>
  );
}
