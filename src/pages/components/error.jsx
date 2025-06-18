import { useNavigate } from "react-router-dom";
import Header from "./header";
import { FaExclamationTriangle } from "react-icons/fa";
import "./error.css";

export default function Error() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <h1>Oops! Página não encontrada.</h1>
        <p>A página que você procura pode ter sido removida ou não existe.</p>
        <button onClick={() => navigate("/home")} className="btn-return">
          Voltar para a tela inicial
        </button>
      </div>
    </>
  );
}
