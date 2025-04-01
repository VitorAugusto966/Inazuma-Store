const OrderTracking = require("../model/OrderTracking");
const Order = require("../model/Order");

const OrderTrackingController = {
  async addTrackingEntry(req, res) {
    try {
      const { orderId, status, location, estimatedDelivery } = req.body;

      if (!orderId || !status || !location) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      const trackingEntry = await OrderTracking.create({
        orderId,
        status,
        location,
        estimatedDelivery,
      });

      await order.update({ status });

      return res.status(201).json({ message: "Rastreamento atualizado", trackingEntry });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar rastreamento", details: error.message });
    }
  },

  async getTrackingByOrder(req, res) {
    try {
      const { orderId } = req.params;

      const trackingHistory = await OrderTracking.findAll({
        where: { orderId },
        order: [["timestamp", "ASC"]],
      });

      if (!trackingHistory.length) {
        return res.status(404).json({ error: "Nenhum histórico de rastreamento encontrado" });
      }

      return res.json(trackingHistory);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar rastreamento", details: error.message });
    }
  },

  async getLatestTrackingStatus(req, res) {
    try {
      const { orderId } = req.params;

      const latestTracking = await OrderTracking.findOne({
        where: { orderId },
        order: [["timestamp", "DESC"]],
      });

      if (!latestTracking) {
        return res.status(404).json({ error: "Nenhuma atualização encontrada para este pedido" });
      }

      return res.json(latestTracking);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar última atualização", details: error.message });
    }
  },
};

module.exports = OrderTrackingController;
