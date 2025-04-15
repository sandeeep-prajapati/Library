import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
const Allbook = () => {
  const [allbooks, setAllbooks] = useState([]);
  const Class = [12, 11, 10, 9];
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://library-j4qc.onrender.com/api/v1/get-all-books"
      );
      setAllbooks(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-10 px-20 bg-black h-full ">
      {Class.map((value, ind) => (
        <div className="py-4 " key={ind}>
          <h1 className="text-3xl ">Class {value}</h1>
          <hr className="border-gray-500 mb-2" />
          <br />
          <div className="flex flex-wrap justify-center  gap-10 ">
            {allbooks.map((data, index) => {
              return <BookCard key={index} book={data} classvalue={value} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allbook;
