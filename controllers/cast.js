const { Movies, Cast, MovieCast } = require("../models");
const wrapper = require("../helpers/utils/wrapper");
const logger = require("../helpers/utils/logger");
const { isValid } = require("../helpers/utils/validate");
const validator = require("validate.js");
const { createCastSchema, updateCastSchema } = require("./cast_validate");
const { ERROR, SUCCESS } = require("../helpers/http-status/status_code");


const createCast = async (req, res) => {
  try {
    const result = isValid(req.body, createCastSchema);
    if (result.err) {
      return wrapper.response(res, false, null, result.code, result.message);
    }
    await Cast.create(req.body);
    return wrapper.response(res, true, null, SUCCESS.CREATED, "Success to create cast");
  } catch (error) {
    logger.logOnly("createCast", error.message, "Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const getAllCast = async (req, res) => {
  try {
    const result = await Cast.findAll({
      include: [{ model: Movies, as: "movies", through: { attributes: [] } }],
    });

    if (result.length < 1) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Cast not found");
    }

    return wrapper.response(res, true, result, SUCCESS.OK, "Get all cast");
  } catch (error) {
    logger.logOnly("getAllCast", error.message, "Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const updateCastByID = async (req, res) => {
  const castId = req.params.id;

  const validate = isValid(req.body, updateCastSchema, validator.isEmpty(req.body));
  if (validate.err) {
    return wrapper.response(res, false, null, 400, validate.message);
  }

  try {
    const result = await Cast.findOne({ where: { id: castId } });
    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Cast not found");
    }

    await Cast.update(req.body, { where: { id: castId } });
    return wrapper.response(res, true, null, SUCCESS.OK, "Success to update cast");

  } catch (error) {
    logger.logOnly("updateOneCastByID", error.message, "Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const getOneCastByID = async (req, res) => {
  const castId = req.params.id;
  try {
    const result = await Cast.findOne({
      where: { id: castId },
      include: [{ model: Movies, as: "movies", through: { attributes: [] } }],
    });

    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Cast not found");
    };

    return wrapper.response(res, true, result, SUCCESS.OK, "Get detail cast");
  } catch (error) {
    logger.logOnly("getOneCastByID", error.message, "Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

const deleteCastByID = async (req, res) => {
  const castId = req.params.id;
  try {
    const result = await Movies.findOne({ where: { id: castId } });
    if (!result) {
      return wrapper.response(res, true, null, ERROR.NOT_FOUND, "Cast not found");
    }

    await Movies.destroy({ where: { id: castId } });
    return wrapper.response(res, true, null, SUCCESS.OK, "Success to delete cast");

  } catch (error) {
    logger.logOnly("deleteOneMovie", error.message, "Cast Controller");
    const wrapError = wrapper.error(error);
    return wrapper.response(res, !wrapError.err, wrapError.data, wrapError.code, wrapError.message);
  }
};

module.exports = {
  getAllCast, createCast, getOneCastByID, updateCastByID, deleteCastByID
}