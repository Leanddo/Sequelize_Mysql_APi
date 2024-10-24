const sequelize = require("sequelize");
module.exports = new sequelize("Social_DB", "root", "System32", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
}
});
