const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Seller = require("./Seller");

const Produto = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sellerId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: Seller,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
    },
    discountPercentage: {
        type: DataTypes.DOUBLE(5, 2),
        allowNull: true,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        },
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    }

})

Produto.belongsTo(Seller, { foreignKey: "sellerId" });

module.exports = Produto;