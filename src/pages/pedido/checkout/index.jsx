import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getCupons } from "../../../services/cupomService";
import { clearCart } from "../../../redux/cart/cartSlice";
import Header from "../../components/header";
import "./checkout.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const cartItems = useSelector(state => state.cart.cartItems);

  const [cupons, setCupons] = useState([]);
  const [cupomSelecionado, setCupomSelecionado] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [parcelas, setParcelas] = useState(1);

  const FRETE_PADRAO = 15;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const ehFreteGratis = cupomSelecionado?.description?.toLowerCase().includes("frete grátis");
  const desconto =
    cupomSelecionado && !ehFreteGratis
      ? (parseFloat(cupomSelecionado.description.replace("%", "")) / 100) * totalPrice
      : 0;

  const frete = ehFreteGratis ? 0 : FRETE_PADRAO;
  const totalComDesconto = totalPrice - desconto + frete;
  const valorParcela = (totalComDesconto / parcelas).toFixed(2);

  useEffect(() => {
    document.title = "Inazuma Store - Checkout";
    if (user?.address) {
      const { rua, numero, cidade } = user.address;
      setSelectedAddress(`${rua}, ${numero} - ${cidade}`);
    }

    const fetchCupons = async () => {
      if (!user?.id) return;
      try {
        const cuponsAPI = await getCupons(user.id);
        const cuponsValidos = cuponsAPI.filter(cupom => {
          const validade = new Date(cupom.expirationDate);
          return !cupom.expirationDate || validade > new Date();
        });
        setCupons(cuponsValidos);
      } catch {
        toast.error("Erro ao buscar cupons.");
      }
    };

    fetchCupons();
  }, [user]);

  const handleCheckout = () => {
    if (!user?.id || !user?.token) return toast.warning("Você precisa estar logado.");
    if (!selectedAddress) return toast.warning("Selecione um endereço.");
    if (cartItems.length === 0) return toast.warning("Seu carrinho está vazio.");

    if (paymentMethod === "cartao") {
      navigate("/checkout-card");
    } else {
      toast.success("Forma de pagamento selecionada!");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer autoClose={4000} position="top-right" />
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>📦 Endereço de Entrega</h2>
          <select value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}>
            {user.address ? (
              <option value={selectedAddress}>{selectedAddress}</option>
            ) : (
              <option value="">Nenhum endereço cadastrado</option>
            )}
          </select>

          <h2>💳 Método de Pagamento</h2>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="boleto">Boleto</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="pix">Pix</option>
            <option value="dinheiro">Dinheiro</option>
          </select>

          {paymentMethod === "cartao" && (
            <>
              <h2>🔢 Parcelamento</h2>
              <select value={parcelas} onChange={e => setParcelas(Number(e.target.value))}>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}x de R$ {(totalComDesconto / (i + 1)).toFixed(2)}
                  </option>
                ))}
              </select>
            </>
          )}

          <h2>🎁 Cupom de Desconto</h2>
          <select
            value={cupomSelecionado?.name || ""}
            onChange={e => {
              const nome = e.target.value;
              const selecionado = cupons.find(c => c.name === nome);
              setCupomSelecionado(selecionado || null);
            }}
          >
            <option value="">Nenhum cupom</option>
            {cupons.map(cupom => (
              <option key={cupom.name} value={cupom.name}>
                {cupom.name} - {cupom.description}
              </option>
            ))}
          </select>
        </div>

        <div className="checkout-summary">
          <h2>🧾 Resumo do Pedido</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>

          {cupomSelecionado && (
            <div className="cupom-aplicado">
              <strong>{cupomSelecionado.name}</strong>:{" "}
              {ehFreteGratis
                ? "Frete Grátis 🚚"
                : `Desconto de R$ ${desconto.toFixed(2)}`}
            </div>
          )}

          <p className="frete">Frete: R$ {frete.toFixed(2)}</p>
          <p className="total-price">
            Total: R$ {totalComDesconto.toFixed(2)}
            {paymentMethod === "cartao" && (
              <span className="parcelamento-info">
                {" "}
                ou {parcelas}x de R$ {valorParcela}
              </span>
            )}
          </p>

          <button className="checkout-btn" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
