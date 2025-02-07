const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({ name, price, description, vendor: req.user.id });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};