import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
const Allbook = () => {
  const [allbooks, setAllbooks] = useState([]);
  const Class = [12, 11, 10, 9];
  const fetchData = async () => {
    try {
      const fetch = await axios.get(
        "http://localhost:5000/api/v1/get-all-books"
      );
      setAllbooks(fetch.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-10 px-20 bg-black ">
      {Class.map((value, ind) => (
        <div key={ind}>
          {allbooks.map((data, index) => {
            return <BookCard key={index} book={data} classvalue={value} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default Allbook;
