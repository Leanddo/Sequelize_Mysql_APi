'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("posts",{
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Make sure the table name matches the Users table
          key: "user_id",
        },
        onDelete: "CASCADE", // Cascade delete if a user is deleted
        onUpdate: "CASCADE",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Posts");
  }
};
