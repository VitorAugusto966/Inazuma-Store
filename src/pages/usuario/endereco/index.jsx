import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../../redux/user/userSlice";
import { createAddress, atualizarAddress } from "../../../services/userService";
import Header from "../../components/header";
import Sidebar from "../../components/sideBar";
import { FaHome, FaCity, FaMapMarkedAlt, FaHashtag, FaSave } from "react-icons/fa";
import "./endereco.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Enderecos() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [possuiEndereco, setPossuiEndereco] = useState(false);

  const enderecoInicial = {
    rua: "",
    cidade: "",
    estado: "",
    bairro: "",
    numero: "",
    cep: "",
  };

  const [formData, setFormData] = useState(enderecoInicial);

  useEffect(() => {
    document.title = "Inazuma Store - Meu Endereço";

    if (user?.address) {
      setPossuiEndereco(true);
      setFormData({ ...user.address });
    }
  }, [user]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposPreenchidos = Object.values(formData).every((valor) => valor.trim() !== "");
    if (!camposPreenchidos) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    try {
      if (possuiEndereco) {
        await atualizarAddress(user.id, formData);
        toast.success("Endereço atualizado com sucesso");
      } else {
        await createAddress(user.id, formData);
        toast.success("Endereço salvo com sucesso");
        setPossuiEndereco(true);
      }
      dispatch(updateAddress(formData));
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      toast.error("Erro ao salvar endereço.");
    }
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <ToastContainer autoClose={5000} position="top-right" />
        <Sidebar />
        <div className="content-container-end">
          <div className="enderecos-container">
            <h2>Meu Endereço</h2>
            <form onSubmit={handleSubmit} className="address-form">
              <div className="input-row-end">
                <div className="input-group-end">
                  <label htmlFor="rua">Rua</label>
                  <div className="input-wrapper">
                    <FaHome className="icon" />
                    <input
                      type="text"
                      id="rua"
                      name="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-group-end">
                  <label htmlFor="numero">Número</label>
                  <div className="input-wrapper">
                    <FaHashtag className="icon" />
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="input-row-end">
                <div className="input-group-end">
                  <label htmlFor="bairro">Bairro</label>
                  <div className="input-wrapper">
                    <FaMapMarkedAlt className="icon" />
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-group-end">
                  <label htmlFor="cidade">Cidade</label>
                  <div className="input-wrapper">
                    <FaCity className="icon" />
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="input-row-end">
                <div className="input-group-end">
                  <label htmlFor="estado">Estado</label>
                  <div className="input-wrapper">
                    <FaMapMarkedAlt className="icon" />
                    <input
                      type="text"
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-group-end">
                  <label htmlFor="cep">CEP</label>
                  <div className="input-wrapper">
                    <FaMapMarkedAlt className="icon" />
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="add-address-btn">
                <FaSave /> {possuiEndereco ? "Atualizar Endereço" : "Salvar Endereço"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
