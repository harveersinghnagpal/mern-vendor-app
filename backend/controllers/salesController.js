// salesController.js
const Order = require("../models/Order");

exports.getSales = async (req, res) => {
  try {
    // If vendor ID is passed as a query param, use it, else fall back to req.user.id
    const vendorId = req.query.vendor || req.user.id;

    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    // Fetch all orders for the vendor
    const orders = await Order.find({ vendor: vendorId });

    // Calculate total sales and total orders
    let totalSales = 0;
  
    orders.forEach((order) => {
      totalSales += order.totalAmount;
    });

     // Total number of orders

    // Return the total sales and total orders
    res.status(200).json({ totalSales, totalOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};