'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.shuttle, {through: 'shifts', as: 'users'})
    }
  };
  user.init({
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    cdl: DataTypes.BOOLEAN,
    driver: DataTypes.BOOLEAN,
    dispatcher: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};