const QRCode = require("qrcode");


exports.generateQR = async (req, res) => {
  try {
    const vendorId = req.user.id; // ✅ Extract from logged-in user
    const qrCodeData = `http://localhost:3000/menu/${vendorId}`;

    QRCode.toDataURL(qrCodeData, (err, qrCode) => {
      if (err) {
        return res.status(500).json({ error: "Failed to generate QR code" });
      }
      res.json({ qrCode });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

