const { Sequelize } = require("sequelize");
const mysqlConnection = require("../helpers/databases/mysql/connection");
const Cast = require("./Cast");
const Movies = require("./Movies");
const { DataTypes } = Sequelize;

const MovieCastSchemas = mysqlConnection.define('movie_cast', {
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movies,
      key: 'id'
    },
    field: 'movie_id'
  },
  castId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cast,
      key: 'id'
    },
    field: 'cast_id'
  }
});

module.exports = MovieCastSchemas;