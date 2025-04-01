import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sideBar";
import { FaClipboardList, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import "./detailPedido.css";

export default function DetailPedido() {
    const location = useLocation();
    const pedido = location.state?.pedido;
    console.log(pedido);

    useEffect(() => {
        if (pedido) {
            document.title = `Pedido #${pedido.id} - Detalhes`;
        }
    }, [pedido]);

    if (!pedido) {
        return <p className="loading-text">Nenhum pedido encontrado.</p>;
    }

    return (
        <>
            <Header />
            <div className="app-container">
                <Sidebar />
                <div className="content-container-pedido">
                    <div className="pedido-detalhes-container">
                        <h2>Detalhes do Pedido #{pedido.id}</h2>

                        <div className="pedido-layout">
                            <div className="pedido-info">
                                <p><FaClipboardList className="icon" /> <strong>Data:</strong> {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}</p>
                                <p><strong>Valor Total:</strong> R$ {pedido.totalAmount}</p>
                                <p>
                                    <strong>Status:</strong>
                                    <span className={`status ${pedido.status.replace(" ", "-").toLowerCase()}`}>
                                        {pedido.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Pagamento:</strong>
                                    <span className={`status ${pedido.paymentStatus.replace(" ", "-").toLowerCase()}`}>
                                        {pedido.paymentStatus}
                                    </span>
                                </p>
                            </div>

                            <div className="produtos-list">
                                <h3>Produtos:</h3>
                                {pedido.order_items && pedido.order_items.length > 0 ? (
                                    <div className="produto-list-container">
                                        {pedido.order_items.map((produto, index) => (
                                            <div key={index} className="produto-item">
                                                <img src={produto.productThumbnail} alt={produto.productName} className="produto-img" />
                                                <div className="produto-info">
                                                    <p><strong>{produto.title}</strong></p>
                                                    <p>Quantidade: {produto.quantity}</p>
                                                    <p>Preço: R$ {produto.productPrice * 6}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="empty-produtos">Nenhum produto neste pedido.</p>
                                )}
                            </div>
                        </div>

                        <div className="buttons-container-d">
                            <Link to="/pedidos" className="back-btn-detail">
                                <FaArrowLeft /> Voltar para Meus Pedidos
                            </Link>
                            <Link to="/pedido-map" state={{pedido}} className="track-btn-detail">
                                <FaMapMarkerAlt /> Rastrear Pedido
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
