import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart/cartSlice";
import Header from "../../components/header";
import "./produtoDetalhe.css";

export default function ProdutoDetalhes() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    if (location.state?.produto) {
      setProduto(location.state.produto);
    }
  }, [location.state]);

  if (!produto) {
    return <p className="loading-message">Carregando produto...</p>;
  }

  const goToCheckOut = (produto) => {
          dispatch(addToCart(produto));
          setTimeout(() => {
            navigate("/cart");
        }, 1000);
  };

  return (
    <>
      <Header />
      <div className="main-container-detail">
        <div className="product-container">
          {produto.rating && (
            <div className="product-rating">
              ⭐ {produto.rating.toFixed(1)}
            </div>
          )}

          <div className="product-image-container">
            <img className="product-image" src={produto.thumbnail} alt={produto.title} />
          </div>

          <div className="product-info">
            <h1 className="product-title">{produto.title}</h1>
            <p className="product-brand">{produto.brand}</p>
            <p className="product-description">{produto.description}</p>

            <div className="product-price-container">
              {produto.discountPercentage ? (
                <>
                  <p className="original-price">R$ {(produto.price / (1 - produto.discountPercentage / 100)).toFixed(2)}</p>
                  <p className="discount-price">R$ {produto.price.toFixed(2)}</p>
                  <span className="discount-badge">-{produto.discountPercentage}%</span>
                </>
              ) : (
                <p className="product-price">R$ {produto.price.toFixed(2)}</p>
              )}
            </div>

            <button className="buy-button" onClick={() =>{goToCheckOut(produto)}}>🛒 Comprar Agora</button>
          </div>
        </div>

        <div className="reviews-container">
          <h2 className="reviews-title">📢 Avaliações</h2>
          {produto.reviews && produto.reviews.length > 0 ? (
            <ul className="reviews-list">
              {produto.reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <div className="review-header">
                    <strong>{review.reviewerName}</strong>
                    <span className="review-rating">
                      {"⭐".repeat(review.rating)} ({review.rating}/5)
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-reviews">Nenhuma avaliação disponível.</p>
          )}
        </div>
      </div>
    </>
  );
}
