import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("connect to db");
  } catch (error) {
    console.log(error);
  }
};
export default conn;
