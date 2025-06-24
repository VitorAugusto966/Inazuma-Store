import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cadVendedor.css";
import { registerSeller } from "../../../services/sellerService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CadastroVendedor() {
  const [nomeLoja, setNomeLoja] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [nomeVendedor, setNomeVendedor] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro de Vendedor";
  }, []);

  function validarCNPJ(cnpj) {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    if (cleanCNPJ.length !== 14 || /^(\d)\1+$/.test(cleanCNPJ)) return false;

    let tamanho = cleanCNPJ.length - 2;
    let numeros = cleanCNPJ.substring(0, tamanho);
    let digitos = cleanCNPJ.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos.charAt(0)) return false;

    tamanho++;
    numeros = cleanCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === +digitos.charAt(1);
  }

  function formatarCNPJ(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  function camposInvalidos() {
    return !nomeLoja.trim() || !nomeVendedor.trim() || !email.trim() || !senha.trim() || !cnpj.trim();
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (camposInvalidos()) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    if (!validarCNPJ(cnpj)) {
      toast.warn("CNPJ inválido");
      return;
    }

    setLoading(true);
    try {
      const response = await registerSeller(
        nomeLoja.trim(),
        nomeVendedor.trim(),
        email.trim().toLowerCase(),
        senha.trim(),
        cnpj.trim()
      );

      toast.success(response.message || "Cadastro realizado com sucesso!");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Erro ao cadastrar vendedor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vendedor-container">
      <ToastContainer autoClose={5000} position="top-right" />
      <div className="vendedor-box">
        <h1 className="vendedor-logo">Inazuma Market</h1>
        <p className="vendedor-subtitle">Cadastro de Vendedor</p>

        <form className="vendedor-form-grid" onSubmit={handleRegister}>
          <div className="vendedor-form-left">
            <div className="vendedor-group">
              <label htmlFor="nomeLoja">Nome da Loja</label>
              <input
                id="nomeLoja"
                type="text"
                placeholder="Digite o nome da loja"
                value={nomeLoja}
                onChange={(e) => setNomeLoja(e.target.value)}
              />
            </div>
            <div className="vendedor-group">
              <label htmlFor="nomeVendedor">Nome do Vendedor</label>
              <input
                id="nomeVendedor"
                type="text"
                placeholder="Digite seu nome"
                value={nomeVendedor}
                onChange={(e) => setNomeVendedor(e.target.value)}
              />
            </div>
            <div className="vendedor-group">
              <label htmlFor="cnpj">CNPJ da Loja</label>
              <input
                id="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCNPJ(formatarCNPJ(e.target.value))}
              />
            </div>
          </div>

          <div className="vendedor-form-right">
            <div className="vendedor-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="vendedor-group">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <div className="vendedor-btn-wrapper">
            <button type="submit" className="vendedor-btn" disabled={loading}>
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
          </div>
        </form>

        <div className="vendedor-links">
          <Link to="/login" className="vendedor-login-link">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
