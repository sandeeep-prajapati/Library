import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authenticateToken from "./userAuth.js";

const router = Router();

// Sign Up Route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    // Check username length
    if (!username || username.length <= 4) {
      return res
        .status(400)
        .json({ message: "Username should be more than four characters" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check password length
    if (!password || password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password should be more than five characters" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
      address,
    });

    await newUser.save();
    return res.status(201).json({ message: "Sign Up Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// Sign in Route
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    //user exits or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //compare password from database and generate token
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaim = [
          { username: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaim }, "bookstore123", {
          expiresIn: "30d",
        });
        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
