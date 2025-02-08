import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'; // Import the styling

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const vendorId = localStorage.getItem('vendorId'); // Fetch vendor ID
      
      // Add the product
      await axios.post(
        '/api/products/add',
        { name, price: parseFloat(price), description }, // Convert price to number
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use backticks
          },
        }
      );
      alert('Product added successfully!');
      navigate(`/menu/${vendorId}`); // Use backticks for string interpolation
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
