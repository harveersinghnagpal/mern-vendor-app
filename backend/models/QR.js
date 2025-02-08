const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  qrCode: { type: String, required: true }, // Store the QR code as a base64 string
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QR", qrSchema);
