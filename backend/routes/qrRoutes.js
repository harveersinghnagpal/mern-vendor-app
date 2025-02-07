const express = require("express");
const { generateQR } = require("../controllers/qrController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateQR);

module.exports = router;