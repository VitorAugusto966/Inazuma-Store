import React, { useEffect, useState } from "react";
import { getUsuariosAdmin } from "../../../services/adminService";
import "./usuario.css";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.user.user?.token);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsuariosAdmin(token);
        setUsuarios(data);

        if (data.length === 0) {
          navigate("/");
        }
      } catch (err) {

        navigate("/");
        console.error("Erro ao buscar usuários:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, navigate]);

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <div className="admin-container">
        <h1>👤 Usuários Cadastrados</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Admin?</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome_usuario}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge admin">Sim</span>
                  ) : (
                    <span className="badge not-admin">Não</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
