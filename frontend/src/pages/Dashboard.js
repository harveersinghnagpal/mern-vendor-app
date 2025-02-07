import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [qrCode, setQrCode] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch vendor details
        const vendorRes = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const vendorId = vendorRes.data._id;
        setVendorId(vendorId);

        // Fetch QR code
        const qrRes = await axios.post(
          "/api/qr/generate",
          { vendorId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQrCode(qrRes.data.qrCode);

        // Fetch products and sales data
        const productsRes = await axios.get(`/api/products?vendor=${vendorId}`);
        setProducts(productsRes.data);

        const salesRes = await axios.get(`/api/orders/sales?vendor=${vendorId}`);
        setTotalSales(salesRes.data.totalSales);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Vendor Dashboard</h1>

      {/* Add Product Button */}
      <button onClick={() => navigate("/add-product")}>Add Product</button>

      {/* Go to Menu Button */}
      <button onClick={() => navigate(`/menu/${vendorId}`)}>Go to Menu</button>

      <h2>Your QR Code</h2>
      {qrCode ? (
        <div>
          <img src={qrCode} alt="QR Code" />
          <p>
            <Link to={`/menu/${vendorId}`}>Click here to view your menu</Link>
          </p>
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}

      <h2>Products and Sales</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Items Sold</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.itemsSold || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Sales: ${totalSales}</h3>
    </div>
  );
};

export default Dashboard;