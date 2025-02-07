const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createOrder);
router.get("/", authMiddleware, getOrders);

module.exports = router;