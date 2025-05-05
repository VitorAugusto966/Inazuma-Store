import React, { useEffect } from "react";
import AdminHeader from "../../components/adminHeader";
import { FaTag, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import "./home.css";

export default function AdminHome() {
  useEffect(() => {
    document.title = "Admin Home"
  })

  return (
    <>
      <AdminHeader />
      <div className="admin-home">
        <h1>Painel Administrativo</h1>
        <p>Gerencie cupons, produtos e pedidos da Inazuma Store com eficiência.</p>

        <div className="admin-cards">
          <div className="admin-card">
            <FaTag className="admin-icon" />
            <h2>Cupons</h2>
            <p>Crie e acompanhe promoções ativas.</p>
          </div>
          <div className="admin-card">
            <FaBoxOpen className="admin-icon" />
            <h2>Produtos</h2>
            <p>Adicione, edite e organize os produtos da loja.</p>
          </div>
          <div className="admin-card">
            <FaClipboardList className="admin-icon" />
            <h2>Pedidos</h2>
            <p>Acompanhe os pedidos em tempo real.</p>
          </div>
        </div>
      </div>
    </>
  );
}
