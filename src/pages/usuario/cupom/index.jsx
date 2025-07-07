import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import Sidebar from "../../components/sideBar";
import { FaTag, FaGift, FaCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCupons, aplicarCupom } from "../../../services/cupomService";
import "./cupom.css";

export default function Cupons() {
  const [cupons, setCupons] = useState([]);
  const [novoCupom, setNovoCupom] = useState("");
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  const carregarCupons = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await getCupons(userId);
      setCupons(response || []);
    } catch (error) {
      toast.error("Erro ao carregar cupons");
    }
  }, [userId]);

  useEffect(() => {
    document.title = "Inazuma Store - Meus Cupons";
    carregarCupons();
  }, [carregarCupons]);

  const validarCupom = () => {
    if (!userId) {
      toast.error("Você precisa estar logado para aplicar um cupom!");
      return false;
    }
    if (novoCupom.trim() === "") {
      toast.warning("Digite um cupom válido!");
      return false;
    }
    return true;
  };

  const handleAplicarCupom = async () => {
    if (!validarCupom()) return;

    try {
      const resultado = await aplicarCupom(userId, novoCupom, user.token);

      if (resultado) {
        toast.success(`Cupom "${novoCupom}" aplicado com sucesso!`);
        setNovoCupom("");
        carregarCupons();
      } else {
        toast.error("Erro ao aplicar cupom. Verifique o código e tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao aplicar cupom.");
    }
  };

  const renderCupomCard = (cupom, index) => (
    <div className="cupom-card" key={index}>
      <div className="cupom-info">
        <p><FaTag className="icon" /> <strong>{cupom.name}</strong></p>
        <p>Desconto: <strong>{cupom.description}</strong></p>
        <p>
          Válido até:{" "}
          <strong>
            {cupom.expirationDate
              ? new Date(cupom.expirationDate).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })
              : "Sem data de validade"}
          </strong>
        </p>
      </div>
      <FaCheckCircle className="check-icon" />
    </div>
  );

  return (
    <>
      <Header />
      <div className="app-container">
        <ToastContainer autoClose={5000} position="top-right" />
        <Sidebar />

        <div className="content-container">
          <div className="cupons-container">
            <h2><FaGift color="#007bff" /> Meus Cupons</h2>

            {user ? (
              <>
                <div className="cupons-list">
                  {cupons.length > 0
                    ? cupons.map(renderCupomCard)
                    : <p className="sem-cupons">Nenhum cupom disponível</p>}
                </div>

                <div className="cupom-input-container">
                  <input
                    type="text"
                    placeholder="Digite seu cupom"
                    value={novoCupom}
                    onChange={(e) => setNovoCupom(e.target.value)}
                  />
                  <button onClick={handleAplicarCupom}>Aplicar</button>
                </div>
              </>
            ) : (
              <p className="aviso-login">Você precisa estar logado para ver seus cupons.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
