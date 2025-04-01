import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { login, getEndereco } from "../../services/userService";
import { setUser, updateAddress } from "../../redux/user/userSlice";
import { useDispatch} from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();

    if (!sanitizedEmail || !sanitizedPassword) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    if (attempts >= 3) {
      toast.error("Muitas tentativas. Tente novamente mais tarde.");
      return;
    }

    setLoading(true);
    try {
      const userData = await login(sanitizedEmail, sanitizedPassword);
      if (userData) {
        dispatch(setUser(userData));

        const endereco = await getEndereco(userData.id);
        if (endereco) {
          dispatch(updateAddress(endereco));
        }

        toast.success("Login efetuado com sucesso!");
        navigate("/home", { replace: true });
      } else {
        setAttempts((prev) => prev + 1);
        toast.warning("Credenciais inválidas!");
      }
    } catch (error) {
      setAttempts((prev) => prev + 1);
      toast.error(
        error?.response?.data?.message || "Erro ao fazer login. Tente novamente!"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="login-box">
        <h1 className="logo">Inazuma Store</h1>
        <p className="subtitle">Acesse sua conta para continuar</p>

        <form className="login-form" onSubmit={handleLogin}>
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
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="extra-links">
          <Link to="/cadastro-usuario" className="register-link">
            Criar uma conta
          </Link>
          <Link to="/redefinir-senha" className="forgot-link">
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
