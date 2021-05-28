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

    const bcrypt = require('bcrypt')
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash('foobar', saltRounds)

    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Mr. Foo',
        lastName: 'Bar',
        email: 'foo@admin.com',
        password: hashedPassword,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Foolicity',
        lastName: 'Barston',
        email: 'foo@dispatch.com',
        password: hashedPassword,
        dispatcher: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Foob',
        lastName: 'Barf',
        email: 'foo1@bar.com',
        password: hashedPassword,
        driver: true,
        cdl: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Floo',
        lastName: 'Blar',
        email: 'foo2@bar.com',
        password: hashedPassword,
        driver: true,
        cdl: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Fii',
        lastName: 'Bii',
        email: 'foo3@bar.com',
        password: hashedPassword,
        driver: true,
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
    await queryInterface.bulkDelete('users', null, {})
  }
};
