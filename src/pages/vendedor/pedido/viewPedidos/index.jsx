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
    fetchPedidos();
  }, [token]);

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

  function getStatusClass(status) {
    switch (status) {
      case "Pedido Confirmado":
        return "status-confirmado";
      case "Enviado":
        return "status-enviado";
      case "Cancelado":
        return "status-cancelado";
      default:
        return "status-pendente";
    }
  }

  function formatarData(data) {
    return new Date(data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  function renderTabelaPedidos() {
    return (
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
              <td>{formatarData(pedido.createdAt)}</td>
              <td>
                <span
                  className={`status-label ${getStatusClass(pedido.status)}`}
                >
                  {pedido.status}
                </span>
              </td>
              <td>R$ {pedido.totalAmount?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderMensagemVazia() {
    return (
      <p className="mensagem-pedidos">
        {erro ? "Erro ao carregar pedidos." : "Nenhum pedido encontrado."}
      </p>
    );
  }

  return (
    <>
      <VendedorHeader />
      <ToastContainer autoClose={5000} position="top-right" />

      <div className="seller-container">
        <h1>📦 Meus Pedidos</h1>

        {loading ? (
          <p className="mensagem-pedidos">Carregando pedidos...</p>
        ) : pedidos.length === 0 || erro ? (
          renderMensagemVazia()
        ) : (
          renderTabelaPedidos()
        )}
      </div>
    </>
  );
}
