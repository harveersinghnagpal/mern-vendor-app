const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get total sales and items sold for a vendor
router.get("/sales", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user.id });
    let totalSales = 0;
    const itemsSold = {};

    orders.forEach((order) => {
      totalSales += order.totalAmount;
      order.items.forEach((item) => {
        if (itemsSold[item.product]) {
          itemsSold[item.product] += item.quantity;
        } else {
          itemsSold[item.product] = item.quantity;
        }
      });
    });

    res.status(200).json({ totalSales, itemsSold });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;