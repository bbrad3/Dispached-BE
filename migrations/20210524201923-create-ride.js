'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TEXT
      },
      pickupId: {
        type: Sequelize.INTEGER
      },
      dropoffId: {
        type: Sequelize.INTEGER
      },
      pickupCustom: {
        type: Sequelize.TEXT
      },
      dropoffCustom: {
        type: Sequelize.TEXT
      },
      passengers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      callerName: {
        type: Sequelize.TEXT
      },
      room: {
        type: Sequelize.TEXT
      },
      shiftId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('rides');
  }
};