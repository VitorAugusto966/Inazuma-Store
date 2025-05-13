import React, { useState } from 'react';
import VendedorHeader from '../../components/vendedorHeader';
import './cadProduto.css';
import { createProduct } from '../../../services/sellerService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroProduto() {
  const [produto, setProduto] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: '',
    images: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...produto.images];
    updatedImages[index] = value;
    setProduto({ ...produto, images: updatedImages });
  };

  const addImageField = () => {
    setProduto({ ...produto, images: [...produto.images, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let seller = { id: 1 };

    const produtoComVendedor = {
      ...produto,
      price: parseFloat(produto.price),
      discountPercentage: parseFloat(produto.discountPercentage || 0),
      stock: parseInt(produto.stock, 10),
      sellerId: seller.id,
    };

    try {
      await createProduct(produtoComVendedor);
      toast.success('Produto cadastrado com sucesso!');
      setProduto({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        stock: '',
        brand: '',
        category: '',
        thumbnail: '',
        images: [''],
      });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      toast.error('Erro ao cadastrar produto.');
    }
  };

  return (
    <>
      <VendedorHeader />
      <div className="produto-cadastro-container">
        <h2 className="produto-title">Cadastro de Produto</h2>
        <form onSubmit={handleSubmit} className="produto-form">
          <div className="produto-form-group produto-form-group-full">
            <label htmlFor="title">Nome do Produto:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={produto.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="produto-form-group produto-form-group-full">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={produto.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="produto-form-group">
            <label htmlFor="price">Preço (R$):</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              value={produto.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="produto-form-group">
            <label htmlFor="discountPercentage">Desconto (%):</label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              step="0.01"
              value={produto.discountPercentage}
              onChange={handleChange}
            />
          </div>

          <div className="produto-form-group">
            <label htmlFor="stock">Estoque:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={produto.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="produto-form-group">
            <label htmlFor="brand">Marca:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={produto.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="produto-form-group">
            <label htmlFor="category">Categoria:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={produto.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="produto-form-group produto-form-group-full">
            <label htmlFor="thumbnail">Imagem principal (URL):</label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={produto.thumbnail}
              onChange={handleChange}
            />
          </div>

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
              onClick={addImageField}
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
