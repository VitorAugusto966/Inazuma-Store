const Order = require("../model/Order");
const OrderItem = require("../model/OrderItem");
const axios = require("axios");

const PRODUCT_API_URL = "https://dummyjson.com/products";

const OrderController = {
    async createOrder(req, res) {
        try {
            const { userId, shippingAddress , items, totalAmount, paymentStatus } = req.body;
            if (!userId || !items || !Array.isArray(items) || totalAmount == null) {
                return res.status(400).json({ error: "Dados inválidos" });
            }

            const order = await Order.create({ userId, shippingAddress , totalAmount, paymentStatus });

            for (const item of items) {
                const { data: product } = await axios.get(`${PRODUCT_API_URL}/${item.productId}`);

                await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    productName: product.title,
                    productPrice: product.price,
                    quantity: item.quantity,
                    subtotal: product.price * item.quantity,
                    productThumbnail: product.thumbnail, 
                });                
            }

            return res.status(201).json({ message: "Pedido criado!", orderId: order.id });
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            return res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
        }
    },

    async getOrder(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id, { include: OrderItem });

            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }

            return res.json(order);
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            return res.status(500).json({ error: "Erro ao buscar pedido", details: error.message });
        }
    },

    async getAllUserOrders(req, res) {
        try {
            const { userId } = req.params;

            const orders = await Order.findAll({
                where: { userId },
                include: { model: OrderItem },
            });

            if (!orders.length) {
                return res.status(404).json({ error: "Nenhum pedido encontrado para este usuário" });
            }

            return res.json(orders);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            return res.status(500).json({ error: "Erro ao buscar pedidos", details: error.message });
        }
    },
};

module.exports = OrderController;
