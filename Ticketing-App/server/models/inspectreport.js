'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InspectReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  InspectReport.init({
    userId: DataTypes.INTEGER,
    inspectedId: DataTypes.INTEGER,
    reportUser: DataTypes.STRING,
    userType: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'InspectReport',
  });
  return InspectReport;
};