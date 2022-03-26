const joi = require('joi').extend(require('@joi/date'));

const createCastSchema = joi.object({
  name: joi.string().required(),
  birthday: joi.date().format('YYYY-M-D').required().less('now'),
  deadday: joi.date().format('YYYY-M-D').allow(null).min(joi.ref('birthday')),
  rating: joi.number().required().min(1).max(5),
});

const updateCastSchema = joi.object({
  name: joi.string(),
  birthday: joi.date().format('YYYY-M-D').less('now'),
  deadday: joi.date().format('YYYY-M-D').allow(null).min(joi.ref('birthday')),
  rating: joi.number().min(1).max(5),
});

module.exports = { createCastSchema, updateCastSchema };