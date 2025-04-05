const { User } = require("../model/User");
const { Order } = require("../model/Order");
const { Voucher } = require("../model/Voucher");

const AdminController = {
  async dashboard(req, res) {
    try {
      const totalUsuarios = await User.count();
      const totalPedidos = await Order.count();
      const totalCupons = await Voucher.count();

      return res.json({
        totalUsuarios,
        totalPedidos,
        totalCupons,
      });
    } catch (err) {
      return res.status(500).json({ message: "Erro no dashboard", error: err.message });
    }
  },

  async listarUsuarios(req, res) {
    try {
      const usuarios = await User.findAll({
        attributes: ["id", "nome_usuario", "email", "role"],
        order: [["id", "ASC"]],
      });

      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ message: "Erro ao listar usuários", error: err.message });
    }
  },

  async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      await user.destroy();
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao deletar usuário", error: err.message });
    }
  },

  async listarPedidos(req, res) {
    try {
      const pedidos = await Order.findAll({
        include: ["produtos", "usuario"], 
        order: [["createdAt", "DESC"]],
      });

      res.json(pedidos);
    } catch (err) {
      res.status(500).json({ message: "Erro ao listar pedidos", error: err.message });
    }
  },

  async listarCupons(req, res) {
    try {
      const cupons = await Voucher.findAll();
      res.json(cupons);
    } catch (err) {
      res.status(500).json({ message: "Erro ao listar cupons", error: err.message });
    }
  },

  async criarCupom(req, res) {
    try {
      const { codigo, desconto, validade } = req.body;
      const novo = await Voucher.create({ codigo, desconto, validade });
      res.status(201).json(novo);
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar cupom", error: err.message });
    }
  },

  async deletarCupom(req, res) {
    try {
      const { id } = req.params;
      const cupom = await Voucher.findByPk(id);
      if (!cupom) return res.status(404).json({ message: "Cupom não encontrado" });

      await cupom.destroy();
      res.json({ message: "Cupom deletado com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao deletar cupom", error: err.message });
    }
  },
};

module.exports = AdminController;
