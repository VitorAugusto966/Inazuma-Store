import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMapPin, FiPackage, FiGift, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { clearFavorites } from "../../redux/favorito/favoritoSlice";
import "./sideBar.css";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites()); 
    navigate("/"); 
  };

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/profile"><FiUser /> Meus Dados</Link>
        </li>
        <li>
          <Link to="/endereco"><FiMapPin /> Endereços</Link>
        </li>
        <li>
          <Link to="/pedidos"><FiPackage /> Meus Pedidos</Link>
        </li>
        <li>
          <Link to="/cupons"><FiGift /> Cupons</Link>
        </li>
        <li className="logout">
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Sair
          </button>
        </li>
      </ul>
    </aside>
  );
}
