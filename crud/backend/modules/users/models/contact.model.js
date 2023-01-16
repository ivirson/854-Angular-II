const Sequelize = require("sequelize");
const database = require("../../../infra/db");

const Contact = database.define("Contact", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Contact;