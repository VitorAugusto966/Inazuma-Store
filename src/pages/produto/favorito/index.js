import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../../redux/favorito/favoritoSlice";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../../redux/cart/cartSlice";
import { getFavoritos, favoritar, excluir } from "../../../services/favoriteService";
import Header from "../../components/header";
import "./fav.css";

export default function Favorites() {
    const [loading, setLoading] = useState(true);
    const [fetched, setFetched] = useState(false);
    const favoriteItems = useSelector(state => state.favorites.favoriteItems);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Inazuma Store - Favoritos";

        async function fetchFavoritos() {
            if (!user || fetched) return;

            setLoading(true);
            try {
                const favoritos = await getFavoritos(user.id);
                console.log("Resposta da API:", favoritos);

                if (Array.isArray(favoritos)) {
                    favoritos.forEach(produto => {
                        if (!favoriteItems.some(item => item.id === produto.id)) {
                            dispatch(toggleFavorite(produto));
                        }
                    });
                } else {
                    console.error("Erro: favoritos não é um array", favoritos);
                }
            } catch (error) {
                console.error("Erro ao buscar favoritos:", error);
            }

            setLoading(false);
            setFetched(true);
        }

        fetchFavoritos();
    }, [dispatch, user, favoriteItems, fetched]);

    const handleToggleFavorite = async (produto) => {
        if (!user) {
            console.warn("Usuário não autenticado");
            return;
        }

        const isFavorite = favoriteItems.some(item => item.id === produto.id);

        try {
            if (isFavorite) {
                await excluir(user.id, produto.id);
            } else {
                await favoritar(user.id, produto.id);
            }
            dispatch(toggleFavorite(produto));
        } catch (error) {
            console.error("Erro ao favoritar/desfavoritar:", error);
        }
    };

    const handleAddToCart = (produto) => {
        dispatch(addToCart(produto));
    };

    return (
        <>
            <Header />
            <section className="favorites-container">
                <h2>Seus Favoritos</h2>

                {loading ? (
                    <p>Carregando favoritos...</p>
                ) : !user ? (
                    <p className="empty-favorites">Faça login para ver seus favoritos.</p>
                ) : favoriteItems.length === 0 ? (
                    <p className="empty-favorites">Você ainda não tem itens favoritos.</p>
                ) : (
                    <div className="favorites-grid">
                        {favoriteItems.map((item, index) => {
                            const price = item.price ?? item.product?.price;
                            const thumbnail = item.thumbnail ?? item.product?.thumbnail;

                            return (
                                <div className="favorite-card" key={item.id ?? `favorite-${index}`}>
                                    {thumbnail ? (
                                        <img src={thumbnail} alt={item.title} />
                                    ) : (
                                        <p>Imagem indisponível</p>
                                    )}
                                    <h4>{item.title}</h4>
                                    <p>{price !== undefined ? `R$ ${price.toFixed(2)}` : "Preço indisponível"}</p>
                                    <div className="favorite-actions">
                                        <button className="remove-favorite" onClick={() => handleToggleFavorite(item)}>
                                            <FaHeart /> {favoriteItems.some(fav => fav.id === item.id) ? "Remover" : "Favoritar"}
                                        </button>
                                        <button className="btn-cart" onClick={() => handleAddToCart(item)} disabled={price === undefined}>
                                            <FaShoppingCart /> {price !== undefined ? "Adicionar ao Carrinho" : "Indisponível"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </>
    );
}
