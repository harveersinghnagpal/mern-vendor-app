const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add vendor field
});

module.exports = mongoose.model("Product", productSchema);