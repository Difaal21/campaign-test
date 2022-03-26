const Movies = require("./Movies");
const Cast = require("./Cast");
const MovieCast = require("./MovieCast");

Movies.belongsToMany(Cast, { through: MovieCast, as: "cast" });
Cast.belongsToMany(Movies, { through: MovieCast, as: "movies", });

module.exports = {
  Movies, Cast, MovieCast
};
