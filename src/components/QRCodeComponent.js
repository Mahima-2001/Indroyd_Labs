import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/QRCodePage.css'

const QRCodeComponent = () => {
  const [qrCode, setQrCode] = useState('');
  const [qrUrl, setQrUrl] = useState('');  // Store the URL the QR code links to

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get('http://localhost:5000/qrcode');
        setQrCode(response.data.url);
        setQrUrl('http://192.168.198.92:3000/player'); // Replace with your local IP address
      } catch (error) {
        console.error('Error generating QR code', error);
      }
    };

    fetchQRCode();
  }, []);

  return (
    <div className="qr-code-container">
      <h2 className="qr-code-title">Scan this QR Code to Join the Game</h2>
      {qrCode && (
        <a href={qrUrl} target="_blank" rel="noopener noreferrer">
          <img src={qrCode} alt="QR Code" />
        </a>
      )}
    </div>
  );
};

export default QRCodeComponent;
