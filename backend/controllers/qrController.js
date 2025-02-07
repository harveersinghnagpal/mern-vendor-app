const QRCode = require("qrcode");

exports.generateQR = async (req, res) => {
  const { vendorId } = req.body;
  try {
    const url = `http://localhost:3000/menu/${vendorId}`; // URL for the vendor's menu
    const qrCode = await QRCode.toDataURL(url); // Generate QR code
    res.status(200).json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};