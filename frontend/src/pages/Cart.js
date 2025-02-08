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
  
    try {
      const token = localStorage.getItem("token"); // ✅ Fetch token
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
          totalAmount,
          customerName,
          customerContact,
          vendorId,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Include token
        }
      );
  
      alert("Order placed successfully!");
      console.log("Order Response:", response.data);
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      alert("Order failed. Check console for details.");
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
