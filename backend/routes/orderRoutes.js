const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createOrder); // ✅ No authMiddleware (Customers don't need to log in)
router.get("/getorder", authMiddleware, getOrders); // ✅ Only vendors see orders

module.exports = router;
