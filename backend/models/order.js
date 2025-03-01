import mongoose from "mongoose";

const order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: [
        "Order Placed",
        "Take It Now",
        "Taken By You",
        "Return By You",
        "Canceled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", order);
