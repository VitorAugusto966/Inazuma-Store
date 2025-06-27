import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendedorHeader from "../../../components/vendedorHeader";
import { updateProduct } from "../../../../services/sellerService";
import "./editProduto.css";

export default function EditarProdutoVendedor() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    if (!state?.produto) {
      toast.error("Produto não encontrado.");
      navigate("/vendedor/produtos");
    } else {
      setProduto(state.produto);
    }
  }, [state, navigate]);

  function handleChange(e) {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? parseFloat(value) || 0 : value;

    setProduto((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resultado = await updateProduct(produto.id, produto);
      toast.success("Produto atualizado com sucesso!");
      setTimeout(() => {
        navigate("/vendedor/produtos");
      }, 1000);
    } catch (error) {
      toast.error("Erro ao atualizar o produto.");
    }
  }

  if (!produto) return <p className="carregando-texto">Carregando...</p>;

  return (
    <>
      <VendedorHeader />
      <ToastContainer autoClose={5000} position="top-right" />

      <div className="editar-produto-wrapper">
        <form className="editar-produto-form-layout" onSubmit={handleSubmit}>
          <h2>Editar Produto</h2>

          <div className="form-section">
            <div className="form-column">
              <label htmlFor="title">Título</label>
              <input
                name="title"
                value={produto.title}
                onChange={handleChange}
                required
              />

              <label htmlFor="brand">Marca</label>
              <input
                name="brand"
                value={produto.brand}
                onChange={handleChange}
                required
              />

              <label htmlFor="category">Categoria</label>
              <input
                name="category"
                value={produto.category}
                onChange={handleChange}
                required
              />

              <label htmlFor="price">Preço</label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={produto.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-column">
              <label htmlFor="description">Descrição</label>
              <textarea
                name="description"
                value={produto.description}
                onChange={handleChange}
                rows={6}
                required
              />

              <label htmlFor="discountPercentage">Desconto (%)</label>
              <input
                type="number"
                name="discountPercentage"
                step="0.01"
                value={produto.discountPercentage}
                onChange={handleChange}
                required
              />

              <label htmlFor="stock">Estoque</label>
              <input
                type="number"
                name="stock"
                value={produto.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="editar-produto-btn">
            Salvar Alterações
          </button>
        </form>
      </div>
    </>
  );
}
