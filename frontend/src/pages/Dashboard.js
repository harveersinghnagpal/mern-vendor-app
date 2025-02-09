import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [qrCode, setQrCode] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set base URL for axios
  axios.defaults.baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchVendorAndData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        // Fetch vendor details
        const vendorRes = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendorId(vendorRes.data._id);

        // Fetch QR code
        const qrRes = await axios.post(
          "/api/qr/generate",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQrCode(qrRes.data.qrCode);

        // Fetch products
        const productsRes = await axios.get(
          `/api/products/gotomenu?vendorId=${vendorRes.data._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(productsRes.data);

        // Fetch total sales
        
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err);
        setError("   ");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorAndData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Vendor Dashboard</h2>
        <button onClick={() => navigate("/add-product")}>Add Product</button>
        <button onClick={() => navigate(`/menu/${vendorId}`)}>Go to Menu</button>
      </div>

      <div className="main-content">
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <h2>Your QR Code</h2>
        {qrCode ? (
          <div>
            <img src={qrCode} alt="QR Code" className="qr-code" />
            <p>
              <Link to={`/menu/${vendorId}`}>Click here to view your menu</Link>
            </p>
          </div>
        ) : (
          <p className="error-message">
            QR code failed to load. Check console for errors.
          </p>
        )}

        <h2>Products and Sales</h2>
        <div className="wrapper">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>Rs.{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;