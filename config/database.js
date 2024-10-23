const sequelize = require("sequelize");
module.exports = new sequelize("Social_DB", "admin", "System32", {
  host: "localhost",
  dialect: "mysql",
});
