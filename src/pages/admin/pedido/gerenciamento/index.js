import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "../../../components/adminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./gerenciar.css";

export default function AdminGerenciarPedido() {
    const { state: pedido } = useLocation();
    const [status, setStatus] = useState(pedido.status);
    const [trackingCode, setTrackingCode] = useState(pedido.trackingCode || "");
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showTrackingModal, setShowTrackingModal] = useState(false);

    const handleStatusChange = () => {
        setShowStatusModal(false);
        toast.success("Status do pedido atualizado com sucesso!");
    };

    const handleTrackingCodeSave = () => {
        if (trackingCode.trim() === "") {
            toast.error("O código de rastreamento não pode estar vazio.");
            return;
        }
        setShowTrackingModal(false);
        toast.success("Código de rastreamento salvo com sucesso!");
    };

    return (
        <>
            <AdminHeader />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="pedido-gerenciar-container">
                <h1>📦 Gerenciar Pedido #{pedido.id}</h1>

                <section className="info-section">
                    <h2>Informações do Cliente</h2>
                    <p><strong>👤 Nome Social:</strong> {pedido.usuario.nome_social || "Não cadastrado"}</p>
                    <p><strong>👤 Nome de usuário:</strong> {pedido.usuario.nome_usuario}</p>
                    <p><strong>📧 Email:</strong> {pedido.usuario.email}</p>
                    <p><strong>👤 Nascimento:</strong> {new Date(pedido.usuario.data_nascimento).toLocaleDateString("pt-BR")}</p>
                </section>

                <section className="info-section">
                    <h2>Detalhes do Pedido</h2>
                    <p><strong>📍 Entrega:</strong> {pedido.shippingAddress}</p>
                    <p>
                        <strong>📦 Status:</strong>{" "}
                        <span className={`status-badge status-${status.replace(/\s/g, "-").toLowerCase()}`}>
                            {status}
                        </span>
                    </p>
                    <button onClick={() => setShowStatusModal(true)} className="editar-status-btn">
                        Editar Status
                    </button>

                    <div className="tracking-box">
                        <label>🔎 Código de Rastreamento:</label>
                        <p>{trackingCode || "Não informado"}</p>
                        <button onClick={() => setShowTrackingModal(true)}>Editar Código</button>
                    </div>

                    <p><strong>💳 Pagamento:</strong> {pedido.paymentStatus}</p>
                    <p><strong>💰 Total:</strong> R$ {pedido.totalAmount.toFixed(2)}</p>
                    <p><strong>🕒 Realizado em:</strong> {new Date(pedido.createdAt).toLocaleString("pt-BR")}</p>
                </section>

                <section className="info-section">
                    <h2>Produtos</h2>
                    <div className="produtos-lista">
                        {pedido.order_items.map((item) => (
                            <div key={item.id} className="produto-item">
                                <img src={item.productThumbnail} alt={item.productName} />
                                <div>
                                    <h4>{item.productName}</h4>
                                    <p>Quantidade: {item.quantity}</p>
                                    <p>Subtotal: R$ {item.subtotal.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {showStatusModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Editar Status do Pedido</h3>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Pendente">Pendente</option>
                                <option value="Pedido Confirmado">Pedido Confirmado</option>
                                <option value="Enviado">Enviado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                            <div className="modal-actions">
                                <button onClick={handleStatusChange}>Salvar</button>
                                <button onClick={() => setShowStatusModal(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {showTrackingModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Atualizar Código de Rastreamento</h3>
                            <label>Status do Pedido:</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Processando">Processando</option>
                                <option value="Pedido Confirmado">Pedido Confirmado</option>
                                <option value="Preparando para Envio">Preparando para Envio</option>
                                <option value="Despachado">Despachado</option>
                                <option value="Em trânsito">Em trânsito</option>
                                <option value="Saiu para entrega">Saiu para entrega</option>
                                <option value="Entregue">Entregue</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>

                            <label>Localização Atual:</label>
                            <input
                                type="text"
                                value={pedido.location || ""}
                                onChange={(e) => setTrackingCode(e.target.value)}
                                placeholder="Digite a localização atual"
                            />

                            <label>Código de Rastreamento:</label>
                            <input
                                type="text"
                                value={trackingCode}
                                onChange={(e) => setTrackingCode(e.target.value)}
                                placeholder="Ex: BR123456789"
                            />

                            <div className="modal-actions">
                                <button onClick={handleTrackingCodeSave}>Salvar</button>
                                <button onClick={() => setShowTrackingModal(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
