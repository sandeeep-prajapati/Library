import { Router } from "express";
import User from "../models/user.js";
import Order from "../models/order.js";
import authenticateToken from "./userAuth.js";

const router = Router();
//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDatafromDb = await newOrder.save();
      //saving Order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDatafromDb._id },
      });
      //clearing cart
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }
    return res.json({
      status: "Success",
      message: "Oder Placed Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});
//get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});
//get all orders --admin
router.get("/get-all-order", authenticateToken, async (req, res) => {
  try {
    const userData = User.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      message: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});
// update orders by --admin
router.put("/upated-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});
export default router;
