'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ride.belongsTo(models.location, {foreignKey: 'pickupId', as: 'pickupLocation'})
      models.ride.belongsTo(models.location, {foreignKey: 'dropoffId', as: 'dropoffLocation'})
    }
  };
  ride.init({
    status: DataTypes.TEXT,
    pickupId: DataTypes.INTEGER,
    dropoffId: DataTypes.INTEGER,
    pickupCustom: DataTypes.TEXT,
    dropoffCustom: DataTypes.TEXT,
    passengers: DataTypes.INTEGER,
    callerName: DataTypes.TEXT,
    room: DataTypes.TEXT,
    shiftId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ride',
  });
  return ride;
};