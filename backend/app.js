import express from "express";
import dotenv from "dotenv";
import conn from "./conn/conn.js";
import cors from "cors";
dotenv.config();
conn();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
import user from "./routes/user.js";
import books from "./routes/book.js";
import favourite from "./routes/favourite.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";

// user routes
app.use("/api/v1", user);
// admin routes
app.use("/api/v1", books);
//user favourite book
app.use("/api/v1", favourite);
//user cart book
app.use("/api/v1", cart);
//user place order
app.use("/api/v1", order);

//creating port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
