const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const mysqlConnection = require("../helpers/databases/mysql/connection");

const CastSchemas = mysqlConnection.define('cast', {
  name: {
    type: DataTypes.STRING
  },
  birthday: {
    type: DataTypes.DATE
  },
  deadday: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  rating: {
    type: DataTypes.INTEGER
  }
});

module.exports = CastSchemas;