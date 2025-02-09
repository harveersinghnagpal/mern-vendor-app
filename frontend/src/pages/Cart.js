import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'; // Import CSS file for styling

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Loading state for placing order

  // Cart.js
const handlePlaceOrder = async () => {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const customerName = prompt("Enter your name:");
  const customerContact = prompt("Enter your contact number:");
  const vendorId = cart.length > 0 && cart[0].vendor ? cart[0].vendor : null;

  if (!customerName || !customerContact) {
    alert("Please enter all details.");
    return;
  }

  if (!vendorId) {
    alert("Error: Vendor ID is missing.");
    console.error("Order Failed: Vendor ID is missing.");
    return;
  }

  setIsPlacingOrder(true); // Start loading

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to place an order.");
      console.error("No authentication token found.");
      return;
    }

    const response = await axios.post(
      "/api/orders/create",
      {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount, // ✅ Pass the cart total to the backend
        customerName,
        customerContact,
        vendorId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Order placed successfully!");
    console.log("Order Response:", response.data);
    navigate("/Dashboard"); // Redirect to the dashboard after placing the order
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error);
    alert("Order failed. Check console for details.");
  } finally {
    setIsPlacingOrder(false); // Stop loading
  }
};

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">
                  ₹{item.price} x {item.quantity}
                </p>
                <p className="item-total">
                  Total: ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3 className="total-amount">
            Total: ₹
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </h3>
          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
