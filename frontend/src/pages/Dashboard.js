import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [qrCode, setQrCode] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const vendorRes = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendorId(vendorRes.data._id);
      } catch (err) {
        console.error('Error fetching vendor:', err.response?.data || err);
      }
    };
    fetchVendor();
  }, []);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        console.log("Fetching QR Code..."); // ✅ Debug log

        const response = await axios.post("/api/qr/generate", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("QR Code Response:", response.data); // ✅ Debug log

        setQrCode(response.data.qrCode);
        setVendorId(response.data.vendorId);
      } catch (error) {
        console.error("Error fetching QR code:", error);
      }
    };

    fetchQRCode();
  }, []);

  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        

        const productsRes = await axios.get(
          `/api/products/gotomenu`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(productsRes.data);

        const salesRes = await axios.get(
          `/api/orders/sales?vendor=${vendorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalSales(salesRes.data.totalSales);
      } catch (err) {
        console.error('Error fetching data:', err.response?.data || err);
      }
    };
    fetchData();
  }, [vendorId]);

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      alert('Product deleted successfully');
    } catch (err) {
      console.error('Error deleting product:', err.response?.data || err);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Vendor Dashboard</h2>
        <button onClick={() => navigate('/add-product')}>Add Product</button>
        <button onClick={() => navigate(`/menu/${vendorId}`)}>Go to Menu</button>
      </div>

      <div className="main-content">
        <h2>Your QR Code</h2>
        {qrCode ? (
          <div>
            <img src={qrCode} alt="QR Code" className="qr-code" />
            <p>
              <Link to={`/menu/${vendorId}`}>Click here to view your menu</Link>
            </p>
          </div>
        ) : (
          <p className="error-message">QR code failed to load. Check console for errors.</p>
        )}
        
        <h2>Products and Sales</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Items Sold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.itemsSold || 0}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Sales: ${totalSales}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
