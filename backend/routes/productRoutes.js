const express = require("express");
const { addProduct, getProducts } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addProduct);
router.get("/", authMiddleware, getProducts);

module.exports = router;