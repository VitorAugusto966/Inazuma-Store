const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Voucher = require("./Voucher");

const UserVoucher = sequelize.define("User_Voucher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        allowNull: false,
    },
    idVoucher: {
        type: DataTypes.INTEGER,
        references: {
            model: Voucher,
            key: "id",
        },
        allowNull: false,
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});


User.belongsToMany(Voucher, { through: UserVoucher, foreignKey: "idUser" });
Voucher.belongsToMany(User, { through: UserVoucher, foreignKey: "idVoucher" });

module.exports = UserVoucher;
