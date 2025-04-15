import React, { useEffect, useState } from "react";
import { getCuponsAdmin, criarCupom } from "../../../services/adminService";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import "./cupom.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminCupons() {
    const [cupons, setCupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [expirationDate, setExpirationDate] = useState("");

    const token = useSelector((state) => state.user.user?.token);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCuponsAdmin(token);
                setCupons(data);
            } catch (err) {
                console.error("Erro ao buscar cupons:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !expirationDate) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        const novo = await criarCupom(name, description, expirationDate, token);

        if (novo) {
            setCupons(prev => [...prev, novo]);
            toast.success("Cupom criado com sucesso!");
            setName("");
            setDescription("");
            setExpirationDate("");
        } else {
            toast.error("Erro ao criar cupom.");
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="admin-container">
                <h1>🎁 Gerenciar Cupons</h1>

                <form className="cupom-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Código do cupom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descrição do desconto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="datetime-local"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                    <button type="submit">Criar Cupom</button>
                </form>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Desconto</th>
                            <th>Validade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cupons.map((cupom) => (
                            <tr key={cupom.id}>
                                <td>{cupom.id}</td>
                                <td>{cupom.name}</td>
                                <td>{cupom.description}</td>
                                <td>
                                    {cupom.expirationDate
                                        ? new Date(cupom.expirationDate).toLocaleString("pt-BR", {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                        })
                                        : "Sem data"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
