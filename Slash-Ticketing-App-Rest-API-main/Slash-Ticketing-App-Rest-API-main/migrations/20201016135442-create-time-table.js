'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TimeTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      busRoute: {
        type: Sequelize.STRING
      },
      busNo: {
        type: Sequelize.STRING
      },
      terminal: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      departureTime: {
        type: Sequelize.STRING
      },
      arrivalTime: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TimeTables');
  }
};