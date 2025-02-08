import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = ({ vendorId }) => {
  const qrText = `${window.location.origin}/menu/${vendorId}`;

  return (
    <div>
      <h3>Scan the QR Code to View the Menu</h3>
      <QRCodeCanvas value={qrText} size={200} />
    </div>
  );
};

export default QRCodeGenerator;
