import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Menu = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Vendor ID from URL:", vendorId); // ✅ Debugging

        if (!vendorId) {
          console.error("No vendor ID found in URL.");
          return;
        }

        const token = localStorage.getItem("token");  // ✅ Fetch token
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await axios.get(`/api/products/gotomenu?vendorId=${vendorId}`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
        });

        console.log("Fetched Products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error);
      }
    };

    fetchProducts();
  }, [vendorId]);

  return (
    <div className="menu-container">
      <h2>Vendor Menu</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>
                Description: {product.description || "No description available"}
              </p>
              <button
                onClick={() => {
                  console.log("Adding to Cart:", product); // ✅ Debugging
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      
    </div>
    
  );
};

export default Menu;
