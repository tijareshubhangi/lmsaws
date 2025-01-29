// Import Dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import multer from "multer";
import QRCode from "qrcode";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables before using them
dotenv.config();

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import Custom Modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

// Log environment variables
console.log("Environment variables:");
console.log("EMAIL:", process.env.EMAIL);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);
console.log("PORT:", process.env.PORT);
console.log("BASE_URL:", process.env.BASE_URL);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Initialize Express App
const app = express();
mongoose.set("strictQuery", true);

// Connect to Database
connectDB();

// Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://13.200.229.88:3000",
  "http://13.200.229.88:9000"
];

// CORS middleware with dynamic origin handling
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origin not allowed:", origin);
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for React build
app.use(express.static(path.resolve("../build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve("../build", "index.html"));
});

// Ensure Public/Allimages Directory Exists
const folderPath = path.resolve("Public/Allimages");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Serve Static Files
app.use("/public", express.static(folderPath));
app.use("/videos", express.static(path.resolve("Videos")));

// Routes
app.get("/", (req, res) => res.send("Backend is Running.."));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes); // Fixed incorrect route

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  if (err.message.includes("CORS")) {
    return res.status(403).json({ status: "error", message: "CORS Error: Origin not allowed" });
  }
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// File Upload Route
app.post("/api/courses/upload", upload.single("video"), (req, res) => {
  try {
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
});

// OTP Storage (Temporary)
const otpStore = {};

// Send OTP via Email
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const timestamp = Date.now();
  otpStore[email] = { otp, timestamp };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`
    });
    res.status(200).json({ message: "OTP sent successfully to " + email });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, userOtp } = req.body;
  if (!email || !userOtp) return res.status(400).json({ message: "Email and OTP are required" });

  const otpData = otpStore[email];
  if (!otpData) return res.status(400).json({ message: "No OTP sent to this email" });

  const expiryTime = 30 * 1000;
  if (Date.now() - otpData.timestamp > expiryTime) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (otpData.otp == userOtp) {
    delete otpStore[email];
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// Generate QR Code
app.post("/generate-qr", async (req, res) => {
  const { user, amount } = req.body;
  const qrData = `Payment Request:\nUser: ${user}\nAmount: INR ${amount}`;

  try {
    const qrCode = await QRCode.toDataURL(qrData, { errorCorrectionLevel: "H" });
    res.status(200).json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Verify Payment (Mock)
app.post("/verify-payment", (req, res) => {
  res.status(200).json({ message: "Payment Successful" });
});

// Save User Data (Placeholder)
app.post("/api/users/save", async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API is running on ${process.env.BASE_URL}`);
  console.log("Allowed Origins:", allowedOrigins);
});
