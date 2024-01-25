const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = 3004;

dotenv.config();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/Aurinko");
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Import routes
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes.js");
const calendarRoutes = require("./routes/calendarRoutes");

// Use routes
app.use("/booking", bookingRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
