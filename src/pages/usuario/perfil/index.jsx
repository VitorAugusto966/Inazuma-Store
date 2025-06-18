import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../redux/user/userSlice";
import { atualizarUser } from "../../../services/userService";
import Header from "../../components/header";
import Sidebar from "../../components/sideBar";
import { FaUser, FaEnvelope, FaCalendarAlt, FaSave } from "react-icons/fa";
import "./perfil.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    nome_social: user?.nome_social || "",
    nome_usuario: user?.nome_usuario || "",
    email: user?.email || "",
    data_nascimento: user?.data_nascimento || ""
  });

  useEffect(() => {
    setFormData({
      nome_social: user?.nome_social || "",
      nome_usuario: user?.nome_usuario || "",
      email: user?.email || "",
      data_nascimento: user?.data_nascimento || ""
    });
  }, [user]);

  useEffect(() => {
    document.title = "Inazuma Store - Meu Perfil";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const userData = await atualizarUser(user.id, formData)
      if (userData) {
        toast.success("Usuário atualizado com sucesso");
      } else {
        toast.warning("Usuário inválido!");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }

    dispatch(updateUser({
      nome_social: formData.nome_social,
      nome_usuario: formData.nome_usuario,
      data_nascimento: formData.data_nascimento
    }));
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <ToastContainer
          autoClose={5000}
          position="top-right"
        />
        <Sidebar />
        <div className="content-container">
          <div className="profile-container">
            <div className="profile-box">
              <h2>Perfil</h2>
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="input-row">
                  <label htmlFor="nome_social">Nome Social:</label>
                  <div className="input-group-form">
                    <FaUser className="icon" />
                    <input
                      id="nome_social"
                      type="text"
                      name="nome_social"
                      placeholder="Nome Social"
                      value={formData.nome_social}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <label htmlFor="nome_usuario">Nome de Usuário:</label>
                  <div className="input-group-form">
                    <FaUser className="icon" />
                    <input
                      id="nome_usuario"
                      type="text"
                      name="nome_usuario"
                      placeholder="Nome de Usuário"
                      value={formData.nome_usuario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-row">
                  <label htmlFor="email">E-mail:</label>
                  <div className="input-group-form">
                    <FaEnvelope className="icon" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      disabled
                    />
                  </div>

                  <label htmlFor="data_nascimento">Data de Nascimento:</label>
                  <div className="input-group-form">
                    <FaCalendarAlt className="icon" />
                    <input
                      id="data_nascimento"
                      type="date"
                      name="data_nascimento"
                      value={formData.data_nascimento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="save-btn" disabled={loading}>
                  <FaSave />
                  {loading ? "Carregando..." : "Salvar Alterações"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
