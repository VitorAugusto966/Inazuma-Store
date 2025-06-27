import React, { useEffect } from "react";
import SellerHeader from "../../components/vendedorHeader";
import { FaBoxOpen, FaClipboardList, FaPlusCircle } from "react-icons/fa";
import "./home.css";

export default function VendedorHome() {
  useEffect(() => {
    setPageTitle();
  }, []);

  function setPageTitle() {
    document.title = "Painel do Vendedor";
  }

  const cardInfo = [
    {
      icon: <FaBoxOpen className="seller-icon" />,
      title: "Meus Produtos",
      description: "Visualize, edite ou remova seus produtos.",
    },
    {
      icon: <FaClipboardList className="seller-icon" />,
      title: "Pedidos",
      description: "Acompanhe os pedidos feitos para sua loja.",
    },
    {
      icon: <FaPlusCircle className="seller-icon" />,
      title: "Adicionar Produto",
      description: "Cadastre novos produtos na plataforma.",
    },
  ];

  return (
    <>
      <SellerHeader />

      <main className="seller-home">
        <header>
          <h1>Painel do Vendedor</h1>
          <p>Gerencie seus produtos e pedidos com praticidade.</p>
        </header>

        <section className="seller-cards">
          {cardInfo.map((card, index) => (
            <div className="seller-card" key={index}>
              {card.icon}
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
