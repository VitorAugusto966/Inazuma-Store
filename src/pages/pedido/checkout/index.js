import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createOrder } from "../../../services/orderService";
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

  const FRETE_PADRAO = 15;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const ehFreteGratis = cupomSelecionado?.description
    ?.toLowerCase()
    .includes("frete grátis");

  const ehDescontoTotal = cupomSelecionado?.description
    ?.toLowerCase()
    .includes("100%");

  const desconto =
    cupomSelecionado && !ehFreteGratis
      ? (parseFloat(cupomSelecionado.description.replace("%", "")) / 100) *
        totalPrice
      : 0;

  const frete = ehFreteGratis ? 0 : FRETE_PADRAO;

  const totalComDesconto = totalPrice - desconto + frete;

  useEffect(() => {
    document.title = "Inazuma Store - Checkout";

    if (user?.address) {
      setSelectedAddress(
        `${user.address.rua}, ${user.address.numero} - ${user.address.cidade}`
      );
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
      } catch (err) {
        toast.error("Erro ao buscar cupons.");
        console.error(err);
      }
    };

    fetchCupons();
  }, [user]);

  const handleCheckout = async () => {
    if (!user?.id || !user?.token) {
      toast.warning("Você precisa estar logado.");
      return;
    }

    if (!selectedAddress) {
      toast.warning("Selecione um endereço.");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Seu carrinho está vazio.");
      return;
    }

    try {
      const order = await createOrder(
        user.id,
        selectedAddress,
        cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        totalComDesconto,
        user.token,
        "Pendente",
        user.email
      );

      if (order) {
        toast.success("Pedido realizado com sucesso!");
        dispatch(clearCart());
        setTimeout(() => navigate("/pedidos"), 2000);
      }
    } catch (error) {
      toast.error("Erro ao finalizar o pedido.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>📍 Endereço de Entrega</h2>
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

          <h2>🎁 Selecione um Cupom</h2>
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
          <h2>📦 Resumo</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>

          {cupomSelecionado && ehFreteGratis && (
            <p className="cupom-aplicado">
              Cupom <strong>"{cupomSelecionado.name}"</strong> aplicado: Frete Grátis 🚚
            </p>
          )}

          {cupomSelecionado && !ehFreteGratis && (
            <p className="cupom-aplicado">
              Cupom <strong>"{cupomSelecionado.name}"</strong> aplicado: -R$ {desconto.toFixed(2)}
            </p>
          )}

          <p className="frete">Frete: R$ {frete.toFixed(2)}</p>
          <p className="total-price">
            Total: R$ {totalComDesconto.toFixed(2)}{" "}
            {ehDescontoTotal && frete > 0 && (
              <span style={{ fontSize: "0.9rem", color: "#888" }}>
                (valor do frete)
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
