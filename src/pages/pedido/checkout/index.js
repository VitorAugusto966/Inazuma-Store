import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createOrder } from "../../../services/orderService";
import { clearCart } from "../../../redux/cart/cartSlice";
import Header from "../../components/header";
import "./checkout.css";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const formattedAddress = user?.address
        ? `${user.address.rua}, ${user.address.numero} - ${user.address.cidade}`
        : "";

    const [selectedAddress, setSelectedAddress] = useState(formattedAddress);
    const [paymentMethod, setPaymentMethod] = useState("cartao");

    const handleCheckout = async () => {
        if (!user?.id || !user?.token) {
            toast.warning("Você precisa estar logado para finalizar a compra.");
            return;
        }

        if (!selectedAddress) {
            toast.warning("Por favor, selecione um endereço de entrega.");
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
                totalPrice,
                user.token,
                "Pendente"
            );

            if (order) {
                toast.success("Pedido criado com sucesso!");
                dispatch(clearCart());
                setTimeout(() => {
                    navigate("/pedidos");
                }, 2000);
            } else {
                toast.error("Erro ao criar o pedido. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            toast.error("Ocorreu um erro ao finalizar a compra.");
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
                            <option value={formattedAddress}>
                                {formattedAddress}
                            </option>
                        ) : (
                            <option value="">Nenhum endereço cadastrado</option>
                        )}
                    </select>

                    <h2>💳 Método de Pagamento</h2>
                    <select className="payment-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="boleto">Boleto</option>
                        <option value="cartao">Cartão de Crédito</option>
                        <option value="pix">Pix</option>
                        <option value="dinheiro">Dinheiro</option>
                    </select>
                </div>

                <div className="checkout-summary">
                    <h2>📦 Resumo da Compra</h2>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>{item.title} x {item.quantity} - R$ {item.price.toFixed(2)}</li>
                        ))}
                    </ul>
                    <p className="total-price">Total: R$ {totalPrice.toFixed(2)}</p>
                    <button className="checkout-btn" onClick={handleCheckout}>Efetuar Compra</button>
                </div>
            </div>
        </>
    );
}
