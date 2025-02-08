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
    const products = await Product.find({ vendor: req.user.id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
