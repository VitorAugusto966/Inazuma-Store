const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Favorite = sequelize.define("Favorite", {
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: "id",
        },
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
});

User.hasMany(Favorite, { foreignKey: "idUser" });
Favorite.belongsTo(User, { foreignKey: "idUser" });

module.exports = Favorite;
