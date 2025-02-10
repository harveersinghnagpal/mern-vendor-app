import React from "react";
import QrReader from "react-qr-scanner";  // ✅ Correct import

const QRCodeGenerator = ({ vendorId }) => {
  const qrText = `${window.location.origin}/menu/${vendorId}`;

  return (
    <div>
      <h3>Scan the QR Code to View the Menu</h3>
      <QrReader  // ✅ Correct component name
        delay={300}
        onScan={(data) => {
          if (data) {
            console.log("Scanned Data:", data);
          }
        }}
        onError={(err) => console.error("QR Scan Error:", err)}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default QRCodeGenerator;
