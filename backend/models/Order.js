// Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true }, // ✅ Ensure totalAmount is required
  status: { type: String, default: "pending" },
  customerName: { type: String },
  customerContact: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ Link to Vendor
});

module.exports = mongoose.model("Order", orderSchema);