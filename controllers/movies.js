const wrapper = require("../helpers/utils/wrapper");
const logger = require("../helpers/utils/logger");
const { createMovieSchema, updateMovieSchema } = require("./movies_validate");
const { isValid } = require("../helpers/utils/validate");
const validator = require("validate.js");
const { ERROR, SUCCESS } = require("../helpers/http-status/status_code");
const { Movies, Cast } = require("../models");

const getAllMovies = async (req, res) => {
  try {
    const result = await Movies.findAll(
      {
        include: [{ model: Cast, as: "cast", through: { attributes: [] } }],
      });

    if (result.length < 1) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Movie cast not found");
    }

    return wrapper.response(res, true, result, SUCCESS.OK, "Get all movie cast");
  } catch (error) {
    logger.logOnly("getAllMovieCast", error.message, "Movie Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const getOneMovieByID = async (req, res) => {
  const movieId = req.params.id;
  try {
    const result = await Movies.findOne({
      where: { id: movieId },
      include: [{ model: Cast, as: "cast", through: { attributes: [] } }],
    });
    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Movie not found");
    }

    return wrapper.response(res, true, result, SUCCESS.OK, "Get detail movies");
  } catch (error) {
    logger.logOnly("getOneMovieByID", error.message, "Movies Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const createMovie = async (req, res) => {
  try {
    const result = isValid(req.body, createMovieSchema);
    if (result.err) {
      return wrapper.response(res, false, null, result.code, result.message);
    }
    await Movies.create(req.body);
    return wrapper.response(res, true, null, SUCCESS.CREATED, "Success to create movie");
  } catch (error) {
    logger.logOnly("createMovie", error.message, "Movies Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const updateMovie = async (req, res) => {
  const movieId = req.params.id;

  const validate = isValid(req.body, updateMovieSchema, validator.isEmpty(req.body));
  if (validate.err) {
    return wrapper.response(res, false, null, 400, validate.message);
  }

  try {
    const result = await Movies.findOne({ where: { id: movieId } });
    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Movie not found");
    }

    await Movies.update(req.body, { where: { id: movieId } });
    return wrapper.response(res, true, null, SUCCESS.OK, "Success to update movie");

  } catch (error) {
    logger.logOnly("updateMovie", error.message, "Movies Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const deleteOneMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const result = await Movies.findOne({ where: { id: movieId } });
    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Movie not found");
    }

    await Movies.destroy({ where: { id: movieId } });
    return wrapper.response(res, true, null, SUCCESS.OK, "Success to delete movie");

  } catch (error) {
    logger.logOnly("deleteOneMovie", error.message, "Movies Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
}


module.exports = { getAllMovies, createMovie, getOneMovieByID, updateMovie, deleteOneMovie };