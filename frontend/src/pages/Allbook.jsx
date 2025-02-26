import React, { useEffect } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
const Allbook = () => {
  // useEffect(async () => {
  //   const fetch = await axios.get("http://localhost:5000/api/v1/sign-in");
  //   return () => {};
  // }, []);

  return (
    <div className="py-10 px-20 bg-black ">
      <div className="py-4">
        <h1 className="text-3xl ">Class 12</h1>
        <hr className="border-gray-500 mb-2" />
        <br />
        <div className="flex flex-wrap justify-center  gap-10 ">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
      <div className="py-4">
        <h1 className="text-3xl ">Class 11</h1>
        <hr className="border-gray-500 mb-2" />
        <br />
        <div className="flex flex-wrap justify-center  gap-10 ">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </div>
  );
};

export default Allbook;
