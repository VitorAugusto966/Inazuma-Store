import React, { useState } from "react";
import VendedorHeader from "../../../components/vendedorHeader";
import "./cadProduto.css";
import { createProduct } from "../../../../services/sellerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CadastroProduto() {
  const [produto, setProduto] = useState(getProdutoInicial());

  function getProdutoInicial() {
    return {
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      stock: "",
      brand: "",
      category: "",
      thumbnail: "",
      images: [""],
    };
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(index, value) {
    const novasImagens = [...produto.images];
    novasImagens[index] = value;
    setProduto((prev) => ({ ...prev, images: novasImagens }));
  }

  function adicionarCampoImagem() {
    setProduto((prev) => ({ ...prev, images: [...prev.images, ""] }));
  }

  function formatarProdutoParaEnvio() {
    return {
      ...produto,
      price: parseFloat(produto.price),
      discountPercentage: parseFloat(produto.discountPercentage || 0),
      stock: parseInt(produto.stock, 10),
      sellerId: 1,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const produtoFormatado = formatarProdutoParaEnvio();

    try {
      await createProduct(produtoFormatado);
      toast.success("Produto cadastrado com sucesso!");
      setProduto(getProdutoInicial());
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast.error("Erro ao cadastrar produto.");
    }
  }

  return (
    <>
      <VendedorHeader />
      <div className="produto-cadastro-container">
        <h2 className="produto-title">Cadastro de Produto</h2>
        <form onSubmit={handleSubmit} className="produto-form">
          <FormGroup
            label="Nome do Produto"
            id="title"
            type="text"
            value={produto.title}
            onChange={handleChange}
            required
          />
          <FormGroup
            label="Descrição"
            id="description"
            type="textarea"
            value={produto.description}
            onChange={handleChange}
            required
          />
          <FormGroup
            label="Preço (R$)"
            id="price"
            type="number"
            step="0.01"
            value={produto.price}
            onChange={handleChange}
            required
          />
          <FormGroup
            label="Desconto (%)"
            id="discountPercentage"
            type="number"
            step="0.01"
            value={produto.discountPercentage}
            onChange={handleChange}
          />
          <FormGroup
            label="Estoque"
            id="stock"
            type="number"
            value={produto.stock}
            onChange={handleChange}
            required
          />
          <FormGroup
            label="Marca"
            id="brand"
            type="text"
            value={produto.brand}
            onChange={handleChange}
            required
          />
          <FormGroup
            label="Categoria"
            id="category"
            type="text"
            value={produto.category}
            onChange={handleChange}
            required
          />
          <FormGroup
            label="Imagem principal (URL)"
            id="thumbnail"
            type="text"
            value={produto.thumbnail}
            onChange={handleChange}
          />

          <div className="produto-form-group produto-form-group-full">
            <label>Galeria de Imagens (URLs):</label>
            <div className="produto-gallery-images">
              {produto.images.map((img, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  placeholder={`Imagem ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={adicionarCampoImagem}
              className="produto-add-image-button"
            >
              + Adicionar imagem
            </button>
          </div>

          <button type="submit" className="produto-submit-button">
            Cadastrar Produto
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function FormGroup({ label, id, type, value, onChange, required, step }) {
  return (
    <div
      className={`produto-form-group ${
        type === "textarea" || id === "thumbnail"
          ? "produto-form-group-full"
          : ""
      }`}
    >
      <label htmlFor={id}>{label}:</label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          step={step}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
