const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order
exports.createOrder = async (req, res) => {
  const { items, totalAmount, customerName, customerContact, vendorId } = req.body;

  // ✅ Validation: Ensure necessary fields are provided
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty!" });
  }
  if (!customerName || !customerContact) {
    return res.status(400).json({ error: "Customer details are required!" });
  }
  if (!vendorId) {
    return res.status(400).json({ error: "Vendor ID is missing!" });
  }

  try {
    // Create the order
    const order = new Order({
      items,
      totalAmount,
      customerName,
      customerContact,
      vendor: vendorId,
    });

    await order.save();
    
    // Update itemsSold for each product in the order
    
    

    res.status(201).json({ message: "Order placed successfully!", order , itemsSold });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Orders (For Vendors)
exports.getOrders = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized: No user found" });
  }

  try {
    console.log("Fetching orders for vendor ID:", req.user.id);
    const orders = await Order.find({ vendor: req.user.id }).populate("items.product");

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this vendor" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

