// salesController.js
const Order = require("../models/Order");

exports.getSales = async (req, res) => {
  try {
    // If vendor ID is passed as a query param, use it, else fall back to req.user.id
    const vendorId = req.query.vendor || req.user.id; 
    
    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    const orders = await Order.find({ vendor: vendorId });
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
};
