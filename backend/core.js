// Load environment variables from .env file
require("dotenv").config();

// Conditional pm2/io setup
if (process.env.NODE_ENV === "production") {
  const io = require("@pm2/io");
  io.init({
    transactions: true, // Enable transaction tracing
    http: true, // Enable HTTP metrics (optional)
  });
  console.log("Running in production mode with pm2/io monitoring.");
} else {
  console.log("Running in development mode.");
}

// Import required packages
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const hpp = require("hpp");

// Initialize express app
const app = express();

// Security middlewares
app.use(helmet({
  frameguard: { action: "deny" }, // Prevent clickjacking
  referrerPolicy: { policy: "no-referrer" }, // Avoid exposing referrer information
  hsts: process.env.NODE_ENV === "production" ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
}));

// HPP to prevent HTTP Parameter Pollution attacks
app.use(hpp());

// Compression to reduce the size of the response body
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter
app.use(limiter);

// Parse incoming requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB(); // Call the database connection function


// Define a catch-all route for undefined routes
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Sorry, can't find that!" });
// });

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Start the server
const PORT = process.env.PORT || 8009; // Use environment variable for port
app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
