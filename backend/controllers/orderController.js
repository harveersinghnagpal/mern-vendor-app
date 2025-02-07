const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  const { items, totalAmount, customerName, customerContact, vendorId } = req.body;
  try {
    const order = new Order({ items, totalAmount, customerName, customerContact, vendor: vendorId });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};