import React from "react";
import { Link } from "react-router-dom";
import "./vendedorHeader.css";

export default function SellerHeader() {
  return (
    <header className="seller-header">
      <div className="seller-logo">
        <Link to="/seller">Inazuma Vendedor</Link>
      </div>
      <nav className="seller-nav">
        <Link to="/seller/produtos">Meus Produtos</Link>
        <Link to="/seller/pedidos">Pedidos</Link>
        <Link to="/seller/produtos/novo">Novo Produto</Link>
        <Link to="/">Voltar à Loja</Link>
      </nav>
    </header>
  );
}
