'use strict';
const {
  Model
} = require('sequelize');
const shuttle = require('./shuttle');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shift.belongsTo(models.user)
      models.shift.belongsTo(models.shuttle)
      models.shift.hasMany(models.ride)
    }
  };
  shift.init({
    shuttleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shuttle',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    radio: DataTypes.INTEGER,
    shiftStart: DataTypes.DATE,
    shiftEnd: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'shift',
  });
  return shift;
};