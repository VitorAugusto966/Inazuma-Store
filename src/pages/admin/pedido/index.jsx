import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/adminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPedidosAdmin } from "../../../services/adminService";
import "./pedido.css";

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.user.user?.token);
    const navigate = useNavigate(); 

    useEffect(() => {
        async function fetchPedidos() {
            try {
                const data = await getPedidosAdmin(token);
                setPedidos(data);
                console.log(data)
            } catch (err) {
                toast.error("Erro ao buscar pedidos.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPedidos();
    }, [token]);

    if (loading) return <p>Carregando pedidos...</p>;

    return (
        <>
            <AdminHeader />
            <ToastContainer />
            <div className="admin-container">
                <h1>📦 Pedidos Recebidos</h1>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.usuario?.nome_usuario || "N/A"}</td>
                                <td>{new Date(pedido.createdAt).toLocaleString("pt-BR", {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}</td>
                                <td>
                                    <span
                                        className={`status-label ${pedido.status === "Pedido Confirmado"
                                            ? "status-confirmado"
                                            : pedido.status === "Cancelado"
                                                ? "status-cancelado"
                                                : pedido.status === "Enviado"
                                                    ? "status-enviado"
                                                    : "status-pendente"
                                            }`}
                                    >
                                        {pedido.status}
                                    </span>
                                </td>
                                <td>R$ {pedido.totalAmount?.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="gerenciar-btn"
                                        onClick={() => navigate("/admin/pedidos/gerenciar", { state: pedido })}
                                    >
                                        Gerenciar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
