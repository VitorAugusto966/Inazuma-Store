import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCreditCard, faShoppingCart, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./compra.css";

export default function Compra() {
    const [enderecos, setEnderecos] = useState([
        { id: 1, nome: "Casa", endereco: "Rua A, 123 - São Paulo, SP" },
        { id: 2, nome: "Trabalho", endereco: "Av. B, 456 - São Paulo, SP" },
    ]);

    const [pagamento, setPagamento] = useState("cartao");
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(1);
    const produtos = [
        { id: "101", nome: "Tênis Esportivo", preco: "R$ 199,90", quantidade: 1 },
        { id: "102", nome: "Camisa Casual", preco: "R$ 89,90", quantidade: 2 },
    ];

    useEffect(() => {
        document.title = "Inazuma Store - Finalizar Compra"
    }, [])

    return (
        <>
            <Header />
            <div className="checkout-container">
                <div className="checkout-left">
                    <h2><FontAwesomeIcon icon={faShoppingCart} /> Finalizar Compra</h2>

                    <div className="checkout-section">
                        <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Escolha o Endereço</h3>
                        {enderecos.map((end) => (
                            <label
                                key={end.id}
                                className={`endereco-option ${enderecoSelecionado === end.id ? "selected" : ""}`}
                                onClick={() => setEnderecoSelecionado(end.id)}
                            >
                                <input
                                    type="radio"
                                    name="endereco"
                                    value={end.id}
                                    checked={enderecoSelecionado === end.id}
                                    onChange={() => setEnderecoSelecionado(end.id)}
                                />
                                <span>{end.nome} - {end.endereco}</span>
                            </label>
                        ))}
                    </div>
                    <div className="checkout-section">
                        <h3><FontAwesomeIcon icon={faCreditCard} /> Método de Pagamento</h3>
                        <select
                            value={pagamento}
                            onChange={(e) => setPagamento(e.target.value)}
                            className="payment-select"
                        >
                            <option value="cartao">Cartão de Crédito</option>
                            <option value="pix">Pix</option>
                            <option value="boleto">Boleto</option>
                        </select>
                    </div>
                </div>
                <div className="checkout-right">
                    <h3>Resumo da Compra</h3>
                    {produtos.map((produto) => (
                        <div key={produto.id} className="produto-checkout">
                            <p>{produto.nome} - {produto.quantidade}x {produto.preco}</p>
                        </div>
                    ))}
                    <p className="total">Total: R$ 379,70</p>

                    <button className="finalizar-btn">
                        <FontAwesomeIcon icon={faCheck} className="icon-btn" /> Finalizar Compra
                    </button>
                </div>
            </div>
        </>
    );
}
