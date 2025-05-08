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
        <Link to="/vendedor/produtos">Meus Produtos</Link>
        <Link to="/vendedor/pedidos">Pedidos</Link>
        <Link to="/vendedor/produto/novo">Novo Produto</Link>
        <Link to="/">Voltar à Loja</Link>
      </nav>
    </header>
  );
}
