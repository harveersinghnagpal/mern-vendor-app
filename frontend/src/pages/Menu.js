import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import `useNavigate`
import { useCart } from "../context/CartContext";
import axios from "axios";

const Menu = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate(); // ✅ Define navigate function
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Vendor ID from URL:", vendorId);

        if (!vendorId) {
          console.error("No vendor ID found in URL.");
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await axios.get(`/api/products/gotomenu?vendorId=${vendorId}`, {
          headers: { Authorization: `Bearer ${token}` },
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
              <p>Description: {product.description || "No description available"}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* ✅ "Go to Cart" Button - Fix applied */}
      <div className="cart-button-container">
        <button className="go-to-cart-btn" onClick={() => navigate("/cart")}>
          Go to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default Menu;
