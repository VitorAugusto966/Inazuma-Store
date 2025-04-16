const User = require("../model/User");
const Order = require("../model/Order");
const Voucher = require("../model/Voucher");
const { Op, fn, col } = require("sequelize");

const AdminController = {
  async dashboard(req, res) {
    try {
      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

      const totalUsuarios = await User.count();
      const totalPedidos = await Order.count();
      const totalCupons = await Voucher.count();

      const thisMonthUsuarios = await User.count({
        where: {
          createdAt: {
            [Op.between]: [thisMonthStart, new Date()],
          },
        },
      });

      const thisMonthPedidos = await Order.count({
        where: {
          updatedAt: {
            [Op.between]: [thisMonthStart, new Date()],
          },
        },
      });

      const thisMonthCupons = await Voucher.count({
        where: {
          createdAt: {
            [Op.between]: [thisMonthStart, new Date()],
          },
        },
      });

      const lastMonthUsuarios = await User.count({
        where: {
          createdAt: {
            [Op.between]: [lastMonthStart, lastMonthEnd],
          },
        },
      });

      const lastMonthPedidos = await Order.count({
        where: {
          updatedAt: {
            [Op.between]: [lastMonthStart, lastMonthEnd],
          },
        },
      });

      const lastMonthCupons = await Voucher.count({
        where: {
          createdAt: {
            [Op.between]: [lastMonthStart, lastMonthEnd],
          },
        },
      });

      const calculateGrowth = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
      };

      const kpiGrowth = {
        usuarios: calculateGrowth(thisMonthUsuarios, lastMonthUsuarios),
        pedidos: calculateGrowth(thisMonthPedidos, lastMonthPedidos),
        cupons: calculateGrowth(thisMonthCupons, lastMonthCupons),
      };

      const userGrowthData = await Promise.all(
        Array.from({ length: 6 }).map(async (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);

          const start = new Date(date.getFullYear(), date.getMonth(), 1);
          const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

          const count = await User.count({
            where: {
              createdAt: {
                [Op.between]: [start, end],
              },
            },
          });

          return {
            name: start.toLocaleString("default", { month: "short" }),
            uv: count,
          };
        })
      ).then(res => res.reverse());

      const ordersData = await Promise.all(
        Array.from({ length: 6 }).map(async (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);

          const start = new Date(date.getFullYear(), date.getMonth(), 1);
          const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

          const count = await Order.count({
            where: {
              updatedAt: {
                [Op.between]: [start, end],
              },
            },
          });

          return {
            name: start.toLocaleString("default", { month: "short" }),
            pedidos: count,
          };
        })
      ).then(res => res.reverse());

      const statusCounts = await Order.findAll({
        attributes: ["status", [fn("COUNT", col("status")), "count"]],
        group: ["status"],
        raw: true,
      });

      const pieData = statusCounts.map(item => ({
        name: item.status,
        value: parseInt(item.count),
      }));

      const faturamentoData = await Promise.all(
        Array.from({ length: 6 }).map(async (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);

          const start = new Date(date.getFullYear(), date.getMonth(), 1);
          const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

          const total = await Order.sum("totalAmount", {
            where: {
              updatedAt: {
                [Op.between]: [start, end],
              },
              status: "Pedido Confirmado",
            },
          });

          return {
            name: start.toLocaleString("default", { month: "short" }),
            valor: parseFloat((total || 0).toFixed(2)),
          };
        })
      ).then(res => res.reverse());

      const totalValorPedidos = await Order.sum("totalAmount", {
        where: {
          status: "Pedido Confirmado",
        },
      });

      return res.json({
        totalUsuarios,
        totalPedidos,
        totalCupons,
        kpiGrowth,
        userGrowthData,
        ordersData,
        pieData,
        faturamentoData,
        totalValorPedidos,
      });

    } catch (err) {
      console.error(err);
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
      console.error(err);
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
