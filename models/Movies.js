const { Sequelize, Association } = require("sequelize");
const { DataTypes } = Sequelize;
const mysqlConnection = require("../helpers/databases/mysql/connection");

const MovieSchemas = mysqlConnection.define('movies', {
  name: {
    type: DataTypes.STRING
  },
  language: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  },
}, {
  tableName: "movies"
});


module.exports = MovieSchemas;
