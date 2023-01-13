const Sequelize = require("sequelize");
const database = require("../../../infra/db");

const Address = database.define("Address", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  complement: {
    type: Sequelize.STRING,
    allowNull: true
  },
  neighborhood: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Address;