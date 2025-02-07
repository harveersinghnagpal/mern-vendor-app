const QRCode = require("qrcode");

// Generate QR Code
exports.generateQR = async (req, res) => {
  const { vendorId } = req.body;
  try {
    const url = `http://yourapp.com/menu/${vendorId}`;
    const qrCode = await QRCode.toDataURL(url);
    res.status(200).json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};