// salesRoutes.js
const express = require("express");
const { getSales } = require("../controllers/salesController"); // ✅ Import Sales Controller
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Update the route to '/orders/sales' to match the front-end request
router.get("/orders/sales", authMiddleware, getSales);

module.exports = router;
