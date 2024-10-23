const sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  user_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  username: {
    type: sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  password_hash: {
    type: sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
});

const Posts = db.define("Posts", {
  post_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  user_id: {
    type: sequelize.INTEGER,
    references: {
      model: "User", // Name of the table (or model) being referenced
      key: "user_id", // Key in the referenced table (usually primary key)
    },
  },
  content: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  created_at: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
});

const Comments = db.define("Comments", {
  comment_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  post_id: {
    type: sequelize.INTEGER,
    references: {
      model: "Posts", // Name of the table (or model) being referenced
      key: "post_id", // Key in the referenced table (usually primary key)
    },
  },
  user_id: {
    type: sequelize.INTEGER,
    references: {
      model: "User", // Name of the table (or model) being referenced
      key: "user_id", // Key in the referenced table (usually primary key)
    },
  },
  comment_text: {
    type: sequelize.STRING,
    allowNull: false,
  },
  created_at: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
});

module.exports = {Comments,User,Posts}
