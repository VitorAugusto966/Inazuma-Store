import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { login, getEndereco } from "../../services/userService";
import { setUser, updateAddress } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const MAX_LOGIN_ATTEMPTS = 5;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  function isFormInvalid(email, password) {
    return !email.trim() || !password.trim();
  }

  function incrementLoginAttempts() {
    setLoginAttempts((prev) => prev + 1);
  }

  function redirectUser(role) {
    const routes = {
      user: "/home",
      admin: "/admin",
      seller: "/vendedor",
    };

    const target = routes[role];
    if (target) {
      navigate(target, { replace: true });
    } else {
      toast.error("Perfil de usuário desconhecido.");
    }
  }

  async function authenticate(email, password) {
    const user = await login(email, password);
    if (!user) {
      incrementLoginAttempts();
      toast.warning("Credenciais inválidas!");
      return;
    }

    dispatch(setUser(user));

    const endereco = await getEndereco(user.id);
    if (endereco) {
      dispatch(updateAddress(endereco));
    }

    toast.success("Login efetuado com sucesso!");
    redirectUser(user.role);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();

    if (isFormInvalid(sanitizedEmail, sanitizedPassword)) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      toast.error("Muitas tentativas. Tente novamente mais tarde.");
      return;
    }

    setLoading(true);
    try {
      await authenticate(sanitizedEmail, sanitizedPassword);
    } catch (error) {
      incrementLoginAttempts();
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
