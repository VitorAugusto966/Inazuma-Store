const Favorite = require("../model/Favorite");
const axios = require("axios");

const PRODUCT_API_URL = "https://dummyjson.com/products";

const FavoriteController = {
    async addFavorite(req, res) {
        try {
            const { idUser, idProduto } = req.body;

            if (!idUser || !idProduto) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const { data: product } = await axios.get(`${PRODUCT_API_URL}/${idProduto}`).catch(() => null);
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            await Favorite.create({ idUser, idProduto });
            return res.status(201).json({ message: "Produto favoritado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao favoritar produto", details: error.message });
        }
    },

    async removeFavorite(req, res) {
        try {
            const { idUser, idProduto } = req.body;

            if (!idUser || !idProduto) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const deleted = await Favorite.destroy({ where: { idUser, idProduto } });

            if (!deleted) {
                return res.status(404).json({ error: "Favorito não encontrado" });
            }

            return res.json({ message: "Produto removido dos favoritos" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao remover favorito", details: error.message });
        }
    },

    async getUserFavorites(req, res) {
        try {
            const { idUser } = req.params;
            const favorites = await Favorite.findAll({ where: { idUser } });

            if (!favorites.length) {
                return res.json({ message: "Nenhum favorito encontrado" });
            }

            const favoritesWithDetails = await Promise.all(
                favorites.map(async (fav) => {
                    try {
                        const response = await axios.get(`${PRODUCT_API_URL}/${fav.idProduto}`);
                        response.data.price *= 6;
                        return { id: fav.idProduto, ...fav.toJSON(), product: response.data };
                    } catch (error) {
                        console.error(`Erro ao buscar detalhes do produto ${fav.idProduto}:`, error.message);
                        return { id: fav.idProduto, ...fav.toJSON(), product: null };
                    }
                })
            );

            return res.json(favoritesWithDetails);
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error.message);
            return res.status(500).json({ error: "Erro ao buscar favoritos", details: error.message });
        }
    }

};

module.exports = FavoriteController;
