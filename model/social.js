const sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("users", {
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
    unique: true
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

const Posts = db.define("posts", {
  post_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  user_id: {
    type: sequelize.INTEGER,
    references: {
      model: "User", 
      key: "user_id", 
    },
  },
  private:{
    type: sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
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


const Comments = db.define("comments", {
  comment_id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  post_id: {
    type: sequelize.INTEGER,
    references: {
      model: "Posts",
      key: "post_id", 
    },
  },
  user_id: {
    type: sequelize.INTEGER,
    references: {
      model: "User", 
      key: "user_id", 
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

// In Post model
Posts.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Posts, { foreignKey: 'user_id' });

Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});
Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = {Comments,User,Posts}
