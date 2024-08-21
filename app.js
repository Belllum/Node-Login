const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const userRoutes = require("./routes/userRoutes");

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

app.use("/", userRoutes);

module.exports = app;
