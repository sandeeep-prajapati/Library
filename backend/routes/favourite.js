import { Router } from "express";
import User from "../models/user.js";
import authenticateToken from "./userAuth.js";
const router = Router();

// add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookfavourite = userData.favourites.includes(bookid);
    if (isBookfavourite) {
      return res.status(200).json({ message: "book is already in favourite" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "book added to favourites" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
//remove book from favourite
router.put(
  "/remove-book-to-favourite/:bookid",
  authenticateToken,
  async (req, res) => {
    try {
      const bookid = req.params.bookid;
      const { id } = req.headers;
      const userData = await User.findById(id);
      const isBookfavourite = userData.favourites.includes(bookid);
      if (isBookfavourite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      }
      return res.status(200).json({ message: "book remove from favourites" });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }
);
//get favorite book of a user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favoriteBooks = userData.favourites;
    return res.json({
      status: "success",
      data: favoriteBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
export default router;
