const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  status: Boolean,
});

const User = mongoose.model("User", UserSchema);

app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, status } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    status: true, // Default status is active
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Login a user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("asdasdasd", token);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
