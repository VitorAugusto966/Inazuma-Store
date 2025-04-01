const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Voucher = sequelize.define("Voucher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Voucher;
