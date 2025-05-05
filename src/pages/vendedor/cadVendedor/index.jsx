import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cadVendedor.css";
import { registerSeller } from "../../../services/sellerService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroVendedor() {
    const [nomeLoja, setNomeLoja] = useState("");
    const [nomeVendedor, setNomeVendedor] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (!nomeLoja || !nomeVendedor || !email || !senha) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        setLoading(true);
        try {
            const response = await registerSeller(nomeLoja, nomeVendedor, email, senha );
            toast.success(response.message);
            navigate("/login", { replace: true });
        } catch (error) {
            toast.error(error?.response?.data?.error || "Erro ao cadastrar vendedor");
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

                <form className="vendedor-form" onSubmit={handleRegister}>
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

                    <button type="submit" className="vendedor-btn" disabled={loading}>
                        {loading ? "Carregando..." : "Cadastrar"}
                    </button>
                </form>

                <div className="vendedor-links">
                    <Link to="/login" className="vendedor-login-link">Já tem uma conta? Faça login</Link>
                </div>
            </div>
        </div>
    );
}
