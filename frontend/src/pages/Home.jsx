import { Library } from "lucide-react";
import library from "../assets/library-image.webp";

export default function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center text-white text-center px-4 relative"
      style={{
        backgroundImage: `url(${library})`,
      }}
    >
      <div className="absolute inset-0  bg-opacity-50 "></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyLibrary</h1>
        <p className="text-lg max-w-2xl mb-6">
          Discover a world of knowledge with our vast collection of books.
          Whether you're looking for fiction, non-fiction, or academic
          resources, MyLibrary is here to fuel your curiosity and passion for
          reading.
        </p>
        <button className="bg-amber-500 text-white px-6 py-3 text-lg font-bold rounded-lg shadow-lg hover:bg-amber-600 flex justify-self-center">
          <Library /> Discover Books
        </button>
      </div>
    </div>
  );
}
