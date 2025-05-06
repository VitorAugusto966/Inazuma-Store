import React, { useEffect } from "react";
import SellerHeader from "../../components/vendedorHeader";
import { FaBoxOpen, FaClipboardList, FaPlusCircle } from "react-icons/fa";
import "./home.css";

export default function VendedorHome() {
  useEffect(() => {
    document.title = "Painel do Vendedor";
  }, []);

  return (
    <>
      <SellerHeader />
      <div className="seller-home">
        <h1>Painel do Vendedor</h1>
        <p>Gerencie seus produtos e pedidos com praticidade.</p>

        <div className="seller-cards">
          <div className="seller-card">
            <FaBoxOpen className="seller-icon" />
            <h2>Meus Produtos</h2>
            <p>Visualize, edite ou remova seus produtos.</p>
          </div>
          <div className="seller-card">
            <FaClipboardList className="seller-icon" />
            <h2>Pedidos</h2>
            <p>Acompanhe os pedidos feitos para sua loja.</p>
          </div>
          <div className="seller-card">
            <FaPlusCircle className="seller-icon" />
            <h2>Adicionar Produto</h2>
            <p>Cadastre novos produtos na plataforma.</p>
          </div>
        </div>
      </div>
    </>
  );
}
