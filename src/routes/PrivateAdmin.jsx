import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateAdmin({ children }) {
  const user = useSelector(state => state.user.user);

  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}
