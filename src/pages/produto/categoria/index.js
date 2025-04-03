import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../../services/produtoService";
import { addToCart } from "../../../redux/cart/cartSlice";
import { toggleFavorite } from "../../../redux/favorito/favoritoSlice";
import { getFavoritos, favoritar, excluir } from "../../../services/favoriteService";
import Header from "../../components/header";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./categoria.css";

const traduzirCategoria = (categoria) => {
    const traducoes = {
        "smartphones": "Smartphones",
        "laptops": "Notebooks",
        "home-decoration": "Decoração",
        "mens-shirts": "Roupas Masculinas",
        "womens-dresses": "Roupas Femininas",
        "furniture": "Móveis",
    };
    return traducoes[categoria] || categoria;
};

export default function Categoria() {
    const { categoria } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const favoriteItems = useSelector(state => state.favorites.favoriteItems);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        document.title = "Inazuma Store - Categoria";

        async function fetchData() {
            const listaProdutos = await getProductsByCategory(categoria);
            const produtosAjustados = listaProdutos.products.map(produto => ({
                ...produto,
                price: produto.price * 6
            }));
            setProdutos(produtosAjustados);
        }

        async function fetchFavoritos() {
            if (!user || favoriteItems.length > 0) return;
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
    }, [categoria, dispatch, user, favoriteItems]);

    const handleAddToCart = (produto) => {
        dispatch(addToCart(produto));
    };

    const handleToggleFavorite = async (produto) => {
        if (!user) {
            console.warn("Usuário não autenticado");
            return;
        }

        try {
            const isFavorite = favoriteItems.some(item => item.id === produto.id);

            if (isFavorite) {
                await excluir(user.id, produto.id);
                dispatch(toggleFavorite(produto));
            } else {
                await favoritar(user.id, produto.id);
                dispatch(toggleFavorite(produto));
            }
        } catch (error) {
            console.error("Erro ao favoritar/desfavoritar produto:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="categoria-container">
                <h2 className="categoria-title">{traduzirCategoria(categoria)}</h2>
                <div className="product-grid-categoria">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => {
                            const isFavorited = favoriteItems.some(item => item.id === produto.id);
                            return (
                                <div className="product-card-categoria" key={produto.id}
                                >
                                    
                                    <div
                                        className="favorite-icon"
                                        onClick={() => handleToggleFavorite(produto)}
                                        style={{ cursor: "pointer", background: isFavorited ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.7)" }}
                                    >
                                        <FaHeart className={`heart ${isFavorited ? "red" : "white"}`} />
                                    </div>
                                    <img
                                        src={produto.thumbnail || "https://via.placeholder.com/150"}
                                        alt={produto.title}
                                        onClick={() => navigate("/produto-detalhes", { state: { produto } })}
                                        className="product-image"
                                    />
                                    <div className="product-details">
                                        <h4>{produto.title}</h4>
                                        <p className="price">R$ {produto.price.toFixed(2)}</p>
                                        <button className="btn-buy">Comprar</button>
                                        <button className="btn-add-cart" onClick={() => handleAddToCart(produto)}>
                                            <FaShoppingCart /> Adicionar ao Carrinho
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="no-products">Nenhum produto encontrado.</p>
                    )}
                </div>
            </div>
        </>
    );
}
