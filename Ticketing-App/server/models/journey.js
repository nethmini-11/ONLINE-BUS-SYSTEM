'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Journey.init({
    busUserId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    busRoute: DataTypes.STRING,
    terminal: DataTypes.STRING,
    destination: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Journey',
  });
  return Journey;
};