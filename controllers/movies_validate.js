const joi = require('joi');

const createMovieSchema = joi.object({
  name: joi.string().required(),
  language: joi.string().required(),
  status: joi.string().required(),
  rating: joi.number().required().min(1).max(5),
});

const updateMovieSchema = joi.object({
  name: joi.string(),
  language: joi.string(),
  status: joi.string(),
  rating: joi.number().min(1).max(5),
});

module.exports = { createMovieSchema, updateMovieSchema };