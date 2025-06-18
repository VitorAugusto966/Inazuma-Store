import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiMapPin, FiPackage, FiGift, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { clearFavorites } from "../../redux/favorito/favoritoSlice";
import "./sideBar.css";

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites());
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <ul>
        <li className={isActive("/profile") ? "active" : ""}>
          <Link to="/profile">
            <FiUser /> <span>Meus Dados</span>
          </Link>
        </li>
        <li className={isActive("/endereco") ? "active" : ""}>
          <Link to="/endereco">
            <FiMapPin /> <span>Endereços</span>
          </Link>
        </li>
        <li className={isActive("/pedidos") ? "active" : ""}>
          <Link to="/pedidos">
            <FiPackage /> <span>Meus Pedidos</span>
          </Link>
        </li>
        <li className={isActive("/cupons") ? "active" : ""}>
          <Link to="/cupons">
            <FiGift /> <span>Cupons</span>
          </Link>
        </li>
        <li className="logout">
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> <span>Sair</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}
