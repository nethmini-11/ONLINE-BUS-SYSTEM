'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TimeTable.init({
    busRoute: DataTypes.STRING,
    busNo: DataTypes.STRING,
    terminal: DataTypes.STRING,
    destination: DataTypes.STRING,
    departureTime: DataTypes.STRING,
    arrivalTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TimeTable',
  });
  return TimeTable;
};