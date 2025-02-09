// salesRoutes.js
const express = require("express");
const { getSales } = require("../controllers/salesController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Route to fetch total sales for a vendor
router.get("/sales", authMiddleware, getSales);

module.exports = router;