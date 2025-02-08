const express = require("express");
const { addProduct, getProducts } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addProduct);  // Add authentication
router.get("/gotomenu", authMiddleware, getProducts); // Add authentication

module.exports = router;
