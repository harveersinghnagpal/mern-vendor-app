// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");


// Your backend API routes go here, e.g.:
// app.use("/api", apiRoutes);

/*// Serve the React app from the "frontend/build" directory
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for handling React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});*/
dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Register Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const qrRoutes = require("./routes/qrRoutes");
const salesRoutes = require("./routes/salesRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/sales", salesRoutes); // ✅ Register salesRoutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));