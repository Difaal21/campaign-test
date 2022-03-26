const wrapper = require('../utils/wrapper');

const isValid = (payload, constraint, blank = false) => {
  const { error, value } = constraint.validate(payload);
  if (error || blank) {
    return wrapper.error('fail', error || "Bad request", 400);
  }
  return wrapper.data(value, 'success', 200);
};

module.exports = {
  isValid
};
