'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('shuttles', [
      {
        number: 3,
        capacity: 11,
        cdlRequired: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 4,
        capacity: 13,
        cdlRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 7,
        capacity: 15,
        cdlRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 8,
        capacity: 9,
        cdlRequired: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 24,
        capacity: 14,
        cdlRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 25,
        capacity: 14,
        cdlRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('shuttles', null, {})
  }
};
