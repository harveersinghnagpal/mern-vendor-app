const QRCode = require("qrcode");

exports.generateQR = async (req, res) => {
  const { vendorId } = req.body;
  try {
    const url = `http://localhost:3000/menu/${vendorId}`; // Update this URL
    const qrCode = await QRCode.toDataURL(url);
    res.status(200).json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};