import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import VendedorHeader from "../../../components/vendedorHeader";
import {
  getProductsBySeller,
  deleteProduct,
} from "../../../../services/sellerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./viewProduto.css";

Modal.setAppElement("#root");

export default function ViewProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { id: sellerId } = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const lista = await getProductsBySeller(sellerId);
        setProdutos(lista);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro ao carregar os produtos.");
      }
    }

    if (sellerId) carregarProdutos();
  }, [sellerId]);

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setModalIsOpen(true);
  };

  const fecharModal = () => {
    setModalIsOpen(false);
    setProdutoSelecionado(null);
  };

  const removerProduto = async () => {
    if (!produtoSelecionado) return;

    try {
      const sucesso = await deleteProduct(produtoSelecionado.id);
      if (sucesso) {
        toast.success("Produto removido com sucesso!");
        setProdutos((prev) =>
          prev.filter((p) => p.id !== produtoSelecionado.id)
        );
      } else {
        toast.error("Erro ao remover o produto.");
      }
    } catch {
      toast.error("Erro inesperado ao remover produto.");
    } finally {
      fecharModal();
    }
  };

  const redirecionarParaDetalhe = (produto) =>
    navigate("/vendedor/produto-detalhe", { state: { produto } });

  const redirecionarParaEdicao = (produto) =>
    navigate("/vendedor/produto/editar", { state: { produto } });

  const redirecionarParaCadastro = () => navigate("/vendedor/produto/novo");

  return (
    <>
      <VendedorHeader />

      <div className="view-produto-container">
        <div className="produto-grid">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              <img src={produto.thumbnail} alt={produto.title} />
              <h3>{produto.title}</h3>
              <p>
                <strong>Preço:</strong> R$ {produto.price.toFixed(2)}
              </p>
              <p>
                <strong>Estoque:</strong> {produto.stock} unidades
              </p>
              <p>
                <strong>Desconto:</strong> {produto.discountPercentage}%
              </p>
              <p>
                <strong>Marca:</strong> {produto.brand}
              </p>

              <div className="produto-actions">
                <button
                  className="btn-ver"
                  onClick={() => redirecionarParaDetalhe(produto)}
                >
                  <FaEye /> Ver
                </button>
                <button
                  className="btn-editar"
                  onClick={() => redirecionarParaEdicao(produto)}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  className="btn-remover"
                  onClick={() => abrirModal(produto)}
                >
                  <FaTrash /> Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {produtos.length === 0 && (
          <div className="no-produtos">
            <svg
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21V8H3V6ZM5 10H19V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V10ZM9 12V17H11V12H9ZM13 12V17H15V12H13Z"
                fill="#9CA3AF"
              />
            </svg>
            <h2>Você ainda não cadastrou nenhum produto.</h2>
            <p>Adicione agora para começar a vender!</p>
            <button
              className="btn-adicionar"
              onClick={redirecionarParaCadastro}
            >
              Cadastrar Produto
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Confirmação de Remoção"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Confirmar Remoção</h2>
        <p>
          Tem certeza que deseja excluir o produto{" "}
          <strong>{produtoSelecionado?.title}</strong>?
        </p>
        <div className="modal-buttons">
          <button className="btn-confirmar" onClick={removerProduto}>
            Sim, excluir
          </button>
          <button className="btn-cancelar" onClick={fecharModal}>
            Cancelar
          </button>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
}
