import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const totalItens = useSelector(state => state.cart.cartItems.length);
  const [produto, setProduto] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (produto.trim()) {
      navigate(`/busca/${produto}`);
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm">
      <Container>
        <Navbar.Brand href="/home" className="fw-bold text-primary">
          🛒 Inazuma Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Form className="d-flex search-form mx-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Buscar produtos..."
              className="search-input"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />
            <Button variant="primary" className="search-btn" type="submit">
              <FiSearch />
            </Button>
          </Form>

          <Nav className="ms-auto nav-icons">
            <Nav.Link href="/favorito" className="nav-item">
              <FiHeart className="fav" size={20} /> <span className="nav-text" id="fav-text">Favoritos</span>
            </Nav.Link>
            <Nav.Link href="/cart" className="nav-item cart-icon">
              <FiShoppingCart size={20} />
              {totalItens > 0 && <span className="cart-badge">{totalItens}</span>}
              <span className="nav-text">Carrinho</span>
            </Nav.Link>
            <Nav.Link href="/profile" className="nav-item">
              <FiUser size={20} /> <span className="nav-text">Conta</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
