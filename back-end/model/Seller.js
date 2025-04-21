const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

const Seller = sequelize.define("Seller", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_loja: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_vendedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Formato de e-mail inválido." }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "seller",
        validate: {
            isIn: {
                args: [["seller"]],
                msg: "Role inválida"
            }
        }
    }
}, {
    tableName: "sellers",
    timestamps: true,
    hooks: {
        beforeCreate: async (seller) => {
            seller.senha = await bcrypt.hash(seller.senha, 10);
        },
        beforeUpdate: async (seller) => {
            if (seller.changed("senha")) {
                seller.senha = await bcrypt.hash(seller.senha, 10);
            }
        }
    }
});

module.exports = Seller;
