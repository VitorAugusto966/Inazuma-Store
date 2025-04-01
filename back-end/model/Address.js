const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Endereco = sequelize.define("Endereco", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "enderecos",
    timestamps: false
});

User.hasOne(Endereco, { foreignKey: "userId", as: "endereco" });
Endereco.belongsTo(User, { foreignKey: "userId", as: "usuario" });

module.exports = Endereco;
