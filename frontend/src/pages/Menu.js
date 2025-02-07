import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Menu = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products?vendor=${vendorId}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [vendorId]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = async () => {
    try {
      const order = {
        items: cart.map((product) => ({
          product: product._id,
          quantity: 1, // You can add quantity functionality if needed
        })),
        totalAmount: cart.reduce((total, product) => total + product.price, 0),
        customerName: "Customer Name", // Replace with actual customer name
        customerContact: "1234567890", // Replace with actual contact info
        vendor: vendorId,
      };
      await axios.post("/api/orders/create", order);
      alert("Order placed successfully!");
      setCart([]); // Clear the cart
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Menu;