import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VendedorHeader from "../../../components/vendedorHeader";
import { updateProduct } from "../../../../services/sellerService";
import "./editProduto.css";

export default function EditarProdutoVendedor() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [produtoEdit, setProdutoEdit] = useState(null);

  useEffect(() => {
    if (!state || !state.produto) {
      toast.error("Produto não encontrado.");
      navigate("/vendedor/produtos");
    } else {
      setProdutoEdit(state.produto);
    }
  }, [state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultado = await updateProduct(produtoEdit.id, produtoEdit);
    if (resultado) {
      toast.success("Produto atualizado com sucesso!");
      setTimeout(() => {
        navigate("/vendedor/produtos");
      }, 1000);
    } else {
      toast.error("Erro ao atualizar o produto.");
    }
  };

  if (!produtoEdit) return <p>Carregando...</p>;

  return (
    <>
      <VendedorHeader />
      <div className="editar-produto-wrapper">
        <ToastContainer autoClose={5000} position="top-right" />
        <form className="editar-produto-form-layout" onSubmit={handleSubmit}>
          <h2>Editar Produto</h2>
          <div className="form-section">
            <div className="form-column">
              <label>Título</label>
              <input
                name="title"
                value={produtoEdit.title}
                onChange={handleChange}
                required
              />

              <label>Marca</label>
              <input
                name="brand"
                value={produtoEdit.brand}
                onChange={handleChange}
                required
              />

              <label>Categoria</label>
              <input
                name="category"
                value={produtoEdit.category}
                onChange={handleChange}
                required
              />

              <label>Preço</label>
              <input
                type="number"
                name="price"
                value={produtoEdit.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-column">
              <label>Descrição</label>
              <textarea
                name="description"
                value={produtoEdit.description}
                onChange={handleChange}
                rows={6}
                required
              />

              <label>Desconto (%)</label>
              <input
                type="number"
                name="discountPercentage"
                value={produtoEdit.discountPercentage}
                onChange={handleChange}
                required
              />

              <label>Estoque</label>
              <input
                type="number"
                name="stock"
                value={produtoEdit.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">Salvar Alterações</button>
        </form>
      </div>
    </>
  );
}
