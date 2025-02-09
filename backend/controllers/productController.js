const Product = require("../models/Product");
const User = require("../models/User"); // Import User model

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  
  try {
    // Check if the vendor exists in the database
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "Vendor not found" });

    // Create and save the product
    const product = new Product({
      name,
      price,
      description,
      vendor: req.user.id, // Add the vendor's ID from the authenticated user
    });

    await product.save();
    res.status(200).json({ message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Products
exports.getProducts = async (req, res) => {
  try {
    const { vendorId } = req.query;

    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    const products = await Product.find({ vendor: vendorId });

    if (!products.length) {
      return res.status(404).json({ error: "No products found for this vendor" });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const vendorId = req.user.id; // Get the vendor ID from the authenticated user

    // Find and delete the product
    const product = await Product.findOneAndDelete({
      _id: productId,
      vendor: vendorId, // Ensure that the product belongs to the vendor
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found or unauthorized" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};