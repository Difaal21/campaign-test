const joi = require('joi');

const createMovieCastSchema = joi.object({
  movieId: joi.number().required().min(1),
  castId: joi.number().required().min(1),
});

const updateMovieCastSchema = joi.object({
  movieId: joi.number().required().min(1),
  castId: joi.number().required().min(1),
});


module.exports = { createMovieCastSchema, updateMovieCastSchema };