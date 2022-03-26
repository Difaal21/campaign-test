const { Movies, Cast, MovieCast } = require("../models");
const { ERROR, SUCCESS } = require("../helpers/http-status/status_code");
const wrapper = require("../helpers/utils/wrapper");
const logger = require("../helpers/utils/logger");
const { isValid } = require("../helpers/utils/validate");
const { createMovieCastSchema, updateMovieCastSchema } = require("./movie_cast_validate");

const createMovieCast = async (req, res) => {
  try {
    const { movieId, castId } = req.body;

    const validate = isValid(req.body, createMovieCastSchema);
    if (validate.err) {
      return wrapper.response(res, false, null, validate.code, validate.message);
    };

    const movie = await Movies.findOne({ where: { id: movieId } });
    const cast = await Cast.findOne({ where: { id: castId } });

    if (!movie || !cast) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Movie cast not found");
    };

    const movieCastAlreadyExist = await MovieCast.findOne({ where: { movie_id: movieId, cast_id: castId } });

    if (movieCastAlreadyExist) {
      return wrapper.response(res, true, null, ERROR.CONFLICT, "Cast already exist in movie");
    };

    await MovieCast.create(req.body);

    return wrapper.response(res, true, null, SUCCESS.CREATED, "Success to create movie cast");
  } catch (error) {
    logger.logOnly("createMovieCast", error.message, "Movie Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const deleteMovieCastByID = async (req, res) => {
  const movieCastId = req.params.id;

  try {
    const result = await MovieCast.findOne({ where: { id: movieCastId } });
    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Movie cast not found");
    }

    await MovieCast.destroy({ where: { id: movieCastId } });
    return wrapper.response(res, true, null, SUCCESS.OK, "Success to delete movie cast");

  } catch (error) {
    logger.logOnly("deleteOneMovie", error.message, "Movies Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};


module.exports = { createMovieCast, deleteMovieCastByID };