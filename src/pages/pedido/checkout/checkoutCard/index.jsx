import React, { useState } from "react";
import "./checkoutCard.css";
import generic from "../../../../assets/inazuma_card.png"; 
import elo from '../../../../assets/elo.png'
import amex from '../../../../assets/amex.svg'
import hiper from '../../../../assets/hiper.svg'
import master from '../../../../assets/mastercard.png'
import visa from '../../../../assets/visa.png'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const detectCardBrand = (number) => {
  const cleaned = number.replace(/\s+/g, "");

  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned)) return "mastercard";
  if (/^(4011|4312|4389|4514|4576|5041|6277|6362)/.test(cleaned)) return "elo";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^(38|60)/.test(cleaned)) return "hipercard";

  return "default";
};

const cardBrandLogo = {
  visa: visa,
  mastercard: master,
  elo: elo,
  amex: amex,
  hipercard: hiper,
  default: generic,
};

const CheckoutCreditCard = () => {
  const [form, setForm] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [isFlipped, setIsFlipped] = useState(false);
  const brand = detectCardBrand(form.number);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === "number") {
      formatted = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d{1,2})/, "$1/$2").substr(0, 5);
    } else if (name === "cvc") {
      formatted = value.replace(/\D/g, "").substr(0, 4); 
    }

    setForm((prev) => ({ ...prev, [name]: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.number || form.number.length < 19) return toast.error("Número do cartão inválido");
    if (!form.name) return toast.error("Nome do titular é obrigatório");
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) return toast.error("Data de validade inválida");
    if (!form.cvc || form.cvc.length < 3) return toast.error("CVC inválido");

    toast.success("Cartão adicionado com sucesso!");
  };

  return (
    <div className="checkout-card-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={`card-preview-container ${isFlipped ? "flipped" : ""}`}>
        <div className="card-preview card-front">
          <div className="card-top">
            <div className="card-chip" />
            <img src={cardBrandLogo[brand]} alt={brand} className="card-brand" />
          </div>
          <div className="card-number">{form.number || "•••• •••• •••• ••••"}</div>
          <div className="card-footer">
            <div className="card-name">{form.name || "NOME DO TITULAR"}</div>
            <div className="card-expiry">{form.expiry || "MM/AA"}</div>
          </div>
        </div>

        <div className="card-preview card-back">
          <div className="card-stripe" />
          <div className="card-cvc-label">CVC</div>
          <div className="card-cvc">{form.cvc || "•••"}</div>
        </div>
      </div>

      <form className="card-form" onSubmit={handleSubmit}>
        <label>
          Número do Cartão
          <input
            type="text"
            name="number"
            maxLength="19"
            value={form.number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
          />
        </label>

        <label>
          Nome do Titular
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Como no cartão"
          />
        </label>

        <div className="row">
          <label>
            Validade
            <input
              type="text"
              name="expiry"
              maxLength="5"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/AA"
            />
          </label>

          <label>
            CVC
            <input
              type="text"
              name="cvc"
              maxLength="4"
              value={form.cvc}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              onChange={handleChange}
              placeholder="123"
            />
          </label>
        </div>

        <button type="submit">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default CheckoutCreditCard;
