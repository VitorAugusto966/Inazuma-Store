import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../services/produtoService";
import { addToCart } from "../../redux/cart/cartSlice";
import { toggleFavorite } from "../../redux/favorito/favoritoSlice";
import { getFavoritos, favoritar, excluir } from "../../services/favoriteService";
import { useNavigate } from "react-router-dom";
import {
    FaShoppingCart, FaHeart, FaLaptop, FaTshirt, FaMobileAlt, FaCouch,
    FaFemale, FaHome,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

export default function Home() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const favoriteItems = useSelector(state => state.favorites.favoriteItems);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Inazuma Store";

        async function fetchData() {
            const listaProdutos = await getAllProducts();
            const produtosAjustados = listaProdutos.products.map(produto => ({
                ...produto,
                price: produto.price * 6
            }));
            setProdutos(produtosAjustados);
        }

        async function fetchFavoritos() {
            if (!user) return;

            const favoritos = await getFavoritos(user.id);
            if (Array.isArray(favoritos)) {
                favoritos.forEach(produto => {
                    if (!favoriteItems.some(item => item.id === produto.id)) {
                        dispatch(toggleFavorite(produto));
                    }
                });
            }
        }

        fetchData();
        fetchFavoritos();
    }, [dispatch, user, favoriteItems]);

    const handleAddToCart = (produto) => {
        dispatch(addToCart(produto));
    };

    const handleToggleFavorite = async (produto) => {
        if (!user) {
            console.warn("Usuário não autenticado");
            return;
        }

        const isFavorite = favoriteItems.some(item => item.id === produto.id);
        if (isFavorite) {
            await excluir(user.id, produto.id);
        } else {
            await favoritar(user.id, produto.id);
        }

        dispatch(toggleFavorite(produto));
    };

    return (
        <>
            <Header />

            <section className="categories">
                <div className="category-list">
                    <div className="category-item" onClick={() => navigate(`/categoria/smartphones`)}>
                        <FaMobileAlt /> Smartphones
                    </div>
                    <div className="category-item" onClick={() => navigate(`/categoria/laptops`)}>
                        <FaLaptop /> Notebooks
                    </div>
                    <div className="category-item" onClick={() => navigate(`/categoria/home-decoration`)}>
                        <FaHome /> Decoração
                    </div>
                    <div className="category-item" onClick={() => navigate(`/categoria/mens-shirts`)}>
                        <FaTshirt /> Roupas Masculinas
                    </div>
                    <div className="category-item" onClick={() => navigate(`/categoria/womens-dresses`)}>
                        <FaFemale /> Roupas Femininas
                    </div>
                    <div className="category-item" onClick={() => navigate(`/categoria/furniture`)}>
                        <FaCouch /> Móveis
                    </div>
                </div>
            </section>

            <section className="highlight-products">
                <h2>Produtos em Destaque</h2>
                <div className="product-grid">
                    {produtos.slice(0, 8).map((produto) => {
                        const isFavorited = favoriteItems.some(item => item.id === produto.id);
                        return (
                            <div 
                                className="product-card" 
                                key={produto.id} 
                                onClick={() => navigate("/produto-detalhes", { state: { produto } })}
                            >
                                <div
                                    className="favorite-icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleFavorite(produto);
                                    }}
                                    style={{ background: isFavorited ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.7)" }}
                                >
                                    <FaHeart className={`heart ${isFavorited ? "red" : "white"}`} />
                                </div>
                                <img src={produto.thumbnail || "https://via.placeholder.com/200"} alt={produto.title} />
                                <h4>{produto.title}</h4>
                                <p className="product-price">R$ {produto.price.toFixed(2)}</p>
                                <button className="btn-buy">Comprar</button>
                                <button className="btn-add-cart" onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(produto);
                                }}>
                                    <FaShoppingCart /> Adicionar ao Carrinho
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

            <footer className="footer">
                <p>© 2025 Inazuma Store. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}
