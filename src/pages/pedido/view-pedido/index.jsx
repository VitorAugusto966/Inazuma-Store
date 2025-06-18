import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sideBar";
import { useSelector, } from "react-redux";
import { FaBoxOpen, FaClipboardList, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import "./viewPedido.css";
import { getAllUserOrders } from "../../../services/orderService";

export default function MeusPedidos() {

  const user = useSelector((state) => state.user.user);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    document.title = "Inazuma Store - Meus Pedidos";

    const fetchPedidos = async () => {
      if (!user?.id) return;

      try {
        const response = await getAllUserOrders(user.id, user.token)
        if (response) {
          setPedidos(response);

        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchPedidos();
  }, [user]);

  return (
    <>
      <Header />
      <div className="app-container">
        <Sidebar />
        <div className="content-container-pedido">
          <div className="pedidos-container">
            <h2>Meus Pedidos</h2>
            <div className="pedidos-list">
              {pedidos.length === 0 ? (
                <p className="empty-list">Nenhum pedido realizado.</p>
              ) : (
                pedidos.map((pedido, index) => (
                  <div className="pedido-card" key={index}>
                    <div className="pedido-info">
                      <p><FaClipboardList className="icon" /> <strong>Pedido:</strong> {pedido.id}</p>
                      <p><FaBoxOpen className="icon" /> <strong>Data:</strong> {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}</p>
                      <p><strong>Valor:</strong> R$ {pedido.totalAmount}</p>
                      <p>
                        <strong>Status:</strong>
                        <span className={`status ${pedido.status.replace(" ", "-").toLowerCase()}`}>
                          {pedido.status}
                        </span>
                      </p>
                    </div>
                    <div className="buttons-container">
                      <Link to={`/pedido-detalhe/`} state={{ pedido }} className="details-btn">
                        <FaInfoCircle /> Detalhes
                      </Link>
                      <Link to="/pedido-map"  state={{pedido}} className="track-btn">
                        <FaMapMarkerAlt /> Rastrear Pedido
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
