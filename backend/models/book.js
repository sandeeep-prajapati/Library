import mongoose from "mongoose";

const book = new mongoose.Schema(
  {
    classNumber: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      default: "Available",
      enum: ["Available", "Not Available"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", book);
