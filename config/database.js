const sequelize = require("sequelize");
require("dotenv").config();
module.exports = new sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
}
});
