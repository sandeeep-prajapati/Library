import { useSelector } from "react-redux";
export default function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <footer
      className={`${
        isLoggedIn
          ? "bg-gradient-to-r from-blue-500 to-black"
          : "bg-gradient-to-r from-amber-500"
      } text-white text-center p-4 mt-auto`}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </p>
    </footer>
  );
}
