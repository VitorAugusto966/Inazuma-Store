import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./vendedorHeader.css";

export default function SellerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="seller-header">
      <div className="seller-logo">
        <Link to="/seller">Inazuma Vendedor</Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`seller-nav ${menuOpen ? "open" : ""}`}>
        <Link to="/vendedor/produtos" onClick={() => setMenuOpen(false)}>Meus Produtos</Link>
        <Link to="/vendedor/pedidos" onClick={() => setMenuOpen(false)}>Pedidos</Link>
        <Link to="/vendedor/produto/novo" onClick={() => setMenuOpen(false)}>Novo Produto</Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>Voltar à Loja</Link>
      </nav>
    </header>
  );
}
