import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../../services/produtoService";
import { addToCart } from "../../../redux/cart/cartSlice";
import { toggleFavorite } from "../../../redux/favorito/favoritoSlice";
import { getFavoritos, favoritar, excluir } from "../../../services/favoriteService";
import Header from "../../components/header";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./busca.css";

export default function Busca() {
    const { produto } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const favoriteItems = useSelector(state => state.favorites.favoriteItems);
    const [produtos, setProdutos] = useState([]);
    const fetchedFavorites = useRef(false);

    useEffect(() => {
        document.title = "Inazuma Store - Busca"
        async function fetchData() {
            try {
                const resultado = await searchProducts(produto);
                const produtosAjustados = resultado.products.map(produto => ({
                    ...produto,
                    price: produto.price * 6
                }));
                setProdutos(produtosAjustados);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        }

        async function fetchFavoritos() {
            if (!user || fetchedFavorites.current) return;
            fetchedFavorites.current = true;

            try {
                const favoritos = await getFavoritos(user.id);
                if (Array.isArray(favoritos)) {
                    favoritos.forEach(produto => {
                        if (!favoriteItems.some(item => item.id === produto.id)) {
                            dispatch(toggleFavorite(produto));
                        }
                    });
                }
            } catch (error) {
                console.error("Erro ao buscar favoritos:", error);
            }
        }

        fetchData();
        fetchFavoritos();
    }, [produto, dispatch, user, favoriteItems]);

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
            } else {
                await favoritar(user.id, produto.id);
            }

            dispatch(toggleFavorite(produto));
        } catch (error) {
            console.error("Erro ao favoritar/desfavoritar produto:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="busca-container">
                <h2 className="busca-title">Resultados para: "{produto}"</h2>
                <div className="product-grid-busca">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => {
                            const isFavorited = favoriteItems.some(item => item.id === produto.id);
                            return (
                                <div key={produto.id} className="product-card-busca">
                                    
                                    <div
                                        className="favorite-icon"
                                        onClick={() => handleToggleFavorite(produto)}
                                        style={{ background: isFavorited ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.7)" }}
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
