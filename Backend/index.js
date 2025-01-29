// Import Dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Import Custom Modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import QRCode from "qrcode";

// __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express App
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// Connect to Database
connectDB();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://13.232.78.236:3000',
  'http://127.0.0.1:3000',
  'http://13.232.78.236:3000',  // AWS IP
  'http://13.232.78.236:9000'   // AWS IP with backend port
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log('Blocked Origin:', origin);
    return callback(new Error('CORS Policy Violation: Origin Not Allowed'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure Required Directories Exist
const imagePath = path.join(__dirname, "Public/Allimages");
const uploadPath = path.join(__dirname, "uploads");

[imagePath, uploadPath].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve Static Files
app.use("/public", express.static(imagePath));
app.use("/uploads", express.static(uploadPath));
app.use("/videos", express.static(path.join(__dirname, "Videos")));

// Routes
app.get("/", (req, res) => res.send("Backend is Running.."));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);  // Fixed route path

// File Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single("video");

// Course Upload Route
app.post("/api/courses/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    } else if (err) {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    res.status(201).json({ message: "Course created successfully" });
  });
});

// OTP Storage
const otpStore = {};

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = { otp, timestamp: Date.now() };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: `OTP sent successfully to ${email}` });
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

  const expiryTime = 30 * 1000; // 30 seconds
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

// Simulated Payment Verification
app.post("/verify-payment", (req, res) => {
  res.status(200).json({ message: "Payment Successful" });
});

// Save User Data
app.post("/api/users/save", async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    // Save user logic here

    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API is running on http://13.232.78.236:${PORT}`);
  console.log('Allowed Origins:', allowedOrigins);
});
