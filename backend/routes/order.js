import { Router } from "express";
import User from "../models/user.js";
import Order from "../models/order.js";
import authenticateToken from "./userAuth.js";

const router = Router();

// 📌 Place an Order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const orders = req.body;

    for (const orderData of orders) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDatafromDb = await newOrder.save();

      // Save Order in User model & Remove from Cart
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDatafromDb._id },
        $pull: { cart: orderData._id }, // Remove from cart
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// 📌 Get Order History (User-Specific)
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders", // ✅ Match field name in User schema
      populate: { path: "book" }, // ✅ Match field name in Order schema
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const ordersData = userData.orders.reverse();
    return res.json({ status: "Success", data: ordersData });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// 📌 Get All Orders (Admin Only)
router.get("/get-all-order", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("book") // ✅ Match field name in Order schema
      .populate("user") // ✅ Match field name in Order schema
      .sort({ createdAt: -1 });

    return res.json({ status: "Success", data: orders });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// 📌 Update Order Status (Admin Only)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    await Order.findByIdAndUpdate(id, { status: req.body.status });

    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
