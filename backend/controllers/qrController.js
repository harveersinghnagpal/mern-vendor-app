const QRCode = require("qrcode");
const QR = require("../models/QR"); // Import the QR model

exports.generateQR = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    const vendorId = req.user.id;
    const qrCodeData = `https://mern-vendor-app-frontend.onrender.com/menu/${vendorId}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Check if QR already exists for vendor
    let existingQR = await QR.findOne({ vendorId });

    if (existingQR) {
      return res.json({ qrCode: existingQR.qrCode, vendorId });
    }

    // Save QR code in database
    const newQR = new QR({ vendorId, qrCode });
    await newQR.save();

    res.json({ qrCode, vendorId });
  } catch (error) {
    console.error("Error Generating QR:", error);
    res.status(500).json({ error: error.message });
  }
};
