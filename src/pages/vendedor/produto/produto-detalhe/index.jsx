import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import VendedorHeader from "../../../components/vendedorHeader";
import { toast } from "react-toastify";
import "./prodDetail.css";

export default function ProdutoVendedorDetalhe() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const produto = state?.produto;

  useEffect(() => {
    if (!produto) {
      toast.error("Produto não encontrado.");
      navigate("/vendedor/produtos");
    }
  }, [produto, navigate]);

  if (!produto) return <p className="carregando-texto">Carregando...</p>;

  const {
    title,
    description,
    brand,
    category,
    price,
    discountPercentage,
    stock,
    thumbnail,
    images,
  } = produto;

  return (
    <>
      <VendedorHeader />
      <div className="visualizar-produto-container">
        <div className="visualizar-produto-card">
          <div className="imagens-produto">
            {thumbnail && (
              <img
                className="principal"
                src={thumbnail}
                alt="Imagem principal"
              />
            )}

            {images?.length > 1 && (
              <div className="galeria">
                {images.map((img, index) => (
                  <img key={index} src={img} alt={`Imagem ${index + 1}`} />
                ))}
              </div>
            )}
          </div>

          <div className="detalhes-produto">
            <h1>{title}</h1>
            <p className="descricao">
              <strong>Descrição:</strong> {description}
            </p>
            <p>
              <strong>Marca:</strong> {brand}
            </p>
            <p>
              <strong>Categoria:</strong> {category}
            </p>
            <p>
              <strong>Preço:</strong> R$ {price?.toFixed(2)}
            </p>
            <p>
              <strong>Desconto:</strong> {discountPercentage}%
            </p>
            <p>
              <strong>Estoque:</strong> {stock} unidades
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
