import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPedidosSeller } from "../../../../services/sellerService";
import VendedorHeader from "../../../components/vendedorHeader";
import "./viewPedidoV.css";

export default function VendedorPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const token = useSelector((state) => state.user.user?.token);

    useEffect(() => {
        async function fetchPedidos() {
            try {
                const data = await getPedidosSeller(token);
                setPedidos(data);
            } catch (err) {
                toast.error("Erro ao buscar pedidos do vendedor.");
                setErro(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPedidos();
    }, [token]);

    if (loading) return <p className="mensagem-pedidos">Carregando pedidos...</p>;

    return (
        <>
            <VendedorHeader />
            <ToastContainer />
            <div className="seller-container">
                <h1>📦 Meus Pedidos</h1>

                {erro || pedidos.length === 0 ? (
                    <p className="mensagem-pedidos">Nenhum pedido encontrado.</p>
                ) : (
                    <table className="seller-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Total</th>
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
                                        <span className={`status-label ${
                                            pedido.status === "Pedido Confirmado"
                                                ? "status-confirmado"
                                                : pedido.status === "Cancelado"
                                                    ? "status-cancelado"
                                                    : pedido.status === "Enviado"
                                                        ? "status-enviado"
                                                        : "status-pendente"
                                        }`}>
                                            {pedido.status}
                                        </span>
                                    </td>
                                    <td>R$ {pedido.totalAmount?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
