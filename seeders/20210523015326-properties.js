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
        name: 'First Tracks',
        address: '2525 Cattle Kate Circle',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antlers Steamboat',
        address: '2085 Ski Time Square Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Snow Flower',
        address: '2200 Apres Ski Way',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chateau Chamonix',
        address: '2308 Ski Trail Ln',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Waterstone',
        address: '2718 Waterstone Ln',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Lodge at Steamboat',
        address: '2700 Village Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Waterford Townhomes',
        address: '2650 Medicine Springs Rd',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Torian Plum',
        address: '1855 Ski Time Square Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailhead Lodge',
        address: '1175 Bangtail Way',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bronze Tree Condos',
        address: '1995 Storm Meadows Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kutuk Condos',
        address: '2000 Ski Time Square Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Stonewood',
        address: '1205 Eagle Glen Rd Drive',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chadwick Flats',
        address: '1275 Eagle Glen Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'EagleRidge Lodge',
        address: '1463 Flattop Circle',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cascades at Eagle Ridge',
        address: '2850 Eagle Ridge Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Meadows at Eagle Ridge',
        address: '2800 Eagle Ridge Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Canyon Creek',
        address: '2740 Eagle Ridge Dr',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ironwood Townhomes',
        address: '2300 Apres Ski Way',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Phoenix',
        address: '2315 Apres Ski Way',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'La Casa',
        address: '2315 Ski Trail Ln',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ptarmigan House',
        address: '2322 Apres Ski Way',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ski Inn',
        address: '2350 Ski Trail Ln',
        type: 'property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cimarron',
        address: 'Cimarron Cir',
        type: 'property',
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
