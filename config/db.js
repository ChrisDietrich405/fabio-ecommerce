const { Sequelize } = require("sequelize");

const db = new Sequelize("fabio_products", "root", "secret", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
