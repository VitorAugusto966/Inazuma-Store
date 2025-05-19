import { useLocation, useNavigate } from "react-router-dom";
import VendedorHeader from "../../../components/vendedorHeader";
import { useEffect } from "react";
import "./prodDetail.css";
import { toast } from "react-toastify";

export default function ProdutoVendedorDetalhe() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.produto) {
      toast.error("Produto não encontrado.");
      navigate("/vendedor/produtos");
    }
    console.log(state)
  }, [state, navigate]);

  if (!state || !state.produto) return <p>Carregando...</p>;

  const { produto } = state;

  return (
    <>
      <VendedorHeader />
      <div className="visualizar-produto-container">
        <div className="visualizar-produto-card">
          <div className="imagens-produto">
            <img
              className="principal"
              src={produto.thumbnail}
              alt="thumbnail"
            />
            {produto.images && produto.images.length > 1 && (
              <div className="galeria">
                {produto.images.map((img, index) => (
                  <img key={index} src={img} alt={`Imagem ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
          <div className="detalhes-produto">
            <h1>Produto:{produto.title}</h1>
            <p className="descricao"><strong>Descrição: </strong>{produto.description}</p>
            <p>
              <strong>Marca:</strong> {produto.brand}
            </p>
            <p>
              <strong>Categoria:</strong> {produto.category}
            </p>
            <p>
              <strong>Preço:</strong> R$ {produto.price.toFixed(2)}
            </p>
            <p>
              <strong>Desconto:</strong> {produto.discountPercentage}%
            </p>
            <p>
              <strong>Estoque:</strong> {produto.stock} unidades
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
