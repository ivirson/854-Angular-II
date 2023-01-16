const Sequelize = require("sequelize");
const database = require("../../../infra/db");
const Address = require("./address.model");
const Contact = require("./contact.model");

const User = database.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profession: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  documentNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.hasOne(Address, {
  as: "address",
  foreignKey: {
    allowNull: false,
    name: "userId"
  },
  onDelete: "cascade"
});

User.hasOne(Contact, {
  as: "contact",
  foreignKey: {
    allowNull: false,
    name: "userId"
  },
  onDelete: "cascade"
});

module.exports = User;