import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import VendedorHeader from "../../components/vendedorHeader";
import "./viewProduto.css";

export default function ViewProdutos({ produtos }) {
  const listaProdutos = produtos || [
    {
      id: 1,
      title: "Tênis Esportivo",
      description: "Tênis confortável e estiloso para corrida e uso diário.",
      price: 199.99,
      discountPercentage: 10,
      stock: 25,
      brand: "Nike",
      category: "Calçados",
      thumbnail: "https://dummyimage.com/400x400/000/fff&text=Produto",
    },
    {
      id: 2,
      title: "Camisa Polo",
      description: "Camisa elegante de algodão premium.",
      price: 89.9,
      discountPercentage: 5,
      stock: 40,
      brand: "Lacoste",
      category: "Roupas",
      thumbnail: "https://dummyimage.com/400x400/444/fff&text=Produto+2",
    },
  ];

  return (
    <>
      <VendedorHeader />
      <div className="view-produto-container">
        <h2>Meus Produtos</h2>
        <div className="produto-grid">
          {listaProdutos.map((produto) => (
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
