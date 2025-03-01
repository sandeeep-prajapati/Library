import { Router } from "express";
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";
const router = Router();

// add book to cart
router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      return res.status(200).json({ message: "book is already in cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "book added to cart" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
//remove book from cart
router.put(
  "/remove-book-to-cart/:bookid",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      const userData = await User.findById(id);
      const isBookinCart = userData.cart.includes(bookid);

      if (isBookinCart) {
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.status(200).json({ message: "book remove from cart" });
      }
      return res.status(400).json({ message: "An error occured" });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }
);
//get cart book of a user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
export default router;
