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
    await queryInterface.bulkInsert('locations', [
      {
        name: 'Ore House',
        address: '1465 Pine Grove Rd',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Safeway',
        address: '37500 E US Hwy 40',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'City Market',
        address: '1825 Central Park Dr',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Tap House',
        address: '729 Lincoln Ave',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aurum Food & Wine',
        address: '811 Yampa St',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mountain Tap Brewery',
        address: '910 Yampa St',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taco Cabo',
        address: '729 Yampa St',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Steamboat Whiskey Company',
        address: '1103 Lincoln Ave',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Back Door Grill',
        address: '825 Oak St',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Carl's Tavern",
        address: '700 Yampa St',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Space Station',
        address: '644 Lincoln Ave',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mahogany Ridge Brewery & Grill',
        address: '435 Lincoln Ave',
        type: 'destination',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('locations', null, {})
  }
};
