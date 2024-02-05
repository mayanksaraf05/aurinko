import express, { Application } from "express";
import * as bodyParser from "body-parser";
import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

const app: Application = express();
const port: number = 3004;

dotenv.config();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/Aurinko");

const db: Connection = mongoose.connection;

db.on("error", (error: any) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use((req: any, res: any, next: any) => {
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
const authRoutes = require("./routes/authRoutes");
const calendarRoutes = require("./routes/calendarRoutes");

// Use routes
app.use("/booking", bookingRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/calendar", calendarRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
