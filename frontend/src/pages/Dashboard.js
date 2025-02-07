import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Dashboard = () => {
  const [qrCode, setQrCode] = useState("");
  const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "/api/qr/generate",
          { vendorId: "vendor_id_here" }, // Replace with the vendor's ID
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQrCode(res.data.qrCode);
        setVendorId("vendor_id_here"); // Set the vendor ID for the link
      } catch (err) {
        console.error(err);
      }
    };
    fetchQrCode();
  }, []);

  return (
    <div>
      <h1>Vendor Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;