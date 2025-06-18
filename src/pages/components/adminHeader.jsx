import React from "react";
import { Link } from "react-router-dom";
import "./adminHeader.css";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-logo">
        <Link to="/admin">Inazuma Admin</Link>
      </div>
      <nav className="admin-nav">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/cupons">Cupons</Link>
        <Link to="/admin/pedidos">Pedidos</Link>
        <Link to="/">Voltar à Loja</Link>
      </nav>
    </header>
  );
}
