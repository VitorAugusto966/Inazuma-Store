const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Processando",
        "Pedido Confirmado",
        "Preparando para Envio",
        "Despachado",
        "Em trânsito",
        "Saiu para entrega",
        "Entregue",
        "Cancelado"
      ),
      defaultValue: "Processando",
    },
    paymentStatus: {
      type: DataTypes.ENUM("Pendente", "Pago", "Estornado", "Falha"),
      defaultValue: "Pendente",
    },
    shippingMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estimatedDelivery: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "orders",
  }
);

module.exports = Order;
