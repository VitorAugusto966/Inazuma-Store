const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");
const moment = require("moment");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome_social: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nome_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: { args: [3, 50], msg: "O nome de usuário deve ter entre 3 e 50 caracteres." }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Formato de e-mail inválido." }
    }
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true
    },
    get() {
      const rawValue = this.getDataValue("data_nascimento");
      return rawValue;
    },
    set(value) {
      if (!value) return;

      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        this.setDataValue("data_nascimento", value);
      } else {

        const formattedDate = moment(value, ["YYYY-MM-DD", "DD/MM/YYYY"], true);
        if (formattedDate.isValid()) {
          this.setDataValue("data_nascimento", formattedDate.format("YYYY-MM-DD"));
        } else {
          throw new Error("Formato de data inválido");
        }
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
    validate: {
      isIn: {
        args: [["user", "admin"]],
        msg: "Role inválida"
      }
    }
  }

}, {
  tableName: "users",
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      user.senha = await bcrypt.hash(user.senha, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed("senha")) {
        user.senha = await bcrypt.hash(user.senha, 10);
      }
    }
  }
});

module.exports = User;
