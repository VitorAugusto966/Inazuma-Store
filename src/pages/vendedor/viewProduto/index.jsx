import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import VendedorHeader from "../../components/vendedorHeader";
import { getProductsBySeller } from "../../../services/sellerService";
import "./viewProduto.css";

export default function ViewProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const seller = useSelector((state) => state.user.user);

  console.log(seller);
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProductsBySeller(seller.id);
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setMensagem("Erro ao carregar os produtos.");
      }
    };

    fetchProdutos();
  }, [seller]);

  return (
    <>
      <VendedorHeader />
      <div className="view-produto-container">
        {mensagem && <p className="mensagem">{mensagem}</p>}

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
                <button className="btn-ver">
                  <FaEye /> Ver
                </button>
                <button className="btn-editar">
                  <FaEdit /> Editar
                </button>
                <button className="btn-remover">
                  <FaTrash /> Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
