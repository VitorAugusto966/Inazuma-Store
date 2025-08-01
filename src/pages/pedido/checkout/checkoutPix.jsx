import React, { useState } from 'react';
import './checkoutPix.css';

const CheckoutPix = () => {
  const [copied, setCopied] = useState(false);
  const copiaECola =
    '00020126330014BR.GOV.BCB.PIX0114inazuma@teste.com5204000053039865802BR5922INAZUMA STORE6009SAO PAULO62100510Inazuma12345678906304C6F4';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(copiaECola)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(copiaECola);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pix-wrapper">
      <div className="pix-container">
        <h2>Pagamento via Pix</h2>
        <p>Escaneie o QR Code abaixo com seu app bancário:</p>
        <div className="qr-wrapper">
          <img src={qrCodeUrl} alt="QR Code Pix" />
        </div>
        <p className="copia-label">Ou copie o código abaixo:</p>
        <div className="copy-box">
          <input type="text" value={copiaECola} readOnly />
          <button onClick={handleCopy}>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPix;
