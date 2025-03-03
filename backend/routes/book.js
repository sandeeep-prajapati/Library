import { Router } from "express";
import User from "../models/user.js";
import Book from "../models/book.js";
import authenticateToken from "./userAuth.js";
const router = Router();

//add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ message: "Unauthorized Access" });
    }
    const book = new Book({
      classNumber: req.body.classNumber,
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      availability: req.body.availability,
    });
    await book.save();

    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//update book --admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      availability: req.body.availability,
    });

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    console.log(bookid);

    await Book.findByIdAndDelete(bookid);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "AN error occured" });
  }
});
router.get("/get-all-books/:bookid", async (req, res) => {
  try {
    const bookid = req.params.bookid;
    const books = await Book.findById(bookid);
    return res.status(200).json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "AN error occured" });
  }
});
export default router;
