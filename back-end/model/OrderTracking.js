const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");

const OrderTracking = sequelize.define(
  "order_tracking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
      onDelete: "CASCADE",
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
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimatedDelivery: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "order_tracking",
  }
);

Order.hasMany(OrderTracking, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderTracking.belongsTo(Order, { foreignKey: "orderId" });

module.exports = OrderTracking;
