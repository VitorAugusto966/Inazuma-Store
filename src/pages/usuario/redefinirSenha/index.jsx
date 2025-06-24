import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { resetPassword } from "../../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./redefinir.css";

export default function RedefinirSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Redefinir Senha";
  }, []);

  function isEmailEmpty() {
    return !email.trim();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isEmailEmpty()) {
      toast.warn("Informe um e-mail válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email.trim().toLowerCase());

      toast.success(
        response.message ||
        "Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha."
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Erro ao enviar o e-mail. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer autoClose={5000} position="top-right" pauseOnHover />

      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <h2 className="logo">Esqueceu sua senha?</h2>
          <p className="subtitle-redefinir">
            Digite seu e-mail cadastrado e enviaremos uma nova senha temporária.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group-redefinir">
              <FiMail className="icon" />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Nova Senha"}
            </button>
          </form>

          <Link to="/login" className="back-link">
            <FiArrowLeft /> Voltar para Login
          </Link>
        </div>
      </div>
    </>
  );
}
