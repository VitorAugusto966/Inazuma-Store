const Product = require("../model/Product");
const Seller = require("../model/Seller");

const ProductController = {
    async create(req, res) {
        try {
            const {
                title, description, sellerId, brand, category, price,
                discountPercentage, stock, thumbnail, images
            } = req.body;

            if (!title || !description || !sellerId || !brand || !category || !price || !stock || !thumbnail) {
                return res.status(400).json({ error: "Dados obrigatórios ausentes." });
            }

            const seller = await Seller.findByPk(sellerId);
            if (!seller) {
                return res.status(400).json({ error: "Vendedor não encontrado." });
            }

            const produto = await Product.create({
                title, description, sellerId, brand, category,
                price, discountPercentage, stock, thumbnail, images,
            });

            return res.status(201).json({ message: "Produto criado com sucesso", produto });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar o produto", details: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                title, description, brand, category, price,
                discountPercentage, stock, thumbnail, images
            } = req.body;

            if (!id) {
                return res.status(400).json({ error: "ID do produto é obrigatório" });
            }

            const produto = await Product.findByPk(id);
            if (!produto) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            if (title) produto.title = title;
            if (description) produto.description = description;
            if (brand) produto.brand = brand;
            if (category) produto.category = category;
            if (price) produto.price = price;
            if (discountPercentage) produto.discountPercentage = discountPercentage;
            if (stock) produto.stock = stock;
            if (thumbnail) produto.thumbnail = thumbnail;
            if (images) produto.images = images;

            await produto.save();
            return res.status(200).json({ message: "Produto atualizado com sucesso", produto });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar o produto", details: error.message });
        }
    },

    async getALLProducts(req, res) {
        try {
            const produtos = await Product.findAll();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar produtos", details: error.message });
        }
    },

    async getALLProductsBySeller(req, res) {
        try {
            const { sellerId } = req.body;

            if (!sellerId) {
                return res.status(400).json({ error: "ID do vendedor é obrigatório" });
            }

            const produtos = await Product.findAll({
                where: { sellerId }
            });

            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar produtos", details: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const produto = await Product.findByPk(id);

            if (!produto) {
                return res.status(400).json({ error: "Produto não existente" });
            }

            await Product.destroy({ where: { id } });

            return res.status(200).json({ message: "Produto excluído com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao excluir produto", details: error.message });
        }
    }
};

module.exports = ProductController;
