'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pertanyaan: {
        type: Sequelize.STRING
      },
      opsia: {
        type: Sequelize.STRING
      },
      opsib: {
        type: Sequelize.STRING
      },
      opsic: {
        type: Sequelize.STRING
      },
      opsid: {
        type: Sequelize.STRING
      },
      opsibenar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quizzes');
  }
};