import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cadUser.css";
import { register } from "../../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CadastroUsuario() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function isFormInvalid() {
    return !email.trim() || !password.trim() || !userName.trim();
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (isFormInvalid()) {
      toast.warn("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const userData = await register(
        "", 
        userName.trim(),
        email.trim().toLowerCase(),
        "01/01/2000", 
        password.trim()
      );

      if (userData) {
        toast.success(userData.message || "Cadastro realizado com sucesso!");
        navigate("/login", { replace: true });
      } else {
        toast.warning("Usuário inválido!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Erro ao cadastrar. Tente novamente!"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="register-box">
        <h1 className="logo">Inazuma Market</h1>
        <p className="subtitle">Crie sua conta</p>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu nome de usuário"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <div className="extra-links">
          <Link to="/cadastro-vendedor" className="login-link">
            Seja vendedor
          </Link>
          <Link to="/login" className="login-link">
            Faça Login
          </Link>
        </div>
      </div>
    </div>
  );
}
