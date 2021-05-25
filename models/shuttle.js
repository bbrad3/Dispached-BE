'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shuttle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shuttle.belongsToMany(models.user, {through: 'shifts', as: 'shuttles'})
    }
  };
  shuttle.init({
    number: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    cdlRequired: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'shuttle',
  });
  return shuttle;
};