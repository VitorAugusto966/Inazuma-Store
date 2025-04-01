import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/cart/cartSlice";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "./cart.css";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.user.user);
    const token = user?.token;

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        document.title = "Inazuma Store - Carrinho";
    }, []);

    function goToCheckout() {
        if (!user?.id || !token) {
            toast.warning("Você precisa estar logado para finalizar a compra.");
            return;
        }

        if (cartItems.length === 0) {
            toast.warning("Seu carrinho está vazio!");
            return;
        }

        navigate("/checkout", {
            state: {
                userId: user.id,
                cidade: user.address.cidade,
                cartItems: cartItems,
                totalPrice: totalPrice,
                token: token,
                status: "Pendente"
            }
        });
    }

    return (
        <>
            <Header />
            <section className="cart-container">
                <ToastContainer autoClose={5000} position="top-right" />
                <h2 className="cart-title">🛒 Meu Carrinho</h2>

                {cartItems.length === 0 ? (
                    <p className="empty-cart">Seu carrinho está vazio.</p>
                ) : (
                    <div className="cart-content">
                        <div className="cart-list">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.thumbnail} alt={item.title} className="cart-img" />
                                    <div className="cart-details">
                                        <h4 className="cart-item-title">{item.title}</h4>
                                        <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>
                                        <div className="cart-actions">
                                            <button className="quantity-btn" onClick={() => dispatch(decreaseQuantity(item.id))}>
                                                <FaMinus />
                                            </button>
                                            <span className="item-quantity">{item.quantity}</span>
                                            <button className="quantity-btn" onClick={() => dispatch(increaseQuantity(item.id))}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3 id="title-resume">Resumo da Compra</h3>
                            <p className="total-price">Total: R$ {totalPrice.toFixed(2)}</p>
                            <button className="checkout-btn" onClick={goToCheckout}>Finalizar Compra</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
