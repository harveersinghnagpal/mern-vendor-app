const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  const { items, totalAmount, customerName, customerContact, vendorId } = req.body;
  try {
    const order = new Order({ items, totalAmount, customerName, customerContact, vendor: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Orders
exports.getOrders = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized: No user found" });
  }

  try {
    console.log("Fetching orders for vendor ID:", req.user.id); // Debugging line

    const orders = await Order.find({ vendor: req.user.id }).populate("items.product"); // Populate product details

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this vendor" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
