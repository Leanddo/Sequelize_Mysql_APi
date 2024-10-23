'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("comments",{
      comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "posts", // Name of the table (or model) being referenced
          key: "post_id", // Key in the referenced table (usually primary key)
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Name of the table (or model) being referenced
          key: "user_id", // Key in the referenced table (usually primary key)
        },
      },
      comment_text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Comments");
  }
};
