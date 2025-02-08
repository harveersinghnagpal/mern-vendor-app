import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const customerName = prompt("Enter your name:");
    const customerContact = prompt("Enter your contact number:");
    const vendorId = cart.length > 0 ? cart[0].vendorId : null;

    if (!customerName || !customerContact) {
      alert("Please enter all details.");
      return;
    }

    try {
      await axios.post("/api/orders/create", {
        items: cart.map((item) => ({ product: item._id, quantity: item.quantity })),
        totalAmount,
        customerName,
        customerContact,
        vendorId,
      });
      alert("Order placed successfully!");
      navigate("/menu");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Order failed.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : cart.map((item) => (
        <div key={item._id}>
          <p>{item.name} - ₹{item.price} x {item.quantity}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
