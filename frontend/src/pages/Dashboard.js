import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [qrCode, setQrCode] = useState("");

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
        <img src={qrCode} alt="QR Code" />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default Dashboard;